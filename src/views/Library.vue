<template>
  <div class="library">
        <template v-if="paletteSets.length > 0">
       <div class="ribbon">
         <router-link v-for="paletteSet in paletteSets" 
         :key="paletteSet.id" :to="{ name: 'paletteSet', params: { id: paletteSet.id}  }"> 
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
import { State, Getter, Mutation, Action} from 'vuex-class';
import CPTile from '../components/Tile.vue';
import CPPalette from '../components/Palette.vue';
import PaletteSets from '@/views/PaletteSets.vue';
import { PaletteSet } from '@/utils/paletteSet';
@Component({
  components: {
    CPTile,
    CPPalette,
  },
})
export default class Library extends Vue {
  @Getter('paletteSets', { namespace: 'paletteSet' }) private paletteSets!: PaletteSet[];

}
/*

    <template v-if="tileData.tiles.length > 0">
      <div class="ribbon">
          <CPTile v-for="tile in tileData.tiles" :key="tile.id" :tile="tile"/>
      </div>
    </template>



*/
</script>

