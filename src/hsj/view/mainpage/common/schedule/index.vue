<template>
    <ul id="activeul">
        <li v-for="list,index in lists" :class="{'on':list.type==0}" :key='index' v-if="list.name">
            <div>
                <p>
                    <i class='iconfont' v-if='index==0'>&#xe6aa;</i>
                    <i class='iconfont' v-else-if='index==1'>&#xe6b0;</i>
                    <i class='iconfont' v-else-if='index==2'>&#xe68e;</i>
                    <i class='iconfont' v-else-if='index==3'>&#xe67f;</i>
                    <i class='iconfont' v-else-if='index==4'>&#xe6ad;</i>

                    <span class="container">
                        <span class="corner"></span>
                    </span>
                </p>
                <p>{{list.time}}</p>
            </div>
            <p class="dian" :title="list.name">{{list.name}}</p>
        </li>
    </ul>
</template>


<script>
import moment from 'moment'
export default {
    data(){
        return{
            lists:[
                {
                    name: '评选启动',
                    time: '7月',
                    id: 1,
                    type: 0,
                },
                {
                    name: '申报截止',
                    time: '10.31',
                    id: 2,
                    type: 0,
                },
                {
                    name: '初评',
                    time: '11月',
                    id: 3,
                },
                {
                    name: '终评',
                    time: '12月',
                    id: 4,
                },
                {
                    name: '颁奖',
                    time: '年底',
                    id: 5,
                },
            ],
        }
    },
}
</script>

<style lang="less" scoped>
ul{
    text-align: left;
    margin-top: 24px;
    li{
        width: 75px;
        display: inline-block;
        vertical-align: top;
        margin-right: 11px;
        >div{
            width: 70px;
            height: 84px;
            border-radius: 5px;
            line-height: 84px;
            text-align: center;
            box-shadow: 5px 6px 0 0 #DDDEDE;
            p{
                width: 100%;
                height: 42px;
                line-height: 42px;
                font-size: 16px;
                color: #4A4A4A;
                font-weight:500;
                letter-spacing: 1.45px;
                text-align: center;
                position: relative;
                .iconfont{
                    font-size: 24px;
                    color: #FFFFFF;
                }
            }
            p:nth-child(2n+1){
                background: #404040;
                border-radius: 5px 5px 0 0;
            }
            p:nth-child(2n){
                border-radius: 0 0 5px 5px;
            }
            .container {
                display: block;
                position:absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -10px;
                width: 6px;
            }
            .corner {
                display: block;
                width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
                height: 0px;
                border: 6px solid #404040;
                border-bottom-color: transparent;    /* 设置透明背景色 */
                border-left-color: transparent;
                border-right-color: transparent;
            }
        }
        >p{
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.52px;
            margin-top: 8px;
            text-align: center;
        }
        &:last-child{
            margin-right: 0;
        }
    }
    // li:nth-child(5n){
    //     margin-right: 0;
    // }
    li.on{
        
        >div{
            border: 1px solid #9F0521;
            p:nth-child(2n+1){
                background: #9F0521;
                color: #FFFFFF;
            }
            p:nth-child(2n){
                color: #9F0521;
            }
            .corner{
                border: 6px solid #9F0521;
                border-bottom-color: transparent;    /* 设置透明背景色 */
                border-left-color: transparent;
                border-right-color: transparent;
            }
        }
    }
}
</style>