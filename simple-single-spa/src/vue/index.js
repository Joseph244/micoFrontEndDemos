import Vue from 'vue/dist/vue.min.js';
import singleSpaVue from 'single-spa-vue';
import Demo from './component.js';
//import {showFrameworkObservable, getBorder} from 'src/common/colored-border.js';

const vueLifecycles = singleSpaVue({
  Vue,
  appOptions: {
    el: '#vue-app',
    template: `
      <div id="vue-app">
        <div><demo /></div>
      </div>
    `,
    components: {
       'demo': Demo,
    },
    beforeMount: function() {
   
    },
    beforeDestroy: function() {
    }
  }
});

export const bootstrap = [
  vueLifecycles.bootstrap,
];

export const mount = [
  vueLifecycles.mount,
];

export const unmount = [
  vueLifecycles.unmount,
];
// export const update = [
//   vueLifecycles.update,
// ];
