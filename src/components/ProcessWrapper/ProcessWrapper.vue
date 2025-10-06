<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProcess } from "../../stores/process.store";
import Token from "./Token/TokenSetup.vue";
import BranchSelector from "./Branch/BranchSelector.vue";
import TemplateSelector from "./Template/TemplateSelector.vue";
import ChatAi from "./Chat/ChatAi.vue";
import Preview from "./Preview/Preview.vue";
import StickedFooter from "../StickedFooter/StickedFooter.vue";

const process = useProcess();
const { isTokenStep, isBranchStep, isTemplateStep, isChatStep, isReviewStep } =
  storeToRefs(process);
</script>

<template>
  <main class="grid place-items-center w-screen h-screen">
    <Token v-if="isTokenStep" />
    <BranchSelector v-if="isBranchStep" />
    <TemplateSelector v-if="isTemplateStep" />
    <ChatAi v-if="isChatStep" />
    <Preview v-if="isReviewStep" />

    <StickedFooter />
  </main>
</template>
