<template>
    <div class="footer">
        <div>
            <span>联系我们</span>
            <i v-if="webInfo.phone">电话：{{webInfo.phone}}<span> | </span></i>
            <i v-if="webInfo.qq">QQ：{{webInfo.qq}}<span> | </span></i>
            <i v-if="webInfo.wechat">微信：{{webInfo.wechat}}<span> | </span></i>
            <i v-if="webInfo.email">E-mail：{{webInfo.email}}</i>
        </div>
        <!-- <div>
            <span>友情链接</span>
            <i class="alink" v-for="list in webInfo.links" @click="todetail(list.url)">{{list.name}}</i>
        </div> -->
        <p class="statistics">
            访问统计：{{numbers || 0}}
        </p>
    </div>
</template>


<script>
import network from '@/api'
import { getWebInfo } from '@/common/common.js'
export default {
    data(){
        return{
            numbers: 0,
            webInfo: {}
        }
    },
    created(){
        this.webInfo = getWebInfo();
        this.groupId = localStorage.getItem('groupId');
        this.getstatistics()
    },
    methods:{
        async getstatistics(){
            let res = await network.npgetStatistics({data:{groupId:this.groupId}});
            if(res=='error') return;
            this.numbers = res;
        },
        todetail(url){
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
        }
    }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    padding: 10px 0;
    overflow: hidden;
    text-align: left;
    position: relative;
    div{
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1.27px;
        line-height: 2;
        height: 28px;
        overflow: hidden;
        span{
            color: #0041AB;
            margin-right: 35px;
        }
        i{
            font-style: normal;
            span{
                color: #4A4A4A;
                opacity: .7;
                margin: 0 10px;
            }
        }
        .alink{
            margin-right: 10px;
            cursor: pointer;
        }
    }
    .statistics{
        position: absolute;
        top: 12px;
        right: 0px;
        padding: 0 5px;
        background: #DAE5FE;
        border-radius: 3px;
        line-height: 17px;
        font-size: 12px;
        color: #5871A9;
        letter-spacing: 1.09px;
    }
}
</style>