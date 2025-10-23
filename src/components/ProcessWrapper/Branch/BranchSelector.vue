<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import SectionTitle from "../Common/SectionTitle.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Label from "@/components/ui/label/Label.vue";
import Select from "@/components/ui/select/Select.vue";
import SelectTrigger from "@/components/ui/select/SelectTrigger.vue";
import SelectValue from "@/components/ui/select/SelectValue.vue";
import SelectContent from "@/components/ui/select/SelectContent.vue";
import SelectGroup from "@/components/ui/select/SelectGroup.vue";
import SelectItem from "@/components/ui/select/SelectItem.vue";
import { useProcess } from "@/stores/process.store";
import { storeToRefs } from "pinia";
import { onMounted, watch } from "vue";
import { gitlabService } from "@/service/gitlabApi";
import type { AcceptableValue } from "reka-ui";
import { useRepo } from "@/stores/repo.store";
import { toast } from "vue-sonner";
import { Loader2 } from "lucide-vue-next";
import Input from "@/components/ui/input/Input.vue";
import ButtonWithLoader from "@/components/ui/button/ButtonWithLoader.vue";
import type { ProjectType } from "@/types/repo";

const process = useProcess();
const repo = useRepo();

const { pat, project, projectUrl, originBranch, targetBranch } =
  storeToRefs(process);

const { isLoading, error, branches } = storeToRefs(repo);

const handleSearchProject = async () => {
  const url = projectUrl.value;
  if (!url) return toast.error("Project url cannot be empty");
  if (!url.includes("https://gitlab.com"))
    return toast.error("Repository URL must come from gitlab services.");

  originBranch.value = "";
  targetBranch.value = " ";

  let parsedUrl = encodeURIComponent(url.replace("https://gitlab.com/", ""));
  const getProject = await gitlabService.getProject<ProjectType>(parsedUrl);

  if (getProject.id) {
    project.value = getProject.id;
    repo.getProjectBranches(getProject.id);
  }
};

const handleSelectBranches = (
  type: "TARGET" | "ORIGIN",
  value: AcceptableValue
) => {
  if (typeof value != "string") return;

  switch (type) {
    case "ORIGIN":
      process.originBranch = value;
      break;
    case "TARGET":
      process.targetBranch = value;
      break;
    default:
      break;
  }
};

onMounted(() => {
  if (pat.value == "") return toast.error("Personal Access Token not found");

  //
  gitlabService.setPAT(pat.value);
});

watch(error, (err) => {
  if (err && err.message) toast.error(err.message);
});
</script>

<template>
  <SectionTitle
    title="Select Project & Branches"
    description="Choose the repository and branches for your merge request"
  />
  <section class="mt-10">
    <Card>
      <CardHeader>
        <CardTitle>Respository</CardTitle>
        <CardDescription>
          Select the GitLab project for this merge request
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid mt-5 w-full gap-2">
          <Label>Paste Your Project URL:</Label>
          <div class="flex items-center gap-2">
            <Input
              :modelValue="projectUrl"
              @update:modelValue="
                (value) =>
                  typeof value == 'string' ? (process.projectUrl = value) : ''
              "
              placeholder="https://gitlab.com/..."
            />
            <ButtonWithLoader
              :onClick="handleSearchProject"
              :buttonProperties="{}"
              class=""
              >Search</ButtonWithLoader
            >
          </div>
        </div>

        <div
          :hidden="project == 0"
          class="relative grid grid-cols-1 md:grid-cols-2 mt-10 w-full gap-5"
        >
          <div
            v-if="isLoading"
            class="absolute w-full h-full bg-white/80 left-0 top-0 grid place-items-center"
          >
            <Loader2 class="animate-spin" />
          </div>
          <div
            v-if="branches.length === 1"
            class="absolute bg-white/80 w-full h-full top-0 left-0"
          />
          <div class="grid gap-2">
            <Label> Origin </Label>
            <Select
              v-model="originBranch"
              @update:modelValue="
                (value) => handleSelectBranches('ORIGIN', value)
              "
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="branch in branches">
                  <SelectItem
                    :disabled="branch == targetBranch"
                    :value="branch"
                  >
                    {{ branch }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-2">
            <Label> Target </Label>
            <Select
              v-model="targetBranch"
              @update:modelValue="
                (value) => handleSelectBranches('TARGET', value)
              "
            >
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="branch in branches">
                  <SelectItem
                    :disabled="branch == originBranch"
                    :value="branch"
                  >
                    {{ branch }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <p
          v-if="project != 0 && !isLoading && branches.length === 1"
          class="text-gray-600 text-center mt-5"
        >
          This project only have <b> one </b>
          branch
        </p>
      </CardContent>
    </Card>
  </section>
</template>
