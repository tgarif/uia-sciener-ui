<script setup lang="ts">
import { QInput } from 'quasar';
import { ref } from 'vue';
import { applicationStore } from '../stores/application.store';

const application = applicationStore();

const inputBgColor = ref('white');
const accessToken = ref('');

const formSubmit = () => {
  console.log('Hello');
};
</script>

<template>
  <q-page class="container">
    <div class="content">
      <div class="text-h4 text-weight-bold">Serial Number</div>
      <q-form class="form" @submit.prevent="formSubmit" style="width: 600px">
        <q-input
          class="input"
          v-model.trim="accessToken"
          outlined
          type="text"
          label="Input access token"
          @focus="inputBgColor = 'yellow-1'"
          @blur="inputBgColor = 'white'"
          :bg-color="inputBgColor"
          color="dark"
        />
        <q-btn
          class="button text-capitalize"
          type="submit"
          color="white"
          text-color="dark"
          label="Add Key"
          style="border: 2px solid black"
        />
      </q-form>
    </div>
  </q-page>
</template>
