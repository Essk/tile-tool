<template>
    <button :class="varClass" >
        <slot></slot>
    </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class BaseButton extends Vue {
  @Prop() public variant!: string;
  // tslint:disable-next-line:max-line-length
  private primary = 'bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded';
  // tslint:disable-next-line:max-line-length
  private danger = 'bg-transparent hover:bg-red text-red-dark font-semibold hover:text-white py-2 px-4 border border-red hover:border-transparent rounded';
  // tslint:disable-next-line:max-line-length
  private positive = 'bg-transparent hover:bg-green-dark text-green-darker font-semibold hover:text-white py-2 px-4 border border-green-dark hover:border-transparent rounded';
  get varClass(): string {
    switch (this.variant) {
      case 'primary':
        return this.primary;
      case 'positive':
        return this.positive;
      case 'danger':
        return this.danger;
        default:
        return '';
    }
  }
}
</script>

<style scoped>

</style>
