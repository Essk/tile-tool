<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Library</router-link> |
      <router-link to="/tiles">Tiles</router-link> | 
      <router-link to="/palettes">Palettes</router-link>
    </div>
    <router-view :tileData="tileData()"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { FileDataStore } from './utils/user-data';
import { Tile } from './utils/tile';
import { Palette } from './utils/palette';
@Component({
  components: {},
  data() {
    return {
      tileData: () => {
        const defaultTile = new Tile({ name: 'new tile' });
        const defaultPalette = new Palette({name: 'new palette'});
        return new FileDataStore({
          configName: 'app-data',
          defaults: {
            tiles: [
              defaultTile,
            ],
            palettes: [
              defaultPalette,
            ],
          },
        });
      },
    };
  },
})
export default class App extends Vue {

}
</script>
<style lang="scss">
</style>
