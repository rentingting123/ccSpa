<template>
    <div class="teams">
        <h1 class="title">课程研发团队</h1>
        <ul>
            <li v-for="list in lists" class="clearfix">
                <div class="logo">
                    <img :src="list.img" alt="">
                    <p>{{list.name}}</p>
                </div>
                <div class="message">
                    <h3 v-html="list.h3"></h3>
                    <p v-html="list.message"></p>
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
                    img: require('../../../assets/index/lecturer2.png'),
                    name: '鲁直',
                    h3: '蚂蚁金服高级技术专家<br>蚂蚁金服分布式架构 SOFA 的开源负责人',
                    message: '09年进入阿里巴巴实习，2010年正式加入阿里，<br>在阿里巴巴B2B团队服务服务3年，主要从事B2B业务，后到蚂蚁金服中间件团队。现主要从事SOFA开源的方面的开发，5年SOFA开源经验，同时为微服务方向的 leader。<br>擅长方向：金融级分布式架构 SOFA、微服务、Service Mesh、OpenSource'
                },
                {
                    img: require('../../../assets/index/lecturer1.png'),
                    name: '余淮',
                    h3: '蚂蚁金服高级技术专家<br>SOFAStack 整体开源负责人',
                    message: '2007年毕业后，先后参与国网招投标平台的系统开发、国网电子商务平台开发。<br>2012年加入京东从事中间件开发，先后参加了京东服务框架 SAF 和 JSF 的建设，到后来负责服务与框架组。<br>2016年底，加入蚂蚁金服中间件（SOFA 团队）成为开发框架组负责人。<br>2018年初开始参与 SOFAStack 开源，目前为 SOFAStack 整体开源负责人。'
                },
                {
                    img: require('../../../assets/index/lecturer3.png'),
                    name: '智度',
                    h3: '蚂蚁金服高级产品专家',
                    message: '18年的银行业解决方案咨询和基于蚂蚁金服技术的数字化转型的相关工作经验。<br>曾任职于中国惠普、德勒管理咨询、IBM后正式加入阿里云，后来转岗到蚂蚁金服。曾担任多个大型的银行规划咨询和系统实施项目的负责人、项目经理及解决方案核心架构师，致力于移动互联网时代数字化转型的业务需求分析、技术解决方案设计和相关分布式系统研发与集成工作。'
                },
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.teams{
    padding-top: 130px;
    ul{
        width: 1100px;
        margin: 0 auto;
        margin-top: 70px;
        li{
            margin-bottom: 103px;
            .logo{
                width: 320px;
                height: 320px;
                float: left;
                margin-right: 23px;
                position: relative;
                img{
                    width: 100%;
                    height: 100%;
                }
                p{
                    width: 100%;
                    font-size: 38px;
                    color: #FFFFFF;
                    letter-spacing: 15px;
                    text-align: right;
                    text-shadow: 0 2px 11px #4A90E2;
                    font-weight: bold;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
            .message{
                width: 757px;
                min-height: 320px;
                padding-top: 70px;
                float: left;
                text-align: left;
                h3{
                    font-size: 22px;
                    color: #0078E2;
                    letter-spacing: 3.2px;
                    line-height: 36px;
                    margin-bottom: 20px;
                    min-height: 72px;
                    background: url(../../../assets/detail/teamsbg.png) no-repeat;
                    background-position: 0 0;
                    padding-left: 23px;
                    font-weight: bold;
                }
                p{
                    font-size: 18px;
                    color: #4A4A4A;
                    letter-spacing: 2.44px;
                    text-align: justify;
                    line-height: 30px;
                    padding-left: 23px;
                }
            }
        }
    }
}
</style>