<template>
    <div class="how">
        <div>
            <h1 class="title">金融分布式架构先导课</h1>
            <h3 class="title">扎实基础，自信走进SOFASTACK的世界</h3>
             <ul class="clearfix">
                <li v-for="list in lists">
                    <div class="left">
                        <img :src="list.img1" alt="">
                    </div>
                    <div class="right">
                        <p>{{list.name}}</p>
                        <p>
                            {{list.school}}&nbsp; {{list.teacher}}
                            
                        </p>
                        <p>
                            <span>
                                <img :src="list.img3" alt="">
                            </span>
                            <span>{{list.greade}}</span>
                        </p>
                        <p>
                            <span>
                                <a :href="list.url" target="blank">
                                    进入学习
                                </a>
                            </span>
                        </p>
                    </div>
                    <div class="title">{{list.message}}</div>
                    <div class="nob">
                        <img :src="list.img2" alt="">
                    </div>
                    <!-- <img :src="list.img" alt="">
                    <div>
                        <h4>{{list.name}}</h4>
                        <p>{{list.message}}</p>
                    </div> -->
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
                    img1: require('../../../assets/detail/先导课1.png'),
                    img2: require('../../../assets/detail/01.png'),
                    img3: require('../../../assets/detail/钻石.png'),
                    name:'零基础学JAVA语言入门',
                    school:'浙江大学',
                    teacher:'翁恺',
                    greade:'国家级精品',
                    message:'JAVA基础',
                    url:'https://www.icourse163.org/course/ZJU-1001541001'
                },
                {
                    img1: require('../../../assets/detail/先导课2.png'),
                    img2: require('../../../assets/detail/02.png'),
                    img3: require('../../../assets/detail/钻石.png'),
                    name:'面向对象程序设计',
                    school:'浙江大学',
                    teacher:'翁恺',
                    greade:'国家级精品',
                    message:'JAVA进阶',
                    url:'https://www.icourse163.org/course/ZJU-1001542001?tid=1206277224'
                },
                // {
                //     img: require('../../../assets/detail/banner.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
                // {
                //     img: require('../../../assets/detail/banner.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
                // {
                //     img: require('../../../assets/detail/banner.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
                // {
                //     img: require('../../../assets/detail/banner.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
                // {
                //     img: require('../../../assets/detail/banner.jpg'),
                //     name:'案例1',
                //     message:'简介'
                // },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.how{
        padding: 103px 0 94px;
        background: #EFF3F7;
        ul{
        width: 960px;
        margin: 0 auto;
        
        li{
            width: 900px;
            height: 297px;
            margin-top: 40px;
            // float: left;
            padding: 26px 30px 28px;
            background: #fff;
            text-align: left;
            position: relative;
            .left{
                display: inline-block;
                width: 428px;
                height: 243px;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right{
                display: inline-block;
                margin-left: 38px;
                p{
                    &:first-child{
                        font-family: SourceHanSansCN-Medium;
                        font-size: 32px;
                        color: #4A4A4A;
                        letter-spacing: 1.78px;
                        padding-top: 15px;
                    }
                    &:nth-child(2){
                        font-family: SourceHanSansCN-Normal;
                        font-size: 24px;
                        color: #4A4A4A;
                        letter-spacing: 1.33px;
                        text-align: justify;
                        line-height: 31.5px;
                        padding-top: 10px;
                    }
                    &:nth-child(3){
                        padding-top: 20px;
                        span:first-child{
                            width: 24px;
                            height: 20px;
                            display: inline-block;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                        span:last-child{
                            font-family: MicrosoftYaHei;
                            font-size: 18px;
                            color: #FC9D00;
                            letter-spacing: 3px;
                        }
                    }
                    &:nth-child(4){
                        padding-top: 40px;
                        font-family: SourceHanSansCN-Medium;
                        font-size: 20px;
                        
                        letter-spacing: 2.22px;
                        span{
                            display: inline-block;
                            background: #4AA1F2;
                            border-radius: 8px;
                            width: 165px;
                            height: 44px;
                            line-height: 44px;
                            text-align: center;
                            a{
                                color: #FFFFFF;
                            }
                        }
                    }
                }
            }
            .title{
                position: absolute;
                background: #9D4AE2;
                border-radius: 2px;
                width: 118px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                color: #fff;
                top: 50px;
                left: -25px;
                font-size: 18px;
                letter-spacing: 2px;
                font-family: MicrosoftYaHei;
            }
            .nob{
                width: 150px;
                height: 150px;
                position: absolute;
                bottom: 0;
                right: 20px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            // img{
            //     width: 300px;
            //     height: 171px;
            //     background: #EBF1F6;
            //     border-radius: 5px 5px 0px 0px;
            // }
            // div{
            //     width: 300px;
            //     background: #FFFFFF;
            //     height: 133px;
            //     box-shadow: 0 2px 12px 0 rgba(233,233,233,0.50);
            //     border-radius: 0px 0px 5px 5px;
            //     text-align: left;
            //     padding: 18px;
            //     h4{
            //         font-size: 18px;
            //         color: #4A4A4A;
            //         letter-spacing: 1px;
            //         font-weight: bold;
            //     }
            //     p{
            //         font-size: 14px;
            //         color: #4A4A4A;
            //         letter-spacing: 0.78px;
            //         line-height: 21px;
            //         margin-top: 6px;
            //     }
            // }
        }   
    }
}
</style>