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
          owner="PCL-Community"
          :repo="repo.name"
          :stars="repo.stargazers_count"
          :name="repo.name"
          :language="repo.language"
          :updated="repo.updated_at"
          :description="repo.description"
          :forks="repo.forks_count"
      />
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { useHead } from '#imports';

interface GithubRepo {
  id: number;
  name: string;
  stargazers_count: string;
  language: string;
  description: string;
  forks_count: string;
  updated_at: string;
}

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
        `https://cdn.akaere.online/api.github.com/orgs/${name}/repos`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
</script>