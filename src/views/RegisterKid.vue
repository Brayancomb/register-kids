<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import Parse from 'parse/dist/parse.min.js';
import { Menu } from 'primevue';
//Oficial
// Parse.initialize("pyJ2pmDqnkg39Pvf2CjhwHmM3SasEAPuZddS1B1b", "21gGRnI6APWZzLXHa51hNb3wcCHFJkwwa1czR9uy");
// Parse.serverURL = "wss://customkids.b4a.io/";

// test.GrupoCidade
// Parse.initialize("zFnXp8duZFOLBWfnqnj9hPbPcXd1YYBv7155jKyu", "FIFzV9EkueocfjksA9RmdFbPSYuP4WCHHFOFd9L0");
// Parse.serverURL = "wss://grupocidade.b4a.io/";


export default {
    components:{
        MenuBar
    },
    data(){
        return {
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
            familyOptions: [
                {name: "Pai"},
                {name: "Mae"},
                {name: "Irmao(a)"},
                {name: "Tio(a)"},
                {name: "Avo(a)"},
                {name: "Outro"}                
            ],
            sessionOptions:[
                {name: "1ª Sessão"},
                {name: "2ª Sessão"},
                {name: "3ª Sessão"},
                {name: "4ª Sessão"}
            ],
            turmaOptions:[],

            teste:[]
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
            this.session = null;
            this.parents = [];
            this.turmaKids = null;
            this.putParents = false;
            this.turmaOptions=[];  

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
                this.$toast.add({ severity: 'error', summary: 'Erro ao Cadastrar', detail: 'Todas as informações devem ser preenchidas', life: 3000 });
            }
        },
        calcularIdade() {
            const partes = this.dateBorn.split("/");
            const nascimento = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
            const hoje = new Date();

            let anos = hoje.getFullYear() - nascimento.getFullYear();
            const mesAtual = hoje.getMonth();
            const mesNascimento = nascimento.getMonth();
            const diaAtual = hoje.getDate();
            const diaNascimento = nascimento.getDate();

            // Ajuste caso o aniversário ainda não tenha ocorrido no ano
            if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
                anos--;
            }

            this.idade = anos;

            if(this.idade == 6 || this.idade == 7){
                this.turmaOptions = [
                    {name: "Kids 1-A"},
                    {name: "Kids 1-B"},
                    {name: "Kids 1-C"},
                    {name: "Kids 2-A"},
                    {name: "Kids 2-B"},
                    {name: "Kids 2-C"}
                ]
            }

            if(this.idade == 8 || this.idade == 9){
                this.turmaOptions = [
                    {name: "Kids 2-A"},
                    {name: "Kids 2-B"},
                    {name: "Kids 2-C"},
                    {name: "Kids 3-A"},
                    {name: "Kids 3-B"},
                    {name: "Kids 3-C"}
                ]
            }

            if(this.idade == 10 || this.idade == 11){
                this.turmaOptions = [
                    {name: "Kids 3-A"},
                    {name: "Kids 3-B"},
                    {name: "Kids 3-C"},
                    {name: "Kids 4-A"},
                    {name: "Kids 4-B"},
                    {name: "Kids 4-C"}
                ]
            }

            if( this.idade > 11 || this.idade < 6){
                this.turmaOptions = [];
            }
        },
        async registerKids(){
            if(!this.dateBorn && !this.turmaKids && !this.session){
                return alert("NAO PODEMOS CONTINUAR")
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
                // console.log(response) 
                this.loading = false;               
                this.$toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado com sucesso', life: 3000 });
            }).catch((error) => {
                console.error(error)
            })
        }

    },
    watch:{
        dateBorn(newVal) {
            if (newVal?.length === 10) { // Só calcula a idade se a data estiver completa
                this.calcularIdade();
            } else {
                this.idade = null; // Reseta a idade enquanto a data não está completa
            }       
        }
    },
    async mounted() {

        // var query = new Parse.Query('nibCentral');
        // // var query = new Parse.Query('Trips');
        // let subscription = await query.subscribe();

        // subscription.on('create', (object) => {
        //     console.log('object created');
        // });
        // subscription.on('delete', (object) => {
        //     console.log(object);
        // });
        // subscription.on('open', () => {
        //     console.log('subscription opened');
        // });
        // subscription.on('close', () => {
        //     console.log('subscription closed');
        // });
    }

}
</script>

<template>
    <div class="main">
        <div class="content">
            <MenuBar></MenuBar>
            <div class="organizer">
                <div class="rigthSide">
                    <h1>Cadastro</h1>
                    <div class="form">
                        <div style="width: 100%;">
                            <div class="groupInput">
                                <span>Nome da Criança :</span>
                                <InputText 
                                    placeholder="Nome da Criança" 
                                    v-model="nameKid"   
                                />
                            </div>
                            <div style="display: flex; gap: 20px; align-items: center;">
                                <div class="groupInput">
                                    <span>Data de Nascimento :</span>
                                    <InputMask 
                                        id="basic" 
                                        v-model="dateBorn" 
                                        mask="99/99/9999" 
                                        placeholder="dd/mm/yyyy"
                                    />
                                </div>
                                <div style="display: flex; align-items: center; padding: 20px; font-size: 2rem;">{{ idade }}</div>
                            </div>
                            <div class="groupInput">
                                <span>Sessão :</span>
                                <Select 
                                    v-model="session"
                                    :options="sessionOptions"
                                    optionLabel="name"
                                    placeholder="Sessão"
                                />      
                            </div>
                            <div class="groupInput">
                                <span>Turma :</span>
                                <Select 
                                    v-model="turmaKids"
                                    :options="turmaOptions"
                                    optionLabel="name"
                                    placeholder="Sessão"
                                />      
                            </div>
                        </div>

                        <div style="width: 100%;display: flex; flex-direction: column;  align-items: center;" >
                            <Button
                                label="Adicionar Responsável"
                                @click="putParents = true"
                                v-show="!putParents"
                            ></Button>
                            <div 
                                v-show="putParents"
                                style="width: 100%; display: flex; flex-direction: column; align-items: center;">
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
                                        id="basic" 
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
                                <Button
                                    label="Adicionar Responsável"
                                    @click="CadastrarPais()"
                                ></Button>
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.organizer{
    display: flex;
    width: 100%;
    height: 100%;
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
    margin: 30px 0; 
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
}

</style>