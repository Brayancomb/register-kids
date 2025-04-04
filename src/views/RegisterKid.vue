<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import Parse from 'parse/dist/parse.min.js';

//Oficial
Parse.initialize("pyJ2pmDqnkg39Pvf2CjhwHmM3SasEAPuZddS1B1b", "21gGRnI6APWZzLXHa51hNb3wcCHFJkwwa1czR9uy");
Parse.serverURL = "https://customkids.b4a.io/";

// test.GrupoCidade
// Parse.initialize("zFnXp8duZFOLBWfnqnj9hPbPcXd1YYBv7155jKyu", "FIFzV9EkueocfjksA9RmdFbPSYuP4WCHHFOFd9L0");
// Parse.serverURL = "wss://grupocidade.b4a.io/";


export default {
    components:{
        MenuBar
    },
    data(){
        return {
            userInfos: JSON.parse(localStorage.getItem('userInfos')),
            nameKid: null,
            dateBorn: null,
            nameParent: null,
            phoneParent: null,
            parentesco: null,
            parents:[],
            putParents: false,
            turmaKids: null,
            idade: null,
            session: null,
            loading: false,
            isError: false,
            subscription: null,
            familyOptions: [
                {name: "Pai"},
                {name: "Mãe"},
                {name: "Irmão(a)"},
                {name: "Tio(a)"},
                {name: "Avô(ó)"},
                {name: "Outro"}                
            ],
            sessionOptions:[
                {name: "1ª Sessão"},
                {name: "2ª Sessão"},
                {name: "3ª Sessão"},
                {name: "4ª Sessão"}
            ],
            result: null,
            turmaOptions:[],
            infant1A: null,
            infant1B: null,
            infant2A: null,
            infant2B: null,
            infant3A: null,
            infant3B: null,
            infant3C: null,
            infant3D: null,
            kids1A: null,
            kids1B: null,
            kids1C: null,
            kids2A: null,
            kids2B: null,
            kids2C: null,
            kids3A: null,
            kids3B: null,
            kids3C: null,
            kids4A: null,
            kids4B: null,
            kids4C: null,
            excedente: null,
            baseInfantil1A: null,
            baseInfantil1B: null,
            baseInfantil2A: null,
            baseInfantil2B: null,
            baseInfantil3A: null,
            baseInfantil3B: null,
            baseInfantil3C: null,
            baseInfantil3D: null,
            baseKids1A: null,
            baseKids1B: null,
            baseKids1C: null,
            baseKids2A: null,
            baseKids2B: null,
            baseKids2C: null,
            baseKids3A: null,
            baseKids3B: null,
            baseKids3C: null,
            baseKids4A: null,
            baseKids4B: null,
            baseKids4C: null,
            baseExcedente: 0,
            timer: null,
            maxInfant1A: null,
            maxInfant1B: null,
            maxInfant2A: null,
            maxInfant2B: null,
            maxInfant3A: null,
            maxInfant3B: null,
            maxInfant3C: null,
            maxInfant3D: null,
            maxKids1A: null,
            maxKids1B: null,
            maxKids1C: null,
            maxKids2A: null,
            maxKids2B: null,
            maxKids2C: null,
            maxKids3A: null,
            maxKids3B: null,
            maxKids3C: null,
            maxKids4A: null,
            maxKids4B: null,
            maxKids4C: null,
            maxExcedente: 300
        }
    },
    methods: {
        clearAllData(){
            this.dateBorn = null;
            this.idade = null;
            this.nameKid = null;            
            this.nameParent = null;
            this.phoneParent = null;
            this.parentesco = null;
            this.parents = [];
            this.turmaKids = null;
            this.putParents = false;
            this.turmaOptions=[];  
            this.isError = false;
            this.infant1A= null;
            this.infant1B= null;
            this.infant2A= null;
            this.infant2B= null;
            this.infant3A= null;
            this.infant3B= null;
            this.infant3C= null;
            this.infant3D= null;
            this.kids1A= null;
            this.kids1B= null;
            this.kids1C= null;
            this.kids2A= null;
            this.kids2B= null;
            this.kids2C= null;
            this.kids3A= null;
            this.kids3B= null;
            this.kids3C= null;
            this.kids4A= null;
            this.kids4B= null;
            this.kids4C= null;
            this.excedente= null;
            this.baseInfantil1A= null;
            this.baseInfantil1B= null;
            this.baseInfantil2A= null;
            this.baseInfantil2B= null;
            this.baseInfantil3A= null;
            this.baseInfantil3B= null;
            this.baseInfantil3C= null;
            this.baseInfantil3D= null;
            this.baseKids1A= null;
            this.baseKids1B= null;
            this.baseKids1C= null;
            this.baseKids2A= null;
            this.baseKids2B= null;
            this.baseKids2C= null;
            this.baseKids3A= null;
            this.baseKids3B= null;
            this.baseKids3C= null;
            this.baseKids4A= null;
            this.baseKids4B= null;
            this.baseKids4C= null;
        },
        clearParentsInfo(){
            this.nameParent = null;
            this.phoneParent = null;
            this.parentesco = null;
            this.putParents = false;
        },
        CadastrarPais(){
            if(this.nameParent && this.phoneParent && this.parentesco){
                this.parents.push({
                    nameParent: this.nameParent,
                    phoneParent: this.phoneParent,
                    parentesco: this.parentesco.name
                })
                this.clearParentsInfo();
            }else{
                this.$toast.add({ severity: 'error', summary: 'Erro ao Cadastrar Pais', detail: 'Todas as informações devem ser preenchidas', life: 3000 });
            }
        },
        calcularIdade() {
            if(!this.session){
                return;
            }
            
            this.cleanData()
            this.turmaOptions = [];

            ////////////////////////////////////

            if( this.session.name == "1ª Sessão" ){
                this.baseInfantil1A= 15;
                this.maxInfant1A = 45;
                this.baseInfantil1B= 18;
                this.maxInfant1B = 45;
                this.baseInfantil2A= 27;
                this.maxInfant2A = 55;
                this.baseInfantil2B= 28;
                this.maxInfant2B = 55;
                this.baseInfantil3A= 25;
                this.maxInfant3A = 70;
                this.baseInfantil3B= 21;
                this.maxInfant3B = 70;
                this.baseInfantil3C= 22;
                this.maxInfant3C = 70;
                this.baseInfantil3D= 26;
                this.maxInfant3D = 70;
                this.baseKids1A= 30;
                this.maxKids1A = 60;
                this.baseKids1B= 42;
                this.maxKids1B = 60;
                this.baseKids1C= 33;
                this.maxKids1C = 60;
                this.baseKids2A= 33;
                this.maxKids2A = 60;
                this.baseKids2B= 31;
                this.maxKids2B = 60;
                this.baseKids2C= 35;
                this.maxKids2C = 60;
                this.baseKids3A= 44;
                this.maxKids3A = 60;
                this.baseKids3B= 50;
                this.maxKids3B = 60;
                this.baseKids3C= 55;
                this.maxKids3C = 60;
                this.baseKids4A= 48;
                this.maxKids4A = 60;
                this.baseKids4B= 55;
                this.maxKids4B = 60;
                this.baseKids4C= 38;
                this.maxKids4C = 60;    
            }
            if( this.session.name == "2ª Sessão" ){
                this.baseInfantil1A= 29;
                this.maxInfant1A = 45;
                this.baseInfantil1B= 28;
                this.maxInfant1B = 45;
                this.baseInfantil2A= 33;
                this.maxInfant2A = 55;
                this.baseInfantil2B= 27;
                this.maxInfant2B = 55;
                this.baseInfantil3A= 31;
                this.maxInfant3A = 70;
                this.baseInfantil3B= 27;
                this.maxInfant3B = 70;
                this.baseInfantil3C= 31;
                this.maxInfant3C = 70;
                this.baseInfantil3D= 38;
                this.maxInfant3D = 70;
                this.baseKids1A= 37;
                this.maxKids1A = 60;
                this.baseKids1B= 44;
                this.maxKids1B = 60;
                this.baseKids1C= 40;
                this.maxKids1C = 60;
                this.baseKids2A= 45;
                this.maxKids2A = 60;
                this.baseKids2B= 42;
                this.maxKids2B = 60;
                this.baseKids2C= 42;
                this.maxKids2C = 60;
                this.baseKids3A= 50;
                this.maxKids3A = 60;
                this.baseKids3B= 57;
                this.maxKids3B = 60;
                this.baseKids3C= 63;
                this.maxKids3C = 60;
                this.baseKids4A= 44;
                this.maxKids4A = 60;
                this.baseKids4B= 52;
                this.maxKids4B = 60;
                this.baseKids4C= 46;
                this.maxKids4C = 60;    
            }
            if( this.session.name == "3ª Sessão" ){
                this.baseInfantil1A= 17;
                this.maxInfant1A = 45;
                this.baseInfantil1B= 23;
                this.maxInfant1B = 45;
                this.baseInfantil2A= 22;
                this.maxInfant2A = 55;
                this.baseInfantil2B= 22;
                this.maxInfant2B = 55;
                this.baseInfantil3A= 29;
                this.maxInfant3A = 70;
                this.baseInfantil3B= 38;
                this.maxInfant3B = 70;
                this.baseInfantil3C= 31;
                this.maxInfant3C = 70;
                this.baseInfantil3D= 27;
                this.maxInfant3D = 70;
                this.baseKids1A= 33;
                this.maxKids1A = 60;
                this.baseKids1B= 34;
                this.maxKids1B = 60;
                this.baseKids1C= 28;
                this.maxKids1C = 60;
                this.baseKids2A= 39;
                this.maxKids2A = 60;
                this.baseKids2B= 46;
                this.maxKids2B = 60;
                this.baseKids2C= 46;
                this.maxKids2C = 60;
                this.baseKids3A= 40;
                this.maxKids3A = 60;
                this.baseKids3B= 50;
                this.maxKids3B = 60;
                this.baseKids3C= 54;
                this.maxKids3C = 60;
                this.baseKids4A= 43;
                this.maxKids4A = 60;
                this.baseKids4B= 42;
                this.maxKids4B = 60;
                this.baseKids4C= 28;
                this.maxKids4C = 60;    
            }
            if( this.session.name == "4ª Sessão" ){
                this.baseInfantil1A= 17;
                this.maxInfant1A = 45;
                this.baseInfantil1B= 13;
                this.maxInfant1B = 45;
                this.baseInfantil2A= 18;
                this.maxInfant2A = 55;
                this.baseInfantil2B= 15;
                this.maxInfant2B = 55;
                this.baseInfantil3A= 24;
                this.maxInfant3A = 70;
                this.baseInfantil3B= 11;
                this.maxInfant3B = 70;
                this.baseInfantil3C= 25;
                this.maxInfant3C = 70;
                this.baseInfantil3D= 32;
                this.maxInfant3D = 70;
                this.baseKids1A= 16;
                this.baseKids1B= 30;
                this.baseKids1C= 36;
                this.baseKids2A= 32;
                this.baseKids2B= 35;
                this.baseKids2C= 35;
                this.baseKids3A= 38;
                this.baseKids3B= 42;
                this.baseKids3C= 46;
                this.baseKids4A= 48;
                this.baseKids4B= 29;
                this.baseKids4C= 25;
                this.maxKids1A = 60;
                this.maxKids1B = 60;
                this.maxKids1C = 60;
                this.maxKids2A = 60;
                this.maxKids2B = 60;
                this.maxKids2C = 60;
                this.maxKids3A = 60;
                this.maxKids3B = 60;
                this.maxKids3C = 60;
                this.maxKids4A = 60;
                this.maxKids4B = 60;
                this.maxKids4C = 60;
            }




            //////////////////////////////////

            const filter = this.result[this.session.name] ?? {};

            this.infant1A = filter["Infantil 1-A"] ?? 0;
            this.infant1B = filter["Infantil 1-B"] ?? 0;
            this.infant2A = filter["Infantil 2-A"] ?? 0;
            this.infant2B = filter["Infantil 2-B"] ?? 0;
            this.infant3A = filter["Infantil 3-A"] ?? 0;
            this.infant3B = filter["Infantil 3-B"] ?? 0;
            this.infant3C = filter["Infantil 3-C"] ?? 0;
            this.infant3D = filter["Infantil 3-D"] ?? 0;
            this.kids1A = filter["Kids 1-A"] ?? 0;
            this.kids1B = filter["Kids 1-B"] ?? 0;
            this.kids1C = filter["Kids 1-C"] ?? 0;
            this.kids2A = filter["Kids 2-A"] ?? 0;
            this.kids2B = filter["Kids 2-B"] ?? 0;
            this.kids2C = filter["Kids 2-C"] ?? 0;
            this.kids3A = filter["Kids 3-A"] ?? 0;
            this.kids3B = filter["Kids 3-B"] ?? 0;
            this.kids3C = filter["Kids 3-C"] ?? 0;
            this.kids4A = filter["Kids 4-A"] ?? 0;
            this.kids4B = filter["Kids 4-B"] ?? 0;
            this.kids4C = filter["Kids 4-C"] ?? 0;
            this.excedente = filter["Excedente"] ?? 0;
            

            
            //////////////////////////////////////////////////

            const partes = this.dateBorn.split("/");
            const nascimento = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
            const hoje = new Date();

            let anos = hoje.getFullYear() - nascimento.getFullYear();
            const mesAtual = hoje.getMonth();
            const mesNascimento = nascimento.getMonth();
            const diaAtual = hoje.getDate();
            const diaNascimento = nascimento.getDate();

            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
                anos--;
            }

            this.idade = isNaN(anos) ? "-" : anos;

            if(this.idade == 2){
                this.turmaOptions = [
                    {name: "Infantil 1-A", count: this.infant1A, base: this.baseInfantil1A, max: this.maxInfant1A},
                    {name: "Infantil 1-B", count: this.infant1B, base: this.baseInfantil1B, max: this.maxInfant1B}
                ]
            }

            if(this.idade == 3){
                this.turmaOptions = [
                    {name: "Infantil 2-A", count: this.infant2A, base: this.baseInfantil2A, max: this.maxInfant2A},
                    {name: "Infantil 2-B", count: this.infant2B, base: this.baseInfantil2B, max: this.maxInfant2B}
                ]
            }

            if( this.idade == 4 ){
                this.turmaOptions = [
                    {name: "Infantil 2-A", count: this.infant2A, base: this.baseInfantil2A, max: this.maxInfant2A},
                    {name: "Infantil 2-B", count: this.infant2B, base: this.baseInfantil2B, max: this.maxInfant2B}
                ]
            }

            if( this.idade == 5 ){
                this.turmaOptions = [
                    {name: "Infantil 3-A", count: this.infant3A, base: this.baseInfantil3A, max: this.maxInfant3A},
                    {name: "Infantil 3-B", count: this.infant3B, base: this.baseInfantil3B, max: this.maxInfant3B},
                    {name: "Infantil 3-C", count: this.infant3C, base: this.baseInfantil3C, max: this.maxInfant3C},
                    {name: "Infantil 3-D", count: this.infant3D, base: this.baseInfantil3D, max: this.maxInfant3D}
                ]                
            }            

            if(this.idade == 6 || this.idade == 7){
                this.turmaOptions = [
                   {name: "Kids 1-A", count: this.kids1A, base: this.baseKids1A, max: this.maxKids1A},
                   {name: "Kids 1-B", count: this.kids1B, base: this.baseKids1B, max: this.maxKids1B},
                   {name: "Kids 1-C", count: this.kids1C, base: this.baseKids1C, max: this.maxKids1C},
                   {name: "Excedente", count: this.excedente, base: this.baseExcedente, max: this.maxExcedente}
                ]
            }

            if( this.idade == 8 || this.idade == 9){
                this.turmaOptions = [
                   {name: "Kids 2-A", count: this.kids2A, base: this.baseKids2A, max: this.maxKids2A},
                   {name: "Kids 2-B", count: this.kids2B, base: this.baseKids2B, max: this.maxKids2B},
                   {name: "Kids 2-C", count: this.kids2C, base: this.baseKids2C, max: this.maxKids2C},
                   {name: "Excedente", count: this.excedente, base: this.baseExcedente, max: this.maxExcedente}
                ]
            }

            if( this.idade == 10 ){
                this.turmaOptions = [
                   {name: "Kids 3-A", count: this.kids3A, base: this.baseKids3A, max: this.maxKids3A},
                   {name: "Kids 3-B", count: this.kids3B, base: this.baseKids3B, max: this.maxKids3B},
                   {name: "Kids 3-C", count: this.kids3C, base: this.baseKids3C, max: this.maxKids3C},
                   {name: "Excedente", count: this.excedente, base: this.baseExcedente, max: this.maxExcedente}
                ]
            }

            if( this.idade == 11 ){
                this.turmaOptions = [
                   {name: "Kids 4-A", count: this.kids4A, base: this.baseKids4A, max: this.maxKids4A},
                   {name: "Kids 4-B", count: this.kids4B, base: this.baseKids4B, max: this.maxKids4B},
                   {name: "Kids 4-C", count: this.kids4C, base: this.baseKids4C, max: this.maxKids4C},
                   {name: "Excedente", count: this.excedente, base: this.baseExcedente, max: this.maxExcedente}
                ]
            }

            if( this.idade > 11 || this.idade < 2){
                this.turmaOptions = [];
            }
        },
        async registerKids(){
            if(!this.dateBorn && !this.turmaKids && !this.session){
                this.isError = true;
                this.$toast.add({ severity: 'error', summary: 'Informações Obrigatorias', detail: 'Informações marcadas obrigatorias', life: 3000 });
                return
            }

            this.loading = true;

            const options ={
                url: `${import.meta.env.VITE_URL_MAIN}classes/nibCentral`,
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_PARSE_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_API_KEY}`,
                },
                data: {
                    nameKids: this.nameKid,
                    dateBorn: this.dateBorn,
                    session: this.session?.name,
                    turma: this.turmaKids?.name,
                    idade: this.idade,
                    parents: this.parents,                    
                }
            }

            await axios.request(options).then((response) => {
                this.clearAllData();
                console.log(response) 
                this.loading = false;               
                this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso', life: 3000 });
            }).catch((error) => {
                console.error(error)
            })
        },
        cleanData(){
            this.baseInfantil1A= null;
            this.baseInfantil1B= null;
            this.baseInfantil2A= null;
            this.baseInfantil2B= null;
            this.baseInfantil3A= null;
            this.baseInfantil3B= null;
            this.baseInfantil3C= null;
            this.baseInfantil3D= null;
            this.baseKids1A= null;
            this.baseKids1B= null;
            this.baseKids1C= null;
            this.baseKids2A= null;
            this.baseKids2B= null;
            this.baseKids2C= null;
            this.baseKids3A= null;
            this.baseKids3B= null;
            this.baseKids3C= null;
            this.baseKids4A= null;
            this.baseKids4B= null;
            this.baseKids4C= null;
            this.maxInfant1A= null,
            this.maxInfant1B= null,
            this.maxInfant2A= null,
            this.maxInfant2B= null,
            this.maxInfant3A= null,
            this.maxInfant3B= null,
            this.maxInfant3C= null,
            this.maxInfant3D= null,
            this.maxKids1A= null,
            this.maxKids1B= null,
            this.maxKids1C= null,
            this.maxKids2A= null,
            this.maxKids2B= null,
            this.maxKids2C= null,
            this.maxKids3A= null,
            this.maxKids3B= null,
            this.maxKids3C= null,
            this.maxKids4A= null,
            this.maxKids4B= null,
            this.maxKids4C= null           
        },
        calculatekids(option){
            const calculate = option.count + option.base
            if(calculate >= option.max){
                return 'error'
A           }else{return 'success'}
        },
        isDisabled(option) {
            return option.count + option.base >= option.max
        },
        calculateValue(option){

            const calculate = option.count + option.base

            if(calculate >= option.max){
                return "LOTADO"
            } return calculate
             
        },
        async sincroToBack(){
            const options ={
                url: `${import.meta.env.VITE_URL_MAIN}functions/contarTurmasPorSessao`,
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_PARSE_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_API_KEY}`,
                }
            }

            await axios.request(options).then((response) => {
                console.log(response)
                this.result = response.data.result
                this.$toast.add({ severity: 'success', summary: 'Quantidade Atualizada', detail: 'Sincronizado com sucesso', life: 3000 });
            }).catch((error) => {
                console.error(error)
            })
        },
        async conectarLiveQuery() {
            const Turma = Parse.Object.extend("nibCentral");
            const query = new Parse.Query(Turma);

            try {

                // Conectar ao Live Query
                this.subscription = await query.subscribe();
                console.log("Conectado?", this.subscription);
                // Quando uma nova turma for criada
                this.subscription.on("create", (novoItem) => {
                    console.log("Nova turma adicionada:", novoItem);
                    this.turmas.push({
                        id: novoItem.id,
                        sessao: novoItem.get("sessao"),
                        turma: novoItem.get("turma"),
                    });
                });
            } catch (error) {
                console.error("Erro ao conectar ao Live Query:", error);
            }
        },
    },
    watch:{
        dateBorn(newVal) {
            if (newVal?.length === 10) {
                this.calcularIdade();
            } else {
                this.idade = null;
            }       
        }
    },
   async mounted(){
        this.sincroToBack();
        // this.timer = setInterval(this.sincroToBack, 2* 60 * 1000);
        
        var query = new Parse.Query('nibCentral');
        let subscription = await query.subscribe();

        subscription.on('create', (object) => {
            console.log('object created', object.toJSON());

            const sessao = object.get("session");
            const turma = object.get("turma");

            if (this.result[sessao] && this.result[sessao][turma]) {
                this.result[sessao][turma] += 1;
            } else {
                this.result[sessao][turma] = 1;
            }

            // Atualiza a estrutura do result com o novo valor
            this.result = { ...this.result };
        });
        subscription.on('open', () => {
            console.log('subscription opened');
        });
        subscription.on('close', () => {
            console.log('subscription closed');
        });
    },
    unmounted(){
        clearInterval(this.timer);        
    },
}
</script>

<template>
    <div class="main">
        <div class="content">
            <MenuBar v-if="this.userInfos.levelAcess == 0"></MenuBar>
            <div v-else></div>
            <div class="organizer">
                <div class="rigthSide">
                    <strong class="title">Cadastro</strong>
                    <div class="organizerSession">
                        <div class="groupInput">
                            <span>Sessão :</span>
                            <Select 
                                v-model="session"
                                :options="sessionOptions"
                                optionLabel="name"
                                placeholder="Sessão"
                                :invalid="isError"
                                @update:modelValue="calcularIdade()"
                            />      
                        </div>
                    </div>
                    <div class="form">
                        
                        <div style="width: 100%; padding: 20px;">
                            <div style="display: flex; align-items: center;">
                                <div class="groupInput" style="width: 90%;">
                                    <span>Data de Nascimento :</span>
                                    <InputMask 
                                        id="basic" 
                                        v-model="dateBorn" 
                                        mask="99/99/9999" 
                                        placeholder="dd/mm/yyyy"
                                        :invalid="isError"
                                        @update:modelValue="calcularIdade()"
                                    />
                                </div>
                                <div 
                                    style="
                                        display: flex; 
                                        align-items: center; 
                                        padding: 20px; 
                                        font-size: 2rem;
                                    "
                                >{{ idade }}</div>
                            </div>
                            <div class="groupInput">
                                <span>Turma :</span>
                                <Select 
                                    v-model="turmaKids"
                                    :options="turmaOptions"
                                    optionLabel="name"
                                    placeholder="Turma"
                                    :invalid="isError"
                                    :optionDisabled="isDisabled"
                                >
                                    <template #empty>
                                        <div>
                                            <span>Data de Nascimento e Sessão precisam estar preenchidos</span>
                                        </div>
                                    </template>
                                    <template #option="slotProps">
                                        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                                            <div>{{ slotProps.option.name }}</div>
                                            <Tag :value="calculateValue(slotProps.option)" :severity="calculatekids(slotProps.option)"></Tag>
                                        </div>
                                    </template>
                                </Select>      
                            </div>
                        </div>

                        <div 
                            style="width: 100%;display: flex; flex-direction: column;  align-items: center; padding: 20px;" 
                        >
                            <Button
                                label="Dados Adicionais"
                                @click="putParents = true"
                                v-show="!putParents"
                            ></Button>
                            <div 
                                v-show="putParents"
                                style="width: 100%; display: flex; flex-direction: column; align-items: center;"
                            >
                                <div class="groupInput">
                                    <span>Nome da Criança :</span>
                                    <InputText 
                                        placeholder="Nome da Criança" 
                                        v-model="nameKid"   
                                    />
                                </div>
                                <div class="groupInput">
                                    <span>Nome do Responsavel :</span>
                                    <InputText 
                                        placeholder="Nome do Responsavel"
                                        v-model="nameParent"
                                    />
                                </div>
                                <div class="groupInput">
                                    <span>Telefone :</span>
                                    <InputMask
                                        v-model="phoneParent" 
                                        mask="(99)99999-9999" 
                                        placeholder="(**)*****-****" />
                                </div>
                                <div class="groupInput">
                                    <span>Parentesco :</span>
                                    <Select 
                                        v-model="parentesco"
                                        :options="familyOptions"
                                        optionLabel="name"
                                        placeholder="Parentesco"
                                    />      
                                </div>
                                <div style="display: flex; gap: 20px;">
                                    <Button
                                        label="Adicionar Responsável"
                                        @click="CadastrarPais()"
                                    ></Button>
                                    <Button
                                        label="Fechar"
                                        @click="putParents = false"
                                    ></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="cardOrganizer">
                        <div class="card" v-for="(parent, index) in parents" :key="index">
                            <h1>{{parent.nameParent}}</h1>
                            <h2>{{parent.phoneParent}}</h2>
                            <h3>{{parent.parentesco}}</h3>
                        </div>                        
                    </div>
                    <Button
                        label="Cadastrar Kids"
                        size="large"
                        @click="registerKids()"
                        :loading="loading"
                    ></Button>
                </div>
            </div>
        </div>
    </div>
    <Toast />
</template>

<style scoped>
.main{
    display: flex;
    justify-content: center;
    width: 100dvw;
    height: 100dvh;
}
.content{
    width: 100%;
    height: 100dvh;
}
.organizer{
    display: flex;
    width: 100%;
    gap: 20px;
}
.rigthSide{
    padding: 20px;
    width: 100%;
    border: 1px solid white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin: 20px;
}
.form{
    display: flex; 
    gap: 30px; 
    margin: 10px 0; 
    width: 70%;
}
.cardOrganizer{
    width: 90%;
    max-height: 300px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;

    align-items: center;
    justify-content: center;
    margin: 20px;
}
.card{
    width: 300px;
    height: 150px;
    border: 1px solid #b1b1b1;
    border-radius: 20px;
    margin: 20px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 10px;
    word-break: break-all;
    padding: 20px;
}
.title{
    font-size: 3rem;
    font-weight: bold;
}

.organizerSession{
    width: 25%;
}

@media screen and (max-width: 800px) {
    .organizer{
        flex-direction: column;
    }
    .form{
        flex-direction: column;
        width: 100%;
    }
    .rigthSide{
        width: 100%;
        margin: 20px 0px;
        padding: 0px;
        box-shadow: none
    }
    .title{
        font-size: 2rem;
    }
    .organizerSession{
        width: 80%;
    }
}

</style>