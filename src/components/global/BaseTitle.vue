<template>
<div class="header">
    <div class="relative">
        <h1>
            <span v-if="lineOne && lineOne.trim() !== '' " class="block text-2xl">{{ lineOne }}</span>
            <span class="block text-5xl" >{{ lineTwo }}</span>
        </h1>
    </div>
  <span v-if="lineThree && lineThree.trim() !== '' " class="page-title__line-three">{{ lineThree }}</span>
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class BaseTitle extends Vue {
         @Prop() private lineOne?: string;
         @Prop() private lineTwo!: string;
         @Prop() private lineThree?: string;
    }
</script>

<style scoped lang="scss">
.header{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


</style>
