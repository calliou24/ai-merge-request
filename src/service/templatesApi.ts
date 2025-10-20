import { ClientApi } from "./clientApi";
import { ApiConfig } from "./config";

export default class TemplatesApi extends ClientApi {
  getTemplates<T>() {
    return this.request<T>("/templates", { method: "GET" });
  }
}

export const templatesApi = new TemplatesApi(ApiConfig.BACKEND_API_V1);
