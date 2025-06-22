<template>
  <div class="flex h-screen items-center justify-between px-8">
    <div class="text-left w-1/2">
      <h1 class="text-6xl font-bold text-blue-600 mb-4">Plain Craft Launcher</h1>
      <h2 class="text-5xl text-gray-800 mb-4">Community</h2>
      <p class="text-xl text-gray-600">PCL 非官方社区</p>
    </div>

    <div class="text-left w-1/2">
      <ContentRenderer v-if="orgReadme" :value="orgReadme" />
      <div v-else>not found</div>
    </div>
  </div>
</template>
<script setup lang="ts">
useHead({
  title: '主页'
})

const { data: orgReadme } = await useAsyncData(() => queryCollection('content').path('/org_readme').first())
</script>