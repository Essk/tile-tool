<template>
  <div class="about">
    <h1>Palettes</h1>
      <div class="ribbon">
          <CPPalette v-for="palette in tileData.palettes" :key="palette.id" :palette="palette"/>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CPPalette from '../components/Palette.vue';
@Component({
  components: {
    CPPalette,
  },
  props: ['tileData'],
})
export default class Palettes extends Vue {}
</script>
