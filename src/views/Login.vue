<script>
import axios from 'axios'

export default {
    data(){
        return{
            username: null,
            password: null,
            error: false,
            loading: false
        }
    },
    methods:{
        async login(){
            this.loading = true

            if(!this.username && !this.password){
                this.$toast.add({ severity: 'error', summary: 'Informações Obrigatorias', detail: 'Informações marcadas obrigatorias', life: 3000 });
                this.loading = false
                return this.error = true
            }

            const options = {
                url: `${import.meta.env.VITE_URL_MAIN}login`,
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_PARSE_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_API_KEY}`,
                },
                data: {
                    username: this.username.toLowerCase(),
                    password: this.password
                }
            }

            await axios.request(options).then((response) => {
                console.log(response)
                this.loading = false
                const formated = JSON.stringify(response.data)
                localStorage.setItem('userInfos', formated)
                this.$router.push('/register')
            }).catch((error) => {
                console.error(error)
                this.loading = false
                this.$toast.add({ severity: 'error', summary: 'Erro ao Realizar Login', detail: error.response.data.error, life: 3000 });
            })
        }
    }
}
</script>

<template>
    <div class="main">  
        
        <div class="card">
            <img src="../assets/logoKidsDay.png" width="200px">

            <div style="width: 100%; display: flex; flex-direction: column; gap: 20px;">

                <InputText
                    v-model="username" 
                    placeholder="Username"
                    style="width: 100%;"
                    :invalid="error"
                />

                <Password
                    v-model="password"
                    placeholder="Password"
                    :feedback="false"
                    toggleMask
                    :invalid="error"
                    @keyup.enter="login()"
                />

            </div>

            <div style="display: flex; gap:10px;">
                <Button 
                    label="Login"
                    @click="login()"
                    :loading="loading"
                />
            </div>
            <div>TESTE</div>
        </div>
        <Toast></Toast>    
    </div>
</template>

<style scoped>
.main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100dvw;
    height: 100dvh;

}
.card{
    padding: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 6px 22px 36px 13px rgba(0,0,0,0.1);
}

.main {
  background: linear-gradient(74deg,#34edda,#5e6cc9,#70f4ac);
  background-size: 180% 180%;
  animation: gradient-animation 15s ease infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media screen and (max-width: 800px) {
    .main{
        width: 100dvw;
        height: 100lvh;
    }
}
</style>