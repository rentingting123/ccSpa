<template>
    <div class="part6">
        <img src="../../../assets/jxws/title6.png" class="title" alt="">
        
        <el-carousel class="banner" indicator-position="outside">
            <el-carousel-item v-for="item in lists" :key="item">
                <img class="nav" :src="item" alt="" srcset="">
            </el-carousel-item>
        </el-carousel>
       
        <p>{{message}}</p>
        <img class="logo" src="../../../assets/jxws/6-logo.png" alt="">
    </div>
</template>
<script>
export default {
    data(){
        return{
            lists:[
                require('../../../assets/jxws/6-1.jpg'),
                require('../../../assets/jxws/6-2.jpg'),
                require('../../../assets/jxws/6-3.jpg'),
                require('../../../assets/jxws/6-4.jpg'),
                require('../../../assets/jxws/6-5.jpg'),
                require('../../../assets/jxws/6-6.jpg'),
            ],
            message: '2019年4月以来，蚂蚁金服CodeLab科技创新营已与浙江大学、浙江海洋大学、中国计量大学现代学院、杭州电子科技大学、绍兴文理学院、杭州师范大学等11所高校合作，参与学生500多名，获得高校和师生的好评。到目前为止，签约浙江省高校18所，2019年规模预计超过3000名。'
        }
    }
}
</script>
<style lang="less" scoped>
.part6{
    padding: 100px 0;
    .title{
        display: block;
        margin: 0 auto;
    }
    .banner{
        width: 762px;
        margin: 20px auto 40px;
        .nav{
            width: 762px;
            height: 430px;
        }
    }
    >p{
        width: 762px;
        margin: 0 auto;
        font-size: 18px;
        color: #4A4A4A;
        letter-spacing: 2.44px;
        text-align: justify;
        line-height: 30px;
        text-indent: 2em;
    }
    .logo{
        display: block;
        margin: 0 auto;
        margin-top: 40px;
    }
}
</style>
<style lang='less'>
.part6{
    .el-carousel__container{
        height: 430px !important;
    }
    .el-carousel__button{
        width: 8px !important;
        height: 8px !important;
        border-radius: 100% !important;
    }
}
</style>