
<template>
    <div class="footer">
        <div class="clearfix">
            <div class="about">
                <img class="backtop" style=" cursor: pointer;" @click="toCC" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/logo.png" alt="">
                <div class="backtop">
                    <h2 >关于我们</h2>
                    <ul>
                        <li @click="$router.push('/introductionPlatform')">
                            平台简介
                        </li>
                        <li @click="$router.push('/expendingServices')">
                            服务支持
                        </li>
                    </ul>
                </div>
            </div>
            <div class="contant">
                <h2 class="backtop">帮助中心</h2>
                <ul class="backtop clearfix">
                    <li @click="toQA(2)">平台疑问</li>
                    <li @click="toQA(5)">账号疑问</li>
                    <li @click="toQA(3)">登录疑问</li>
                    <li @click="toQA(6)">密码疑问</li>
                    <li @click="toQA(4)">竞赛疑问</li>
                </ul>
            </div>
            <div class="contant">
                <h2 class="backtop">申领账号</h2>
                <ul class="backtop clearfix on">
                    <li><a href="http://zhsq.moocollege.com/">高校竞赛平台账号申领</a></li>
                    <li><a @click="toregister">赛事主办方账号申领</a></li>
                </ul>
            </div>
            <div class="contant us">
                <h2 class="backtop">联系我们</h2>
                <ul class="backtop clearfix on">
                    <li>客服电话：0571-81902943<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(周一至周五)</li>
                    <li>公司地址：浙江省杭州市<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;紫金创业园B座11F</li>
                </ul>
            </div>
            <div class="contant code">
                <h2 class="backtop">微信公众号</h2>
                <div class="img backtop">
                    <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/weixin.jpg" width="100%">
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
import { toregister } from '@@/utils/util'
export default {
    data(){
        return{

        }
    },
    methods:{
        toregister(){
            toregister(true)
        },
        toQA(type){
            this.$router.push('/helpcenter?type='+type)
        },
        toCC(){
            location.href = 'https://cc.moocollege.com'
        }
    }
}
</script>



<style lang="less" scoped>
.backtop{
    position: relative;
    top: -45px;
}
.footer{
    width: 100%;
    height: 230px;
    background: #1B2630;
    padding: 74px 0 39px;
    >div{
        width: 1280px;
        margin: 0 auto;
        padding: 0 40px;
        .about{
            width: 288px;
            height: 125px;
            float: left;
            border-right: 1px solid #343C43;
            img{
                float: left;

                margin-left: 42px;
            }
            >div{
                float: right;
                margin-right: 42px;
                h2{
                    font-size: 16px;
                    color: #FBFBFB;
                }
                ul{
                    li{
                        font-size: 14px;
                        color: #C9C9C9;
                        cursor: pointer;
                    }
                }
            }
        }
        .contant{
            width: 237px;
            height: 125px;
            float: left;
            border-right: 1px solid #343C43;
            padding: 0 35px;
            h2{
                font-size: 16px;
                color: #FBFBFB;
                text-align: left;
            }
            ul{
                text-align: left;
                li{
                    font-size: 14px;
                    color: #C9C9C9;
                    width: 60px;
                    float: left;
                    margin-right: 40px;
                    cursor: pointer;
                    a{
                       color: #C9C9C9; 
                    }
                }
                li:nth-child(2n){
                    margin-right: 0;
                }
            }
            ul.on{
                li{
                    width: 100%;
                }
            }
        }
        .us{
            width: 300px;
            border-right: 0 solid #343C43;
            padding-right: 0;
        }
        .code{
            width: 120px;
            border-right: 0 solid #343C43;
            padding-right: 0;
            .img{
                width: 100px;
                height: 100px;
                background-color: #fff;
            }
        }

    }
}
</style>
