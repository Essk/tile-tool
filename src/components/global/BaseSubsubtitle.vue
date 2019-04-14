<template>
<div class="subheader">
    <div class="relative">
        <h3>
            <span v-if="lineOne && lineOne.trim() !== '' " class="block text-xl">{{ lineOne }}</span>
            <span class="block text-2xl" >{{ lineTwo }}</span>
        </h3>
    </div>
  <span v-if="lineThree && lineThree.trim() !== '' " class="page-title__line-three">{{ lineThree }}</span>
  
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class BaseSubtitle extends Vue {
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
