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
import { onMounted, ref } from "vue";
import GitLabService from "@/service/gitlabApi";
import { ApiError } from "@/service/clientApi";
import { toast } from "vue-sonner";
import type { GroupType, ProjectType } from "@/types/process";

const process = useProcess();

const { pat, project, group, originBranch, targetBranch } =
  storeToRefs(process);
const gitlabService = new GitLabService();

const projects = ref([
  {
    label: "Archetype-1",
    id: 1,
  },
]);

const groups = ref([
  {
    label: "",
    id: 1,
  },
]);

const branches = ref(["test"]);

const handleGetProjectBranches = async (projectId: number) => {
  try {
    debugger;
    const getBranches = await gitlabService.getProjectBranches(projectId);

    if (Array.isArray(getBranches) && getBranches.length) {
      branches.value = getBranches.map((branch) => branch.name);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
    }
  }
};

const handleGetProjects = async (groupId: number) => {
  try {
    const getProjects = await gitlabService.getProjectsFromGroup(groupId);

    if (Array.isArray(getProjects) && getProjects.length) {
      projects.value = getProjects.map((project) => ({
        id: project.id,
        label: project.name,
      }));
    }
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
    }
  }
};

const handleGetGroups = async () => {
  try {
    const getGroups: any[] = await gitlabService.getGroups();

    if (Array.isArray(getGroups) && getGroups.length > 0) {
      groups.value = getGroups.map((group) => ({
        id: group.id,
        label: group?.name,
      }));
    }
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
    }
  }
};

const handleSelectGroup = (group: GroupType) => {
  process.group = group;

  handleGetProjects(group.id);
};

const handleSelectProject = (project: ProjectType) => {
  process.project = project;
  handleGetProjectBranches(project.id);
};

onMounted(() => {
  gitlabService.setPAT(pat.value);
  handleGetGroups();
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
        <div class="grid grid-cols-1 md:grid-cols-2 mt-10 w-full gap-5">
          <div class="grid gap-2">
            <Label>Group</Label>
            <Select :model-value="group.id">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="groupMapped in groups">
                  <SelectItem
                    @click="handleSelectGroup(groupMapped)"
                    :value="groupMapped.id"
                  >
                    {{ groupMapped.label }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div class="grid gap-2">
            <Label>Project</Label>
            <Select :model-value="project.id">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="projectMapped in projects">
                  <SelectItem
                    @click="handleSelectProject(projectMapped)"
                    :value="projectMapped.id"
                  >
                    {{ projectMapped.label }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 mt-10 w-full gap-5">
          <div class="grid gap-2">
            <Label> Origin </Label>
            <Select :model-value="originBranch">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="branch in branches">
                  <SelectItem
                    @click="() => (process.originBranch = branch)"
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
            <Select :model-value="targetBranch">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="branch in branches">
                  <SelectItem
                    @click="() => (process.targetBranch = branch)"
                    :value="branch"
                  >
                    {{ branch }}</SelectItem
                  >
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
