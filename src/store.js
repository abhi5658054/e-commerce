import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./firebaseConfig');

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        currentUser: null,
    },
    mutations: {
        setCurrentUser(state, val) {
            state.currentUser = val;
        }
    },
    actions: {
    },
});
