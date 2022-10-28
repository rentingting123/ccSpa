<template>
    <div class="famous">
        <h1 class="title">名企及生态企业认可，全方位就业对接</h1>
        <h3>就业保障体系</h3>
        <img src="../../../assets/index/famous.png" alt="">
        <ul class="clearfix">
            <li v-for="list in lists">
                <img :src="list.img" alt="">
                <p>{{list.name}}</p>
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
                    img: require('../../../assets/index/famous1.png'),
                    name: '专场招聘会'
                },
                {
                    img: require('../../../assets/index/famous3.png'),
                    name: '模拟面试'
                },
                {
                    img: require('../../../assets/index/famous5.png'),
                    name: '就业指导'
                },
                {
                    img: require('../../../assets/index/famous6.png'),
                    name: 'CG直通车'
                },
                {
                    img: require('../../../assets/index/famous4.png'),
                    name: '就业推荐'
                },
                {
                    img: require('../../../assets/index/famous2.png'),
                    name: '就业跟踪'
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.famous{
    padding: 125px 0;
    background: #006EFF;
    h1{
        color: #FFFFFF !important;
    }
    h1::after{
        background: rgba(255,255,255,.7) !important;
    }
    h3{
        margin: 89px 0 20px;
        font-size: 28px;
        color: #FFFFFF;
        letter-spacing: 4.2px;
        text-align: center;
    }
    >img{
        display: block;
        margin: 0 auto;
    }
    ul{
       width: 1143px;
       margin: 0 auto;
       margin-top: 27px;
       li{
           width: 128px;
           float: left;
           margin-right: 75px;
            img{
                width: 128px;
                height: 128px;
            }
            p{
                font-size: 22px;
                color: #FFFFFF;
                letter-spacing: 3.3px;
                text-align: center;
                margin-top: 22px;
            }
       }
       li:nth-child(6n){
           margin-right: 0;
       }
    }
}
</style>