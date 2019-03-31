<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Library</router-link> |
      <router-link to="/tiles">Tiles</router-link> | 
      <router-link to="/palettes">Palettes</router-link> | 
      
    </div>
    <router-view />

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
}
/*
    <dialog :open="showModal">
      <div class="modal-content">
        <h1> New Palette Name: </h1>
        <input type="text" value="New Palette" ref="paletteName" v-model="newPalette.name">
        <div class="modal-actions">
          <button @click="addNewPalette">Save changes</button>
          <button @click="closeModal">Cancel and close</button>
        </div>
      </div>
    </dialog>
*/
</script>
<style lang="scss">
html {
  font-family: "Rubik", "Helvetica", sans-serif;
}
dialog {
  position: absolute;
  top:50%;
  transform: translateY(-50%);
  width: 100vw;
  height: 100vh;
}
</style>
