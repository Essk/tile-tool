<template>
    <div>
        <div class="modal-content">
        <h1 class="text-3xl"> New Palette Name: </h1>
        <input type="text" v-model="editable" ref="paletteName" class="my-4 text-2xl border-b border-grey-dark w-full pb-1" >
        <div class="modal-actions flex justify-end w-full mt-2 -mb-2">
          <BaseButton class="mx-4  btn btn-md btn-positive" @click="doConfirm">Confirm changes</BaseButton>
          <BaseButton class=" btn btn-md btn-danger" @click="modalProps.cancel">Cancel and close</BaseButton>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
    export default class TitleDialog extends Vue  {
      @Prop() private modalProps!: TitleDialogProps;
      private editable = 'New Palette';
      private doConfirm() {
        this.modalProps.confirm(this.editable);
      }
      private doCancel() {
        this.modalProps.cancel();
      }
    }
type TitleDialogProps = {
      confirm( name: string): void,
      cancel(): void,
    };
</script>

<style scoped>

</style>
