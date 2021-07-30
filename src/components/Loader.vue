<template>
    <div class="pokeloader" v-if="is_active">
        <img src="../assets/loader.svg" alt="Loader">
    </div>
</template>

<script>
    export default {
        name: 'Loader',
        data(){
            return{
                is_active: false
            }
        },
        mounted(){
            this.$eventBus.$on('Loading', (value) => {
                this.is_active = value;
            });
        }
    }
</script>

<style lang="scss" scoped>
    .pokeloader{
        position: fixed;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f9f9f9;
        z-index: 99;
        img{
            animation: pulse 0.6s alternate infinite ease-in-out;
        }
    }
    @keyframes pulse {
        to {
            transform: scale(0.8);
            opacity: 0.8;
        }
    }
</style>