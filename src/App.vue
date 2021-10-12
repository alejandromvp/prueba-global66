<template>
  <div id="app">
    <WelcomeApp @iniciar="sectionListaPokemones" v-show="show_welcome"/>
    <ListaPokemones @listaPokeFavoritos="sectionPokemonesFavoritos" v-show="show_listaPokemones"/>
    <PokeFavoritos @AllPokemones ="sectionAllPokemones" v-show="show_listaPokemonesFavoritos"/>
  </div>
</template>

<script>
import WelcomeApp     from './components/WelcomeApp.vue';
import ListaPokemones from './components/pokemones.vue';
import PokeFavoritos from './components/PokeFavoritos.vue';
export default {
  name: 'App',
  components: {
    WelcomeApp,
    ListaPokemones,
    PokeFavoritos
  },
  data() {
      return {
          show_welcome: true,
          show_listaPokemones: false,
          show_listaPokemonesFavoritos:false,
      }
  },
  methods:{
    sectionListaPokemones(_bolean){
      this.show_welcome = false;
      this.show_listaPokemones = _bolean;
    },
    sectionAllPokemones(){
      this.show_listaPokemones= true;
      this.show_listaPokemonesFavoritos = false;
    },
    sectionPokemonesFavoritos(){
      this.show_listaPokemones= false;
      this.show_listaPokemonesFavoritos = true;
    }
  }
}
</script>
<style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
