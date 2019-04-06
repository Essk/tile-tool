<template>
    <div>
        <div class="modal-content">
        <h1 class="text-3xl">Really delete 
        <span  class="text-itallic text-grey-dark" >
          {{ modalProps.paletteToRemove.name }}
        </span> from this palette set?</h1>
        <div class="modal-actions flex justify-end w-full mt-2 -mb-2">
          <BaseButton class="mx-4 btn btn-md btn-primary" @click="doConfirm">Yes delete</BaseButton>
          <BaseButton class="btn btn-md btn-danger" @click="modalProps.cancel">Cancel and close</BaseButton>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '@/utils/palette';
@Component({})
    export default class RemovePaletteDialog extends Vue  {
      @Prop() private modalProps!: RemovePaletteProps;
      private doConfirm() {
        this.modalProps.confirm();
      }
      private doCancel() {
        this.modalProps.cancel();
      }
    }
type RemovePaletteProps = {
      paletteToRemove: Palette
      confirm(): void,
      cancel(): void,
    };
</script>

<style scoped>

</style>
