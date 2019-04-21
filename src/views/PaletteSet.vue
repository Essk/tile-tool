<template>
<div class="view-content p-8">
  <CPEditableTitle lineOne="PaletteSet:" 
  :lineTwo="paletteSet.name" 
  :lineThree="`${paletteSet.palettes.length} of 16 palettes defined`"
  @input="handlePSName" />
  <div class=" grid-display palette-set-view w-full -mx-4 my-4">
    <template v-for="(palette, p_index) in paletteSet.palettes">
      <CPCompactPalette  :key="palette.id"  class="my-0 mx-auto p-4  bg-grey-lightest"
      :palette="paletteById(palette)" 
      :index="p_index"
      >
        <div class="buttons py-2 -mx-2 -mb-2 flex " >
          <router-link  :to="{ name: 'palette', params: { id: palette}  }" 
          class="flex-1 m-1 btn btn-primary btn-sm ">
            Edit
          </router-link>
          <BaseButton
            :disabled="paletteSet.palettes.length >= 16"
            @click="prepareCopyPalette(palette)"
            class=" flex-1 m-1  btn btn-sm btn-primary">Copy
            </BaseButton>
          <BaseButton 
          @click="prepareDeletePalette(palette)"
          class=" flex-1 m-1 btn btn-sm btn-danger">Delete
          </BaseButton>
        </div>
      </CPCompactPalette>
    </template>
    <button v-if="paletteSet.palettes.length < 16" @click="prepareNewPalette"
    class="border-grey border-dashed border-4 "
    >+ Add palette</button>
  </div>

</div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Palette } from '../utils/palette';
import { PaletteSet } from '../utils/paletteSet';
import CPCompactPalette from '@/components/PaletteCompact.vue';
import CPEditableTitle from '@/components/EditableTitle.vue';
const PSStore = namespace('paletteSets');
const Palettes = namespace('palettes');
@Component({
  components: {
    CPCompactPalette,
    CPEditableTitle,
  },
})
export default class VWPaletteSet extends Vue {
  @State('modalState') public modalState!: boolean;
  @State('modalComponent') public modalComponent!: string;
  @State('modalProps') public modalProps!: any;
  @PSStore.Getter('paletteSetIndexById') public paletteSetIndexById!: (id: string) => number ;
  @PSStore.Action('setCurrent') public setCurrent!: any;
  @PSStore.Action('addPalette') public addPaletteToPS!: any;
  @PSStore.Action('removePalette') public removePaletteFromPs!: any;
  @PSStore.Action('setName') public setName!: any;
  @Action('setModalState') private setModalState!: ( state: boolean ) => void;
  @Action('setModalComponent') private setModalComponent!: ( componentName: string) => void;
  @Action('setModalProps') private setModalProps!: ( props: any) => void;

  @PSStore.Getter('paletteSet') private paletteSet!: PaletteSet;

  @Palettes.Getter('paletteById') private paletteById!: ( id: string) => Palette;
  @Palettes.Action('add') private addPalette!: (palette: Palette) => void;

  @Prop() private id!: string;
  public created() {
    this.setCurrent(this.paletteSetIndexById(this.id));
  }
  private handlePSName(name: string) {
    this.setName({id: this.id, name});
  }
  private prepareCopyPalette(paletteToCopy: Palette) {
    this.setModalState(true);
    this.setModalComponent('TitleDialog');
    this.setModalProps( {
      confirm: (name: string) => {
        const palette = Palette.duplicate(paletteToCopy);
        palette.name = name;
        this.addPalette(palette);
        this.addPaletteToPS(palette.id);
        this.setModalState(false);
      },
      cancel: () => {
        this.setModalState(false);
      },
    });
  }
  private prepareNewPalette() {
    this.setModalState(true);
    this.setModalComponent('TitleDialog');
    this.setModalProps({
      confirm: (name: string) => {
        const palette = new Palette({name});
        this.addPalette(palette);
        this.addPaletteToPS(palette.id);
        this.$store.dispatch('setModalState', false);
      },
      cancel: () => {
        this.setModalState(false);
      },
    });
  }
  private prepareDeletePalette(paletteToRemove: Palette) {
    this.setModalState(true);
    this.setModalComponent('RemovePaletteDialog');
    this.setModalProps({
      confirm: () => {
        this.removePaletteFromPs(paletteToRemove.id);
        this.setModalState(false);
      },
      cancel: () => {
        this.setModalState(false);
      },
      paletteToRemove,
    });
  }
}
</script>

<style lang="scss" scoped>
 .grid-display{
   display: grid;
   grid-gap:1em;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-template-rows: auto;
 }
</style>
