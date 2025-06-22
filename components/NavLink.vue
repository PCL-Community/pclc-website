<template>
  <ULink
      :href="href"
      target="_blank"
      class="group relative text-primary transition-colors duration-200 hover:text-primary"
  >
    <span class="relative z-10">
      <slot/>
    </span>

    <span
        class="absolute bottom-0 left-0 h-0.5 w-0 bg-primary dark:bg-primary-dark
             group-hover:w-full transition-all duration-300 rounded-full
             dark:group-hover:bg-primary-light"
    />
  </ULink>
</template>

<script>
export default {
  name: 'NavLink',
  props: {
    href: {
      type: String,
      required: true
    }
  }
}
</script>