<template>
  <NavBar v-if="(!($route.name === 'login'))" />

  <router-view class=" bd-amber"/>
</template>
<script>
import NavBar from '@/components/NavBarComponent.vue';
export default {
  components:{
    NavBar
  }
}
</script>
<style lang="scss">
#app{
  background: #EEF1FA;
  widows: 100vw;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 50px;
}

</style>
