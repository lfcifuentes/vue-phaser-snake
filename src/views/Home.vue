<template>
  <div class="d-flex flex-column justify-center align-center">
    <v-img class="img-phaser" src="assets/phaser.png" alt="PHASER LOGO"></v-img>
    <v-text-field label="Username" v-model="username" outlined></v-text-field>
    <v-btn
      x-large
      outlined
      color="deep-purple accent-4"
      class="ma-2 white--text"
      @click="sendUserName()"
      :loading="loading"
    >
      Log In
      <v-icon right dark>mdi-play-circle-outline</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Game from "@/components/Game.vue"; // @ is an alias to /src

@Component({
  components: {
    Game,
  },
})
export default class Home extends Vue {
  username = "" || this.$store.state.user.username;
  loading = false;
  sendUserName(): void {
    if (this.username == "") {
      this.$toast.open({
        message: "Username is required!",
        type: "error",
      });
      return;
    }
    this.loading = true;
    this.$api
      .getUser({ username: this.username })
      .then((e) => {
        this.$store.commit("setUser", e.data.data);
        this.$router.push("/game");
        this.loading = false;
        this.$toast.open({
          message: "welcome!!",
          type: "info",
        });
      })
      .catch((err) => {
        console.warn(err);
        this.$toast.open({
          message: "an error has occurred, please try again",
          type: "error",
        });
      });
  }
}
</script>
