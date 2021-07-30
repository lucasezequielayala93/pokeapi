<template>
    <section class="list-page">
        <div class="columns is-centered">
            <div class="column is-half">
                <search/>
                <list/>
            </div>
        </div>
        <modal/>
        <bottom-bar/>
    </section>
</template>

<script>
    import search from "@/components/Search.vue";
    import bottomBar from "@/components/BottomBar.vue";
    import list from "@/components/List.vue";
    import modal from "@/components/Modal.vue";
    export default {
        name: 'List',
        components:{
            search,
            bottomBar,
            list,
            modal
        }
    }
</script>

<style lang="scss" scoped>
    section{
        padding-top: 1.5rem;
    }
</style>