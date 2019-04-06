<template>
    <button @click="clickt" >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class BaseButton extends Vue {
  private clickt() {
    this.$emit('click');
  }
}

type Variants = {
  [key: string]: any;
};
</script>

<style scoped>

</style>
