import { ClientApi } from "./clientApi";

export default class GitLabService extends ClientApi {
  private pat: string = "";

  setPAT(PAT: string) {
    this.pat = PAT;
  }

  async validateToken<T>(pat: string) {
    return this.request<T>("/personal_access_tokens/self", {
      method: "GET",
      headers: {
        "PRIVATE-TOKEN": pat,
      },
    });
  }

  async getProject<T>(project_path: string) {
    return this.request<T>(`/projects/${project_path}`, {
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

export const gitlabService = new GitLabService();
