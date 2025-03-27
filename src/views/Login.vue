<template>
    <div class="main">
        
        <div class="card">
            <span>Login</span>

            <InputText placeholder="Username" />

            <Password placeholder="Password" />

            <div style="display: flex; gap:10px;">
                <Button 
                    label="Login"
                    @click="$router.push({name:'Register'})"
                />
            </div>
        </div>
    
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