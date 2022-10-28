<template>
    <div class="organize">
        <h1 class="title"><i class="el-icon-caret-right breadcrumbIcon"></i> 友情链接</h1>
        <div>
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
    h1{
        background: rgb(247, 247, 247);
        margin: .22rem 0 0.22rem 0.3rem;
        font-size: .32rem;
        line-height: 0.42rem;
        color: #252223;
        text-align: left;
    }
    >div{
        padding-top: .2rem;
        background: #ffffff;
        ul{
            li{
                width: 5.60rem;
                height: 1.20rem;
                display: block;
                margin: 0 auto;
                margin-bottom: .2rem;
                cursor: pointer;
            }
        }
    }
}
</style>
