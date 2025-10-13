<script setup lang="ts">
import SectionTitle from "../Common/SectionTitle.vue";
import Card from "@/components/ui/card/Card.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import { useProcess } from "@/stores/process.store";
import { storeToRefs } from "pinia";
import type { TemplateType } from "@/types/process";

const process = useProcess();

const { template } = storeToRefs(process);

const templates: TemplateType[] = [
  {
    id: 1,
    title: "Feature",
    description:
      "This description helps to know that does the template its for.",
  },
  {
    id: 2,
    title: "Qa",
    description:
      "This description helps to know that does the template its for.",
  },
  {
    id: 13,
    title: "Sync branches",
    description:
      "This description helps to know that does the template its for.",
  },
  {
    id: 4,
    title: "Delete Feature",
    description:
      "This description helps to know that does the template its for.",
  },
  {
    id: 5,
    title: "Hot fix",
    description:
      "This description helps to know that does the template its for.",
  },
];

const handleSelectTemplate = (newTemplate: TemplateType) => {
  process.template = newTemplate;
};
</script>
<template>
  <SectionTitle
    title="Choose Template"
    description="Select a template and customize your merge request"
  />

  <section class="mt-10">
    <Card class="mt-10">
      <CardHeader>
        <CardTitle>Customize MR Details</CardTitle>
        <CardDescription>
          Edit the title and description before creating the merge
          request</CardDescription
        >
      </CardHeader>
      <CardContent>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <li
            @click="handleSelectTemplate(templateItem)"
            v-for="templateItem in templates"
            :class="[
              'h-40 bg-gray-50 hover:bg-purple-50 border-2  hover:border-purple-500 rounded-xl p-5 min-w-20 select-none flex flex-col gap-1',
              template.id == templateItem.id
                ? ' bg-purple-50 border-purple-500'
                : 'border-transparent',
            ]"
          >
            <p
              class="font-semibold whitespace-nowrap text-ellipsis overflow-hidden"
            >
              {{ templateItem.title }}
            </p>
            <p class="text-ellipsis overflow-hidden text-black/50">
              {{ templateItem.description }}
            </p>
          </li>
        </ul>
      </CardContent>
    </Card>
  </section>
</template>
