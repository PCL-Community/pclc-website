<template>
  <UCard
      class="bg-transparent border border-gray-400 shadow-lg hover:shadow-xl hover:border-4 hover:border-primary
           transition-all duration-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-primary
           p-1"
  >
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