<template>
  <div class="compact-palette-wrap">
        <h2> {{ palette.name}} </h2>
        <span> {{ palette.id }}</span>
      <div class="palette mt-2">
        <span v-for="(color, index) in palette.colors" :key="index">
        </span>
      </div>
      <div class="buttons py-2 -mx-2 -mb-2 flex " >
      <router-link :key="palette.id" :to="{ name: 'palette', params: { id: palette.id}  }" 
      class=" flex-1 text-xs text-center m-2 p-2 border border-blue text-blue-dark uppercase no-underline">
        Edit
      </router-link>
      <button 
        @click="$emit('duplicate', palette)"
        class=" flex-1 text-xs text-center m-2 p-2 border border-blue text-blue-dark uppercase no-underline">Copy</button>
      <button 
      @click="$emit('delete', palette)"
      class=" flex-1  text-xs text-center m-2 p-2 border border-blue text-blue-dark uppercase no-underline">Delete</button>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Palette } from '../utils/palette';
import { Color } from '../utils/color';
@Component({})
export default class CPCompactPalette extends Vue {
  @Prop() public palette!: Palette;
  @Prop() public paletteSetTotal!: number;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.palette {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-gap: 4px;
  
  span {
    display: block;
    border: 1px dotted grey;
    height: 64px;
    width: 64px;
    border-radius: 16px;
  }
}
</style>
