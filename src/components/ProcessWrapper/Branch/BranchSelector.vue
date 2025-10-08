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

const process = useProcess();

const { project, originBranch, targetBranch } = storeToRefs(process);

const projects = [
  {
    label: "Archetype-1",
    id: 1,
  },
  {
    label: "bbva-1",
    id: 2,
  },
  {
    label: "nestle-1",
    id: 3,
  },
  {
    label: "chingones-1",
    id: 4,
  },
];

const branches = ["main", "dev", "qa"];

const templates = [
  {
    label: "DEV",
    value: 1,
  },
  {
    label: "QA",
    value: 2,
  },
  {
    label: "MAIN",
    value: 3,
  },
];
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
        <div class="grid gap-2">
          <Label>Project</Label>
          <Select :model-value="project.id">
            <SelectTrigger class="w-5/10">
              <SelectValue placeholder="Select a branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup v-for="projectMapped in projects">
                <SelectItem
                  @click="() => (project.id = projectMapped.id)"
                  :value="projectMapped.id"
                >
                  {{ projectMapped.label }}</SelectItem
                >
              </SelectGroup>
            </SelectContent>
          </Select>
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
          <div class="grid gap-2">
            <Label> Default Template </Label>
            <Select>
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup v-for="template in templates">
                  <SelectItem :value="template.value">
                    {{ template.label }}</SelectItem
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
