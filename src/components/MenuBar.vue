<script>
</script>

<template>
<div class="contenMenu">
    <div>
       <img src="../assets/all_logo.png" width="70px"><img> 
    </div>
    <div class="title">
        Kids Day
    </div>
    <div style="display: flex; gap: 20px;">
        <router-link to="/register" class="buttonLink">
            <span class="pi pi-home"></span>
            <span>Registro</span>
        </router-link>
        <router-link to="/dashboard" class="buttonLink">
            <span class="pi pi-objects-column"></span>
            <span>Dashboard</span>
        </router-link>
    </div>
</div>    
</template>

<style scoped>
.contenMenu{
    width: 100dvw;
    padding: 20px;
    /* height: 150px; */
    display: flex;
    justify-content: space-around;
    background-color: var(--primary);
    color: white;
    align-items: center;
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
}
.router-link-exact-active{
    color: var(--secondary);
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

    }

}
</style>