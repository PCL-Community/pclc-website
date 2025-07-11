<script setup lang="ts">
import axios from 'axios'

interface LanguageColor {
  color: string
  url: string
}

const props = defineProps({
  repo: {
    type: Object as () => GithubRepo,
    required: true
  }
})

const languageColors = useState<Record<string, LanguageColor>>('github-colors', () => ({}))
const colorsError = ref<Error | null>(null)
const colorsLoading = ref(false)

if (Object.keys(languageColors.value).length === 0 && !colorsError.value) {
  try {
    const response = await axios.get('/github-colors.json')
    languageColors.value = response.data
  } catch (err) {
    colorsError.value = err as Error
  } finally {
    colorsLoading.value = false
  }
}

const getLanguageColor = (language: string | null): string => {
  if (!language) return '#cccccc'
  return languageColors.value[language]?.color || '#cccccc'
}

const readmeHtml = ref('')
const readmeLoading = ref(false)
const readmeError = ref<Error | null>(null)

const loadReadme = async () => {
  if (readmeHtml.value || readmeLoading.value) return

  readmeLoading.value = true
  try {
    const response = await axios.get(
        `https://api.github.com/repos/${props.repo.owner.login}/${props.repo.name}/contents/README.md`,
        {
          headers: {
            Accept: 'application/vnd.github.html+json'
          }
        }
    )
    readmeHtml.value = response.data

    const p = `https://cdn.akaere.online/https://raw.githubusercontent.com/${props.repo.owner.login}/${props.repo.name}/refs/heads/${props.repo.default_branch}/`;

    readmeHtml.value = readmeHtml.value.replace(/src="([^"]*)"/g, (match: string, p1: string) => {
      if (p1.startsWith('http')) {
        return match;
      }

      if (p1.startsWith('/')) {
        return `src="${p}${p1.substring(1)}"`;
      }

      return `src="${p}${p1}"`;
    });

    const f = `https://github.com/${props.repo.owner.login}/${props.repo.name}/blob/${props.repo.default_branch}/`;

    readmeHtml.value = readmeHtml.value.replace(/href="([^"]*)"/g, (match: string, p1: string) => {
      if (p1.startsWith('http')) {
        return match;
      }

      if (p1.startsWith('/')) {
        return `href="${f}${p1.substring(1)}"`;
      }

      return `href="${f}${p1}"`;
    });

    readmeHtml.value = readmeHtml.value.replace(`<ul`, `<ul class="list-inside list-disc"`);
    readmeHtml.value = readmeHtml.value.replace(`<ol`, `<ol class="list-inside list-decimal"`);
    console.log(props.repo)
    console.log(readmeHtml.value)
  } catch (error) {
    console.error(error)
    readmeHtml.value = '获取 README 失败。'
    readmeError.value = error as Error
  } finally {
    readmeLoading.value = false
  }
}
</script>

<template>
  <UModal class="cursor-pointer" title="项目详情" :description="repo.owner.login + '/' + repo.name" :ui="{ footer: 'justify-end' }">
    <UCard
        variant="soft"
        class="group relative overflow-visible flex flex-col h-full"
        :ui="{
      root: 'max-w-md rounded-lg bg-transparent border border-gray-400 transition-all duration-300 dark:border-gray-700 h-full min-h-20'
    }"
        @click="loadReadme"
    >
      <div
          class="absolute inset-0 rounded-lg border-3 border-transparent group-hover:border-primary transition-all duration-300 pointer-events-none dark:group-hover:border-primary"/>

      <div class="flex-1 flex flex-col justify-between">
        <div class="flex items-start gap-2">
          <h3 class="font-bold text-lg truncate flex items-center">
            <UIcon v-if="!repo.fork" name="octicon:repo-16" class="flex-shrink-0 mr-2"/>
            <UIcon v-else name="octicon:repo-forked-16" class="flex-shrink-0 mr-2"/>
            <span style="color: #0969DA" class="truncate">{{ repo.name }}</span>
            <UBadge v-if="repo.archived" color="warning" variant="outline" class="ml-2 font-bold rounded-full">Public Archive</UBadge>
          </h3>
        </div>

        <p
            v-if="repo.description"
            class="text-gray-600 dark:text-gray-400 text-sm line-clamp-1"
        >
          {{ repo.description }}
        </p>
        <p v-else class="text-gray-400 dark:text-gray-500 text-sm italic">
          无项目描述
        </p>
      </div>

      <div class="flex flex-wrap gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
        <div v-if="repo.language" class="flex items-center">
          <div
              class="w-3 h-3 rounded-full mr-1"
              :style="{ backgroundColor: getLanguageColor(repo.language) }"
          />
          {{ repo.language }}
        </div>

        <div class="flex items-center">
          <UIcon name="octicon:star-16" class="mr-1"/>
          {{ repo.stargazers_count }}
        </div>

        <div class="flex items-center">
          <UIcon name="octicon:repo-forked-16" class="mr-1 text-gray-500"/>
          {{ repo.forks_count }}
        </div>
      </div>
    </UCard>

    <template #body>
      <div v-if="readmeLoading" class="flex flex-col items-center justify-center h-64">
        <UIcon name="svg-spinners:ring-resize" class="text-primary" size="100" />
        <span class="mt-4 font-bold text-xl text-primary">正在加载</span>
      </div>

      <div v-else class="max-h-96 list-inside list-disc overflow-auto prose dark:prose-invert max-w-none" v-html="readmeHtml"></div>
    </template>

    <template #footer>
      <UButton target="_blank" :to="`https://github.com/${repo.owner.login}/${repo.name}`" label="在 Github 查看" color="primary" icon="simple-icons:github"/>
    </template>
  </UModal>

</template>

<style scoped>

</style>