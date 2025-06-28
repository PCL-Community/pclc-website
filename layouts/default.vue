<template>
  <UApp class="min-h-screen flex flex-col prose">
    <header class="sticky top-0 z-50 backdrop-blur-md shadow-sm w-full">
      <AppHeader />
    </header>

    <main class="flex-grow">
      <div class="leading-relaxed px-4 sm:px-8 py-6">
        <slot />
      </div>
    </main>

    <footer class="mt-auto">
      <AppFooter />
    </footer>
  </UApp>
</template>