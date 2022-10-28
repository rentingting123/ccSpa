<template>
    <div class="part5">
        <img src="../../../assets/jxws/title5.png" class="title" alt="" srcset="">
        <ul class="clearfix">
            <li v-for="list in lists" class="clearfix">
                <img :src="list.url" alt="" srcset="">
                <div class="fr">
                    <h1>{{list.name}}</h1>
                    <img :src="list.logo" alt="" srcset="">
                    <p  v-for="mess in list.message">{{mess}}</p>
                    <div class="button" v-if="list.id==1">
                        <img class="hot" src="../../../assets/jxws/hot.gif">
                        <a href="http://antfin.moocollege.com" target="_blank"><img src="../../../assets/jxws/btm.png"></a>
                    </div>
                </div>
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
                    url: require('../../../assets/jxws/5-1.png'),
                    logo: require('../../../assets/jxws/5-3.png'),
                    name: '蚂蚁金服金融科技',
                    id: 1,
                    message: ['蚂蚁金服金融科技是一家旨在为世界带来普惠金融服务的科技企业，致力于通过科技创新能力，搭建一个开放、共享的信用体系和金融服务平台，为全球消费者和小微企业提供安全、便捷的普惠金融服务。','2019年，蚂蚁金服加入名企百校万生计划，倡导“技术助力，科技育人”，与简学科技共同推进新一代信息技术产业与高校新工科建设融合发展，至今已陆续推出“Code Lab 科技创新营”、智能金融线上课程、线下培训及职业能力认证等项目，通过技术开放共享、校企合作育人，提升高校信息技术类专业人才培养质量和就业水平。'],
                },
                {
                    url: require('../../../assets/jxws/5-2.png'),
                    logo: require('../../../assets/jxws/5-4.png'),
                    name: '杭州黑胡桃人工智能研究院',
                    id: 2,
                    message: ['杭州黑胡桃人工智能研究院（BlackWalnutLabs.）是由赛银集团发起的非营利性机构，联合谷歌中国、ARM、PTC、SIEMENS、Xilinx等产业资源，打造的产、学、用协同创新中心。旗下黑胡桃实验室为学习者提供立体化的AI学习环境，使学习者人人、时时、处处可学、可用人工智能。','2019年6月，黑胡桃实验室加入名企百校万生计划，计划与简学科技共同推进高校人工智能专业建设、师资培训、人才创新培养和实践条件建设等。为高校提供基于TensorFlow搭建的云端在线实验室和线下InnoCamp实践环境，使学生、教师通过线上、线下的方式学习并深度体验人工智能技术。'],
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.part5{
    background: #EEF3F7;
    padding-bottom: 60px;
    .title{
        display: block;
        margin: 0 auto;
        padding: 20px 0;
    }
    ul{
        li{
            width: 1160px;
            // height: 481px;
            padding: 57px 47px 43px;
            background: #ffffff;
            display: block;
            margin: 0 auto;
            margin-bottom: 30px;
            >img{
                width: 400px;
                height: 381px;
                float: left;
                margin-right: 33px;
            }
            >div{
                width: 633px;
                float: left;
                text-align: left;
                position: relative;
                h1{
                    font-size: 30px;
                    color: #4A4A4A;
                    letter-spacing: 3.69px;
                    line-height: 28px;
                    margin: 26px 0;
                    width: 100%;
                    font-weight: bold;
                }
                >img{
                    width: 101px;
                    position: absolute;
                    right: 0;
                    top: 13px;

                }
                >p{
                    font-size: 16px;
                    color: #4A4A4A;
                    letter-spacing: 1.97px;
                    text-align: justify;
                    line-height: 33px;
                    text-indent: 2em;
                }
                div{
                    position: relative;
                    text-align: right;
                    float: right;
                    .hot{
                        position: absolute;
                        top: -36px;
                        left: -31px;

                    }
                }

            }
        }
    }
}
</style>