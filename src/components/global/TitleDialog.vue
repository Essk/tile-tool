<template>
    <div>
        <div class="modal-content">
        <h1 class="text-3xl"> New Palette Name: </h1>
        <input type="text" v-model="editable" ref="paletteName" class="my-4 text-2xl border-b border-grey-dark w-full pb-1" >
        <div class="modal-actions flex justify-end w-full mt-2 -mb-2">
          <BaseButton variant="positive" class="mx-4" @click="doConfirm">Confirm changes</BaseButton>
          <BaseButton variant="danger" @click="modalProps.cancel">Cancel and close</BaseButton>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
    export default class TitleDialog extends Vue  {

    }
</script>

<style scoped>

</style>
