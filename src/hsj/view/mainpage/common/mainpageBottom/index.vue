<template>
    <div class="bottom">
        <div class="left">
            <h2>好设计综合办公室</h2>
            <p>联系人：刘惠荣、贾建云、傅蓉</p>
            <p>电子邮箱：chinagooddesign@cmes.org </p>
            <p>联系方式：010-68799024、010-68799088 </p>
            <p>通讯地址：北京市海淀区首体南路9号主语国际4号楼11层 </p>
        </div>
        <div class="hr"></div>
        <div class="center">
            <h2>官方微信及B站</h2>
            <p>微信公众号：好设计CMES </p>
            <p>B站账号：浙大设计</p>
        </div>
        <div class="right">
            <div class="wechat">
                <img class="img1" src="https://web.moocollege.com/mooc/hzq/vueskin/hsj/mainpage/wechatcode.jpg"/>
            </div>
            <div class="bilibili">
                <img class="img1" src="https://web.moocollege.com/mooc/hzq/vueskin/hsj/mainpage/bilibilicode.jpg"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>
.bottom{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    h2{
        font-size:18px;
        font-weight:600;
        color:rgba(0,0,0,1);
        line-height:25px;
        letter-spacing:1px;
        margin-bottom: 16px;
    }
    p{
        font-size:14px;
        font-weight:400;
        color:rgba(74,74,74,1);
        line-height:21px;
        letter-spacing:1px;
        margin-bottom: 8px;
    }
    .left{
        width: 770px;
        p:nth-child(2n){
            width: 340px;
            display: inline-block;
        }
        p:nth-child(2n+1){
            width: 420px;
            display: inline-block;
        }
    }
    .hr{
        width:1px;
        height:79px;
        background: #E5E5E5;
        margin-right: 43px;
        margin-top: 10px;
    }
    .center{
        width: 223px;
    }
    .right{
        width: 180px;
        height: 88px;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        >div{
            width: 50px;
            height: 50px;
            display: inline-block;
            position: relative;
            margin-left: 10px;
            img{
                width: 100px;
                height: auto;
                position: absolute;
                bottom: 0;
                right: 0;
                display: none;
            }
            &:hover{
                img{
                    display: block;
                }
            }
        }
        .wechat{
            background: url('https://web.moocollege.com/mooc/hzq/vueskin/hsj/mainpage/wechat.png') no-repeat;
            background-size: 100%;
        }
        .bilibili{
            background: url('https://web.moocollege.com/mooc/hzq/vueskin/hsj/mainpage/bilibili.png') no-repeat;
            background-size: 100%;
        }
    }
}
</style>