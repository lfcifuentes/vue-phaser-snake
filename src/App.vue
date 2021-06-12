<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4" dark>
      <v-toolbar-title>Phaser Snake Game</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="navTo('/')">
        <span class="mr-2">Home</span>
        <v-icon>mdi-gamepad-variant</v-icon>
      </v-btn>
      <v-btn text @click="navTo('/best-scores')">
        <span class="mr-2">Best Scores</span>
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
      <v-btn
        text
        @click="navTo('/profile')"
        v-show="$store.state.user.Id != ''"
      >
        <span class="mr-2">Profile</span>
        <v-icon>mdi-account-circle-outline</v-icon>
      </v-btn>
      <v-btn text @click="logOut()" v-show="$store.state.user.Id != ''">
        <span class="mr-2">Log Out</span>
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
    <div class="text--disabled caption">
      Iconos diseñados por
      <a
        class="text--secondary"
        href="https://www.freepik.com"
        title="Freepik"
        target="_blank"
        >Freepik</a
      >
      from
      <a
        class="text--secondary"
        href="https://www.flaticon.es/"
        title="Flaticon"
        target="_blank"
        >www.flaticon.es</a
      >
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { userDefault } from "../src/services/const";

export default Vue.extend({
  name: "App",

  methods: {
    navTo(url: string): void {
      this.$router.push(url);
    },
    logOut(): void {
      this.$store.commit("setUser", JSON.parse(userDefault));
      if (this.$router.currentRoute.path != "/") {
        this.navTo("/");
      }
    },
  },
});
</script>
