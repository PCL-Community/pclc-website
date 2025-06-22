<script setup lang="ts">
import axios from 'axios'
import {format} from 'date-fns'
import {zhCN} from "date-fns/locale";

interface GithubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
  pushed_at: string
}

interface LanguageColor {
  color: string
  url: string
}

const props = defineProps({
  owner: {type: String, required: true},
  repo: {type: String, required: true}
})

const formatDate = (dateString: string) => {
  return format(new Date(dateString), 'yyyy年MM月dd日', {locale: zhCN})
}

const languageColors = useState<Record<string, LanguageColor>>('github-colors', () => ({}))
const colorsError = ref<Error | null>(null)
const colorsLoading = ref(false)

if (Object.keys(languageColors.value).length === 0 && !colorsError.value) {
  colorsLoading.value = true
  try {
    const response = await axios.get('/github-colors.json')
    languageColors.value = response.data
  } catch (err) {
    colorsError.value = err as Error
  } finally {
    colorsLoading.value = false
  }
}

const repoData = ref<GithubRepo | null>(null)
const repoLoading = ref(true)
const repoError = ref<Error | null>(null)

const fetchRepoData = async () => {
  repoLoading.value = true
  repoError.value = null

  try {
    const headers: Record<string, string> = {}

    const response = await axios.get(
        `https://cdn.akaere.online/api.github.com/repos/${props.owner}/${props.repo}`,
        {headers}
    )
    console.log(props)
    repoData.value = response.data
  } catch (err) {
    const error = err as Error
    if (axios.isAxiosError(error)) {
      repoError.value = new Error(
          error.response?.data?.message ||
          error.message ||
          '获取仓库数据失败'
      )
    } else {
      repoError.value = error
    }
  } finally {
    repoLoading.value = false
  }
}

onMounted(() => {
  fetchRepoData()
})

watch([() => props.owner, () => props.repo], () => {
  fetchRepoData()
})

const getLanguageColor = (language: string | null): string => {
  if (!language) return '#cccccc'
  return languageColors.value[language]?.color || '#cccccc'
}
</script>

<template>
  <div
      v-if="repoLoading"
      class="max-w-md border rounded-xl p-6 flex flex-col items-center justify-center bg-white dark:bg-gray-800"
  >
    <UIcon
        name="svg-spinners:ring-resize"
        class="text-primary text-4xl"
    />
    <span class="mt-4 font-medium text-gray-600 dark:text-gray-300">
      加载仓库信息中...
    </span>
  </div>

  <div
      v-else-if="repoError"
      class="max-w-md border rounded-xl p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
  >
    <div class="flex items-start gap-3">
      <UIcon name="i-heroicons-exclamation-circle" class="text-red-500 text-xl flex-shrink-0 mt-0.5"/>
      <div>
        <h3 class="font-medium text-red-800 dark:text-red-200">加载失败</h3>
        <p class="text-sm text-red-700 dark:text-red-300 mt-1">
          {{ repoError.message }}
        </p>
        <UButton
            variant="soft"
            class="mt-3"
            @click="fetchRepoData"
        >
          重试
        </UButton>
      </div>
    </div>
  </div>

  <UCard
      v-else-if="repoData"
      :ui="{
        base: 'max-w-md rounded-xl bg-transparent border border-gray-400 shadow-lg hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 p-1',
        ring: 'focus:outline-none focus:ring-0',
      }"
      class="group relative overflow-visible"
  >
    <div class="absolute inset-0 rounded-xl border-3 border-transparent group-hover:border-primary transition-all duration-300 pointer-events-none dark:group-hover:border-primary" />

    <a :href="repoData.html_url" target="_blank" class="block">
      <div class="flex items-start gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-bold text-lg truncate flex items-center">
              <UIcon name="octicon:repo-16" class="flex-shrink-0 mr-2"/>
              <span style="color: #0969DA" class="truncate">{{ repoData.name }}</span>
            </h3>
            <UIcon
                name="i-heroicons-arrow-top-right-on-square"
                class="text-gray-400 group-hover:text-primary flex-shrink-0 text-sm"
            />
          </div>

          <p
              v-if="repoData.description"
              class="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-2"
          >
            {{ repoData.description }}
          </p>
          <p v-else class="text-gray-400 dark:text-gray-500 mt-2 text-sm italic">
            无项目描述
          </p>

          <div class="flex flex-wrap gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
            <div v-if="repoData.language" class="flex items-center">
              <div
                  class="w-3 h-3 rounded-full mr-1"
                  :style="{ backgroundColor: getLanguageColor(repoData.language) }"
              />
              {{ repoData.language }}
            </div>

            <div class="flex items-center">
              <UIcon name="octicon:star-16" class="mr-1"/>
              {{ repoData.stargazers_count.toLocaleString() }}
            </div>

            <div class="flex items-center">
              <UIcon name="octicon:repo-forked-16" class="mr-1 text-gray-500"/>
              {{ repoData.forks_count.toLocaleString() }}
            </div>

            <div class="flex items-center">
              <UIcon name="octicon:clock-16" class="mr-1"/>
              更新于 {{ formatDate(repoData.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </a>
  </UCard>
</template>