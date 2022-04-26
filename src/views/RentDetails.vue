<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { api } from '../api/index.api';
import { rentalStore } from '../stores/rental.store';
import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';

const rental = rentalStore();
const quasar = useQuasar();
const router = useRouter();
const route = useRoute();

onBeforeRouteLeave(() => {
  if (rental.hasRentalData) {
    rental.removeRentalData();
  }
});

const isLoading = ref(false);

const getRental = async () => {
  const response = await api.sciener.getRental(route.params.id as string);
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
    rental.setRentalData(response.data);
  }
};

onMounted(() => {
  if (!rental.hasRentalData) {
    getRental();
  }
});

const action = async () => {
  try {
    isLoading.value = true;
    let response;

    if (rental.getRentalData.room.status === 'freeze') {
      response = await api.sciener.unfreezeRental(route.params.id as string);
    } else {
      response = await api.sciener.freezeRental(route.params.id as string);
    }

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
      getRental();
      quasar.notify({
        color: 'positive',
        message: 'Status change successfully',
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
    }

    isLoading.value = false;
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

    <div class="text-h5">Rent Details</div>

    <q-separator vertical />

    <q-breadcrumbs-el to="/rent">
      <q-icon size="2em" name="home" />
    </q-breadcrumbs-el>

    <q-breadcrumbs-el
      icon="meeting_room"
      :label="String(route.params.id)"
      :to="`/rent/${route.params.id}`"
    />
  </q-breadcrumbs>

  <q-page class="container" :style="quasar.screen.lt.md && 'padding: 1rem;'">
    <div class="content">
      <div
        :class="`text-weight-bold text-center ${
          quasar.screen.lt.md ? 'text-h5' : 'text-h4'
        }`"
      >
        Detail for record <code>{{ route.params.id }}</code>
      </div>
    </div>
    <div
      class="content--details"
      :style="
        quasar.screen.lt.md
          ? 'max-width: 700px; margin-top: 0.5rem;'
          : 'max-width: 1000px'
      "
      v-if="rental.hasRentalData"
    >
      <div
        :class="`text-center ${quasar.screen.lt.md ? 'text-body1' : 'text-h5'}`"
      >
        Start from <code>{{ rental.getRentalData.duration.start_date }}</code
        >, end at <code>{{ rental.getRentalData.duration.end_date }}</code>
      </div>

      <div class="row full-width">
        <div class="col-12 col-sm-6 q-pa-md">
          <q-card class="content--card" flat bordered>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h5">Tenant</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">ID</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.tenant.id }}
              </div>
            </q-card-section>

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">Name</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.tenant.name }}
              </div>
            </q-card-section>

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">Email</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.tenant.email }}
              </div>
            </q-card-section>

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">Contact Number</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.tenant.contact_no }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-sm-6 q-pa-md">
          <q-card class="content--card" flat bordered>
            <q-item>
              <q-item-section>
                <q-item-label class="text-h5">Room</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">ID</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.room.id }}
              </div>
            </q-card-section>

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">Name</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.room.name }}
              </div>
            </q-card-section>

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">Key</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.room.key }}
              </div>
            </q-card-section>

            <q-card-section :style="quasar.screen.lt.md && 'padding: 5px 16px'">
              <div class="text-h6">Status</div>

              <div class="text-grey-9">
                {{ rental.getRentalData.room.status }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="content--btn">
        <q-btn
          class="button text-capitalize"
          color="white"
          text-color="dark"
          label="Back"
          style="border: 2px solid black; margin-top: 1rem"
          @click="router.push('/rent')"
        />
        <q-btn
          class="button text-capitalize"
          color="white"
          text-color="dark"
          :label="
            rental.getRentalData.room.status === 'freeze'
              ? 'unfreeze'
              : 'freeze'
          "
          style="border: 2px solid black; margin-top: 1rem"
          :loading="isLoading"
          @click="action()"
        />
      </div>
    </div>

    <div class="loading" v-else><q-spinner color="primary" size="3em" /></div>
  </q-page>
</template>
