<template>
    <div class="who">
        <div>
            <h1 class="title">谁适合以及如何学习这门课程？</h1>
            <h3 class="title">满足技术入门者需求，在线灵活化学习方式</h3>

            <ul>
                <li v-for="list in lists" class="clearfix">
                    <div class="img">
                        <img :src="list.img" alt="" srcset="">
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
                    img: require('../../../assets/detail/who1.png'),
                    name: '面向对象',
                    message: '本套课程专门为零基础学员开发，由浅入深，由点到面地教学，不管您是计算机专业的学生还是技术入门者 ，这套课程都非常适合您。',
                },
                {
                    img: require('../../../assets/detail/who2.png'),
                    name: '课程安排',
                    message: '4个教学周（不含先导课），1个选修学分，从理论到实训项目一体化学习。',
                },
                {
                    img: require('../../../assets/detail/who3.png'),
                    name: '学习方式',
                    message: '在线学习+在线项目体验，钉钉社群答疑。',
                    notice: '温馨提示：建议您在正式学习前，先学习本门课程的先导课程',
                },
                {
                    img: require('../../../assets/detail/who4.png'),
                    name: '学习收获',
                    message: '理论提升：了解SOFA的基础概念、应用场景和项目案例从小白到入门<br>动手实践：企业级实训项目讲解与实践，贴合实战',
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
            li{
                width: 100%;
                margin-top: 31px;
                .img{
                    width: 126px;
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
        }


    }
}
</style>