import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ isDev, app }) => {
  if (!isDev) {
    Vue.use(VueGtag, {
      config: { id: 'G-8PP0Z8S8JS' }  //TODO - setup account for this project
    },
      app.router);
  } else {
    console.log("Skipping GA in development")
  }
}