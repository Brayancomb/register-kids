import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import 'primeicons/primeicons.css'
import { definePreset } from '@primeuix/themes';

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
import Tag from 'primevue/tag';
import SpeedDial from 'primevue/speeddial';

// import Parse from 'parse/dist/parse.min.js';

// Parse.initialize("zFnXp8duZFOLBWfnqnj9hPbPcXd1YYBv7155jKyu", "FIFzV9EkueocfjksA9RmdFbPSYuP4WCHHFOFd9L0");
// Parse.serverURL = "https://grupocidade.b4a.io/";

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    }
});


const app = createApp(App)


app.use(PrimeVue, {
    theme:{
        preset: MyPreset,
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
app.component('Tag', Tag);
app.component('SpeedDial', SpeedDial);

app.use(ToastService);
app.use(router)
app.mount('#app')