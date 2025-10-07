<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import Button from "./Button.vue";
import { ref, type ButtonHTMLAttributes } from "vue";

const { onClick } = defineProps<{
  buttonProperties: ButtonHTMLAttributes;
  onClick: () => Promise<void>;
}>();

const loading = ref(false);

const handleClick = async () => {
  loading.value = true;
  try {
    await onClick();
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Button
    v-bind="buttonProperties"
    @click="handleClick"
    :disabled="loading == true"
  >
    <LoaderCircle v-if="loading" class="animate-spin" />
    <slot />
  </Button>
</template>
