<script setup lang="ts">
import CardHeader from "@/components/ui/card/CardHeader.vue";
import SectionTitle from "../Common/SectionTitle.vue";
import Card from "@/components/ui/card/Card.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardDescription from "@/components/ui/card/CardDescription.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Input from "@/components/ui/input/Input.vue";
import Label from "@/components/ui/label/Label.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import { CheckCircle } from "lucide-vue-next";
import { ref } from "vue";
import ButtonWithLoader from "@/components/ui/button/ButtonWithLoader.vue";
import { useProcess } from "@/stores/process.store";
import { storeToRefs } from "pinia";
import { gitlabService } from "@/service/gitlabApi";
import { ApiError } from "@/service/clientApi";
import { toast } from "vue-sonner";

const process = useProcess();

const { pat } = storeToRefs(process);

let isLogged = ref(false);

const handleAuth = async () => {
  try {
    const isValid = await gitlabService.validateToken<{ id: number }>(
      pat.value
    );

    if (isValid.id && isValid.id !== 0) {
      isLogged.value = true;
    }
  } catch (error) {
    if (!(error instanceof ApiError)) return;

    if (error.status == 401)
      return toast.error("Invalid Personal Access Token");

    toast.error(error.message);
  }
};
</script>

<template>
  <SectionTitle
    title="Authenticate with GitLab"
    description="Connect your GitLab account using a Personal Access Token"
  />
  <section class="mt-10">
    <Card>
      <CardHeader>
        <CardTitle>Personal Access Token</CardTitle>
        <CardDescription
          >Your token is used to authenticate with GitLab. It is not stored by
          default.</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form
          v-if="!isLogged"
          @click="(e) => e.preventDefault()"
          class="grid gap-2"
        >
          <Label>Gitlab PAT</Label>
          <Input v-model="pat" placeholder="glpat-xxxxxxx" />
        </form>
        <div
          v-if="isLogged"
          class="flex items-center gap-2 border border-green-600, bg-green-300/10 rounded-2xl p-5"
        >
          <CheckCircle class="text-green-600" />
          <p class="font-semibold">Conected successfully</p>
        </div>
      </CardContent>
      <CardFooter class="grid gap-5 border-t border-border">
        <ButtonWithLoader :onClick="handleAuth" :buttonProperties="{}"
          >Validate Token
        </ButtonWithLoader>
        <p class="text-gray-500">
          Your token is transmitted securely and can be optionally stored
          encrypted locally. Configure storage in Settings.
        </p>
      </CardFooter>
    </Card>
  </section>
</template>
