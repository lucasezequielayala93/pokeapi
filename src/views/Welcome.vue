<template>
    <section class="welcome-page">
        <div class="columns is-centered">
            <div class="column is-half">
                <div class="mb-6">
                    <img src="../assets/logo.svg" alt="Logo">
                </div>
                <div class="mb-5">
                    <h1 class="title">Welcome to Pokédex</h1>
                </div> 
                <div class="mb-6">
                    <p>
                        The digital encyclopedia created by Professor Oak is an invaluable tool <br>
                        to Trainers in the Pokémon world.
                    </p>
                </div>
                <div>
                    <b-button 
                        tag="router-link"
                        :to="'/list'"
                        type="is-danger" 
                        rounded>
                        Get started
                    </b-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "Welcome",
    };
</script>

<style lang="scss" scoped>
    section{
        .columns{
            .column{
                text-align: center;
            }
        }
    }
</style>
