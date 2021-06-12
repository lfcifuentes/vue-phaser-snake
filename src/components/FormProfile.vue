<template>
  <div>
    <v-text-field label="Username" v-model="username" outlined></v-text-field>
    <v-btn
      x-large
      outlined
      color="deep-purple accent-4"
      class="ma-2 white--text"
      @click="updateUserName()"
      :loading="loading"
    >
      Update
      <v-icon right dark>mdi-content-save</v-icon>
    </v-btn>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class FormProfile extends Vue {
  username = "" || this.$store.state.user.Username;
  loading = false;
  updateUserName(): void {
    if (this.username == "") {
      this.$toast.open({
        message: "Username is required!",
        type: "error",
      });
      return;
    }
    this.loading = true;
    this.$api
      .updateUserName({
        ...this.$store.state.user,
        Username: this.username,
      })
      .then((e: any) => {
        this.loading = false;
        if (e.data.status == 200) {
          this.$store.commit("setUser", e.data.data);
          this.$toast.open({
            message: "Update!!",
            type: "info",
          });
        } else {
          this.$toast.open({
            message: e.data.message,
            type: "error",
          });
        }
      })
      .catch((err: any) => {
        console.warn(err);
        this.$toast.open({
          message: "an error has occurred, please try again",
          type: "error",
        });
      });
  }
}
</script>
