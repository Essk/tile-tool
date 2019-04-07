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

import CPTile from '../components/Tile.vue';
import CPPalette from '../components/Palette.vue';
import PaletteSets from '@/views/PaletteSets.vue';
import { PaletteSet } from '@/utils/paletteSet';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
@Component({
  components: {
    CPTile,
    CPPalette,
  },
})
export default class Library extends Vue {
  @Getter('paletteSets') private paletteSets!: PaletteSet[];

}
</script>

