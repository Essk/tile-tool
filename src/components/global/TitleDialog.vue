<template>
    <div>
        <div class="modal-content">
        <h1> New Palette Name: </h1>
        <input type="text" value="New Palette" ref="paletteName" >
        <div class="modal-actions">
          <button >Save changes</button>
          <button >Cancel and close</button>
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
