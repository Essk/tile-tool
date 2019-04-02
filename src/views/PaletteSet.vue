<template>
<div>
  
  <CPEditableTitle lineOne="PaletteSet:" 
  :lineTwo="paletteSetbyId(id).name" 
  :lineThree="`${paletteSetbyId(id).palettes.length} of 16 palettes defined`"
  @input="handlePSName" />
  

  <button @click="addPalette( makeNewPalette() )">+ Add palette</button>
  <div class=" grid-display palette-set-view">
    <template v-for="palette in paletteSetbyId(id).palettes">
      <CPCompactPalette  :key="palette.id" 
      :palette="palette" 
      :paletteSetTotal="paletteSetbyId(id).palettes.length"
      />
    </template>
  </div>

</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action} from 'vuex-class';
import { Palette } from '../utils/palette';
import { PaletteSet } from '../utils/paletteSet';
import CPCompactPalette from '@/components/PaletteCompact.vue';
import CPEditableTitle from '@/components/EditableTitle.vue';

@Component({
  components: {
    CPCompactPalette,
    CPEditableTitle,
  },
})
export default class VWPaletteSet extends Vue {
  @Action('setCurrent', { namespace: 'paletteSet' }) public setCurrent!: any;
  @Action('addPalette', { namespace: 'paletteSet' }) public addPalette!: any;
  @Action('setName', { namespace: 'paletteSet' }) public setName!: any;
  @Prop() private id!: string;
  @Getter('paletteSetById', { namespace: 'paletteSet' }) private paletteSetbyId!: (id: string) => PaletteSet;
  public created() {
    this.setCurrent(this.paletteSetbyId(this.id));
  }
  private makeNewPalette(): Palette {
    return new Palette({});
  }
  private handlePSName(name: string) {
    this.setName({id: this.id, name});
  }
}
</script>

<style lang="scss" scoped>

</style>
