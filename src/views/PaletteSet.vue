<template>
<div>
  <h1>
    <span>PaletteSet:</span><br>
    <span>{{ paletteSet(id).name }}</span>
  </h1>
  <span> {{ paletteSet(id).palettes.length }} of 16 palettes defined</span>
  <button>+ Add palette</button>
  <div class=" grid-display palette-set-view">
    <template v-for="palette in paletteSet(id).palettes">
      <CPCompactPalette  :key="palette.id" 
      :palette="palette" 
      :paletteSetTotal="paletteSet(id).palettes.length"
      />
    </template>
  </div>

</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Mutation, Action} from 'vuex-class';
import { Palette } from '../utils/palette';
import { PaletteSet } from '../utils/paletteSet';
import CPCompactPalette from '@/components/PaletteCompact.vue';

@Component({
  components: {
    CPCompactPalette,
  },
})
export default class VWPaletteSet extends Vue {
  @Prop() private id!: string;
  @Getter('paletteSet', { namespace: 'paletteSet' }) private paletteSet!: (id: string) => PaletteSet;
}

/*


*/
</script>

<style lang="scss" scoped>

</style>
