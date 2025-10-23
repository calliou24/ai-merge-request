<script setup lang="ts">
import { onMounted, ref } from "vue";
import SectionTitle from "../Common/SectionTitle.vue";
import { useProcess } from "@/stores/process.store";
import { storeToRefs } from "pinia";
import { toast } from "vue-sonner";
import { mergeRequestApi } from "@/service/mergeRequestApi";
import type { MergeRequestData } from "@/stores/merge_reques";
import { ApiError } from "@/service/clientApi";
import { Loader2Icon } from "lucide-vue-next";
import ButtonWithLoader from "@/components/ui/button/ButtonWithLoader.vue";

const process = useProcess();
const { project, originBranch, targetBranch, pat, aiContext, template } =
  storeToRefs(process);

const title = ref(
  "✨ [FEATURE] Sprint 6 | Add ZIP Upload for PDF gift cards and related code processing"
);
const description = ref(
  "## 🧩 Descripción\nSe añadió un nuevo endpoint `/api/v1/refill-files/upload-zip` para el envío masivo de archivos ZIP que contengan códigos PDF de giftcards. Además, se implementaron los procesos de extracción, validación y registro de los PDFs, incluyendo las rutas y nombres originales en la base de datos. Se añadieron nuevas lógicas de negocio para manejar expiraciones, estados y logs en los códigos PDF.\n\n## 🧪 Detalles Técnicos\n- Se creó la entidad `Codes` con `Type` `PDF` y campos `PathFile` y `OriginalFilename`.\n- Se añadió la tabla `codes_logs` para registrar eventos de visualización y borrado.\n- Se implementaron los mapeadores DTO `/app/service/codes/mappers.go` para transformar a `CodeDetailsResponse`.\n- Se añadió el endpoint `POST /api/v1/refill-files/upload-zip` y su controlador `/app/controller/refill_files/index.go`.\n- Se generó la lógica de empaquetado ZIP en `/app/pkg/zip/utilities.go`.\n- Se actualizó la configuración de Air y la configuración de despliegue para soportar la nueva ruta y tamaño máximo de 50 MB.\n- Se corrigió la lógica de parsing y escritura de la fecha `expires_at` en la entidad `Codes`.\n- Se incorporó la lógica de validaciones de expiración y duplicación de códigos antes de su inserción.\n\n## 🚨 Impacto\n- Afecta a los usuarios del endpoint `/refill-files/upload-zip` y al proceso de carga de códigos PDF.\n- Criticidad: Alta – permite la carga masiva correcta de giftcards PDF.\n\n## ✅ ¿Cómo probar?\n1. Enviar un ZIP con varios archivos PDF a `/api/v1/refill-files/upload-zip` con los parámetros `source`, `user_code`, `raw_data_file_id` y `email`.\n2. Verificar que los PDFs se han descomprimido, los registros aparecen en la tabla `codes` con `type == PDF` y los campos `path_file`/`original_filename` rellenados.\n3. Consultar `/api/v1/refill-files/details/{id}` para comprobar la información del código PDF.\n4. Hacer una descarga del PDF usando `GET /api/v1/refill-files/file/{id}` y comparar con el archivo original.\n\n## ✅ Checklist\n- [ ] Código probado localmente con la nueva tabla y mapeadores.\n- [ ] QA aprobado (si aplica).\n- [ ] Documentación actualizada (Swagger, Postman).\n\n## 🔗 Enlaces:\n- *TODO: Añadir enlace a Jira o TFS.*\n- *TODO: Añadir enlaces a documentación de la API.*"
);

const isLoading = ref(false);

const handleGenerateMergeRequestDetails = async () => {
  isLoading.value = true;
  try {
    const getMergeRequestData =
      await mergeRequestApi.createMergeRequestData<MergeRequestData>({
        project_id: project.value,
        contextAI: aiContext.value,
        template_id: template.value,
        origin_branch: originBranch.value,
        target_branch: targetBranch.value,
        pat: pat.value,
      });

    isLoading.value = false;
    if (getMergeRequestData.title && getMergeRequestData.description) {
      title.value = getMergeRequestData.title;
      description.value = getMergeRequestData.description;
    }
  } catch (e) {
    if (e instanceof ApiError) {
      toast.error(
        e.details ??
          e.message ??
          "Error generating merge details deatails information"
      );
      isLoading.value = false;
    }
  }
};

const handleGenerateMergeRequest = async () => {
  if (!title.value.length || !description.value.length)
    return toast.error("Ttitle and description should be empty");

  const createMergeRequest = await mergeRequestApi.createMergeRequest({
    project_id: project.value,
    origin_branch: originBranch.value,
    target_branch: targetBranch.value,
    pat: pat.value,
    title: title.value,
    description: description.value,
  });
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
    <div
      v-if="isLoading"
      class="z-50 fixed top-0 left-0 bg-black/70 w-screen h-screen flex flex-col items-center justify-center"
    >
      <Loader2Icon
        class="animate-spin"
        color="white"
        width="100"
        height="100"
      />
      <p class="text-white">Loading Merge Request Details</p>
    </div>
    <div class="flex items-center justify-end">
      <ButtonWithLoader
        :onClick="handleGenerateMergeRequest"
        :button-properties="{}"
        >Create Merge Request</ButtonWithLoader
      >
    </div>
    <div class="mt-5 grid gap-5 min-w-[600px]" v-if="!isLoading">
      <p class="p-2 bg-gray-100 rounded-lg">{{ title }}</p>
      <div class="p-2 bg-gray-100 rounded-lg">
        <pre
          class="whitespace-pre-wrap wrap-break-word overflow-x-auto max-w-full"
        >
                <code>
                    {{ description }}
                </code>
            </pre>
      </div>
    </div>
  </section>
</template>
