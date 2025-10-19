<script setup lang="ts">
import Textarea from "@/components/ui/textarea/Textarea.vue";
import SectionTitle from "../Common/SectionTitle.vue";
import { useProcess } from "@/stores/process.store";
import { storeToRefs } from "pinia";
import type { AcceptableValue } from "reka-ui";

const process = useProcess();
const { aiContext } = storeToRefs(process);
</script>
<template>
  <SectionTitle
    title="AI Context Enhancement"
    description="Optional: Provide additional context to improve your MR description"
  />
  <section>
    <Textarea
      :model-value="aiContext"
      @update:model-value="(value: AcceptableValue) => {typeof value == 'string' ? (process.aiContext = value): ''}"
      class="min-h-50 mt-10 p-5 rounded-2xl resize-none bg-gray-50 border-transparent"
      placeholder="Write a brief description of the content in your Merge Request "
    />
    <p class="text-black/60 mt-5">
      <b> Please don’t include personal or confidential business data </b>
      just include details about what changed and why — this helps the AI write
      a more relevant and accurate merge request summary.
    </p>
  </section>
</template>
