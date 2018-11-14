// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store.js'
import { auth } from './firebaseConfig.js'
import VueFire from 'vuefire'
import './assets/scss/app.scss'

Vue.config.productionTip = false;
Vue.use(VueFire);

/* eslint-disable no-new */
let app;
auth.onAuthStateChanged( user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
});
