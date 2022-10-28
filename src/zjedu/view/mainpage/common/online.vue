<template>
    <div class="online">
        <h2>
            精选训练营
            <small @click="$router.push('/online')">更多</small>
        </h2>
        <ul>
            <li v-for="item in datas" :key="item.id">
                <img :src="item.imgage" />
                <div>
                    <h3 class="dian2">{{item.title}}</h3>
                    <div class="message" :class="{'big': item.message.length<3}">
                        <p v-for="mess,j in item.message" :key="j">{{mess}}</p>
                    </div>
                    <div class="button" :class="item.color">
                        点击进入学习
                    </div>
                </div>
            </li>
        </ul>
    </div>
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
.online{
    width: 1200px;
    margin: 0 auto;
    h2{
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        text-align: left;
        margin-bottom: 20px;
        small{
            font-size: 16px;
            font-weight: 400;
            color: #303132;
            cursor: pointer; 
            float: right;
            line-height: 37px;
            opacity: 0.4;
        }
    }
    ul{
        li{
            width: 585px;
            height: 214px;
            margin-right: 30px;
            display: inline-block;
            vertical-align: top;
            text-align: left;
            padding: 20px;
            position: relative;
            overflow: hidden;
            margin-bottom: 30px;
            >div{
                position: relative;
                z-index: 2;
            }
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
                    transform: scale(1.01);
                }
            }
            &:nth-child(2n){
                margin-right: 0;
            }
            h3{
                height: 33px;
                font-size: 24px;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 33px;
                margin-top: 6px;
            }
            .message{
                height: 60px;
                font-size: 14px;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 20px;
                margin: 11px 0 26px;
                &.big{
                    line-height: 25px;
                }
            }
            .button{
                width: 120px;
                height: 32px;
                background: #FFFFFF;
                border-radius: 32px;
                line-height: 32px;
                text-align: center;
                color: #000000;
                font-size: 14px;
                cursor: pointer;
                &.color1{
                    color: #459623;
                }
                &.color2{
                    color: #FE6405;
                }
                &.color3{
                    color: #1F52FF;
                }
                &.color4{
                    color: #72706E;
                }
            }
        }
    }
}
</style>