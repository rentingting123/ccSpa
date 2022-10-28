<template>
    <div class="part3">
        <img src="../../../assets/jxws/title3.png" class="title" alt="">
        <ul class="clearfix">
            <li v-for="list in lists">
                <img :src="list.url" alt="" srcset="">
                <h1>{{list.name}}</h1>
                <h2>{{list.engname}}</h2>
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
                    url: require('../../../assets/jxws/3-1.png'),
                    name: '学 习',
                    engname: 'LEARNING',
                    message: '线上名企特色学院<br>学生免费选修学习',
                },
                {
                    url: require('../../../assets/jxws/3-2.png'),
                    name: '训 练',
                    engname: 'TRAINING',
                    message: '线上沙箱模拟演练<br>线下真实项目实战',
                },
                {
                    url: require('../../../assets/jxws/3-3.png'),
                    name: '认 证',
                    engname: 'ATTESTATION',
                    message: '名企岗位能力体系<br>入门进阶分级认证',
                },
                {
                    url: require('../../../assets/jxws/3-4.png'),
                    name: '就 业',
                    engname: 'JOB',
                    message: '职业规划、就业指导<br>简历辅导、人才对接',
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>
.part3{
    background: #EEF3F7;
    padding: 39px 0 57px;
    .title{
        display: block;
        margin: 0 auto;
    }
    ul{
        width: 1087px;
        margin: 0 auto;
        margin-top: 40px;
        li{
            width: 238px;
            height: 272px;
            background: #ffffff;
            padding: 48px 26px;
            float: left;
            margin-right: 45px;
            text-align: left;
            img{
                width: 30px;
                height: 30px;
            }
            h1{
                font-size: 26px;
                color: #4A4A4A;
                letter-spacing: 3.81px;
                line-height: 26px;
                font-weight: bold;
                margin: 10px 0 5px;
            }
            h2{
                font-size: 18px;
                color: #CECECE;
                letter-spacing: 2.49px;
                line-height: 26px;
                font-weight: bold;
            }
            p{
                font-size: 17px;
                color: #4A4A4A;
                letter-spacing: 2.64px;
                line-height: 32px;
                margin-top: 10px;
            }
        }
        li:nth-child(4n){
            margin-right: 0;
        }
    }
}
</style>