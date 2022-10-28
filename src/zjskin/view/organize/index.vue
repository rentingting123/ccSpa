<template>
    <div class="organize">
        <div>
            <h1>
                <i class="iconfont">&#xe678;</i>友情链接
            </h1>
            <ul class="clearfix">
                <li v-for="(src,index) in imgs" :key="index">
                    <img :src="src.url" @click="tohref(src.href)" height="100%">
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
            imgs:[
                {
                    url: 'http://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/org/pic0.png',
                    href:'http://jyt.zj.gov.cn/ ',
                },
                {
                    url: 'http://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/org/pic1.png',
                    href:'http://www.hie.edu.cn/',
                },
                {
                    url: 'http://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/org/pic2.png',
                    href:'http://www.zju.edu.cn/',
                },
                {
                    url: 'http://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/org/pic3.png',
                    href:'http://www.csee.engineer/',
                }
            ]
        }
    },
    create(){
        let baseInfo = getBaseInfo();
        if(baseInfo && baseInfo.cagenList){
            this.imgs = baseInfo.cagenList
        }
    },
    methods:{
        tohref(info){
            window.open(info)
        }
    }
}
</script>


<style lang="less" scoped>
.organize{
    width: 100%;
    margin-top: 100px;
    >div{
        width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
        ul{
            margin: 60px auto 70px;
            li{
                height: 54px;
                width: auto;
                float: left;
                margin-right: 83px;
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
