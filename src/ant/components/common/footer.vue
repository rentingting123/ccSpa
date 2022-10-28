
<template>
<div>
    <div class="footer">
        <div class="clearfix">
            <div class="about">
                <img class="backtop" style=" cursor: pointer;" src="../../assets/common/logo.png" alt="">
            </div>
            <div class="contant us">
                <h2 class="backtop">联系我们</h2>
                <ul class="backtop clearfix on">
                    <li>客服电话：0571-88230389</li>
                    <li>邮箱：hub@mycloudedu.com.cn</li>
                    <li>公司地址：浙江省杭州市紫金创业园B座11F</li>
                </ul>
            </div>
            <div class="contant">
                <h2 class="backtop">友情链接</h2>
                <ul class="backtop clearfix on">
                    <li><a target="_blank" href="http://www.moocollege.com">简学科技</a></li>
                </ul>
            </div>
            <div class="contant code">
                <h2 class="backtop">微信公众号</h2>
                <div class="img backtop">
                    <img src="../../assets/common/code.jpg" width="100%">
                </div>
            </div>
        </div> 
    </div>
    <div class="footer1">
        技术支持：杭州简学科技有限公司 浙公网安备：33010602004724号&nbsp;&nbsp;&nbsp; <a style="color:#fff" href="https://beian.miit.gov.cn/" target="_blank">浙ICP备15007838号</a>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
    }
}
</script>



<style lang="less" scoped>
.backtop{
    position: relative;
    top: 0;
}
.footer{
    width: 100%;
    background: #404040;
    padding: 50px 0;
    >div{
        width: 1010px;
        margin: 0 auto;
        padding: 0 40px;
        .about{
            width: 230px;
            height: 125px;
            float: left;
            img{
                float: left;
                margin-left: 42px;
            }
        }
        .contant{
            width: 230px;
            height: 125px;
            float: left;
            padding: 0 35px;
            h2{
                font-size: 16px;
                color: #FBFBFB;
                text-align: left;
                font-weight: bold;
                margin-bottom: 15px;
            }
            ul{
                text-align: left;
                li{
                    font-size: 14px;
                    color: #C9C9C9;
                    width: 60px;
                    float: left;
                    margin-right: 40px;
                    margin-bottom: 15px;
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
            width: 350px;
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
.footer1{
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    color: #C9C9C9;
    text-align: center;
    background: #151515;
}
</style>
