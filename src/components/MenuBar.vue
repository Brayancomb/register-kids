<script>
import axios from 'axios'

export default{
    data(){
        return{
            userInfos: JSON.parse(localStorage.getItem('userInfos')),
            items:[
                {
                    label: 'Logout',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.logout()
                    }
                },                
                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    command: () => {
                        this.$router.push('/dashboard')
                    }
                },
                {
                    label: 'Register',
                    icon: 'pi pi-home',
                    command: () => {
                        this.$router.push('/register')
                    }
                }
                
                
            ]
        }
    },
    methods:{
        async logout(){
            const options = {
                url: `${import.meta.env.VITE_URL_MAIN}logout`,
                method: 'POST',
                headers: {
                    'X-Parse-Application-Id': `${import.meta.env.VITE_PARSE_ID}`,
                    'X-Parse-REST-API-Key': `${import.meta.env.VITE_API_KEY}`,
                    'X-Parse-Session-Token': this.userInfos.sessionToken
                }
            }

            await axios.request(options).then((response) => {
                console.log(response)
                localStorage.removeItem('userInfos')
                this.$router.push('/')                
            }).catch((error) => {
                console.error(error)
                this.$toast.add({ severity: 'error', summary: 'Erro ao Realizar Login', detail: error.response.data.error, life: 3000 });
            })
        }
    }
}
</script>

<template>
<div class="contenMenu">
    <div>
       <img src="../assets/all_logo.png" width="70px"><img> 
    </div>
    <div class="title">
        Kids Day
    </div>
    <div class="menuOptions">
        <router-link to="/register" class="buttonLink">
            <span class="pi pi-home"></span>
            <span>Registro</span>
        </router-link>
        <router-link to="/dashboard" class="buttonLink">
            <span class="pi pi-objects-column"></span>
            <span>Dashboard</span>
        </router-link>
        <div class="buttonLink" @click="logout()">
            <span class="pi pi-sign-out"></span>
            <span>Sair</span>
        </div>
    </div>
    <Toast></Toast>
</div>
<div class="contentMobile">
    <SpeedDial
        :model="items" 
        direction="up"
        :style="{ position: 'fixed', right: '1rem', bottom: '1rem', 'z-index': '100' }"
    >
        <template #item="{ item, toggleCallback }">
            <div class="organizerButtonItem" @click="toggleCallback">
                <span :class="item.icon"></span>
                <span>{{ item.label }}</span>
            </div>
        </template>
    </SpeedDial>
</div>
</template>

<style scoped>
.contenMenu{
    width: 100dvw;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    background-color: var(--primary);
    color: white;
    align-items: center;
}
.contentMobile{
    display: none;
}
.title{
    font-size: 2rem;
}
.buttonLink{
    color: white;
    text-decoration: none;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}
.router-link-exact-active{
    color: var(--secondary);
}
.menuOptions{
    display: flex;
    gap: 20px;
}
.organizerButtonItem{
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding: 10px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: 10px;
    background-color: var(--helper-primary-dark);
    color: white;
}

@media screen and (max-width: 800px){
    .title{
        display: none;
    }
    .contenMenu{
        display: flex;
        justify-content: space-between;
        padding: 20px;
        align-items: center;
        display: none;

    }
    .contentMobile{
        display: contents;
        position: fixed; 
    }
}
</style>