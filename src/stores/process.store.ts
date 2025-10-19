import { defineStore } from "pinia";
import {
  ProcessStepEnum,
  type ProcessStepType,
  type TemplateType,
} from "../types/process";

export type ProcessStateType = {
  step: ProcessStepType;
  pat: string;
  project: number;
  group: number;
  originBranch: string;
  targetBranch: string;
  template: TemplateType;
  aiContext: string;
};

export const useProcess = defineStore("process", {
  state: (): ProcessStateType => ({
    step: ProcessStepEnum.TOKEN,
    pat: "",
    project: 0,
    group: 0,
    originBranch: "",
    targetBranch: "",
    template: {} as TemplateType,
    aiContext: "",
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
