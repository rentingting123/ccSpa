<template>
    <div class="organize">
        <div>
            <h2Title title="友情链接" />

            <ul class="clearfix">
                <li v-for="(src,index) in imgs" :key="index">
                    <span @click="tohref(src.cagenLink)">{{src.cagenName}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getBaseInfo } from '@/common/common.js'
import h2Title from '../h2'
export default {
    components:{
        h2Title
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
        }
    }
}
</script>


<style lang="less" scoped>
.organize{
    width: 1100px;
    margin: 27px auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(227,227,227,0.94);
    >div{
        width: 1100px;
        margin: 0 auto;
        ul{
            text-align: left;
            padding: 0 15px;
            li{
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                width:340px;
                font-size:14px;
                font-weight:400;
                color:rgba(37,36,36,1);
                line-height:40px;
                margin-right: 18px;
                text-align: center;
            }
            li:nth-child(3n){
                margin-right: 0;
            }
        }
    }
}
</style>
