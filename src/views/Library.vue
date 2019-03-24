<template>
  <div class="library">
    <template v-if="tileData.data.tiles.length > 0">
      <div class="ribbon">
          <CPTile v-for="tile in tileData.data.tiles" :key="tile.id" :tile="tile"/>
      </div>
    </template>
    <template v-if="tileData.data.palettes.length > 0">
       <div class="ribbon">
         <router-link v-for="palette in tileData.data.palettes" :key="palette.id" :to="{ name: 'palette', params: { id: palette.id, tileData: tileData}  }"> 
          <CPPalette  :palette="palette"/>
          </router-link>
      </div>
    </template>
    <CPColorPicker/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CPTile from '../components/Tile.vue';
import CPPalette from '../components/Palette.vue';
import CPColorPicker from '../components/ColorPicker.vue';
@Component({
  components: {
    CPTile,
    CPPalette,
    CPColorPicker,
  },
  props: ['tileData'],
})
export default class Library extends Vue {}
</script>
