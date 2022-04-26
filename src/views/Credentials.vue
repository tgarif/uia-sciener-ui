<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { applicationStore } from '../stores/application.store';
import { api } from '../api/index.api';
import { useRouter } from 'vue-router';

const application = applicationStore();
const quasar = useQuasar();
const router = useRouter();

const inputBgColor = ref('white');
const accessToken = ref('');
const isLoading = ref(false);

const formSubmit = async () => {
  try {
    isLoading.value = true;

    const response = await api.credential.validate(accessToken.value);
    application.setAccessToken(accessToken.value);
    quasar.notify({
      color: 'positive',
      message: response.msg,
      icon: 'check_circle',
      badgeColor: 'secondary',
      position: quasar.screen.lt.md ? 'bottom' : 'bottom-left',
      actions: [
        {
          label: 'x',
          color: 'blue-grey-1',
        },
      ],
    });

    isLoading.value = false;
    router.push('/rent');
  } catch {
    isLoading.value = false;
  }
};
</script>

<template>
  <q-breadcrumbs class="breadcrumb q-pa-md text-grey-9">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" />
    </template>

    <div class="text-h5">Credentials</div>

    <q-separator vertical />

    <q-breadcrumbs-el to="/">
      <q-icon size="2em" name="home" />
    </q-breadcrumbs-el>

    <q-breadcrumbs-el icon="vpn_key" label="credentials" to="/" />
  </q-breadcrumbs>

  <q-page class="container">
    <div class="content">
      <div class="text-h4 text-weight-bold">Serial Number</div>
      <q-form class="form" @submit.prevent="formSubmit" style="width: 600px">
        <q-input
          clearable
          class="input"
          v-model="accessToken"
          outlined
          type="text"
          label="Input access token"
          @focus="inputBgColor = 'yellow-1'"
          @blur="inputBgColor = 'white'"
          :bg-color="inputBgColor"
          color="dark"
          :rules="[(val) => val && val.length > 0]"
        />
        <q-btn
          class="button text-capitalize"
          type="submit"
          color="white"
          text-color="dark"
          label="Add Key"
          style="border: 2px solid black"
          :loading="isLoading"
        />
      </q-form>
    </div>
  </q-page>
</template>
