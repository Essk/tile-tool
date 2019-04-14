<template>
<div class="subheader" >
    <div class="relative">
        <h3>
            <span class="block text-xl" v-show="hasTop"><slot name="top"></slot></span>
            <span class="block text-2xl" ><slot></slot></span>
        </h3>
    </div>
  <span v-show="hasBottom"><slot name="bottom"></slot></span>
  
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class BaseSubsubtitle extends Vue {
    get hasTop(): boolean {
        return !!this.$slots.top;
    }
    get hasBottom(): boolean {
        return !!this.$slots.bottom;
    }
}
</script>

<style scoped lang="scss">
.header{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.h2-wrap{
position: relative;
}
    .sub-title{
        display: inline-block;
        margin: 0;
        &__line-one{ 
            display: block;
            font-size: 20px;;
        }
        &__line-two{
            display: block;
            font-size: 24px;
        }
        
    }
</style>
