import { defineStore } from "pinia";
import { ProcessStepEnum, type ProcessStep } from "../types/process";

type ProcessStateType = {
  step: ProcessStep;
  projectId: number;
  originBranch: string;
  targetBranch: string;
  templateId: number;
};

export const useProcess = defineStore("process", {
  state: (): ProcessStateType => ({
    step: ProcessStepEnum.TOKEN,
    projectId: 0,
    originBranch: "",
    targetBranch: "",
    templateId: 0,
  }),
  getters: {
    isTokenStep: (s) => s.step == ProcessStepEnum.TOKEN,
    isBranchStep: (s) => s.step == ProcessStepEnum.BRANCH,
    isTemplateStep: (s) => s.step == ProcessStepEnum.TEMPLATE,
    isChatStep: (s) => s.step == ProcessStepEnum.CHAT,
    isReviewStep: (s) => s.step == ProcessStepEnum.REVIEW,
  },
  actions: {},
});
