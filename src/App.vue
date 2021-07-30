<template>
  <div id="app">
      <loader/>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
  </div>
</template>

<script>
    import loader from "@/components/Loader.vue";
    export default {
      name: 'App',
      components: {
        loader
      }
    } 
</script>

<style lang="scss">
#app{
  padding-left: 1rem;
  padding-right: 1rem;
}
body{
  background-color: #f9f9f9;
}
section{
  min-height: 100vh;
}
.title{
  color: $dark;
}
p{
  color: $grey;
}
.modal .animation-content{
  padding: 0 1rem;
}

</style>
