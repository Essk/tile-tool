<template>
  <div class="library view-content p-8">
    <BaseTitle>Library</BaseTitle>
    <BaseSubtitle class="mt-8">Palette Sets
      <template slot="bottom">
        <router-link class="mt-2 font-bold text-grey-darkest no-underline inline-block border-b border-dashed border-grey-darkest"  to="/paletteSets"> All Palette Sets </router-link>
      </template> 
    </BaseSubtitle>
    <template v-if="paletteSets.length > 0">
       <div class="ribbon ">
          <router-link 
            class="text-grey-darkest no-underline mt-4 block"
            v-for="paletteSet in paletteSets" 
            :key="paletteSet.id" :to="{ name: 'paletteSet', params: { id: paletteSet.id}  }"> 
            <CPCompactPaletteSet :paletteSet="paletteSet" />
          </router-link>
      </div>
    </template>
    <BaseSubtitle class="mt-4">Tiles</BaseSubtitle>
    <router-link class="mt-2 font-bold text-grey-darkest no-underline inline-block border-b border-dashed border-grey-darkest"  to="/tiles"> All Tiles </router-link>
      <template v-if="tiles.length > 0">
       <div class="ribbon ">
          <router-link 
            class="text-grey-darkest no-underline mt-4 block"
            v-for="tile in tiles" 
            :key="tile.id" :to="{ name: 'tile', params: { id: tile.id}  }"> 
           <CPCompactTile :tile='tile' />
          </router-link>
      </div>
    </template>

  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator';
import CPTile from '../components/Tile.vue';
import CPPalette from '../components/Palette.vue';
import CPCompactPaletteSet from '@/components/PaletteSetCompact.vue';
import CPCompactTile from '@/components/TileCompact.vue';
import PaletteSets from '@/views/PaletteSets.vue';
import { PaletteSet } from '@/utils/paletteSet';
import { Tile } from '@/utils/tile';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
const PSStore = namespace('paletteSets');
@Component({
  components: {
    CPTile,
    CPPalette,
    CPCompactPaletteSet,
    CPCompactTile,
  },
})
export default class Library extends Vue {
  @PSStore.Getter('paletteSets') private paletteSets!: PaletteSet[];
  @Getter('tiles') private tiles!: Tile[];

}
</script>

