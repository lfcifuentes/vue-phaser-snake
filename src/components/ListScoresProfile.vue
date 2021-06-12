<template>
  <v-container style="margin: 1rem">
    <div class="card no-padding">
      <div class="card-body">
        <v-data-table
          :headers="headers"
          :items="$store.state.user.Scores"
          :items-per-page="10"
          :loading="loading"
          loading-text="Loading... Please wait"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="item in items" :key="item.name">
                <td>{{ item.Score }}</td>
                <td>
                  {{ item.CreatedAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class ListScoresProfile extends Vue {
  headers = [
    {
      text: "Score",
      value: "Score",
    },
    {
      text: "Date",
      value: "CreatedAt",
    },
  ];
}
</script>
