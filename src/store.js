import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        songs: [],
        currentSong: null
    },
    mutations: {
        SET_SONGS(state, payload) {
            state.songs = payload;
        },
        CHANGE_CURRENT_SONG(state, payload) {
            state.currentSong = payload;
        }
    },
    actions: {
        changeSong({ commit }, payload) {
            commit("CHANGE_CURRENT_SONG",payload)
        },
        fetchSongs({ commit }) {
            axios.get("http://orangevalleycaa.org/api/music/order/name")
                .then(response => (commit("SET_SONGS", response.data)))
                .catch(error => console.log(error));
        },
        deleteSong({commit},payload) {
            let songs = _.without(this.songs,payload);
            commit("SET_SONGS",songs);
        },
    },
})