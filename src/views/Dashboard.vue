    <script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';
import Parse from 'parse/dist/parse.min.js';

//Oficial
Parse.initialize("pyJ2pmDqnkg39Pvf2CjhwHmM3SasEAPuZddS1B1b", "21gGRnI6APWZzLXHa51hNb3wcCHFJkwwa1czR9uy");
Parse.serverURL = "https://customkids.b4a.io/";

export default{
    components:{
        MenuBar
    },
    data(){
        return{
            result:null,
            total: null,
            timer: null      
        }
    },
    methods:{
        async getStatistics(){
            const options = {
                url: `${import.meta.env.VITE_URL_MAIN}functions/statisticsDash`,
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_PARSE_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_API_KEY}`,
                }
            }

            await axios.request(options).then((response) => {
                console.log(response)
                this.result = response.data.result
            }).catch((error) => {
                console.error(error)
            })
        },
        addMoreOne(){
            this.count++
        },
        logicInsert(object){
            const sessao = object.get("session");
            const turma = object.get("turma");

            if (this.result.sessao && this.result.sessao.turma) {
                this.result.sessao.turma += 1;
            } else {
                this.result.sessao.turma = 1;
            }

            // Atualiza a estrutura do result com o novo valor
            this.result = { ...this.result };            
        },

        async totalPerSession(){
            const options = {
                url: `${import.meta.env.VITE_URL_MAIN}functions/quantidadeCriancasPorSessao`,
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_PARSE_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_API_KEY}`,
                }
            }

            await axios.request(options).then((response) =>{
                console.log(response)
                this.total = [response.data.result]
            }).catch((error)=>{
                console.log(error)
            })
        }
    },
    async mounted(){
        this.getStatistics();  
        this.totalPerSession() 
        
        var query = new Parse.Query('nibCentral');
        let subscription = await query.subscribe();

        subscription.on('create', (object) => {
            console.log('object created', object.toJSON());
            this.logicInsert(object)
        });
        subscription.on('open', () => {
            console.log('subscription opened');
            this.count++
        });
        subscription.on('close', () => {
            console.log('subscription closed');
        });
        // this.timer = setInterval(this.getStatistics, 2* 60 * 1000);
    }
}
</script>

<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="content">
            <div v-for="(session, i) in total" :key="i" style="width: 100dvw; display: flex; flex-wrap: wrap;">
                <div 
                    style="
                        padding: 20px;
                        border: 1px solid #353535;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 250px;
                    "
                >{{ session }}</div>
            </div>
            <Accordion :value="['0']" multiple>
                <AccordionPanel  v-for="(r, i) in result" :key="i" :value="r.session">
                    <AccordionHeader>{{ r.session }}</AccordionHeader>
                    <AccordionContent>
                        <div class="organizer">
                            <div v-for="(t, i) in r.turmas" :key="i" class="card">
                                <h1>{{t.turma}}</h1>
                                <h2>{{t.quantidade}}</h2>
                            </div>                                                   
                        </div>
                    </AccordionContent>
                </AccordionPanel >
            </Accordion>
        </div>
    </div>
</template>

<style scoped>
.main{
    display: flex;
    flex-direction: column;
    width: 100dvw;
    height: 100dvh;
}
.content{
    width: 100%;
    height: 100%;
    padding: 10px;
    margin: 10px;
}
.organizer{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}
.card{
    border: 1px solid white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    padding: 10px;
    gap: 10px;
}

h1, h2{ 
    font-size: 2.1rem;
}
</style>