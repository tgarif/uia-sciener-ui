<script setup lang="ts">
import { applicationStore } from '../stores/application.store';

const application = applicationStore();
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dork text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="header--title q-gutter-md">
          <q-img src="src/assets/images/Logo.svg" style="width: 3rem" />
          <div class="text-h4">UIA Sciener Integration</div>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab
          v-if="!application.hasAccessToken"
          to="/credential"
          label="Credentials"
        />
        <q-route-tab
          v-if="application.hasAccessToken"
          to="/rent"
          label="Rents"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
