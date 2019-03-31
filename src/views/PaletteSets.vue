<template>
  <div class="">
    <h1>Palette Sets</h1>
      <div class="grid-display">
          {{ tileData }}
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  },
  props: ['tileData', 'id', 'getPaletteSet'],
})
export default class PaletteSets extends Vue {}
</script>
