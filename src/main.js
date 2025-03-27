import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Password from 'primevue/password';
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import InputMask from 'primevue/inputmask';
import DatePicker from 'primevue/datepicker';

import Parse from 'parse/dist/parse.min.js';

Parse.initialize("zFnXp8duZFOLBWfnqnj9hPbPcXd1YYBv7155jKyu", "FIFzV9EkueocfjksA9RmdFbPSYuP4WCHHFOFd9L0");
Parse.serverURL = "https://grupocidade.b4a.io/";


const app = createApp(App)


app.use(PrimeVue, {
    theme:{
        preset: Aura,
        options: {
            darkModeSelector: false || 'none',
        }
    }
});

app.component('InputText', InputText);
app.component('Button', Button);
app.component('Card', Card);
app.component('Password', Password);
app.component('Select', Select);
app.component('InputNumber', InputNumber);
app.component('Toast', Toast);
app.component('Accordion', Accordion);
app.component('AccordionPanel', AccordionPanel);
app.component('AccordionHeader', AccordionHeader);
app.component('AccordionContent', AccordionContent);
app.component('InputMask', InputMask);
app.component('DatePicker', DatePicker);

app.use(ToastService);
app.use(router)
app.mount('#app')