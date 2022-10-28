<template>
    <div class="actualCombat">
        <h1 class="title">实战为先，精选企业级案例和实训项目</h1>
        <ul class="clearfix">
            <li v-for="(list,index) in lists" @mouseenter="selet(index)" @mouseleave="leave()">
                <img v-if="index!=selectIndex" :src="list.img" alt="">
                <div v-if="index!=selectIndex">
                    <h3>{{list.name}}</h3>
                    <p>{{list.message}}</p>
                </div>
                <div class="txt" v-if="index==selectIndex">
                    <h3>{{list.name}}</h3>
                    <p>{{list.message}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selectIndex:null,
            lists:[
                {
                    img: require('../../../assets/index/项目1.jpg'),
                    name:'云购商城',
                    message:'云购商城是一款从事男女服装品牌销售的网上商城系统，其主要作用就是通过电子商城交易平台向客户准确、快捷的销售产品,此应用包括商品模块,销售模块,订单模块,库存模块,内容模块,客户模块,系统模块,报表模块等,项目采用微服务分布式架构方式,并充分运用集群技术与消息队列等中间件技术,实现项目的高性能、高可用及高可维护性，项目运行状态良好，同时获得了不错的用户体验。'
                },
                {
                    img: require('../../../assets/index/项目2.jpg'),
                    name:'智能公交系统',
                    message:'此系统解决了公交车公司的自动化运营与管理问题。面向的对象是普通乘客和工作人员的，有利于工作人员对线路与车辆有效管理。项目通过 maven搭建，充分运用AJAX异步请求方式和后台进行数据交互。此项目的主要模块有：车辆运营监控平台系统，基础数据系统，视频监控云平台，调度系统，运营管理系统，掌上出行系统等。本项目采用微服务架构方式，解决用户的高并发等问题，目前运行一切正常，深受用户一致好评。'
                },
                {
                    img: require('../../../assets/index/项目3.jpg'),
                    name:'乐享云店app',
                    message:'乐享云店app是一款全新的手机网赚平台，用户完成相应任务就能获得现金奖励，每天都有海量的新任务发布，既赚钱也能进行推广分享，用户邀请好友就能享受分红待遇。项目的移动端有android与iOS两种应用方式，后台管理采用流行的微服务架构方式，性能稳定，并很好解决高发问题，项目自上线以来运行良好，并及时优化与更新，用户体验不错。'
                },
                // {
                //     img: require('../../../assets/index/banner1.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
                // {
                //     img: require('../../../assets/index/banner1.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
                // {
                //     img: require('../../../assets/index/banner1.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
            ]
        }
    },
    methods:{
        selet(index){
            this.selectIndex = index
        },
        leave(){
            this.selectIndex=null
        }
    }
}
</script>

<style lang="less" scoped>
.actualCombat{
    padding: 133px 0 133px;
    ul{
        width: 960px;
        margin: 0 auto;
        margin-top: 66px;
        li{
            width: 300px;
            margin: 0 10px 20px;
            float: left;
            img{
                width: 300px;
                height: 171px;
                background: #EBF1F6;
                border-radius: 5px 5px 0px 0px;
            }
            div{
                width: 300px;
                height: 133px;
                box-shadow: 0 2px 12px 0 rgba(233,233,233,0.50);
                border-radius: 0px 0px 5px 5px;
                text-align: left;
                padding: 18px;
                
                h3{
                    font-size: 18px;
                    color: #4A4A4A;
                    letter-spacing: 1px;
                    font-weight: bold;
                }
                p{
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 0.78px;
                    line-height: 21px;
                    margin-top: 6px;
                    overflow: hidden;
                    height: 62px;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                }
            }
            .txt{
                height: 304px;
                p{
                    height: 230px;
                    // -webkit-line-clamp: 11;
                    display: block;
                    overflow: auto;
                }
            }
        }   
    }

}
</style>