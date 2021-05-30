
import { createApp } from 'vue'
import App from './App.vue'

//import SelectPatient from './components/SelectPatient.vue'

//create an instance of mitt that will become a global object through the globalProperties below...
import mitt from "mitt";
const emitter = mitt();

const app = createApp(App)
//https://stackoverflow.com/questions/63100658/add-global-variable-in-vue-js-3
//https://stackoverflow.com/questions/63471824/vue-js-3-event-bus

app.config.globalProperties.emitter = emitter

//app.component('SelectPatient') = SelectPatient
app.mount('#app')
