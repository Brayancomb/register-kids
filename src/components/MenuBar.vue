<script>
</script>

<template>
<div class="contenMenu">
    <div style="margin-left: 20px;">
       <img src="../assets/all_logo.png" width="70px"><img> 
    </div>
    <div class="title">
        Kids Day
    </div>
    <div style="display: flex; gap: 20px;">
        <router-link to="/register" class="buttonLink">Register</router-link>
        <router-link to="/dashboard" class="buttonLink">Dashboard</router-link>
    </div>
</div>    
</template>

<style scoped>
.contenMenu{
    width: 100dvw;
    padding: 30px;
    display: flex;
    justify-content: space-between;
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
}
.router-link-exact-active{
    color: var(--secondary);
}
</style>0