<template>
    <ul class="navs">
        <li v-for="item in datas" :key="item.id">
            <img :src="item.imgage" />
            <div>
                <h3 class="dian2">{{item.title}}</h3>
                <div class="message">
                    <p v-for="mess,j in item.message" :key="j">{{mess}}</p>
                </div>
                <div class="button" :class="item.color">
                    点击进入学习
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['datas'],
    data(){
        return{
            
        }
    }
}
</script>

<style lang='less' scoped>
.navs{
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 40px;
    li{
        width: 285px;
        height: 244px;
        margin-right: 20px;
        display: inline-block;
        vertical-align: top;
        text-align: left;
        padding: 20px;
        position: relative;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: inherit;
        }
        &:hover{
            img{
                transform: scale(1.05);
            }
        }
        &:nth-child(4){
            margin-right: 0;
        }
        h3{
            height: 66px;
            font-size: 24px;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 33px;
        }
        >div{
            position: relative;
            z-index: 2;
        }
        .message{
            height: 60px;
            font-size: 14px;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 20px;
            margin: 11px 0 26px;
        }
        .button{
            width: 120px;
            height: 32px;
            background: #FFFFFF;
            border-radius: 32px;
            line-height: 32px;
            text-align: center;
            color: #459623;
            font-size: 14px;
            cursor: pointer;
            &.color1{
                color: #459623;
            }
            &.color2{
                color: #FE6405;
            }
            &.color3{
                color: #72706E;
            }
            &.color4{
                color: #FE6405;
            }
            &.color5{
                color: #1F52FF;
            }
        }
    }
}
</style>