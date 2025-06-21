<script setup lang="ts">
const { data: hello } = await useAsyncData(() => queryCollection('content').path('/hello').first())
</script>

<template>
  <ContentRenderer v-if="hello" :value="hello" />
  <div v-else>not found</div>
</template>
