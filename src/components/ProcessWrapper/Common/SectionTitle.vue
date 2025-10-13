<script lang="ts" setup>
type SectionTitleProps = {
  title: string;
  description: string;
};
defineProps<SectionTitleProps>();
</script>
<template>
  <header class="grid gap-2">
    <h1 class="text-3xl font-bold">{{ title }}</h1>
    <p class="text-black/60">
      {{ description }}
    </p>
  </header>
</template>
