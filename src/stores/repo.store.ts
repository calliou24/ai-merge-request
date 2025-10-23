import { defineStore } from "pinia";
import type { BranchesType } from "@/types/repo";

import { gitlabService } from "@/service/gitlabApi";
import { ApiError } from "@/service/clientApi";

export type ProcessStateType = {
  isLoading: boolean;
  branches: BranchesType;
  error: ApiError | null;
};

export const useRepo = defineStore("repo", {
  state: (): ProcessStateType => ({
    isLoading: false,
    branches: [],
    error: null,
  }),
  getters: {},
  actions: {

   
    async getProjectBranches(projectId: number) {
      this.error = null;
      try {
        this.isLoading = true;
        const getBranches: { name: string }[] =
          await gitlabService.getProjectBranches(projectId);

        if (Array.isArray(getBranches) && getBranches.length) {
          this.branches = getBranches.map((branch) => branch.name);
        }
        this.isLoading = false;
      } catch (error) {
        if (error instanceof ApiError) this.error = error;
      }
    },
  },
});
