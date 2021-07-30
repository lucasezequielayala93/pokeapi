<template>
    <nav class="navbar is-fixed-bottom">
        <div class="buttons">
            <b-button
                tag="router-link"
                :to="'/list'" 
                type="is-danger"
                icon-pack="fas"
                icon-left="list"
                rounded
                :disabled="$route.name == 'List'">
                All
            </b-button>
            <b-button 
                tag="router-link"
                :to="'/list/favorites'"
                type="is-danger"
                icon-pack="fas"
                icon-left="star"
                rounded
                :disabled="$route.name == 'Favorites'">
                Favorites
            </b-button>
        </div>
    </nav>
    
</template>

<script>
    export default {
        name: 'BottomBar'
    }
</script>

<style lang="scss" scoped>
    nav{
        display: flex;
        justify-content: center;
        background-color: $white;
        box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
        padding: 1rem;
        .columns{
            .column{
                .buttons{
                    justify-content: space-around;
                    button{
                        width: 47%;
                    }
                }
            }
        }
    }
    .button{
        width: 300px;
        &[disabled]{
            background-color: $grey-light!important;
            color: $white;
            opacity: 1;
        }
    }
    @media (max-width: 700px) {
        .button {
            width: 200px;
        }
    }
    @media (max-width: 500px) {
        .button {
            width: 150px;
        }
    }
    @media (max-width: 400px) {
        .button {
            width: 120px;
        }
    }
</style>