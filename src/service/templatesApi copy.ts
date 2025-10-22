import { ClientApi } from "./clientApi";
import { ApiConfig } from "./config";

export default class MergeRequestApi extends ClientApi {
  createMergeRequestData<T>({
    project_id,
    contextAI,
    template_id,
    origin_branch,
    target_branch,
    pat
  }: {
    project_id: number;
    contextAI: string
    template_id: number,
    origin_branch: string;
    target_branch: string;
    pat: string
  }) {
    const body = JSON.stringify({
      project_id,
      origin_branch,
      target_branch,
      context_ai: contextAI,
      pat,
      template_id,
      provider_id: 2,
      model: "qwen-3-coder-480b",
    })
    return this.request<T>("/merge-request", { method: "POST" }, body);
  }

  createMergeRequest<T>({
    project_id,
    title,
    description,
    origin_branch,
    target_branch,
    pat
  }: {
    project_id: number;
    title: string;
    description: string;
    origin_branch: string;
    target_branch: string;
    pat: string
  }) {
    const body = JSON.stringify({
      project_id,
      origin_branch,
      target_branch,
      title,
      description,
      pat,
    })
    return this.request<T>("/merge-request/create", { method: "POST" }, body);
  }
}

export const mergeRequestApi = new MergeRequestApi(ApiConfig.BACKEND_API_V1);
