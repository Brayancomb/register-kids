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
                    username: this.username,
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
            <span>Login</span>

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
                />

            </div>

            <div style="display: flex; gap:10px;">
                <Button 
                    label="Login"
                    @click="login()"
                    :loading="loading"
                />
            </div>
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
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    border: 1px solid var(--primary);
}
</style>