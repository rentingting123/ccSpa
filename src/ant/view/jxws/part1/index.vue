<template>
    <div class="part1">
        <img src="../../../assets/jxws/title1.png" alt="" srcset="">
        <ul class="clearfix">
            <li v-for="list in lists">
                <img :src="list.url" alt="">
                <p v-html="list.message"></p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lists:[
                {
                    url: require('../../../assets/jxws/1-1.png'),
                    message: '联动蚂蚁金服金融科技<br>等行业领军企业<br>赋能100所高校'
                },
                {
                    url: require('../../../assets/jxws/1-2.png'),
                    message: '探索校企合作新机制<br>打造协同育人新范式'
                },
                {
                    url: require('../../../assets/jxws/1-3.png'),
                    message: '服务10000名大学生<br>名企游学实践<br>名企能力认证<br>生态企业对接'
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.part1{
    padding: 28px 0 81px;
    >img{
        display: block;
        margin: 0 auto;
    }
    ul{
        width: 923px;
        margin: 0 auto;
        li{
            width: 231px;
            float: left;
            margin-right: 115px;
            margin-top: 40px;
            img{
                width: 150px;
                height: 150px;
                display: block;
                margin: 0 auto;
            }
            p{
                font-size: 18px;
                color: #4A4A4A;
                letter-spacing: 2.44px;
                text-align: center;
                line-height: 26px;
            }
        }
        li:nth-child(3n){
            margin-right: 0;
        }
    }
}
</style>