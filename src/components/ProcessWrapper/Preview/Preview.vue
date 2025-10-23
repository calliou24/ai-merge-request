<script setup lang="ts">
import Card from "@/components/ui/card/Card.vue";
import SectionTitle from "../Common/SectionTitle.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import { useProcess } from "@/stores/process.store";
import { storeToRefs } from "pinia";
import { useTemplates } from "@/stores/templates.store";
import { onMounted, ref } from "vue";
import type { TemplateType } from "@/types/template";
import type { ProjectType } from "@/types/repo";

const process = useProcess();

const { originBranch, targetBranch, template } = storeToRefs(process);

const templatesStore = useTemplates();
const { templates } = storeToRefs(templatesStore);

const selectedTemplate = ref<TemplateType>();
const selectedProject = ref<ProjectType>();

onMounted(() => {
  selectedTemplate.value = templates.value.find(
    (templateItem) => templateItem.id === template.value
  );
});
</script>
<template>
  <SectionTitle
    title="Review & Create"
    description="Review your merge request details before creating"
  />
  <section class="mt-10">
    <Card>
      <CardHeader>
        <h2 class="text-2xl">
          <b>
            {{ selectedProject?.name }}
          </b>
        </h2>
        <div class="grid grid-cols-2 mt-5 mb-2 gap-5">
          <div class="grid gap-2">
            <label class="font-semibold">Origin Branch</label>
            <span
              class="text-center p-2 border-2 border-blue-500 bg-blue-50 rounded-lg"
              >{{ originBranch }}</span
            >
          </div>
          <div class="grid gap-2">
            <label class="font-semibold">Target branch</label>
            <span
              class="text-center p-2 border-2 border-blue-500 bg-blue-50 rounded-lg"
              >{{ targetBranch }}</span
            >
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div class="grid gap-5">
          <p class="p-2 bg-gray-100 rounded-lg">
            {{ selectedTemplate?.title }}
          </p>
          <div class="p-2 bg-gray-100 rounded-lg">
            <pre><code>{{ selectedTemplate?.template }}</code></pre>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
