<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useProcess } from "@/stores/process.store";
import { ProcessStepEnum, type ProcessStepType } from "@/types/process";
import { storeToRefs } from "pinia";

const process = useProcess();

const { pat, step, template, originBranch, targetBranch, aiContext } =
  storeToRefs(process);

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
    next: ProcessStepEnum.CREATION,
    stepCount: 4,
  },
  [ProcessStepEnum.CREATION]: { 
    preview: ProcessStepEnum.REVIEW,
    next: "",
    stepCount: 5
  }
};

const handleChangeStep = (action: "preview" | "next") => {
  const stepEntity = StepsActions[step.value];

  const actionView = stepEntity[action];

  if (actionView == "") return;

  if (action == "preview") return (process.step = actionView);

  const stepValidations: Record<number, any[]> = {
    1: [pat.value],
  };

  stepValidations[2] = [
    ...stepValidations[1],
    originBranch.value,
    targetBranch.value,
  ];
  stepValidations[3] = [...stepValidations[2], template.value];
  stepValidations[4] = [...stepValidations[3], aiContext.value];
  stepValidations[5] = [];

  for (const field of stepValidations[stepEntity.stepCount]) {
    if ((!field || !field.length) && typeof field != "number") return;
    if (typeof field == "number" && isNaN(field)) return;
  }

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
      :v-if="step != ProcessStepEnum.REVIEW"
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
