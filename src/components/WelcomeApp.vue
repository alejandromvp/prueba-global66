
<template>
  <div class="main_welcome">
    <div v-show="!comenzar" class="seccion_bienvenida">
      <img src="../assets/pikachu.png" alt="frfrfr">
      <h1>Welcome to Pokédex</h1>
      <p class="txt_bienvenida">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
      <input type="button" value="Get started" class="btn_started" @click="iniciarPokedex()">
    </div>
    <div v-show="comenzar">
      <div class="cargando">
        <div class="spin">
          <img src="../assets/Loader.png" alt="frfrfr">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
      return {
        comenzar: false,
      }
  },
  methods: {
    iniciarPokedex: async function(){
      this.comenzar = true;
      await this.delay(2);
      this.iniciar();
    },
    iniciar(){
      this.$emit('iniciar', true);
    },
    delay(n){
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}
  },
}
</script>
<style scoped>
.main_welcome,
.seccion_bienvenida{
  text-align: center;
}

.txt_bienvenida{
  color:#5E5E5E;  
  width:30%;
  margin-right: auto;
  margin-left: auto;
}
.btn_started{
  background: #F22539;
  border-radius: 60px;
  width: 131px;
  height: 44px;
  font-size: 18px;
  color:#FFFFFF;
  border:none;
  cursor: pointer;
  margin-top: 50px;
}
.cargando{
  transition: 1s all;
  transform: rotate(360deg);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
@keyframes spin {
  to {
    transform: rotate(180deg);
  }
}   
.cargando .spin {
    width: 3em;
    height: 3em;
    animation: spin 1s linear infinite;
}  
</style>

