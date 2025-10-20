import { templatesApi } from "@/service/templatesApi";
import type { TemplateType } from "@/types/template";
import { defineStore } from "pinia";

type TemplatesStoreType = {
  templates: TemplateType[];
  isLoading: boolean;
};

export const useTemplates = defineStore("templates", {
  state: (): TemplatesStoreType => ({
    templates: [],
    isLoading: false,
  }),
  getters: {},
  actions: {
    async getTemplates() {
      this.isLoading = true;
      try {
        const templates = await templatesApi.getTemplates<TemplateType>();

        if (Array.isArray(templates) && templates.length) {
          this.templates = templates;
        }

        this.isLoading = false;
      } catch (error) {
        return error;
      }
    },
  },
});
