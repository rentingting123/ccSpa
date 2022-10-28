<template>
    <div class="lecturer">
        <h1 class="title">原汁原味，蚂蚁资深讲师团</h1>
        <h3 class="title"> 蚂蚁金服特聘专家团队，资深IT与你交流与互动</h3>
        <ul class="clearfix">
            <li v-for="list in lists">
                <div class="img">
                    <img :src="list.img" alt="">
                    <p>{{list.name}}</p>
                    <div>
                        <h4>{{list.name}}</h4>
                        <p v-html="list.person"></p>
                    </div>
                </div>
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
                    img:require('../../../assets/index/lecturer1.png'),
                    name:'余淮',
                    message:'蚂蚁金服高级技术专家、SOFAStack 整体开源负责人',
                    person:'2007 年毕业后，先后参与国网招投标平台的系统开发、国网电子商务平台开发。2012 年加入京东从事中间件开发，先后参加了京东服务框架 SAF 和 JSF 的建设，到后来负责服务与框架组。<br>2016 年底，加入蚂蚁金服中间件（SOFA 团队）成为开发框架组负责人。2018 年初开始参与 SOFAStack 开源，目前为 SOFAStack 整体开源负责人。',
                    id: 1,
                },
                {
                    img:require('../../../assets/index/lecturer2.png'),
                    name:'鲁直',
                    message:'蚂蚁金服高级技术专家、蚂蚁金服分布式架构 SOFA 的开源负责人',
                    person:'09年进入阿里巴巴实习<br>2010年正式加入阿里，在阿里巴巴B2B团队服务服务3年，主要从事B2B业务，后到蚂蚁金服中间件团队。现主要从事SOFA开源的方面的开发，5年SOFA开源经验，同时为微服务方向的 leader。<br>擅长方向：<br>金融级分布式架构 SOFA、微服务、Service Mesh、OpenSource',
                    id: 2,
                },
                {
                    img:require('../../../assets/index/lecturer3.png'),
                    name:'智度',
                    message:'蚂蚁金服高级产品专家',
                    person:'18年的银行业解决方案咨询和基于蚂蚁金服技术的数字化转型的相关工作经验。<br>曾任职于中国惠普、德勒管理咨询、IBM后正式加入阿里云，后来转岗到蚂蚁金服。曾担任多个大型的银行规划咨询和系统实施项目的负责人、项目经理及解决方案核心架构师，致力于移动互联网时代数字化转型的业务需求分析、技术解决方案设计和相关分布式系统研发与集成工作。',
                    id: 3,
                },
                {
                    img:require('../../../assets/index/lecturer4.png'),
                    name:'超呆',
                    message:'蚂蚁金服科技创新营特聘讲师',
                    person:'软件设计高级工程师,有多年从业与教学经验,精通Java Web,移动互联开发,Web前端与H5全栈开发,熟谙大数据开发,掌握高并发与负载均衡解决方案,热衷新技术的研究,对人工智能与区块链有自己独到的见解;熟悉系统架构原理,掌握分布式与集群管理,微服务设计等',
                    id: 4,
                },
                {
                    img:require('../../../assets/index/lecturer5.png'),
                    name:'胡斌',
                    message:'蚂蚁金服科技创新营特聘金牌助教',
                    person:'12年高校教育教学工作经验，精通教学管理、课程研发、教师培训等环节，主要专业研究方向为机器学习、深度学习、迁移学习、数据分析等。',
                    id: 5,
                },
                {
                    img:require('../../../assets/index/lecturer6.png'),
                    name:'大宝',
                    message:'蚂蚁金服科技创新营特聘讲师',
                    person:'毕业于浙江大学计算机科学与技术专业，19年软件系统开发经验，多年系统架构经验。主要从事后端技术和架构领域，有丰富的公安行业核心系统、在线教育平台的架构设计和开发经验，主导开发/架构多个大型项目，对高并发、高可用、分布式系统设计有着丰富的经验和实战，精通互联网Java主流技术。',
                    id: 6,
                },

            ]
        }
    }
}
</script>
<style lang="less" scoped>
.lecturer{
    padding: 100px 0 0;
    ul{
        width: 1103px;
        margin: 0 auto;
        margin-top: 57px;
        li{
            width: 321px;
            height: 470px;
            float: left;
            margin-right: 70px;
            .img{
                width: 100%;
                height: 320px;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                >p{
                    font-size: 38px;
                    color: #FFFFFF;
                    letter-spacing: 15px;
                    text-align: center;
                    text-shadow: 0 2px 11px #4A90E2;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
                >div{
                    display: none;
                    width: 100%;
                    height: 100%;
                    overflow: auto;
                    padding: 20px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0.9;
                    background-image: linear-gradient(-180deg, #7ADBFF 3%, #279AFF 100%);
                    h4{
                        font-size: 38px;
                        color: #FFFFFF;
                        letter-spacing: 15px;
                        text-align: left;

                    }
                    p{
                        font-size: 18px;
                        color: #FFFFFF;
                        letter-spacing: 2.44px;
                        text-align: justify;
                        line-height: 30px;
                        
                    }
                }
            }
            >p{
                width: 100%;
                height: 150px;
                font-size: 22px;
                color: #0078E2;
                letter-spacing: 1px;
                text-align: justify;
                line-height: 36px;
            }
        }
        li:hover{
            .img{
                >p{
                    display: none;
                }
                >div{
                    display: block;
                }
            }
        }
        li:nth-child(3n){
            margin-right: 0;
        }
    }
}
</style>