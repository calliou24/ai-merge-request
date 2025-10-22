<script setup lang="ts">
import { onMounted, ref } from "vue";
import SectionTitle from "../Common/SectionTitle.vue";
import { useProcess } from "@/stores/process.store";
import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";
import { mergeRequestApi } from "@/service/templatesApi copy";
import type { MergeRequestData } from "@/stores/merge_reques";
import { ApiError } from "@/service/clientApi";
import { Loader2Icon } from "lucide-vue-next";

const process = useProcess();
const { project, originBranch, targetBranch, pat, aiContext, template } =
  storeToRefs(process);

const title = ref("");
const description = ref("");

const isLoading = ref(false)

const handleGenerateMergeRequestDetails = async () => {
  isLoading.value = true
  try { 

      const getMergeRequestData = await mergeRequestApi.createMergeRequestData<MergeRequestData>({
        project_id: project.value,
        contextAI: aiContext.value,
        template_id: template.value,
        origin_branch: originBranch.value,
        target_branch: targetBranch.value,
        pat: pat.value,
      });
    
      isLoading.value = false
      if (getMergeRequestData.title && getMergeRequestData.description){ 
        title.value = getMergeRequestData.title
        description.value = getMergeRequestData.description
      }
  }catch(e) { 
    if (e instanceof ApiError) { 
        toast.error(e.details ?? e.message ?? "Error generating merge details deatails information")
        isLoading.value = false
    }
  }
};

onMounted(() => {
  if (originBranch && targetBranch && pat && project) {
    handleGenerateMergeRequestDetails();
  } else {
    toast.error(
      "Error generating merge request details, checkout your configuration details"
    );
  }
});
</script>

<template>
  <SectionTitle
    title="Merge request details"
    description="Review your final details for your merge request creation"
  />
  <section class="">
    <div v-if="isLoading" class=" z-50 fixed top-0 left-0 bg-black/70 w-screen h-screen flex flex-col items-center justify-center">
            <Loader2Icon  class=" animate-spin" color="white" width="100" height="100"/>
            <p class="text-white">Loading Merge Request Details</p>
    </div>
    <div class="mt-5 grid gap-5 min-w-[600px]" v-if="!isLoading"> 
        <p class="p-2 bg-gray-100 rounded-lg">{{ title }}</p>
        <div class="p-2 bg-gray-100 rounded-lg">
            <pre class=" whitespace-pre-wrap wrap-break-word overflow-x-auto max-w-full ">
                <code>
                    {{ description }}
                </code>
            </pre>
        </div>
    </div>
  </section>
</template>
