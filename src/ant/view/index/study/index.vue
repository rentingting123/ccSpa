<template>
    <div class="who">
        <div>
            <h1 class="title">精心打磨，360度保障学习效果</h1>
            <ul>
                <li v-for="list in lists" class="clearfix">
                    <div class="img">
                        <img :src="list.img" width="100%" srcset="">
                    </div>
                    <div class="message">
                        <h4>{{list.name}}</h4>
                        <p>
                            <span v-html="list.message"></span>                    
                            <span class="notice"><br>{{list.notice}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {
                    img: require('../../../assets/index/study1.png'),
                    name: '内容源自实战',
                    message: '以实用技能为导向，瞄准岗位能力标准，学习内容源自蚂蚁技术体系和真实工作任务安排内容。',
                },
                {
                    img: require('../../../assets/index/study2.png'),
                    name: '1对1辅导',
                    message: '与讲师预约，利用一对一的在线交流、线下交流方式解决您学习中难题和困惑。',
                },
                {
                    img: require('../../../assets/index/study3.png'),
                    name: '班主任监督辅导',
                    message: '孤军奋战容易拖延、想放弃。班主任会每周"骚扰"你、关怀你，就是要让你一起坚持完成学习。',
                },
                {
                    img: require('../../../assets/index/study4.png'),
                    name: '线下学习小组',
                    message: '加入学习小组，认识志同道合的学习小伙伴，通过抱团学习方式互相监督，共同成长，收获一个最具职场价值的朋友圈。',
                },
                {
                    img: require('../../../assets/index/study5.png'),
                    name: '定期学习复盘',
                    message: '导师带领定期复盘学习效果，查补漏洞，巩固知识。',
                },
                
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.who{
    padding: 40px 0;
    background: #006EFF;
    >div{
        width: 1193px;
        margin: 0 auto;
        background: #FFFFFF;
        border-radius: 30px;
        padding: 72px 0 100px;
        ul{
            width: 676px;
            margin: 0 auto;
            margin-top: 67px;
            li{
                width: 100%;
                margin-top: 31px;
                .img{
                    width: 60px;
                    float: left;
                    text-align: left;
                    img{
                    }
                }
                .message{
                    width: 550px;
                    float: right;
                    text-align: left;
                    border-bottom: 1px solid #DFDFED;
                    h4{
                        font-size: 25px;
                        color: #0078E2;
                        letter-spacing: 3.39px;
                    }
                    p{
                        font-size: 18px;
                        color: #4A4A4A;
                        letter-spacing: 2.44px;
                        text-align: justify;
                        line-height: 35px;
                        margin: 15px 0 29px;
                    }
                    .notice{
                        margin: 0;
                        font-size: 16px;
                        color: #4AA1F2;
                        letter-spacing: 2.17px;
                        text-align: justify;
                        line-height: 35px;
                    }
                }

            }
            li:last-child{
                .message{
                    border: none;
                }
            }
        }


    }
}
</style>