<template>
    <div class="multi">
        <h1 class="title"> 系统培养课程，多维度学习 </h1><br>
        <h2 class="title"> 初体验—CodeLab科技创新营 </h2>

        <ul class="clearfix">
            <li class="first">
                <img src="../../../assets/index/multidimensional1.jpg" alt="">
                <p>支付宝小程序、金融分布式架构mini技术初实践</p>
            </li>
            <li>
                <img src="../../../assets/index/multidimensional3.jpg" alt="">
                <p>蚂蚁金服企业参访，近距离感受名企魅力</p>
            </li>
            <li class="last">
                <img src="../../../assets/index/multidimensional2.jpg" alt="">
                <p>与蚂蚁大咖面对面交流,提升视野和认知</p>
            </li>
            
        </ul>

        <div class="contactus">了解详情，请联系：徐老师 15924164766 </div>

    </div>
</template>

<script>
export default {
    
}
</script>

<style lang='less' scoped>
.multi{
    padding: 113px 0;
}
h2{
    margin: 62px 0 32px;
}
ul{
    width: 1111px;
    display: block;
    margin: 0 auto;
}
li{
    width: 687px;
    height: 257px;
    float: left;
    margin-left: 16px;
    margin-bottom: 16px;
    position: relative;
    p{
        width: 100%;
        font-size: 20px;
        color: #FFFFFF;
        letter-spacing: 2.22px;
        line-height: 29.88px;
        text-align: left;
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 70px 12px 16px;
        background-image: linear-gradient(-180deg, rgba(0,176,243,0.00) 0%, #0078E2 100%);
    }
}
.first{
    width: 408px;
    height: 530px;
    margin-left: 0;
    margin-bottom: 0;
}
.last{
    margin-bottom: 0;
}

</style>