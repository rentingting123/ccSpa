<template>
    <div class="calendar">
        <div class="clearfix">
            <h1 class="title no">赛事日历</h1>
            <div class="fl">
                <div class="clearfix title">
                    <i class="el-icon-caret-left" @click="year--"></i>
                    <span>{{year}}</span>
                    <i class="el-icon-caret-right" @click="year++"></i>
                </div>
                <ul>
                    <li v-for="item in date" :key="item.id" @click="month = item.id-1" :class="{'on':month+1==item.id}">
                            <div>
                                 <span>{{item.name}}</span> 月
                                 <p class="line"></p>
                            </div>
                    </li>
                </ul>
            </div>
            <div class="fr">
                <competition :times="times" />
            </div>
        </div>
    </div>
</template>
<script>
import competition from './common/competition'
export default {
    components:{
        competition
    },
    data(){
        return{
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            date:[
                {
                    id:1,
                    name: '1'
                },
                {
                    id:2,
                    name: '2'
                },
                {
                    id:3,
                    name: '3'
                },
                {
                    id:4,
                    name: '4'
                },
                {
                    id:5,
                    name: '5'
                },
                {
                    id:6,
                    name: '6'
                },
                {
                    id:7,
                    name: '7'
                },
                {
                    id:8,
                    name: '8'
                },
                {
                    id:9,
                    name: '9'
                },
                {
                    id:10,
                    name: '10'
                },
                {
                    id:11,
                    name: '11'
                },
                {
                    id:12,
                    name: '12'
                }
            ]
        }
    },
    computed:{
        times(){
            return this.year + '.' + (this.month + 1)
        }
    }
}
</script>

<style lang="less" scoped>
.calendar{
    width: 100%;
    margin-top: 30px;
    background: #ffffff;
    padding-bottom: 32px;
    >div{
        width: 1171px;
        margin: 0 auto;
        .fl{
            width: 330px;
            height: 249px;
            background: #ffffff;
            background: #FFFFFF;
            border: 1px solid #CBD4DC;
            border-radius: 20px 20px 20px 0px;
            overflow: hidden;
            .title{
                width: 100%;
                height: 63px;
                line-height: 63px;
                background-image: linear-gradient(-90deg, #00B0F3 0%, #0078E2 100%);
                border-radius: 20px 20px 0px 0px;
                span{
                    display: inline-block;
                    width: 260px;
                    font-weight: bold;
                    font-size: 22px;
                    color: #FFFFFF;
                    letter-spacing: 1.22px;
                }
                i{
                    font-size: 14px;
                    cursor: pointer;
                    color: #ffffff;
                    opacity: 0.5;
                }
            }
            ul{
                width: 100%;
                height: 186px;
                display: flex;
                align-content: center;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content:center;
                align-items: baseline;
                li{
                    float: left;
                    cursor: pointer;
                    margin: 8px 15px;
                    >div{
                        width: 50px;
                        height: 39px;
                        line-height: 39px;
                        text-align: center;
                        border-radius: 100%;
                        font-size: 12px;
                        position: relative;
                        color: #ABB8D7;
                        letter-spacing: 0.67px;
                        border-radius: 5px;
                        span{
                            font-size: 24px;
                            color: #5871A9;
                        }
                    }
                }
                li.on{
                    div{
                        background: #F2F6FF;
                    }
                }
            }

        }
        .fr{
            width: 784px;
            height: 249px;
        }
    }
}
</style>
