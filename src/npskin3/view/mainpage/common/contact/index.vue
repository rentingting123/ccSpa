<template>
    <div class="contact">
        <h2>友情链接</h2>
        <ul>
            <li v-for="(link,index) in links" :key="index" @click="toMore(link)">
                {{link.name}}
            </li>
        </ul>
        <h3>联系我们</h3>
        <div class="us">
            <p><i class="iconfont">&#xe6d0;</i>{{phone}}</p>
            <p><i class="iconfont">&#xe695;</i>{{qq}}</p>
            <p><i class="iconfont">&#xe68f;</i>{{wechat}}</p>
            <p><i class="iconfont">&#xe6de;</i>{{email}}</p>
        </div>
    </div>
</template>

<script>
import { getWebInfo } from '@/common/common.js'
export default {
    created(){
        let baseInfo = getWebInfo();
        this.links = baseInfo && baseInfo.links || []
        this.email = baseInfo && baseInfo.email || ""
        this.phone = baseInfo && baseInfo.phone || ""
        this.qq = baseInfo && baseInfo.qq || ""
        this.wechat = baseInfo && baseInfo.wechat || ""
    },
    data(){
        return{
           links: [],
           email: '',
           phone: '',
           qq: '',
           wechat: '' 
        }
    },
    methods:{
        toMore(link){
            if(!link.url) return;
            let url = link.url.indexOf('http') == -1 ? 'http://' + link.url : link.url
            window.open(url)
        }
    }
}
</script>

<style lang='less' scoped>
.contact{
    max-width: 1106px;
    margin: 0 auto;
    padding-bottom: 44px;
    h2{
        text-align: center;
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #4A4A4A;
        line-height: 28px;
        margin: 36px 0 20px;
    }
    h3{
        text-align: center;
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        color: #4A4A4A;
        line-height: 28px;
        margin: 51px 0 28px;
    }
    ul{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        li{
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 21px;
            margin: 5px 23px;
            cursor: pointer;
            &:hover{
                color: #409EFF;
            }
        }
    }
    .us{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        p{
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 21px;
            letter-spacing: 1px;
            margin: 0 23px;
            i{
                margin-right: 5px;
            }
        }
    }
}
</style>