<template>
    <div class="h2title" :style="{marginTop:`${top?top:'20px'}`}">
        <h2>
            {{title}}
            <p></p>
        </h2>
        <span @click="toPath" v-if="more">more</span>
    </div>
</template>

<script>
export default {
    props:['title', 'more', 'path', 'url', 'top'],
    methods:{
        toPath(){
            if(this.more && this.url){
                window.open(this.url)
            }
            if(this.more && this.path){
                this.$router.push(this.path)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.h2title{
    width: 100%;
    height: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #AFAFAF;
    margin-top: 20px;
    h2{
        width:auto;
        font-size:16px;
        font-weight:600;
        color:rgba(0,0,0,1);
        line-height:22px;
        letter-spacing:1px;
        position: relative;
        padding-bottom: 5px;
        cursor: pointer;
        p{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: #9F0521;
        }
    }
    span{
        display: block;
        width:43px;
        height:16px;
        text-align: center;
        background:rgba(222,222,222,1);
        border-radius:8px;
        font-size:12px;
        font-weight:500;
        color:rgba(131,131,131,1);
        line-height:16px;
        cursor: pointer;
    }
}
</style>