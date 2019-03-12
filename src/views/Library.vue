<template>
  <div class="library">
    {{ tileData }}
    <template v-if="tileData.data.tiles.length > 0">
      <div class="ribbon">
          <CPTile v-for="tile in tileData.data.tiles" :key="tile.id" :tile="tile"/>
      </div>
    </template>
        <template v-if="tileData.data.palettes.length > 0">
      <div class="ribbon">
        <div class="tile" v-for="palette in tileData.data.palettes" :key="palette.id">
          <h2>{{ palette.name }}</h2>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CPTile from '../components/Tile.vue';
@Component({
  components: {
    CPTile,
  },
  props: ['tileData'],
})
export default class Library extends Vue {

}
</script>
