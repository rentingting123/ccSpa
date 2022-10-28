<template>
    <div class="why">
        <h1 class="title"> 为什么要学习这门课程？</h1>
        <h3 class="title">紧抓技术风口，增加就业渠道和职业选择</h3>
        <ul class="clearfix">
            <li v-for="list in lists">
                <img :src="list.img" alt="" srcset="">
                <h4>{{list.name}}</h4>
                <p>{{list.message}}</p>
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
                    img: require('../../../assets/detail/why1.png'),
                    name: '人才缺口大 就业前景广',
                    message: '据相关统计显示 ，未来5年，大数据、云计算、人工智能、智能金融专业人才缺口超过150万，人才争夺战直接决定了拥有以上技术的创新和复合型人才就业前景更广。',
                },
                {
                    img: require('../../../assets/detail/why2.png'),
                    name: '智能金融领域必修技术',
                    message: '金融分布式架构（SOFA）是支付宝三大基础技术之一，覆盖多种金融场景，包含构建金融级云原架构所需的各种组件，满足金融用户场景的现状和未来需求。',
                },
                {
                    img: require('../../../assets/detail/why3.png'),
                    name: '蚂蚁结业认证为简历增分',
                    message: '课程学习达标后，可获得蚂蚁金服认证的课程结业证书以及学校选修课学分，为未来走进蚂蚁生态企业加分。',
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.why{
    padding: 113px 0 150px;
    h1{
        color: #5D92FF;
    }
    ul{
        width: 1200px;
        margin: 0 auto;
        li{
            width: 310px;
            margin: 0 45px;
            float: left;
            img{
                width: 210px;
                height: 210px;
                margin: 0 auto;
            }
            h4{
                font-size: 24px;
                color: #4A4A4A;
                letter-spacing: 3.26px;
                text-align: center;
                margin: 40px 0 12px;
                font-weight: bold;
            }
            p{
                font-size: 18px;
                color: #4A4A4A;
                letter-spacing: 2.44px;
                text-align: justify;
                line-height: 26px;
            }
        }
    }
}
</style>