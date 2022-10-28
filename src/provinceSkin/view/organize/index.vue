<template>
    <div class="organize">
        <div>
            <h1>
                <i class="iconfont">&#xe678;</i>友情链接
            </h1>
            <ul class="clearfix">
                <li v-for="(src,index) in imgs" :key="index">
                    <img :src="src.url" @click="tohref(src.cagenLink)" width="100%" height="100%">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { getBaseInfo } from '@/common/common.js'
export default {
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
    width: 100%;
    margin-top: 50px;
    >div{
        width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
        ul{
            margin: 60px auto 70px;
            li{
                height: 60px;
                width: 280px;
                float: left;
                margin-right: 21px;
                margin-bottom: 30px;
                cursor: pointer;
            }
            li:nth-child(4n){
                margin-right: 0;
            }
        }
    }
}
</style>
