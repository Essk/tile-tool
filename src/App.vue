<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Library</router-link> |
      <router-link to="/tiles">Tiles</router-link> | 
      <router-link to="/palettes">Palettes</router-link> | 
    </div>
    <BaseButton @click="showModal" variant="primary">clicky</BaseButton>
    <router-view />

    <dialog :open="$store.state.modalOpen">
      <component v-if="$store.state.modalComponent !== ''" :is="$store.state.modalComponent" ></component>
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
dialog {
  position: absolute;
  top:0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
