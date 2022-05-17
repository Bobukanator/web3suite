import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ isDev, app }) => {
  if (!isDev) {
    /*Vue.use(VueGtag, {
      config: { id: '' }  //TODO - setup account for this project
    },
      app.router);*/
  } else {
    console.log("Skipping GA in development")
  }
}