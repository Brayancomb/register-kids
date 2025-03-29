<script>
import axios from 'axios';
import MenuBar from '../components/MenuBar.vue';

export default{
    components:{
        MenuBar
    },
    data(){
        return{
            result:[]            
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
        }
    },
    mounted(){
        this.getStatistics();
    }
}
</script>

<template>
    <div class="main">
        <MenuBar></MenuBar>
        <div class="content">
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