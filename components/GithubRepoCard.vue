<script setup lang="ts">
import axios from 'axios';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface LanguageColor {
  color: string;
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  language: { type: String, required: true },
  updated: { type: String, required: true },
  forks: { type: String, required: true },
  description: { type: String, required: true },
  stars: { type: String, required: true },
});

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'yyyy年MM月dd日', { locale: zhCN });
};

const languageColors = useState<Record<string, LanguageColor>>('github-colors', () => ({}));
const colorsError = ref<Error | null>(null);
const colorsLoading = ref(false);

if (Object.keys(languageColors.value).length === 0 && !colorsError.value) {
  try {
    const response = await axios.get('/github-colors.json');
    languageColors.value = response.data;
  } catch (err) {
    colorsError.value = err as Error;
  } finally {
    colorsLoading.value = false;
  }
}

const getLanguageColor = (language: string | null): string => {
  if (!language) return '#cccccc';
  return languageColors.value[language]?.color || '#cccccc';
};
</script>

<template>
  <UCard
      variant="soft"
      :ui="{
      root: 'max-w-md rounded-xl bg-transparent border border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300 dark:border-gray-700 p-1 h-full min-h-40'
    }"
      class="group relative overflow-visible flex flex-col h-full"
  >
  <div class="absolute inset-0 rounded-xl border-3 border-transparent group-hover:border-primary transition-all duration-300 pointer-events-none dark:group-hover:border-primary" />

  <div class="flex-1 flex flex-col justify-between">
    <div class="flex items-start gap-3">
      <h3 class="font-bold text-lg truncate flex items-center">
        <UIcon name="octicon:repo-16" class="flex-shrink-0 mr-2" />
        <span style="color: #0969DA" class="truncate">{{ name }}</span>
      </h3>
    </div>

    <p
        v-if="description"
        class="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-1"
    >
    {{ description }}
    </p>
    <p v-else class="text-gray-400 dark:text-gray-500 mt-2 text-sm italic">
      无项目描述
    </p>
  </div>

  <div class="flex flex-wrap gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
    <div v-if="language" class="flex items-center">
      <div
          class="w-3 h-3 rounded-full mr-1"
          :style="{ backgroundColor: getLanguageColor(language) }"
      />
      {{ language }}
    </div>

    <div class="flex items-center">
      <UIcon name="octicon:star-16" class="mr-1" />
      {{ stars }}
    </div>

    <div class="flex items-center">
      <UIcon name="octicon:repo-forked-16" class="mr-1 text-gray-500" />
      {{ forks }}
    </div>
  </div>

  <div class="mt-3 text-xs text-gray-500 dark:text-gray-400">
    <UIcon name="octicon:clock-16" class="mr-1 inline align-middle" />
    <span class="align-middle">更新于 {{ formatDate(updated) }}</span>
  </div>
  </UCard>
</template>