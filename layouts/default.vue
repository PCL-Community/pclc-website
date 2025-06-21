<template>
  <UApp>
    <header class="sticky top-0 z-50 backdrop-blur-md shadow-sm w-full">
      <AppHeader />
    </header>

    <main style="margin: 0 10%;">
      <slot />
    </main>

    <footer>
      <AppFooter />
    </footer>
  </UApp>
</template>