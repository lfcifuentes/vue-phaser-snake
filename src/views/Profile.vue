<template>
  <v-row justify="center">
    <v-container>
      <v-row dense>
        <v-col :lg="4" :md="4" :sm="12">
          <div class="card">
            <div class="card-title">
              <div>
                <v-avatar elevation="23" color="deep-purple accent-4" size="65">
                  <span class="white--text"><v-icon>mdi-account</v-icon></span>
                </v-avatar>
                <h2 class="font-weight-light text--secondary">
                  {{ this.$store.state.user.Username }}
                </h2>
              </div>
            </div>
            <div class="card-body">
              <!-- componente con formulario del usuario -->
              <FormProfile />
            </div>
          </div>
        </v-col>
        <v-col>
          <!-- componente con listado de mis puntajes -->
          <ListScoresProfile />
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormProfile from "@/components/FormProfile.vue";
import ListScoresProfile from "@/components/ListScoresProfile.vue";
@Component({
  components: {
    FormProfile,
    ListScoresProfile,
  },
})
export default class Profile extends Vue {}
</script>
