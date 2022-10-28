<template>
    <div class="helper">
        <div class="banner"></div>
        <div class="main clearfix">
            <ul class="left">
                <li v-for="nav in navs" @click="change(nav)" :key="nav.type" :class="{'on':type==nav.type}">
                    {{nav.name}}
                    <i class="el-icon-caret-right"></i>
                </li>
            </ul>
            <div class="right">
                <qa :type="type"/>
            </div>
        </div>
    </div>
</template>
<script>
import qa from './common/qa'
export default {
    components:{
        qa,
    },
    data(){
        return{
            navs:[
                {
                    name:'平台疑问',
                    type:2,
                    url:'#'
                },
                {
                    name:'登录疑问',
                    type:3,
                    url:'#'
                },
                {
                    name:'竞赛疑问',
                    type:4,
                    url:'#'
                },
                {
                    name:'账号疑问',
                    type:5,
                    url:'#'
                },
                {
                    name:'密码疑问',
                    type:6,
                    url:'#'
                }
            ],
            type:1,

        }
    },
    methods:{
        change(nav){
            this.type=nav.type;
            this.$router.push('/helpcenter?type='+nav.type)
        }
    },
    created(){
        this.type = this.$route.query.type || 2;
    },
    watch:{
        $route(){
            this.type = this.$route.query.type || 2;
        }
    }
}
</script>


<style lang="less" scoped>
.helper{
    width: 100%;
    height: auto;
    background: #ffffff;
    .banner{
        max-width: 1920px;
        height: 300px;
        margin: 0 auto;
        background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/helper.jpg) no-repeat;
        background-size: cover;
        background-position: center;
    }
    .main{
        width: 1050px;
        margin: 0 auto;
        padding: 30px 0 160px;
        .left{
            width: 248px;
            height: 518px;
            border: 1px solid #CBD3E5;
            text-align: left;
            background: #FAFCFE;
            float: left;
            li{
                height: 44px;
                line-height: 44px;
                font-size: 15px;
                padding-left: 20px;
                color: #000000;
                border-bottom: 1px solid #CBD3E5;
                cursor: pointer;
                i{
                    color: #0078E2;
                    float: right;
                    line-height: 44px;
                    font-size: 14px;
                    margin-right: 20px;
                    display: none;
                }
            }
            li.on{
                color: #0078E2;
                border-left: 4px solid #0078E2;
                i{
                    display: block;
                }
            }
        }
        .right{
            width: 798px;
            min-height: 518px;
            border: 1px solid #CBD3E5;
            float: left;
        }

    }
}
</style>

