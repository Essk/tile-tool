<template>
  <h1 class="page-title page-title--two-line">
    <span v-if="lineOne && lineOne.trim() !== '' " class="page-title__line-one">{{ lineOne }}</span>
    <span class="page-title__line-two" >{{ editable }}</span>
    <input type="text" class="page-title__input" v-model="editable" @input="$emit('input', editable)">
  </h1>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class CPEditableTitle extends Vue {
         @Prop() private lineOne?: string;
         @Prop() private lineTwo!: string;
         private editable: string = this.lineTwo;
    }
</script>

<style scoped>

</style>
