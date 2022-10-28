<template>
    <div class="provincialranking">
        <h title="竞赛省级排行"></h>
        <div class="main">
            <ul class="imgs">
                <li v-for="list in lists0" :key="list.rankingIndex" class="first" >
                    <img v-if="list.rankingIndex==1" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/province1.png" >
                    <img v-else-if="list.rankingIndex==2" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/province2.png" >
                    <img v-else-if="list.rankingIndex==3" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/province3.png" >
                    <div>
                        <p class="dian">NO.{{list.rankingIndex}} {{list.province}}</p>
                    </div>
                </li>
            </ul>
            <ul class="border right">
                <li v-for="list in lists1" :key="list.rankingIndex">
                    <div class="num">
                        <p>{{list.rankingIndex}}</p> 
                    </div>
                    <div class="name dian" :class="{'weight':list.rankingIndex<=3}">{{list.province}}</div>
                    <p class="score">
                        <span>{{list.rankingScore}} </span>
                        <img v-if="list.floatingRanking>0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/up.png" >
                        <img v-else-if="list.floatingRanking<0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/down.png" >
                        <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/line.png" >
                    </p>
                </li>
            </ul>
            <ul class="right">
                <li v-for="list in lists2" :key="list.rankingIndex" >
                    <div class="num">
                        <p>{{list.rankingIndex}}</p> 
                    </div>
                    <div class="name dian" :class="{'weight':list.rankingIndex<=3}">{{list.province}}</div>
                    <p class="score">
                        <span>{{list.rankingScore}} </span>
                        <img v-if="list.floatingRanking>0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/up.png" >
                        <img v-else-if="list.floatingRanking<0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/down.png" >
                        <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/line.png" >
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
import h from '@/nskin/components/h'
export default {
    components:{
        h,
    },
    data(){
        return{
            lists0: [],
            lists1: [],
            lists2: [],
            obj: {}
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            let res = await network.provincialRanking({data:{
                provinceId: 1,
            }});
            if(res=='error') return;
            let arr = res || [];
            this.lists0 = arr.filter(res=>{
                return res.rankingIndex>0 && res.rankingIndex<=3
            })
            this.lists1 = arr.filter(res=>{
                return res.rankingIndex>3 && res.rankingIndex<11
            })
            this.lists2 = arr.filter(res=>{
                return res.rankingIndex>=11
            })
        },
    }
}
</script>

<style lang="less" scoped>
.provincialranking{
    width: 1200px;
    margin: 0 auto;
    .main{
        width: 100%;
        margin-top: 12px;
        background: #F2F7F7;
        padding: 65px 47px 60px;
        text-align: left;
        position: relative;
        .imgs{
            width: 530px;
            display: inline-block;
            vertical-align: top;
            margin-right: 65px;
            .first{
                width: 100%;
                height: 89px;
                overflow: hidden;
                position: relative;
                display: inline-block;
                vertical-align: top;
                img{
                    width: 100%;
                    height: 100%;
                }
                div{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.57);
                    p{
                        width: 530px;
                        font-size: 21px;
                        line-height: 89px;
                        color: #FFFFFF;
                        z-index: 2;
                        text-align: center;
                    }
                }
                &.on, &:hover{
                    div{
                        background: none;
                        p{
                            background: #ED1E26;
                            height: 26px;
                            line-height: 26px;
                            font-size: 18px;
                            display: inline-block;
                            width: auto;
                            padding: 0 10px;
                        }
                    }
                }
            }
        }
        .right{
            width: 250px;
            padding-left: 29px;
            display: inline-block;
            vertical-align: top;
            &.border{
                padding-left: 0;
                padding-right: 29px;
                border-right: 1px solid #D2D6D6;
            }
            li{
                width: 221px;
                height: 37px;
                line-height: 37px;
                display: inline-block;
                vertical-align: top;
                .num{
                    width: 28px;
                    height: 28px;
                    margin-right: 10px;
                    display: inline-block;
                    vertical-align: top;
                    p{
                        margin: 9px 4px;
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
                        border-radius: 100%;
                        background: #171A25;
                        font-size: 14px;
                        color: #FFFFFF;
                        letter-spacing: 1px;
                        text-align: center;
                    }
                }
                .name{
                    width: 100px;
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 0;
                    text-align: left;
                    display: inline-block;
                    vertical-align: top;
                }
                .score{
                    font-size: 14px;
                    color: #9C9C9C;
                    display: inline-block;
                    vertical-align: top;
                    span{
                        width: 42px;
                        display: inline-block;
                        text-align: left;
                    }
                    img{
                        width: 8px;
                    }
                }
                &:nth-child(2n+1){
                    background: #E6EBEB;
                }
            }
        }
    }
}
</style>