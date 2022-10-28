<template>
    <div class="bottom">
        <div class="top">
            <h1>联系我们</h1>
            <p>客服电话：0571-81902943(周一至周五)</p>
            <p>公司地址：浙江省杭州市紫金创业园B座11F</p>
            <h2>
                微信公众号
                <span @click="dialogVisible=true">点击扫码关注</span>
            </h2>
        </div>
        <div class="line"></div>
        <div class="footer">
            竞赛内容版权归内容提供者（机构）所有<br>
            技术支持：杭州简学科技有限公司<br>
            浙公网安备: 33010602004724号 <br> 
            浙ICP备15007838号
        </div>
        <a-modal title="关注" v-model="dialogVisible"  width="80%" :footer='null'>
            <img src="https:/web.moocollege.com/nskin/static/img/weixin.670ae99.jpg" width="100%">
        </a-modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialogVisible: false
        }
    }
}
</script>

<style lang="less" scoped>
.bottom{
    width: 100%;
    text-align: left;
    margin-top: .25rem;
    background: #606767;
    .top{
        width: 100%;
        padding: .50rem .32rem 0.44rem 0.88rem;
        h1{
            font-size: .36rem;
            color: #ffffff;
        }
        h2{
            font-size: .36rem;
            color: #ffffff;
            margin: .35rem 0 .06rem;
            span{
                font-size: .28rem;
                color: #ffffff;
                font-weight: normal;
                text-decoration: underline;
                margin-left: .8rem;
            }
        }
        p{
            font-size: .28rem;
            color: #ffffff;
            margin-top: .12rem !important;
        }

    }
    .line{
        width: 7rem;
        height: 8px;
        margin: 0 auto;
        background: #757f7f;
    }
    .footer{
        text-align: center;
        padding: .31rem .32rem 0.50rem;
        width: 100%;
        font-size: .28rem;
        color: rgba(255, 255, 255, 0.4);
        text-align: center;
        line-height: .44rem;
    }
}
</style>
