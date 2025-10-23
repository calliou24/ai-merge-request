import { defineStore } from "pinia";
import { ProcessStepEnum, type ProcessStepType } from "../types/process";

export type ProcessStateType = {
  step: ProcessStepType;
  pat: string;
  project: number;
  projectUrl: string
  originBranch: string;
  targetBranch: string;
  template: number;
  aiContext: string;

};

export const useProcess = defineStore("process", {
  state: (): ProcessStateType => ({
    step: ProcessStepEnum.TOKEN,
    pat: "",
    project: 0,
    projectUrl:'',
    originBranch: "",
    targetBranch: "",
    template: 9,
    aiContext: "",
  }),
  getters: {
    isTokenStep: (s) => s.step == ProcessStepEnum.TOKEN,
    isBranchStep: (s) => s.step == ProcessStepEnum.BRANCH,
    isTemplateStep: (s) => s.step == ProcessStepEnum.TEMPLATE,
    isChatStep: (s) => s.step == ProcessStepEnum.CHAT,
    isReviewStep: (s) => s.step == ProcessStepEnum.REVIEW,
    isCreationStep: (s) => s.step == ProcessStepEnum.CREATION,
  },
  actions: {},
});
