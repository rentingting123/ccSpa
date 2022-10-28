<template>
    <div class="organize">
        <div>
            <h title="友情链接">
                <!-- <span @click="toApply" class="more">摩课云竞赛执行平台申请试用</span> -->
            </h>
            <ul>
                <li v-for="(src,index) in imgs" :key="index" v-if="src.cagenName" class="dian">
                    <span @click="tohref(src.cagenLink)">{{src.cagenName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getBaseInfo } from '@/common/common.js'
import h from '@/nskin/components/h'
export default {
    components:{
        h
    },
    data(){
        return{
            imgs:[]
        }
    },
    created(){
        let baseInfo = getBaseInfo();
        if(baseInfo && baseInfo.cagenList){
            this.imgs = baseInfo.cagenList
        }
    },
    methods:{
        tohref(item){
            if(!item) return;
            let url = item.indexOf('http') == -1 ? 'http://' + item : item
            window.open(url)
        },
        toApply(){
            window.open('http://cc.moocollege.com/#/applyCompetition')
        }
    }
}
</script>


<style lang="less" scoped>
.organize{
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    .more{
        color: #6283FF;
        font-size: 18px;
        line-height: 24px;
        color: #252223;
        opacity: 0.53;
        float: right;
    }
    ul{
        text-align: left;
        li{
            display: inline-block;
            vertical-align: top;
            width: 279px;
            height: 60px;
            background: #F2F7F7;
            cursor: pointer;
            font-size: 18px;
            line-height: 60px;
            color: #252223;
            margin-right: 28px;
            margin-top: 20px;
            text-align: center;
            padding: 0 15px;
            &:nth-child(4n){
                margin-right: 0;
            }
            &:hover{
                background: #ED1E26;
                color: #fff;
            }
        }
    }
}

</style>
