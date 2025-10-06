<script lang="ts" setup>
type SectionTitleProps = {
  title: string;
  description: string;
};
defineProps<SectionTitleProps>();
</script>
<template>
  <header>
    <h1 class="text-3xl font-bold">{{ title }}</h1>
    <p class="text-gray-500">
      {{ description }}
    </p>
  </header>
</template>
