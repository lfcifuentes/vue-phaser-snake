<template>
  <div :class="className">
    <div class="card-title">{{ title }}</div>
    <div class="card-followers">
      <span class="card-followers-number">{{ number }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

const CardProps = Vue.extend({
  props: {
    number: Number,
    title: String,
  },
});

@Component
export default class Card extends CardProps {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get className() {
    return this.title.toLowerCase() == "best score"
      ? "card pink-linear"
      : "card";
  }
}
</script>

<style></style>
