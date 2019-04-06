<template>
  <div id="app" class="">
    <div id="nav" class="flex flex-col p-4 bg-pink-darkest h-full">
      <router-link class="px-2 py-4 text-white uppercase no-underline font-bold" to="/">Library</router-link>
      <router-link class="px-2 py-4 text-white uppercase no-underline " to="/tiles">Tiles</router-link>
      <router-link class="px-2 py-4 text-white uppercase no-underline " to="/palettes">Palettes</router-link>
    </div>
    <div id="menu" class="flex w-full self-start bg-grey-darkest p-4">
      <span class="text-white px-2">menu_1</span>
      <span class="text-white px-2">menu_2</span>
      <span class="text-white px-2">menu_3</span>
    </div>
    
    <router-view class=" content"/>

    <dialog :open="$store.state.modalOpen" class="fixed pin w-full h-full justify-center items-center bg-grey-lightest">
      <button class="absolute pin-t pin-r p-8" @click="$store.dispatch('setModalState',false)">X Close</button>
      <component class=" w-4/5 bg-white p-8" v-if="$store.state.modalComponent !== ''" :is="$store.state.modalComponent" :modalProps="$store.state.modalProps" ></component>
    </dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { TileDataController } from '@/utils/TileDataController';
import { Tile } from '@/utils/tile';
import { PaletteSet } from '@/utils/paletteSet';
import { Color } from '@/utils/color';
import Palettes from '@/views/Palettes.vue';
import { Palette } from '@/utils/palette';
import PaletteSets from '@/views/PaletteSets.vue';
import { Action } from 'vuex-class';
@Component({
  components: {},
})
export default class App extends Vue {
  @Action('init', { namespace: 'paletteSet' }) public init: any;
  public created() {
    this.init();
  }
  public showModal() {
    this.$store.dispatch('setModalState', true);
    this.$store.dispatch('setModalComponent', 'TitleDialog');
  }
}
</script>
<style lang="scss">
html {
  font-family: "Rubik", "Helvetica", sans-serif;
}
dialog[open] {
  display: flex;
}
#app{
  display: grid;
  grid-template-columns: 120px 1fr 1fr;
  grid-template-areas:
    "sidebar header header"
    "sidebar content content"
    "sidebar  footer  footer";
}
#nav {
  grid-area: sidebar
}
#menu {
  grid-area: header
}
.content{
  grid-area: content;
}
</style>
