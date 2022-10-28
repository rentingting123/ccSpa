<template>
    <div class="banner">
        <div class="main">
            <h1>蚂蚁金服金融分布式架构-入门课</h1>
            <h2>零基础入门SOFASTACK，迈出金融级分布式架构研发的第一步</h2>
            <hr>
            <ul class="clearfix">
                <li v-for="list in lists" class="clearfix">
                    <img :src="list.img" alt="" srcset="">
                    <p>{{list.name}}</p>
                </li>
            </ul>
            <video src="://web.moocollege.com/edit/2019830/a90dbd3dc0c04e3b589e3d551f0c1659/7clmNGKA_1567127258607/%E6%99%BA%E5%BA%A6%E5%89%AA%E8%BE%91%E7%89%880719.mp4" controls width="536" height="300"></video>
            <div class="button">
                <a href="http://zjedu.moocollege.com/course/detail/30013765" target="blank;">进入学习</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {
                    img: require('../../../assets/detail/icon1.png'),
                    name:'零基础学习'
                },
                {
                    img: require('../../../assets/detail/icon2.png'),
                    name:'蚂蚁金服倾力支持'
                },
                {
                    img: require('../../../assets/detail/icon3.png'),
                    name:'限时免费'
                },
                {
                    img: require('../../../assets/detail/icon4.png'),
                    name:'典型金融案例'
                },
                {
                    img: require('../../../assets/detail/icon5.png'),
                    name:' 蚂蚁金服科技创新营结业证书'
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    width: 100%;
    height: 790px;
    background: url('../../../assets/detail/banner.jpg') no-repeat;
    background-size: cover;
    background-position: center;
    .main{
        width: 871px;
        margin: 0 auto;
        padding-top: 136px;
        h1{
            font-size: 52px;
            color: #FFFFFF;
            letter-spacing: 7.19px;
            text-align: center;
            font-weight: bold;
        }
        h2{
            font-size: 30px;
            color: #FFFFFF;
            letter-spacing: 0.31px;
            text-align: center;
            margin: 21px 0;
        }
        ul{
            margin: 20px 0 47px;
            li{
                display: inline-block;
                float: left;
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 2.35px;
                margin-right: 30px;
                img{
                    height: 12px;
                    float: left;
                    margin-top: 5px;
                    margin-right: 5px;
                }
                p{
                    float: left;
                }
            }
            li:nth-child(5){
                margin-right: 0;
            }
        }
        .button{
            background: rgba(255,222,76,.8);
            border-radius: 8px;
            width: 165px;
            height: 44px;
            line-height: 44px;
            font-size: 20px;
            color: #61594D;
            letter-spacing: 2.22px;
            margin: 0 auto;
            margin-top: 32px;
            cursor: pointer;
        }
        .button:hover{
            background: rgba(255,222,76,1);
        }
    }
}
</style>