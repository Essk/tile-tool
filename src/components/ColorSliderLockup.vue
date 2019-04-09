<template>
<div class="lockup">
    <div class="wrap">
        <CPColorDetail class="active" :color="color" ></CPColorDetail>
        <CPColorSlider class="slider" :scale="color.threeBitScale" :value="color.red" color="red" @updateValue="handleUpdate"/>
        <CPColorSlider class="slider"  :scale="color.threeBitScale" :value="color.green" color="green" @updateValue="handleUpdate"/>
        <CPColorSlider class="slider" :scale="color.threeBitScale" :value="color.blue" color="blue" @updateValue="handleUpdate"/>

    </div>
</div>

</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Color } from '../utils/color';
import CPColorSlider from '@/components/ColorSlider.vue';
import CPColorDetail from '../components/ColorDetail.vue';

type ColorUpdate = {
    value: number;
    color: string;
};
@Component({
    components: {
        CPColorSlider,
        CPColorDetail,
    },
})
export default class CPColorSliderLockup extends Vue {
    @Prop() private color!: Color;
    private handleUpdate(colorUpdate: ColorUpdate) {
        switch (colorUpdate.color) {
            case 'red':
                this.color.red = colorUpdate.value;
                break;
            case 'green':
                this.color.green = colorUpdate.value;
                break;
            case 'blue':
                this.color.blue = colorUpdate.value;
                break;
            default:
                // do nothing
        }
        this.$emit('updateSelected', this.color);
    }
}
</script>

<style scoped lang="scss">
    .wrap{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        .active{
            flex-basis: 100%;
            margin-bottom: 2em;
        }
        .slider{
            margin-right: 4em;
        }
    }
   
</style>
