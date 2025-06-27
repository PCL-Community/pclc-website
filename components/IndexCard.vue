<template>
  <UCard
      variant="soft"
      :ui="{
      root: 'bg-transparent border-0 shadow hover:shadow-lg transition-all duration-300',
      body: 'p-0',
      header: ''
    }"
      class="group relative overflow-visible"
  >
    <div
        class="
        absolute inset-0 rounded-xl
        border-2 border-gray-300
        group-hover:border-3 group-hover:border-primary
        transition-all duration-300 pointer-events-none
        dark:border-gray-600 dark:group-hover:border-primary
      "
    />

    <template #header>
      <div class="text-lg font-bold py-0.5">
        <slot name="header" />
      </div>
    </template>

    <div class="text-gray-500 text-sm py-1">
      <slot />
    </div>
  </UCard>
</template>

<script setup lang="ts">
</script>