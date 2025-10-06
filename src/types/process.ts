export const ProcessStepEnum = {
  TOKEN: "TOKEN",
  BRANCH: "BRANCH",
  TEMPLATE: "TEMPLATE",
  CHAT: "CHAT",
  REVIEW: "REVIEW",
};

export type ProcessStep =
  (typeof ProcessStepEnum)[keyof typeof ProcessStepEnum];
