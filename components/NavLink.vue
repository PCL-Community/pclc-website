<template>
  <ULink
      :href="href"
      target="_blank"
      class="relative hover:text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-200 hover:after:w-full after:rounded-full"
  >
    <slot />
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