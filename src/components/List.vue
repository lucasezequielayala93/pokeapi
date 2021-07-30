<template>
    <div class="list">
        <template v-if="!filteredPokemonList.length & !loading">
            <div class="empty">
                <div class="mb-4">
                    <h1 class="title">Uh-oh!</h1>
                </div> 
                <div class="mb-4">
                    <p>
                        You look lost on your journey!
                    </p>
                </div>
                <b-button 
                    tag="router-link"
                    :to="'/'"
                    type="is-danger" 
                    rounded>
                    Go back home
                </b-button>
            </div>
        </template>
        <template v-else>
            <div class="box is-shadowless is-clickable" 
                v-for="(pokemon, index) in filteredPokemonList" 
                :key="index"
                @click="showPokemonDetails(list[index])">
                <div class="level is-mobile">
                    <div class="level-left">
                        <div class="level-item">
                            {{ pokemon.name }}
                        </div>
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <button class="button is-light"
                                @click.stop.prevent="(!pokemon.favorite) ? addPokemonFavorite(index) : removePokemonFavorite(index)">
                                <b-icon
                                    :type="(pokemon.favorite) ? 'is-warning' : 'is-grey-light'"
                                    size="is-medium"
                                    pack="fas"
                                    icon="star">
                                </b-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <template v-if="loading">
                <b-skeleton 
                    v-for="(item, index) in 10" 
                    :key="index"
                    height="56" 
                    animated>
                </b-skeleton>
            </template>
        </template>
        
    </div>
</template>

<script>
    import {alertFailed} from "@/helpers";
    export default {
        name: 'List',
        data(){
            return{
                list: [],
                offset: 10,
                filter: '',
                scrolled: true,
                loading: false,
            }
        },
        methods:{
            async fetchPokemonList(){
                try {
                    this.loading = true;
                    const query = await this.$services.pokeapi.index(this.offset);
                    query.data.results.forEach(pokemon => {
                        this.list.push({
                            id: pokemon.url.split('/')[6],
                            name: pokemon.name,
                            favorite: false
                        })
                    });
                    this.loading = false;
                } catch (error) {
                    alertFailed('Ha ocurrido un error');
                    this.loading = false;
                }
            },
            addPokemonFavorite(index){
                this.list[index].favorite = true;
                this.$store.dispatch('setFavorites', {  
                    id: this.list[index].id, 
                    name: this.list[index].name, 
                    favorite: this.list[index].favorite
                });
            },
            removePokemonFavorite(index){
                this.list[index].favorite = false;
                this.$store.dispatch('removeFavorite', this.list[index].id);
            },
            setPokemonFavorites(){
                const favorites = this.$store.getters.getFavorites;
                this.list.find(pokemon => {
                    pokemon.favorite = false;
                    favorites.find(favorite => { 
                        if(favorite.id == pokemon.id)
                            pokemon.favorite = true;
                    })
                });
                
            },
            handleScrolled(){
                window.onscroll = async () => {
                    const bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
                    if (bottomOfWindow & this.scrolled) {
                        this.offset = this.offset + 10;
                        await this.fetchPokemonList();
                        this.setPokemonFavorites();
                    }
                }
            },
            showPokemonDetails(pokemon){
                this.$eventBus.$emit('details', pokemon);
            }
        },
        watch:{
            '$route.name': async function() {

                if(this.$route.name === 'List'){
                    this.list = [];
                    this.offset = 10;
                    await this.fetchPokemonList();
                    this.setPokemonFavorites();
                    this.scrolled = true;
                }  

                if(this.$route.name === 'Favorites'){
                    this.list = this.$store.getters.getFavorites;
                    this.scrolled = false;
                }       
            },
            '$store.getters.getFavorites': function() {
                this.setPokemonFavorites();
            }
        },
        computed:{
            filteredPokemonList(){
                return this.list.filter(item => { 
                    return item.name.match(this.filter);
                });
            }
        },
        async created(){
        
            if(this.$route.name === 'List'){
                await this.fetchPokemonList();
                this.setPokemonFavorites();
                this.scrolled = true;
            }    

            if(this.$route.name === 'Favorites'){
                this.$eventBus.$emit('Loading', true);
                this.list = this.$store.getters.getFavorites;
                this.scrolled = false;
            }  
        },
        mounted(){
            this.$eventBus.$emit('Loading', true);

            this.handleScrolled();
            this.$eventBus.$on('search', (value) => {
                this.filter = value;
            });

            setTimeout(() => {
                this.$eventBus.$emit('Loading', false);
            }, 3000);
        }
    }
</script>

<style lang="scss" scoped>
    .list{
        margin-bottom: 4rem;
        .empty{
            text-align: center;
        }
        .box{
            margin-bottom: 1rem!important;
            padding: .5rem 1.25rem;
            button{
                border-radius: 50%;
            }
        }
    }
    
    $box-radius: 5px;
</style>