<template>
    <!-- 使用 -->
    <!-- <titles t1='系列' t2='赛事' t3='SERIES' t4='COMPETITION' path='asda'/> -->
    <div class="title">
        <div class="main">
            <p>{{t1}}</p>
            <p class="color">{{t2}}</p>
            <p class="english">
                <span>{{t3}}</span>
                <span class="color">{{t4}}</span>
            </p>
        </div>
        <div class="more" @click="toMore" v-if="path || to">
            查看更多
        </div>
    </div>
</template>

<script>
export default {
    props:['t1','t2','t3','t4','path','to'],
    methods:{
        toMore(){
            if(this.path){
                let url = this.path.indexOf('http') == -1 ? 'http://' + this.path : this.path
                window.open(url)
            }else if(this.to){
                this.$router.push(this.to)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.title{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .main{
        width: auto;
        height: 40px;
        p{
            font-size: 28px;
            font-weight: 300;
            color: #4A4A4A;
            line-height: 40px;
            display: inline-block;
            vertical-align: top;
            font-weight: bold;
            &.color{
                color: #6283FF;
            }
        }
        .english{
            padding: 3px;
            span{
                font-size: 12px;
                height: 14px;
                font-weight: 400;
                color: #4A4A4A;
                line-height: 18px;
                display: block;
                &.color{
                    color: #6283FF;
                }
            }
        }
    }
    .more{
        width: 82px;
        height: 27px;
        line-height: 27px;
        background: #DBDBDB;
        border-radius: 6px;
        text-align: center;
        font-size: 14px;
        color: #4a4a4a;
        font-weight: 400;
        cursor: pointer;
    }
}
</style>