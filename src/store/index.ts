import Vue from "vue";
import Vuex from "vuex";
import { userDefault } from "@/services/const";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user") || userDefault),
    username: localStorage.getItem("username") || "",
    points: 0,
    best_points: localStorage.getItem("best_points") || 0,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      let best_points = 0;
      if (user.Scores != null) {
        user.Scores.map((e: { Score: number }) => {
          best_points = best_points > e.Score ? best_points : e.Score;
        });
      }
      state.best_points = best_points;
      localStorage.setItem("best_points", best_points);
    },
    setUserName(state, username) {
      state.username = username;
      localStorage.setItem("username", username);
    },
    setPoints(state, points) {
      state.points = points;
    },
    setBestPoints(state, points) {
      this._vm.$api
        .setScore(state.user.Id, { score: points, user_id: state.user.Id })
        .then((e) => {
          this._vm.$toast.open({
            message: "new score saved",
            type: "info",
          });
          this.commit("setUser", e.data.data);
          return false;
        })
        .catch((err) => {
          console.warn(err);
          this._vm.$toast.open({
            message: "an error has occurred, please try again",
            type: "error",
          });
        });
    },
  },
  actions: {},
  modules: {},
});
