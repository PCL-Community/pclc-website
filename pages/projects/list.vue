<template>
  <div class="flex flex-col max-w-6xl mx-auto container items-center py-8">
    <div v-if="isLoading" class="flex flex-col items-center justify-center h-64">
      <UIcon name="svg-spinners:ring-resize" class="text-primary" size="100" />
      <span class="mt-4 font-bold text-xl text-primary">正在获取项目列表</span>
    </div>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="repo in repos"
          :key="repo.id"
          class="h-full"
      >
      <GithubRepoCard
          :repo="repo"
      />
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import {ref} from 'vue';
import {useHead} from '#imports';


const repos = ref<GithubRepo[]>([]);
const isLoading = ref(true);

getOrgRepoList("PCL-Community")
    .then((res) => {
      if (res) {
        repos.value = res;
      }
      isLoading.value = false;
    });

useHead({ title: '项目列表' });

async function getOrgRepoList(name: string): Promise<GithubRepo[] | null> {
  try {
    const response = await axios.get<GithubRepo[]>(
        `https://cdn.akaere.online/https://api.github.com/orgs/${name}/repos?per_page=100`
    );

    return response.data.sort(
        (a, b) => b.stargazers_count - a.stargazers_count
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
</script>
