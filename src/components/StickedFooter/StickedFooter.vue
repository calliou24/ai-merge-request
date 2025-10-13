<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useProcess } from "@/stores/process.store";
import { ProcessStepEnum, type ProcessStepType } from "@/types/process";
import { storeToRefs } from "pinia";

const process = useProcess();

const { step, originBranch, targetBranch } = storeToRefs(process);

type StepActionsType = {
  preview: ProcessStepType;
  next: ProcessStepType;
  stepCount: number;
};

const StepsActions: Record<ProcessStepType, StepActionsType> = {
  [ProcessStepEnum.TOKEN]: {
    preview: ProcessStepEnum.TOKEN,
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
    stepCount: 2,
  },
  [ProcessStepEnum.CHAT]: {
    preview: ProcessStepEnum.TEMPLATE,
    next: ProcessStepEnum.REVIEW,
    stepCount: 3,
  },
  [ProcessStepEnum.REVIEW]: {
    preview: ProcessStepEnum.CHAT,
    next: ProcessStepEnum.REVIEW,
    stepCount: 4,
  },
};

const handleChangeStep = (action: "preview" | "next") => {
  const stepEntity = StepsActions[step.value];

  const actionView = stepEntity[action];

  // if (actionView == "") return;

  // if (action == "preview") return (process.step = actionView);

  // const stepValidations: Record<number, any[]> = {
  //   1: [pat.value],
  //   2: [pat.value, originBranch.value, targetBranch.value],
  //   3: [pat.value, originBranch.value, targetBranch.value, template.value.id],
  //   4: [],
  // };

  // for (const field of stepValidations[stepEntity.stepCount]) {
  //   if (!field || !field.length) return;
  // }

  return (process.step = actionView);
};
</script>

<template>
  <footer
    class="bg-white/30 backdrop-blur-md fixed bottom-0 w-screen h-20 flex justify-center items-center gap-10"
  >
    <Button
      @click="() => handleChangeStep('preview')"
      class="w-30"
      variant="outline"
    >
      Back
    </Button>
    <p class="text-gray-500">Step {{ StepsActions[step].stepCount }} of 5</p>
    <Button
      :disabled="
        originBranch == targetBranch &&
        originBranch.length &&
        targetBranch.length
      "
      class="w-30"
      @click="() => handleChangeStep('next')"
      >Next</Button
    >
  </footer>
</template>
