<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProcess } from "../../stores/process.store";
import Token from "./Token/TokenSetup.vue";
import BranchSelector from "./Branch/BranchSelector.vue";
import TemplateSelector from "./Template/TemplateSelector.vue";
import ChatAi from "./Chat/ChatAi.vue";
import Preview from "./Preview/Preview.vue";
import StickedFooter from "../StickedFooter/StickedFooter.vue";
import "vue-sonner/style.css";

const process = useProcess();
const { isTokenStep, isBranchStep, isTemplateStep, isChatStep, isReviewStep } =
  storeToRefs(process);
</script>

<template>
  <main class="flex flex-col items-center w-screen h-screen">
    <Toaster
      :toastOptions="{
        style: { background: '#fda4af' },
        class: 'my-toast',
        descriptionClass: 'my-toast-description',
      }"
    />
    <div class="w-10/12 max-w-[800px] mt-10 pb-25">
      <Token v-if="isTokenStep" />
      <BranchSelector v-if="isBranchStep" />
      <TemplateSelector v-if="isTemplateStep" />
      <ChatAi v-if="isChatStep" />
      <Preview v-if="isReviewStep" />
    </div>

    <StickedFooter />
  </main>
</template>
