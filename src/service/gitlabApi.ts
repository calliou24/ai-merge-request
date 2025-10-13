import { ClientApi } from "./clientApi";

export default class GitLabService extends ClientApi {
  private pat: string = "";

  setPAT(PAT: string) {
    this.pat = PAT;
  }

  async getGroups<T>() {
    return this.request<T>("/groups", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.pat,
      },
    });
  }

  async getProjectsFromGroup<T>(groupId: number = 70646888) {
    return this.request<T>(`/groups/${groupId}/projects`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.pat,
      },
    });
  }
  async getProjectBranches<T>(projectId: number = 74637053) {
    return this.request<T>(`/projects/${projectId}/repository/branches`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.pat,
      },
    });
  }
}
