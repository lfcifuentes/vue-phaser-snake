<template>
  <v-row class="text-center background-game">
    <v-col>
      <div id="game-container" v-show="downloaded"></div>
      <v-skeleton-loader
        v-show="!downloaded"
        class="mx-auto"
        width="930"
        height="630"
        type="card"
      ></v-skeleton-loader>
    </v-col>
    <v-col class="scores-container">
      <div>
        <v-avatar elevation="23" color="deep-purple accent-4" size="65">
          <span class="white--text"><v-icon>mdi-account</v-icon></span>
        </v-avatar>
        <h2 class="font-weight-light text--secondary">
          Current user: {{ $store.state.user.username || "" }}
        </h2>
      </div>
      <Card title="Score" :number="parseInt($store.state.points) || 0" />
      <Card
        title="Best Score"
        :number="parseInt($store.state.best_points) || 0"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Phaiser from "../modules/Phaser";
import Card from "../components/Card.vue";

@Component({
  components: {
    Card,
  },
})
export default class Game extends Vue {
  downloaded = false;
  containerId = "game-container";
  gameInstance: Phaiser | undefined;

  mounted(): void {
    this.gameInstance = new Phaiser(this.containerId);
    setTimeout(() => {
      this.downloaded = true;
    }, 500);
  }
}
</script>
<style>
#game-container {
  margin-top: 8px;
}
.v-skeleton-loader__card,
.v-skeleton-loader__image {
  height: 100% !important;
}
</style>
