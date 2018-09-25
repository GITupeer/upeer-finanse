import Vue from 'vue'
import {sync} from 'vuex-router-sync'
import App from './views/App'
import router from './router'
import store from './store'
import moment from 'moment'
import VeeValidate, { Validator } from 'vee-validate';
import mask from 'jquery-mask-plugin'
import VueMask from 'v-mask'
import CheckboxRadio from 'vue-checkbox-radio';
import Hammer from 'hammerjs'
import './views/Directives/formatInputDirective';
import './views/Directives/CursorEndDirective';

require ('../node_modules/fullcalendar/dist/fullcalendar.min.css') //not used?
import fullCalendar from 'fullcalendar' //not used??

//==================== VeeValidate =========================//
const veeValidateConfig = {
  errorBagName: 'errors', // change if property conflicts
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: {
    en: {
      messages: {
        confirmed: (field) => `The ${field} does not match.`,
      },
      attributes: {
        people_limit: 'people limit',
        password_confirm: 'password confirmation',
        password_old: 'old password',
        full_name: 'full name',
        start_date: 'start date',
        end_date: 'end date',
      }
    }
  },
  strict: true,
  classes: false,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'input',
  inject: true,
  validity: false,
  aria: true
};
Vue.use(VeeValidate, veeValidateConfig);
//==================== VeeValidate =========================//

Vue.use(VueMask);
Vue.use(CheckboxRadio);


//Font Awesome - not needed anymore??
import 'vue-awesome/icons/chevron-left'
import 'vue-awesome/icons/chevron-right'
import 'vue-awesome/icons/cog'
import 'vue-awesome/icons/bars'
import 'vue-awesome/icons/forward'
import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/info-circle'
import 'vue-awesome/icons/search'
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/lightbulb-o'
import 'vue-awesome/icons/globe'
import 'vue-awesome/icons/play'
import 'vue-awesome/icons/pause'
import 'vue-awesome/icons/download'



import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

Vue.eventBus = new Vue(); // communication between components

sync(store, router);

const app = new Vue({
    router,
    store,
    ...App
})
export {app, router, store}
