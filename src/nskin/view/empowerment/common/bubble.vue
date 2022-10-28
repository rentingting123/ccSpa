<template>
    <div class="bubble" :class="{'on': on}" @mouseover="hover=true" @mouseleave="hover=false">
        <el-progress 
            type="circle" 
            :percentage="num" 
            :width="44" 
            :color='color'
            >
        </el-progress>
        <div class="mess">{{name}}</div>
        <div class="bubbleTail"></div>
    </div>
</template>

<script>
export default {
    props: ['on', 'name', 'num'],
    data(){
        return{
            hover: false
        }
    },
    computed: {
        color() {
            if(this.on){
                return '#666666'
            }else if(this.hover){
                return '#666666'
            }else{
                return '#ED1E26'
            }
        }
    }
}
</script>

<style lang='less' scoped>
.bubble{
    width: auto;
    height: 60px;
    display: inline-block;
    background: rgba(255, 255, 255, 0.49);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    padding: 0 20px;
    position: absolute;
    cursor: pointer;
    /deep/.el-progress {
        margin-top: 8px;
    }
    .mess{
        font-size: 28px;
        font-weight: 400;
        line-height: 60px;
        color: #707070;
        margin-left: 15px;
        display: inline-block;
        vertical-align: top;
    }
    .bubbleTail{
        position:absolute;
        top:100%;
        right:21px;
        width:0;
        height:0;
        border-width:15px;
        border-style:solid;
        border-color:transparent;
        margin-bottom:-15px;
        border-top-width:24px;
        border-top-color:currentColor;
        color:rgba(255, 255, 255, 0.49);
    }
    &:hover, &.on{
        background: #ED1E26;
        .mess{
            color: #FFFFFF;
        }
        .bubbleTail{
            color: #ED1E26;
        }
        /deep/.el-progress__text{
            color: #ffffff;
        }
    }
}
</style>