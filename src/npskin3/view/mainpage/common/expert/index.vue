<template>
    <div class="expert">
        <titles t1='赛事' t2='专家' t3='EXPERT' t4='REVIEWER' />
        <ul>
            <li v-for="(list,index) in expertList" :key="index">
                <img :src="list.url" width="100%" height="100%">
                <div class="showsmall">
                    <p class="name">{{list.name}}</p>
                    <p class="school dian2">{{list.message}}</p>
                </div>
                <div class="showall">
                    <p v-html="list.message"></p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import titles from '@/npskin3/components/title'
import { getWebInfo } from '@/common/common.js'

export default {
    components:{
        titles,
    },
    created(){
        let baseInfo = getWebInfo();
        if(baseInfo && baseInfo.expertList){
            this.expertList = baseInfo.expertList
            // 限制在6个
            if(this.expertList.length>6){
                this.expertList.length = 6
            }
        }
    },
    data(){
        return{
            expertList:[]
        }
    }
}
</script>

<style lang='less' scoped>
.expert{
    max-width: 1106px;
    margin: 0 auto;
    padding: 35px 0 21px;
    ul{
        margin-top: 21px;
        li{
            display: inline-block;
            vertical-align: top;
            width: 145px;
            height: 230px;
            margin-right: 44px;
            position: relative;
            margin-bottom: 10px;
            .showsmall{
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                background: linear-gradient(180deg, rgba(0, 0, 0, 0.17) 0%, rgba(0, 0, 0, 0.5) 100%);
                min-height: 57px;
                padding: 10px 9px 8px;
                .name{
                    font-size: 18px;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 27px;
                    letter-spacing: 1px;
                }
                .school{
                    font-size: 12px;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 18px;
                }
            }
            .showall{
                position: absolute;
                background: rgba(0, 0, 0, 0.7);
                width: 100%;
                height: 100%;
                padding: 10px 9px;
                overflow: hidden;
                left: 0;
                top: 0;
                display: none;
                p{
                    width: 100%;
                    height: 100%;
                    overflow: overlay;
                    color: #ffffff;
                }
            }
            &:hover{
                .showsmall{
                    display: none;
                }
                .showall{
                    display: block;
                }
            }
            &:nth-child(6n){
                margin-right: 0;
            }
        }
    }
}
</style>