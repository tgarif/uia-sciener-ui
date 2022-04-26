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

const checkRentalData = () => {
  return (
    rentalData.value.constructor === Object &&
    Object.entries(rentalData.value).length > 0
  );
};

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

  <q-page class="container" :style="quasar.screen.lt.md && 'padding: 1rem;'">
    <div class="content">
      <div
        :class="`text-weight-bold text-center ${
          quasar.screen.lt.md ? 'text-h5' : 'text-h4'
        }`"
      >
        Detail for record <code>{{ props.id }}</code>
      </div>
    </div>
    <div
      class="content--details"
      :style="
        quasar.screen.lt.md
          ? 'max-width: 700px; margin-top: 0.5rem;'
          : 'max-width: 1000px'
      "
      v-if="checkRentalData()"
    >
      <div
        :class="`text-center ${quasar.screen.lt.md ? 'text-h6' : 'text-h5'}`"
      >
        Start from <code>{{ rentalData.duration.start_date }}</code
        >, end at <code>{{ rentalData.duration.end_date }}</code>
      </div>

      <div class="row">
        <div class="col-12 col-sm-6 q-pa-md">
          <q-card class="my-card" flat bordered>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h5">Tenant</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section horizontal>
              <q-card-section> ID </q-card-section>

              <q-separator vertical />

              <q-card-section class="col-6">
                {{ rentalData.tenant.id }}
              </q-card-section>
            </q-card-section>

            <q-card-section horizontal>
              <q-card-section> Name </q-card-section>

              <q-separator vertical />

              <q-card-section class="col-6">
                {{ rentalData.tenant.name }}
              </q-card-section>
            </q-card-section>

            <q-card-section horizontal>
              <q-card-section> Email </q-card-section>

              <q-separator vertical />

              <q-card-section class="col-6">
                {{ rentalData.tenant.email }}
              </q-card-section>
            </q-card-section>

            <q-card-section horizontal>
              <q-card-section> Contact Number </q-card-section>

              <q-separator vertical />

              <q-card-section class="col-6">
                {{ rentalData.tenant.contact_no }}
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6 q-pa-md">
          <q-card class="my-card" flat bordered>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h5">Room</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section horizontal>
              <q-card-section> asdqwe </q-card-section>

              <q-separator vertical />

              <q-card-section class="col-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </q-card-section>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="loading" v-else><q-spinner color="primary" size="3em" /></div>
  </q-page>
</template>
