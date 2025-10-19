import { defineStore } from "pinia";
import type { BranchesType, GroupsType, ProjectType } from "@/types/repo";

import { gitlabService } from "@/service/gitlabApi";
import { ApiError } from "@/service/clientApi";

export type ProcessStateType = {
  isLoading: boolean;
  groups: GroupsType[];
  projects: ProjectType[];
  branches: BranchesType;
  error: ApiError | null;
};

export const useRepo = defineStore("repo", {
  state: (): ProcessStateType => ({
    isLoading: false,
    groups: [],
    projects: [],
    branches: [],
    error: null,
  }),
  getters: {},
  actions: {
    async getGroups() {
      this.error = null;
      try {
        this.isLoading = true;
        const getGroups: { id: number; name: string }[] =
          await gitlabService.getGroups();

        if (Array.isArray(getGroups) && getGroups.length) {
          this.groups = getGroups.map((group) => ({
            id: group.id,
            label: group?.name,
          }));
        }
        this.isLoading = false;
      } catch (error) {
        if (error instanceof ApiError) this.error = error;
      }
    },

    async getProjects(groupId: number) {
      this.error = null;
      try {
        this.isLoading = true;
        const getProjects: { id: number; name: string }[] =
          await gitlabService.getProjectsFromGroup(groupId);

        if (Array.isArray(getProjects) && getProjects.length) {
          this.projects = getProjects.map((project) => ({
            id: project.id,
            label: project.name,
          }));
        }
        this.isLoading = false;
      } catch (error) {
        if (error instanceof ApiError) this.error = error;
      }
    },

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
