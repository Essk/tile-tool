<template>
<div class="header">
    <div class="h1-wrap">
        <h1 class="page-title page-title--three-line">
            <span v-if="lineOne && lineOne.trim() !== '' " class="page-title__line-one">{{ lineOne }}</span>
            <span class="page-title__line-two" >{{ editable }}</span>
            <input type="text" 
            class="page-title__input" 
            v-model="editable" 
            ref="input"
            @click="startEdit"
            @keyup.esc="cancelEdit"
            @blur="finishEdit"
            @input="$emit('input', editable)"
            >
        </h1>
    </div>

  <span v-if="lineThree && lineThree.trim() !== '' " class="page-title__line-three">{{ lineThree }}</span>
  
  </div>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({})
export default class CPEditableTitle extends Vue {
         @Prop() private lineOne?: string;
         @Prop() private lineTwo!: string;
         @Prop() private lineThree?: string;
         private reset: string = '';
         private editable: string = this.lineTwo;
         private isEditing: boolean = false;

         private startEdit() {
             this.isEditing = true;
             this.$nextTick( () => {
                 const input = this.$refs.input as HTMLElement;
                 input.focus();
             });
         }
        private finishEdit() {
            this.isEditing = false;
        }
         private cancelEdit() {
             this.editable = this.lineTwo;
             this.isEditing = false;
             const input = this.$refs.input as HTMLElement;
             if (document.activeElement === input) {
                input.blur();
             }
         }

    }
</script>

<style scoped lang="scss">
.header{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}


.h1-wrap{
position: relative;
}
    .page-title{
        display: inline-block;
        margin: 0;

      
        &__line-one{ 
            display: block;
            font-size: 24px;;
        }
        &__line-two{
            display: block;
            font-size: 32px;
        }
        &__input{
            position: absolute;
            bottom: 0;
            left: 0;
            border: 0 ;
            border-bottom:  2px solid black ;
            font-size: 32px;
            width: 100%;
            padding: 0;
            cursor: pointer;
            opacity: 0;
            &:focus{
                opacity: 1;
            }
        }
    }
</style>
