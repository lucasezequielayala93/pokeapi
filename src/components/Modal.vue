<template>
    <b-modal v-model="is_active" 
        :width="538"
        aria-role="dialog"
        aria-modal
        :destroy-on-hide="false"
        has-modal-card
        :can-cancel="false">
        <template v-if="!loading">
            <div class="card">
                <div class="card-image">
                    <img src="../assets/background.svg">
                    <figure class="image is-128x128">
                        <img :src="sprite" height="128" :alt="`${name}_sprite`">
                    </figure>
                    <button class="button is-ghost is-medium"
                        @click="is_active = false">
                        <b-icon
                            pack="fas"
                            icon="times-circle">
                        </b-icon>
                    </button>
                </div>
                <div class="card-content">
                    <div class="content">
                        <ul class="menu-list">
                            <li>
                                <strong>Name:</strong> {{ name }} 
                            </li>
                            <li>
                                <strong>Weight:</strong> {{ weight }} 
                            </li>
                            <li>
                                <strong>Height:</strong> {{ height }}
                            </li>
                            <li>
                                <strong>Types:</strong> {{ types.toString() }}
                            </li>
                        </ul>
                    </div>
                </div>
                <footer class="card-footer">
                    <div class="card-footer-item">
                        <b-button type="is-danger"
                            rounded
                            v-clipboard:copy="copyClipboard()">
                            Share to my friends
                        </b-button>
                        <button class="button is-light"
                            @click="(!favorite) ? addPokemonFavorite() : removePokemonFavorite()">
                            <b-icon
                                :type="(favorite) ? 'is-warning' : 'is-grey-light'"
                                size="is-medium"
                                pack="fas"
                                icon="star">
                            </b-icon>
                        </button>
                    </div>
                </footer>
            </div>
        </template>    
        <template v-else>
            <div class="card">
                <div class="card-image">
                    <b-skeleton width="500" height="220" animated></b-skeleton>
                </div>
                <div class="card-content">
                    <div class="content">
                        <ul class="menu-list">
                            <li v-for="(item, index) in 4" :key="index">
                                <b-skeleton width="200" animated></b-skeleton>
                            </li>
                        </ul>
                    </div>
                </div>
                <footer class="card-footer">
                    <div class="card-footer-item">
                        <b-skeleton width="175" height="40" rounded animated></b-skeleton>
                        <b-skeleton width="40" height="40" circle animated position="is-right"></b-skeleton>
                    </div>
                </footer>
            </div>
        </template>  
    </b-modal>
</template>

<script>
    import {alertFailed} from "@/helpers";
    export default {
        name: 'Modal',
        data(){
            return{
                is_active: false,
                loading: true,
                index: '',
                id: '',
                sprite: '',
                name: '',
                weight: '',
                height: '',
                types: [],
                favorite: false
            }
        },
        methods:{
            async fetchPokemon(pokemon){
                try {
                    const query = await this.$services.pokeapi.show(pokemon.id);
                    this.id = query.data.id; 
                    this.sprite = query.data.sprites.other.dream_world.front_default;
                    this.name = query.data.name;
                    this.weight = query.data.weight;
                    this.height = query.data.height;
                    this.types = query.data.types.map(item => item.type.name);
                    this.favorite = pokemon.favorite;
                    this.loading = false;
                } catch (error) {
                    alertFailed('Ha ocurrido un error!');
                    this.loading = false;
                }
            },
            addPokemonFavorite(){
                this.favorite = true;
                this.$store.dispatch('setFavorites', {  
                    id: this.id, 
                    name: this.name, 
                    favorite: this.favorite
                });
            },
            removePokemonFavorite(){
                this.favorite = false;
                this.$store.dispatch('removeFavorite', this.id);
            },
            copyClipboard(){
                return `${this.name}, weight: ${this.weight}, height: ${this.height}, types: ${this.types}`;
            }
        },
        created(){
            this.$eventBus.$on('details', (data) => {
                this.fetchPokemon(data);
                this.is_active = true;
            });
        }
    }
</script>

<style lang="scss" scoped>
    .card-image{
        figure{
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            margin: auto;
            img{
                max-height: 128px;
            }
        }
        button{
            position: absolute;
            right: 0;
            &.is-ghost{
                color: $white;
                &:hover{
                    color: $white;
                    opacity: .8;
                }
            }
        }
    }
    .content{
        ul{
            list-style: none;
            margin: 0;
            li{
                border-bottom: 1px solid $light;
                padding-top: .75rem;
                padding-bottom: .75rem;
            }
        }
    }
    .card-footer{
        border-top: 0;
        .card-footer-item{
            padding-top: 0;
            justify-content: space-between;
            .button:last-child{
                border-radius: 50%;
            }
        }
    }
    
</style>