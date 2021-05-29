import Vue from "vue";
import Snotify, { SnotifyPosition } from "vue-snotify";
import "vue-snotify/styles/material.css";

const options = {
  toast: {
    position: SnotifyPosition.centerBottom,
    timeout: 5000,
    showProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  },
};

Vue.use(Snotify, options);
