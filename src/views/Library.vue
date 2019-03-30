<template>
  <div class="library">
    <template v-if="tileData.tiles.length > 0">
      <div class="ribbon">
          <CPTile v-for="tile in tileData.tiles" :key="tile.id" :tile="tile"/>
      </div>
    </template>
    <template v-if="tileData.paletteSets.length > 0">
       <div class="ribbon">
         <router-link v-for="paletteSet in tileData.paletteSets" 
         :key="paletteSet.id" :to="{ name: 'paletteSet', params: { id: paletteSet.id, tileData: tileData}  }"> 
          {{ paletteSet.name }}
          <br>
          {{ paletteSet.id }}
          </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CPTile from '../components/Tile.vue';
import CPPalette from '../components/Palette.vue';
@Component({
  components: {
    CPTile,
    CPPalette,
  },
  props: ['tileData'],
})
export default class Library extends Vue {}
</script>
