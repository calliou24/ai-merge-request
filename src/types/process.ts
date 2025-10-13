export const ProcessStepEnum = {
  TOKEN: "TOKEN",
  BRANCH: "BRANCH",
  TEMPLATE: "TEMPLATE",
  CHAT: "CHAT",
  REVIEW: "REVIEW",
};

export type ProcessStepType =
  (typeof ProcessStepEnum)[keyof typeof ProcessStepEnum];

export type GroupType = {
  id: number;
  label: string;
};

export type ProjectType = {
  id: number;
  label: string;
};

export type TemplateType = {
  id: number;
  title: string;
  description: string;
};
