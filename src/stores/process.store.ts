import { defineStore } from "pinia";
import { ProcessStepEnum, type ProcessStepType } from "../types/process";

type ProjectType = { 
  id: number, 
  label: string
}

type TemplateType = { 
  id: number, label: string
}

type ProcessStateType = {
  step: ProcessStepType;
  pat: string,
  project: ProjectType;
  originBranch: string;
  targetBranch: string;
  template: TemplateType;
};

export const useProcess = defineStore("process", {
  state: (): ProcessStateType => ({
    step: ProcessStepEnum.TOKEN,
    pat: '',
    project: {} as ProjectType,
    originBranch: "",
    targetBranch: "",
    template: {} as TemplateType,
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
