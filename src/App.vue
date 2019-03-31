<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Library</router-link> |
      <router-link to="/tiles">Tiles</router-link> | 
      <router-link to="/palettes">Palettes</router-link> | 
      
    </div>
    <router-view 
    :tileData="tileData"
    @updateTile="updateTile"
    :getPaletteSet="getPaletteSet"
    :getPalette="getPalette"
    :prepareNewPalette="prepareNewPalette"
    />
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
@Component({
  components: {},
})
export default class App extends Vue {

  public tileData: TileData = {
    tiles: [],
    paletteSets: [],
  };
  private tileDataController = new TileDataController();
  private showModal = false;
  private newPalette = new Palette({});
  private curPS: PaletteSet | undefined = new PaletteSet({});
  public created() {
    this.tileData.tiles = this.tileDataController.tiles;
    this.tileData.paletteSets = this.tileDataController.paletteSets;
  }
  public getPaletteSet(id: string) {
    return this.tileData.paletteSets.find((ps) => {
      return ps.id === id;
    } );
  }
  public getPalette(paletteSetId: string, idx: number) {
    const defaultPalette = this.tileData.paletteSets[0].palettes[0];
    const ps = this.tileData.paletteSets.find((_ps) => {
      return _ps.id === paletteSetId;
    } );
    return ps ? ps.palettes[idx] : defaultPalette;
  }
  public prepareNewPalette(data: any) {
    this.showModal = true;
    const paletteOpts = data.palette !== null ?
    {
      name: data.palette.name,
      colors: data.palette.colors,
    }
    : {};
    this.curPS = this.getPaletteSet(data.ps);
    this.newPalette = new Palette(paletteOpts);
  }
  public addNewPalette() {
    if (this.curPS !== undefined) {
      this.curPS.palettes.push(this.newPalette);
      this.tileDataController.paletteSets = this.tileData.paletteSets;
    }
    this.closeModal();
  }
  public closeModal() {
    this.showModal = false;
  }
  public updateTile(data: any) {
    console.log('updating tile');
    console.log(data);
  }
}

type TileData = {
  tiles: Tile[];
  paletteSets: PaletteSet[];
};
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
