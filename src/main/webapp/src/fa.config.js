import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faEdit, faTrash, faArrowDown, faArrowUp, faSync, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

library.add(
  faSync,
  faUser,
  faBuilding,
  faUserCircle,
  faCheckCircle,
  faArrowDown,
  faArrowUp,
  faTrash,
  faEdit,
);

Vue.component('font-awesome-icon', FontAwesomeIcon); // registered globally
