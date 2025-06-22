<template>
  <div class="flex flex-col max-w-4xl mx-auto container items-center">
    <div class="text-left w-full">
      <ContentRenderer v-if="orgReadme" :value="orgReadme"/>
      <div v-else>not found</div>
    </div>

    <div class="flex flex-wrap mt-8 -mx-2 w-full">
      <IndexCard
          class="w-full lg:w-[calc(50%-1rem)] mx-2 mb-4 hover-card"
          @click="navList"
      >
        <template #header>
          项目列表
        </template>
        查看 PCL-Community 组织的项目列表
      </IndexCard>
      <IndexCard
          class="w-full lg:w-[calc(50%-1rem)] mx-2 mb-4 hover-card"
          @click="navCe"
      >
        <template #header>
          PCL2-CE
        </template>
        了解 Plain Craft Launcher 2 Community Edition
      </IndexCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {nav} from "~/utils/Utils";

useHead({
  title: '主页'
})

const {data: orgReadme} = await useAsyncData(() => queryCollection('content').path('/org_readme').first())

const navList = () => {
  nav('/projects/list')
}

const navCe = () => {
  nav('/projects/ce')
}
</script>

<style scoped>
.hover-card {
  cursor: pointer;
}

.hover-card:active {
  transform: scale(0.98);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>