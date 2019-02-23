import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

const config = {
  apiKey: 'AIzaSyBilB4w0QBzSV0dTsEDXdEz3lQIpVZDxp8',
  authDomain: 'authapp-51f3a.firebaseapp.com',
  databaseURL: 'https://authapp-51f3a.firebaseio.com',
  projectId: 'authapp-51f3a',
  storageBucket: 'authapp-51f3a.appspot.com',
  messagingSenderId: '1072003384432',
};

firebase.initializeApp(config);

/* Plugins */
require('./plugins');

firebase.auth().onAuthStateChanged((user) => {
  Vue.config.productionTip = false;

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});
