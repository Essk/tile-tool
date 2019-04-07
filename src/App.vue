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

    <dialog :open="modalOpen" class="fixed pin w-full h-full justify-center items-center bg-grey-lightest">
      <button class="absolute pin-t pin-r p-8" @click="setModalState(false)">X Close</button>
      <component class=" w-4/5 bg-white p-8" v-if="modalComponent !== ''" :is="modalComponent" :modalProps="modalProps" ></component>
    </dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Tile } from '@/utils/tile';
import { PaletteSet } from '@/utils/paletteSet';
import { Color } from '@/utils/color';
import { Palette } from '@/utils/palette';
import Palettes from '@/views/Palettes.vue';
import PaletteSets from '@/views/PaletteSets.vue';


@Component
export default class App extends Vue {
  @State((state) => state.modals.modalOpen) public modalOpen!: boolean;
  @State((state) => state.modals.modalComponent) public modalComponent!: string;
  @State((state) => state.modals.modalProps) public modalProps!: any;
  @Action('init') private init!: () => void;
  @Action('setModalState') private setModalState!: ( state: boolean ) => void;
  public created() {
    this.init();
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
