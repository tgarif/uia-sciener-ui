<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from '../api/index.api';
import { rentalStore } from '../stores/rental.store';
import { useRouter } from 'vue-router';

const rental = rentalStore();
const quasar = useQuasar();
const router = useRouter();

const inputBgColor = ref('white');
const rentalId = ref('');
const isLoading = ref(false);

const formSubmit = async () => {
  try {
    isLoading.value = true;

    const response = await api.sciener.getRental(rentalId.value);

    isLoading.value = false;

    if (response.errcode === 1) {
      quasar.notify({
        color: 'blue-grey-8',
        message: `Error code: ${response.errcode}` || 'Something went wrong',
        caption: response.errmsg || '',
        icon: 'error',
        position: quasar.screen.lt.md ? 'bottom' : 'bottom-left',
        actions: [
          {
            label: 'x',
            color: 'blue-grey-1',
          },
        ],
      });
    }

    if (response.errcode === 0) {
      rental.setRentalData(response.data);
      router.push(`/rent/${rentalId.value}`);
    }
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

    <div class="text-h5">Rents</div>

    <q-separator vertical />

    <q-breadcrumbs-el to="/rent">
      <q-icon size="2em" name="home" />
    </q-breadcrumbs-el>

    <q-breadcrumbs-el icon="door_front" label="Rents" to="/rent" />
  </q-breadcrumbs>

  <q-page class="container">
    <div class="content">
      <div class="text-h4 text-weight-bold">
        Find record with <code>"rental_id"</code>
      </div>
      <q-form class="form" @submit.prevent="formSubmit" style="width: 600px">
        <q-input
          clearable
          class="input"
          v-model="rentalId"
          outlined
          type="text"
          label="Input rental_id"
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
          label="Search"
          style="border: 2px solid black"
          :loading="isLoading"
        />
      </q-form>
    </div>
  </q-page>
</template>
