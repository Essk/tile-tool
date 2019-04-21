<template>
    <div class="wrap">
        <div class="bar">
            <div class="handle" :style="{bottom: `${positionFromStep(value)}%`}">
            </div>
        </div>
        <div class="scale">
            <button class="mark" 
            @click="setValue(scalestep)"
            v-for="scalestep in scale"  :key="scalestep" :style="{bottom: `${positionFromStep(scalestep)}%`}">
             --{{ scalestep }}
            </button>
        </div>
    </div>
</template>

<script  lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Color } from '@/primitives/color';
@Component
export default class CPColorSlider extends Vue {
    @Prop() private scale!: number[];
    @Prop() private value!: number;
    @Prop() private color!: string;
    private positionFromStep(step: number): number {
        return step === 0 ? 0 : Math.floor( (step / 255) * 100 );
    }
    private setValue(value: number) {
        this.$emit('updateValue', {value, color: this.color});
    }
}
</script>

<style scoped lang="scss">
    .bar{
        width: 10px;
        height: 255px;
        background-color: grey;
        position: relative;
    }
    .handle{
        width: 16px;
        height: 16px;
        background-color: white;
        border: 1px solid black;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
    }
    .wrap{
        display: flex;
        position: relative;
        height: 255px;;
    }
    .scale{
        position: absolute;
        width: 4px;
        height: 100%;
        background-color: wheat;
        left: 16px;
    }
    .mark{
        position: absolute;
        left: 0;
        width: 40px;
        transform: translateY(50%);
    }
</style>
