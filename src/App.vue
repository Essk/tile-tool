<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Library</router-link> |
      <router-link to="/tiles">Tiles</router-link> | 
      <router-link to="/palettes">Palettes</router-link> | 
      
    </div>
    <router-view :tileData="tileData"
    :getPalette="getPalette"
    @updatePalette="updatePalette"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { FileDataStore } from './utils/user-data';
import { Tile } from './utils/tile';
import { Palette } from './utils/palette';
import { Color } from './utils/color';
import Palettes from '@/views/Palettes.vue';
@Component({
  components: {},
})
export default class App extends Vue {

  public tileData: TileData = {
    tiles: [],
    palettes: [],
  };
    private defaultTile = new Tile({ name: 'new tile' });
    private defaultPalette = new Palette({ name: 'new palette' });
      private fileStore = new FileDataStore({
      configName: 'user-data', defaults: {
        tiles: [this.defaultTile],
        palettes: [this.defaultPalette],
      },
    });
  public updatePalette(payload: any) {
    const td = this.tileData;
    const maybePalette = td.palettes.find((p) => {
      return p.id === payload.id;
    });
    const palette: Palette =
      maybePalette !== undefined
        ? maybePalette
        : new Palette({ name: 'default' });
    palette.updateColor(payload.idx, payload.color);
    this.$set(this.tileData, 'palettes', td.palettes);
    this.fileStore.set('palettes', JSON.stringify(this.tileData.palettes));
  }
  public getPalette(id: string): Palette {
    return this.tileData.palettes.filter((palette: any) => {
      return palette.id === id;
    })[0];
  }
  public created() {
    const tilesFromStore = this.fileStore.data.tiles;
    const palettesFromStore: Palette[] = JSON.parse(this.fileStore.data.palettes).map( ( flatPallete: any ) => {
      return this.hydratePalette(flatPallete);
    });

    if ( tilesFromStore && tilesFromStore.length > 0 ) {
      this.tileData.tiles.splice(0, this.tileData.tiles.length, ...tilesFromStore );
    }
    if ( palettesFromStore && palettesFromStore.length > 0 ) {
      this.tileData.palettes.splice(0, this.tileData.palettes.length, ...palettesFromStore );
    }
  }

  private hydrateColor(flatColor: any): Color {
    const red = flatColor._red;
    const green = flatColor._green;
    const blue = flatColor._blue;
    return new Color({red, green, blue});
  }

  private hydratePalette(flatPallete: any): Palette {
    const id = flatPallete._id || null;
    const name = flatPallete._name || null;
    const colors = flatPallete._colors.map( (flatColor: any) => {
      return this.hydrateColor(flatColor);
    } );
    return new Palette({ id, name, colors });
  }
}

type TileData = {
  tiles: Tile[];
  palettes: Palette[];
};
</script>
<style lang="scss">
html {
  font-family: "Rubik", "Helvetica", sans-serif;
}
</style>
