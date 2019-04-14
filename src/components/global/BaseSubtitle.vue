<template>
<div class="title">
    <div class="relative">
        <h2>
            <span v-if="hasTop" class="block text-2xl"><slot name="top"></slot></span>
            <span class="block text-3xl" ><slot></slot></span>
        </h2>
    </div>
  <span v-if="hasBottom" class="page-title__line-three"><slot name="bottom"></slot></span>
  
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class BaseSubtitle extends Vue {
    get hasTop(): boolean {
        return !!this.$slots.top;
    }
    get hasBottom(): boolean {
        return !!this.$slots.bottom;
    }
}
</script>

<style scoped lang="scss">

</style>
