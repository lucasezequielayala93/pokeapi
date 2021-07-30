<template>
    <div class="search">
        <b-field>
            <b-input 
                v-model="value"
                @input="$eventBus.$emit('search', value)"
                placeholder="Search..."
                type="search"
                icon-pack="fas"
                icon="search">
            </b-input>
        </b-field>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data(){
            return{
                value: '',
            }
        }
    }
</script>

<style lang="scss" scoped>
    .search{
        margin-bottom: 2rem;
    }
    

    
</style>