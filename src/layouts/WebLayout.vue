<script setup lang="ts">
import { applicationStore } from '../stores/application.store';
import Logo from '../assets/images/logo.svg';

const application = applicationStore();
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dork text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="header--title q-gutter-md">
          <q-img :src="Logo" style="width: 3rem" />
          <div class="text-h4">UIA Sciener Integration</div>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab
          v-if="application.hasAccessToken"
          to="/rent"
          label="Rents"
        />
        <q-route-tab
          v-if="!application.hasAccessToken"
          to="/credential"
          label="Credentials"
        />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
