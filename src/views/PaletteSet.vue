<template>
<div class="view-content p-8">
  <CPEditableTitle lineOne="PaletteSet:" 
  :lineTwo="paletteSetbyId(id).name" 
  :lineThree="`${paletteSetbyId(id).palettes.length} of 16 palettes defined`"
  @input="handlePSName" />
  <div class=" grid-display palette-set-view w-full -mx-4 my-4">
    <template v-for="(palette, p_index) in paletteSetbyId(id).palettes">
      <CPCompactPalette  :key="palette.id"  class="my-0 mx-auto p-4  bg-grey-lightest"
      :palette="palette" 
      :index="p_index"
      >
        <div class="buttons py-2 -mx-2 -mb-2 flex " >
          <router-link :key="palette.id" :to="{ name: 'palette', params: { index: p_index}  }" 
          class="flex-1 m-1 btn btn-primary btn-sm ">
            Edit
          </router-link>
          <BaseButton
            :disabled="paletteSetbyId(id).palettes.length >= 16"
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
    <button v-if="paletteSetbyId(id).palettes.length < 16" @click="prepareNewPalette"
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
const paletteSets = namespace('@/store/PaletteSets');

@Component({
  components: {
    CPCompactPalette,
    CPEditableTitle,
  },
})
export default class VWPaletteSet extends Vue {
  @Action('setCurrent') public setCurrent!: any;
  @Action('addPalette') public addPalette!: any;
  @Action('removePalette') public removePalette!: any;
  @Action('setName') public setName!: any;
  @Getter('paletteSetById') private paletteSetbyId!: (id: string) => PaletteSet;
  @Prop() private id!: string;
  public created() {
    this.setCurrent(this.paletteSetbyId(this.id));
  }

  private handlePSName(name: string) {
    this.setName({id: this.id, name});
  }
  private prepareCopyPalette(paletteToCopy: Palette) {
    this.$store.dispatch('setModalState', true);
    this.$store.dispatch('setModalComponent', 'TitleDialog');
    this.$store.dispatch('setModalProps', {
      confirm: (name: string) => {
        const palette = Palette.duplicate(paletteToCopy);
        palette.name = name;
        this.addPalette(palette);
        this.$store.dispatch('setModalState', false);
      },
      cancel: () => {
        this.$store.dispatch('setModalState', false);
      },
    });
  }
  private prepareNewPalette() {
    this.$store.dispatch('setModalState', true);
    this.$store.dispatch('setModalComponent', 'TitleDialog');
    this.$store.dispatch('setModalProps', {
      confirm: (name: string) => {
        const palette = new Palette({name});
        this.addPalette(palette);
        this.$store.dispatch('setModalState', false);
      },
      cancel: () => {
        this.$store.dispatch('setModalState', false);
      },
    });
  }
  private prepareDeletePalette(paletteToRemove: Palette) {
    this.$store.dispatch('setModalState', true);
    this.$store.dispatch('setModalComponent', 'RemovePaletteDialog');
    this.$store.dispatch('setModalProps', {
      confirm: () => {
        this.removePalette(paletteToRemove);
        this.$store.dispatch('setModalState', false);
      },
      cancel: () => {
        this.$store.dispatch('setModalState', false);
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
