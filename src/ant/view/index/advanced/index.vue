<template>
    <div class="advanced">
        <h2 class="title">进阶课—金融分布式架构系统学习</h2>
        <ul >
            <li v-for="list in lists" class="clearfix">
                <img :src="list.img" >
                <div>
                    <p v-html="list.message"></p>
                </div>
                <span class="line"></span>
            </li>
        </ul>
        <div class="contactus">了解详情，请联系：徐老师 15924164766</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {
                    img:require('../../../assets/index/advanced1.png'),
                    message:'系统学习金融分布式架构实践项目，达到名企技能要求标准'
                },
                {
                    img:require('../../../assets/index/advanced2.png'),
                    message:'以就业为导向，企业级实战项目深度学习'
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.advanced{
    padding: 140px 0 110px;
    ul{
        width: 530px;
        display: block;
        margin: 78px auto 110px;
        li{
            width: 100%;
            margin-bottom: 65px;
            position: relative;
            img{
                width: 97px;
                height: 97px;
                margin-right: 35px;
                float: left;
            }
            div{
                width: 392px;
                min-height: 97px;
                position: relative;
                float: left;
            }
            p{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 392px;
                font-size: 20px;
                color: #4A4A4A;
                letter-spacing: 1px;
                text-align: justify;
                line-height: 34px;
            }
            .line{
                display: inline-block;
                width: 117px;
                height: 2px;
                background: #D6E2FF;
                position: absolute;
                bottom: -37px;
                left: 132px;
            }
        }
        li:last-child{
            .line{
                display: none;
            }
        }
    }
}
</style>