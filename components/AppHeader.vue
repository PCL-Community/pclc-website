<template>
  <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
        style="height: 70px; max-height: 70px;">
    <div class="font-bold text-lg">PCL Community</div>

    <div class="flex items-center space-x-2">
      <UButton class="text-2xl" icon="simple-icons:github" size="xl" color="neutral" variant="link" @click="openGithub"/>
      <UButton class="text-2xl" icon="simple-icons:bilibili" size="xl" color="neutral" variant="link" @click="openBilibili"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { open } from '@/utils/Utils';

const openGithub = () => {
  open('https://github.com/PCL-Community/');
};

const openBilibili = () => {
  open('https://space.bilibili.com/3546847192811755');
};
</script>