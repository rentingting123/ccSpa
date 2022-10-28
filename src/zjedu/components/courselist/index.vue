<template>
    <div class="courselist" @click="toHref">
        <div class="img">
            <img :src="item.image" width="100%" height="100%">
            <div>{{item.level | level}}</div>
        </div>
        <h3>{{item.title}}</h3>
        <div class="middle">
            <p>
                <span></span>
                {{item.status}}
            </p>
            <p>
                <i class="iconfont">&#xe6d8;</i>
                {{item.people || 0}}
            </p>
        </div>
        <div class="bottom">
            <p>
                <img v-if="item.avatar" :src="item.avatar" /> 
                <i v-else class="iconfont">&#xe677;</i>
                {{item.teacher}}
            </p>
            <p>{{item.school}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['item'],
    data(){
        return{

        }
    },
    methods:{
        toHref(){
            if(this.item && this.item.url){
                window.open(this.item.url)
            }
        }
    },
    filters:{
        level(val){
            switch(val){
                case 0: return '入门'
                case 1: return '初级'
                case 2: return '中级'
                case 3: return '高级'
                default: return '入门'
            }
        }
    }
}
</script>

<style lang='less' scoped>
.courselist{
    border: 1px solid #E6E6E6;
    height: 100%;
    text-align: left;
    cursor: pointer;
    .img{
        width: 100%;
        height: 157px;
        position: relative;
        overflow: hidden;
        &:hover{
            img{
                transform: scale(1.1);
            }
        }
        div{
            position: absolute;
            top: 0;
            left: 0;
            width: 40px;
            line-height: 20px;
            background: rgba(0,0,0,0.3);
            border-radius: 3px;
            text-align: center;
            font-size: 14px;
            font-weight: 500;
            color: #FFFFFF;
        }
    }
    h3{
        padding: 11px 20px 11px 16px;
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
    }
    .middle{
        padding: 0 20px 10px 16px;
        display: flex;
        font-size: 14px;
        font-weight: 400;
        color: #999999;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #E6E6E6;
        p:first-child{
            color: #096AF2;
        }
        span{
            display: inline-block;
            vertical-align: top;
            margin-right: 3px;
            margin-top: 7px;
            border-radius: 100%;
            width: 6px;
            height: 6px;
            background: #1192ff;
            animation: bling 1s infinite;
        }
    }
    .bottom{
        padding: 14px 20px 15px 16px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 400;
        color: #4A4A4A;
        line-height: 17px;
        img{
            width: 16px;
            height: 16px;
            border-radius: 16px;
            margin-right: 8px;
            vertical-align: top;
        }
        i{
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;
            line-height: 16px;
            border-radius: 16px;
            font-size: 12px;
            background: #c0c4cc;
            color: #FFFFFF;
            text-align: center;
            margin-right: 8px;
        }
    }
}
@keyframes bling {
    0% {box-shadow: 0px 0px 0 0 #1190ff}
    100% {box-shadow: 0px 0px 10px 0.5px #1190ff}
}
</style>