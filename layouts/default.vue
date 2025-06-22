<template>
  <UApp class="min-h-screen flex flex-col">
    <header class="sticky top-0 z-50 backdrop-blur-md shadow-sm w-full">
      <AppHeader />
    </header>

    <main class="flex-grow">
      <div class="container mx-auto max-w-4xl px-4 sm:px-8 py-6">
        <slot />
      </div>
    </main>

    <footer class="mt-auto">
      <AppFooter />
    </footer>
  </UApp>
</template>