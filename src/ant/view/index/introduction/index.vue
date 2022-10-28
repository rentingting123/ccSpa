<template>
    <div class="introduction">
        <h2 class="title">入门课—金融分布式架构线上初级课</h2>

        <ul class="clearfix">
            <li v-for="list in lists">
                <img :src="list.img" alt="">
                <p v-html="list.message"></p>
            </li>
        </ul>

        <div class="button" @click="todetail">
            查看入门课程
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {
                    img: require('../../../assets/index/introduction1.png'),
                    message:'零基础入门，开启金融分布式架构第一步',
                },
                {
                    img: require('../../../assets/index/introduction2.png'),
                    message:'蚂蚁金服科技创新营特聘讲师线上授课，企业级项目实战',
                },
                {
                    img: require('../../../assets/index/introduction3.png'),
                    message:'钉钉群互动，最新知识点更新和专家答疑',
                },
                {
                    img: require('../../../assets/index/introduction4.png'),
                    message:'学分认证，蚂蚁金服科技创新营课程证书',
                },
            ]
        }
    },
    methods:{
        todetail(){
            this.$router.push('/detail');
            window.scrollTo(0,0)
        }
    }
}
</script>

<style lang="less" scoped>
.introduction{
    background: #006EFF;
    padding: 95px 0 86px;
}
ul{
    margin: 74px auto 63px;
    width: 1140px;
    li{
        width: 185px;
        margin: 0 50px;
        float: left;
        img{
            height: 81px;
            margin: 0 auto 35px;
        }
        p{
            font-size: 20px;
            color: #FFFFFF;
            letter-spacing: 1px;
            text-align: justify;
            line-height: 34px;
        }
    }
}
h2{
    color: #FFFFFF  !important;
}
.button{
    background: rgba(255,222,76,.8);
    margin: 0 auto;
    border-radius: 31px;
    width: 165px;
    height: 44px;
    line-height: 44px;
    font-size: 20px;
    color: #61594D;
    letter-spacing: 2.22px;
    cursor: pointer;
}
.button:hover{
    background: rgba(255,222,76,1);
}
</style>