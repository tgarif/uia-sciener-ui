<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from '../api/index.api';
import { Rental } from '../interfaces/sciener.interface';
import { rentalStore } from '../stores/rental.store';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';

const props = defineProps({
  id: String,
});

const rental = rentalStore();
const quasar = useQuasar();
const router = useRouter();
const route = useRoute();

onBeforeRouteLeave(() => {
  if (rental.hasRentalData) {
    rental.removeRentalData();
  }
});

const rentalData = ref({} as Rental);

const getRental = async () => {
  const response = await api.sciener.getRental(props.id as string);
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
    router.push('/rent');
  }

  if (response.errcode === 0) {
    rentalData.value = response.data;
  }
};

onMounted(() => {
  if (rental.hasRentalData) {
    rentalData.value = rental.getRentalData;
  } else {
    getRental();
  }
});
</script>

<template>
  <q-breadcrumbs class="breadcrumb q-pa-md text-grey-9">
    <template v-slot:separator>
      <q-icon size="1.5em" name="chevron_right" />
    </template>

    <div class="text-h5">Rent Details</div>

    <q-separator vertical />

    <q-breadcrumbs-el to="/rent">
      <q-icon size="2em" name="home" />
    </q-breadcrumbs-el>

    <q-breadcrumbs-el
      icon="meeting_room"
      :label="String(props.id)"
      :to="`/rent/${props.id}`"
    />
  </q-breadcrumbs>

  <q-page class="container">
    <div class="content">Hello World</div>
  </q-page>
</template>
