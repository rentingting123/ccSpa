<template>
    <div class="calendar">
        <div class="clearfix">
            <h1><i class="iconfont">&#xe606;</i>赛事日历</h1>
            <div class="fl">
                <div class="clearfix title">
                    <i class="el-icon-caret-left" @click="year--"></i>
                    <span>{{year}}</span>
                    <i class="el-icon-caret-right" @click="year++"></i>
                </div>
                <ul>
                    <li v-for="item in date" :key="item.id" @click="month = item.id-1" :class="{'on':month+1==item.id}">
                        <!-- <el-badge :value="0" class="item" type="primary"> -->
                            <p>
                                 {{item.name}}
                            </p>
                        <!-- </el-badge> -->
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
                    name: '1月'
                },
                {
                    id:2,
                    name: '2月'
                },
                {
                    id:3,
                    name: '3月'
                },
                {
                    id:4,
                    name: '4月'
                },
                {
                    id:5,
                    name: '5月'
                },
                {
                    id:6,
                    name: '6月'
                },
                {
                    id:7,
                    name: '7月'
                },
                {
                    id:8,
                    name: '8月'
                },
                {
                    id:9,
                    name: '9月'
                },
                {
                    id:10,
                    name: '10月'
                },
                {
                    id:11,
                    name: '11月'
                },
                {
                    id:12,
                    name: '12月'
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
    margin-top: 50px;
    >div{
        width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
        .fl{
            width: 330px;
            height: 330px;
            background: #ffffff;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
            border-radius: 5px;
            .title{
                font-size: 22px;
                color: #4A4A4A;
                margin: 20px 0;
                span{
                    display: inline-block;
                    width: 260px;
                    font-weight: bold;
                }
                i{
                    font-size: 14px;
                    cursor: pointer;
                    color: #4A4A4A;
                    opacity: 0.3;
                }
            }
            ul{
                padding: 0 20px;
                li{
                    float: left;
                    cursor: pointer;
                    padding: 0 21px 10px 21px;
                    p{
                        width: 52px;
                        height: 52px;
                        line-height: 52px;
                        text-align: center;
                        border-radius: 100%;
                        
                    }
                }
                li.on{
                    p{
                        background: #0078E2;
                        color: #ffffff;
                    }
                }
            }

        }
        .fr{
            width: 780px;
            height: 330px;
        }
    }
}
</style>
