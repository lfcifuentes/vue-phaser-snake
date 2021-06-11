<template>
  <div>
    <v-container>
      <div class="card">
        <div class="card-title">Best Scores</div>
        <div class="card-body">
          <v-data-table
            :headers="headers"
            :items="bestscores"
            :items-per-page="10"
            :loading="loading"
            loading-text="Loading... Please wait"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="item in items" :key="item.name">
                  <td>{{ item.Username }}</td>
                  <td>{{ item.Score }}</td>
                  <td>
                    {{
                      item.CreatedAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")
                    }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class BestScores extends Vue {
  bestscores = [];
  loading = false;
  headers = [
    {
      text: "Username",
      value: "Username",
    },
    {
      text: "Score",
      value: "Score",
    },
    {
      text: "Date",
      value: "CreatedAt",
    },
  ];
  mounted(): void {
    this.loading = true;
    this.$api
      .getBestScores()
      .then((e) => {
        this.bestscores = e.data.data;
        this.loading = false;
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

<style>
.card {
  padding: 0;
}
.card-body {
  padding: 1rem;
}
.card .theme--dark.v-data-table {
  background-color: transparent;
}
.theme--dark.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: #00000057 !important;
}
</style>
