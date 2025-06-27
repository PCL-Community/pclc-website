<script setup lang="ts">
import type {NavigationMenuItem} from '@nuxt/ui'
import {open} from '@/utils/Utils'

const openGithub = () => {
  open('https://github.com/PCL-Community/')
}

const openBilibili = () => {
  open('https://space.bilibili.com/3546847192811755')
}

const items = ref<NavigationMenuItem[]>([
  {
    label: '主页',
    icon: 'lucide:home',
    to: '/',
  }, {
    label: '项目列表',
    icon: 'lucide:list',
    to: '/projects/list'
  }
])
</script>

<template>
  <div
      class="container mx-auto px-4 py-4 flex justify-between items-center"
      style="height: 70px; max-height: 70px; border-bottom: 1px solid #e4e4e4"
  >
    <img class="mr-4" src="/images/fish.png" alt="logo" width="30">
    <div class="font-bold text-lg">PCL Community</div>
    <div class="mx-auto px-4 py-8">
      <UNavigationMenu :items="items" content-orientation="vertical" class="w-full max-w-4xl mx-auto"/>
    </div>
    <div class="flex items-center space-x-4">
      <UButton
          class="text-2xl"
          icon="simple-icons:github"
          size="xl"
          color="neutral"
          variant="link"
          @click="openGithub"
      />
      <UButton
          class="text-2xl"
          icon="simple-icons:bilibili"
          size="xl"
          color="neutral"
          variant="link"
          @click="openBilibili"
      />
    </div>
  </div>
</template>