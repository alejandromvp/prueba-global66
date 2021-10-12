<template>
<div class="main_pokemones_favoritos">
    <section class="listado_pokemones">
            <ul>
                <input type="text" class="input_search" placeholder="Search" v-model="filter" >
                <div  v-if="mostrar">
                    <li v-for="(value, key) in filtroListaPokemones" :key="key">
                        <div class="lista_detalle_p">
                            <div class="box_nombre_pokemon">
                                <input type="button" class="btn_click_label_pokemon" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="getPokemonDetalle(value)" :value="value.name">
                            </div>
                            <div class="box_estrella">
                                <img src="../assets/star1.png" alt="" class="estrella" @click="sacar_favoritos(value)">
                            </div>
                        </div>
                    </li>
                </div>
                <div class="error_search" v-show="!mostrar">
                    <h1>Uh-oh!</h1>
                    <p>You look lost on your journey!</p>
                    <input type="button" class="btn_back_home"  value="Go back home" @click="VerAllPokemon()">
                </div>
            </ul>
    </section>
    <footer class="footer" v-show="mostrar">
        <div class="body_footer">
            <button type="button" class="btn_all" @click="VerAllPokemon()">
                <img :src="require(`../assets/btn_list.png`)" alt="" width="16px"> <b>All</b>
            </button>
            <button type="button" class="btn_favorites">
                <img :src="require(`../assets/btn_star.png`)" alt="" width="16px"> <b>Favorites</b> 
            </button>
        </div>
    </footer>

    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="card">
                        <div style="position: relative; left: 0; top: 0;">
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <img :src="require(`../assets/image14.png`)" class="card-img-top fondo_pokemon" alt="...">
                            <img :src="data_pokemon == null? '-' : data_pokemon.sprites.front_default" alt="..." class="sprite_pokemon">
                            <p id="p2" style="z-index: 1"> {{data_pokemon == null? '-' : data_pokemon.name}},<span v-for="(value, key) in tipo_pokemon" :key="key" >{{value.type.name}},</span></p>
                        </div>
                        <div class="card-body">
                            <ul class="lista_detalle_pokemon">
                                <li><b>Name:</b> {{data_pokemon == null? '-' : data_pokemon.name}}</li>
                                <li><b>Weight:</b> {{data_pokemon == null? '-' : data_pokemon.weight}}</li>
                                <li><b>Height:</b> {{data_pokemon == null? '-' : data_pokemon.height}}</li>
                                <li><b>Types:</b> <span v-for="(value, key) in tipo_pokemon" :key="key"> {{value.type.name}}.</span> </li>
                            </ul>
                            <input type="button" class="btn_share_friend"  value="Share to my friends" @click="copiar_portapapeles()">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'Menucomponent',
    data() {
        return {
            lista_pokemones: [],
            filter: null,
            mostrar: true,
            data_pokemon: null,
            tipo_pokemon: [],
        }
    },
    mounted() {
        //
    },
    watch:{
        filter: function(){
            if(this.filter.length == 0){
                this.mostrar = true;
            }else{
                if(this.filtroListaPokemones.length > 0){
                    this.mostrar = true;
                }else{
                    this.mostrar = false;
                }
            }
        },
        getPokemones:function(){
            this.lista_pokemones = this.getPokemones;
        }
    },
    methods: {
        ...mapActions(['Add_pokemon', 'eliminar_pokemon']),

        VerAllPokemon(){
            this.filter = '';
            this.$emit('AllPokemones');
        },
        async getPokemonDetalle(_dataPokemon){
            try{
                const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${_dataPokemon.name}`);
                let data =  await response.json();
                this.data_pokemon = data;
                this.tipo_pokemon = data.types;
            }catch (error) {
                alert("error al cargar lista pokemon")
            }finally{
                //
            }
        },
        sacar_favoritos(_pokemon){
            this.eliminar_pokemon(_pokemon);
        },
        copiar_portapapeles(){
            var codigoACopiar = document.getElementById('p2');
            var seleccion = document.createRange();
            seleccion.selectNodeContents(codigoACopiar);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(seleccion);
            document.execCommand('copy');
            window.getSelection().removeRange(seleccion);
        }
    },
    computed: {
		filtroListaPokemones () {
			return this.filter ? this.lista_pokemones.filter(item => 
                        item.name.toLowerCase().includes(this.filter.toLowerCase())
                    ): this.lista_pokemones
		}, 
         ...mapGetters([
           'getPokemones'   
        ]) 
	}
}
</script>
<style scoped>
.main_pokemones_favoritos{
    background: #F9F9F9;
}
.listado_pokemones{
    width: 65%;
    margin-left: auto;
    margin-right: auto;
    padding-right: 35px;
    min-height: 700px;
}
.listado_pokemones ul li{
    display: flex;
    align-items: center;
    background: white;
    border-radius: 5px;
    height:60px;
    border-radius: 5px;
    font-weight: 500;
    font-size: 22px;
    padding-left: 20px;
    margin-bottom: 10px;
}
.input_search{
    background-position-y: 15px;
    background-position-x: 10px;
    padding-left:35px;
    background-repeat: no-repeat;
    background-size:24px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADbSURBVDhP5ZI9C4MwEIb7//+BEDgICA6C4OQgBJy6dRIEB6EgCNkEJ4e3iT2oHzH9wHbpAwfyJvfkJDnhYH4kHDVKlSAigSAQoCiBKjVGXvaxFXZnxBQYkSlBICII+22K4jM63rbHSthCSdsskVX9Y6KxR5XJSSpVy6GbpbBKp6aw0BzM0ShCe1iKihMXC6EuQtMQwukzPFu3fFd4+C+/cimUNxy6WQkNnmdzL3NYPfDmLVuhZf2wZYz80qDkKX1St3CXAfVMqq4cz3hTaGEpmctxDPmB0M/fCYEbAwZYyVKYcroAAAAASUVORK5CYII=);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    border: none;
    border-radius: 5px; 
    margin-bottom: 40px;
    margin-top:35px;
    margin-left: auto;
    margin-right: auto;
    height: 50px;
    width: 100%;
    font-size: 16px;
}
.lista_detalle_p{
    display: grid;
    grid-template-columns:  10fr 1fr;
}
.box_nombre_pokemon{
    min-width:140px;
}
.box_estrella{
    text-align: right;
    min-width:90px;
    padding-right: 5px;
}
.estrella{
    cursor:pointer;
}
.footer{
    background: #FFFFFF;
    position: fixed;
    left: 0;
    bottom: 0;
    height:80px;
    width: 100%;
    color: white;
    display: flex;
    align-items: center;
    }
.body_footer{
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-between;
    display: flex;
}
.btn_all{
    background: #BFBFBF;
    border-radius: 60px;
    text-align:center;
    font-size: 14px;
    color:white;
    border:none;
    height:44px;
    width: 45%;
    cursor: pointer;
}
.btn_all img{
    margin-right: 4px;
}
.btn_favorites{
    background: #F22539;
    border-radius: 60px;
    text-align:center;
    font-size: 14px;
    color:white;
    border:none;
    height:44px;
    width: 45%;
    cursor:pointer;
}
.btn_favorites img{
    margin-right: 4px;
}
.btn_back_home{
    background: #F22539;
    border-radius: 60px;
    text-align:center;
    font-size: 14px;
    color:white;
    border:none;
    height:44px;
    cursor: pointer;
    width: 30%;
    padding:11px, 20px, 11px, 20px;
}
.btn_share_friend{
    background: #F22539;
    border-radius: 60px;
    text-align:center;
    font-size: 14px;
    color:white;
    border:none;
    height:44px;
    cursor: pointer;
    width: 30%;
    padding:11px, 20px, 11px, 20px;
}
.error_search{
    text-align: center;
    height: 100vh;
}
.modal-body{
    padding:0;
}
.btn-close{
    position: absolute;
    z-index: 2;
    right: 1px;
}
.lista_detalle_pokemon{
    list-style: none;
    margin-left:0;
    padding-left:0;
}
.card{
    border:none;
}
.fondo_pokemon{
    position: absolute;
    height: 185px;
    width: 498px;
    z-index: 1;
}
.sprite_pokemon
{
    position: absolute;
    height: 240px;
    z-index: 15;
    top:-20px;
    left: 120px;
}
.card-body{
    margin-top: 200px;
}
.btn_click_label_pokemon  {
    background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        cursor: pointer;
        outline: inherit;
}
</style>
