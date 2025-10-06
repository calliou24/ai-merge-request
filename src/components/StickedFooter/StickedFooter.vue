<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useProcess } from "@/stores/process.store";
import { ProcessStepEnum } from "@/types/process";
import { storeToRefs } from "pinia";

const process = useProcess();

const { step } = storeToRefs(process);

const StepsActions = {
  [ProcessStepEnum.TOKEN]: {
    preview: "",
    next: ProcessStepEnum.BRANCH,
    stepCount: 1,
  },
  [ProcessStepEnum.BRANCH]: {
    preview: ProcessStepEnum.TOKEN,
    next: ProcessStepEnum.TEMPLATE,
    stepCount: 2,
  },
  [ProcessStepEnum.TEMPLATE]: {
    preview: ProcessStepEnum.BRANCH,
    next: ProcessStepEnum.CHAT,
    stepCount: 3,
  },
  [ProcessStepEnum.CHAT]: {
    preview: ProcessStepEnum.TEMPLATE,
    next: ProcessStepEnum.REVIEW,
    stepCount: 4,
  },
  [ProcessStepEnum.REVIEW]: {
    preview: ProcessStepEnum.CHAT,
    next: "",
    stepCount: 5,
  },
};

const handleChangeStep = (action: "preview" | "next") => {
  const actionView = StepsActions[step.value][action];

  if (actionView == "") return;

  return (process.step = actionView);
};
</script>

<template>
  <footer
    class="fixed bottom-0 w-screen h-20 flex justify-center items-center gap-10"
  >
    <Button
      @click="() => handleChangeStep('preview')"
      class="w-30"
      variant="outline"
    >
      Back
    </Button>
    <p class="text-gray-500">Step {{ StepsActions[step].stepCount }} of 5</p>
    <Button class="w-30" @click="() => handleChangeStep('next')">Next</Button>
  </footer>
</template>
