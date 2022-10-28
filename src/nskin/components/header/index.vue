<template>
    <div class="header" :class="{'home':path=='/'}">
        <div>
            <img :src="logo" class="logo" @click="$router.push('/')">
            <div>
                <ul>
                    <li v-for="list in navs" :key="list.path" @click="todetail(list)" :class="{'on':path==list.path}">
                        {{list.name}}
                    </li>
                </ul>

                <div class="mess">
                    <div class="tel">
                        <span @click="tologin">管理员入口</span>
                        <el-divider direction="vertical"></el-divider>
                        <i class="iconfont">&#xe6b8;</i>
                        <div class="telmain">
                            <div class="san"></div>
                            <p class="phone">
                                <span>联系电话：</span>
                                <span>{{tel}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBaseInfo } from '@/common/common.js'
export default {
    props:['path'],
    mounted(){
        this.init();
    },
    computed:{
        islogin:{
            get(){
                return this.$store.state.islogin
            },
            set(val){
                this.$store.state.islogin = val
            }
        }
    },
    data(){
        return{
            logo: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/header/mnskin_logo.png',
            navs:[
                {
                    name: '首页',
                    path: '/',
                    id: 1
                },
                {
                    name: '竞赛赋能',
                    path: '/empowerment',
                    id: 6
                },
                {
                    name: '教发指数',
                    path: '/development',
                    id: 2
                },
                // {
                //     name: '学生竞赛',
                //     path: '/assessment',
                //     id: 3
                // },
                {
                    name: '新闻资讯',
                    path: '/newslist',
                    id: 4
                },
                {
                    name: '竞赛服务平台',
                    out: true,
                    path: 'https://cc.moocollege.com',
                    id: 5
                },
            ],
            tel: '0571-81902943',
        }
    },
    methods:{
        init(){
            let baseInfo = getBaseInfo();
            if(!baseInfo) return;
            if(baseInfo.logoFile){
                this.logo = baseInfo.logoFile
            }
            if(baseInfo.cusIphone){
                this.tel = baseInfo.cusIphone
            }

        },
        todetail(list){
            if(list.out){
                window.open(list.path)
            }else{
                this.$router.push(list.path);
            }
            if(this.path=='/'){
                this.$store.state.showads = false
            }
        },
        tologin(){
            window.open("https://rankadmin.moocollege.com/")
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    box-shadow: 0 2px 4px 0 rgba(200,197,197,0.50);
    background: #007EED;
    &.home{
        background: none;
        position: absolute;
        z-index: 999;
        top: 0;
        width: 100%;
        box-shadow: none;
    }
    >div{
        width: 1280px;
        height: 80px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo{
            width: 485px;
            height: 80px;
            cursor: pointer;
        }
        ul{
            display: inline-block;
            vertical-align: middle;
            li{
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 1.82px;
                padding: 0 12px;
                margin: 0 6px;
                cursor: pointer;
            }
            li.on{
                border-radius: 30px;
                border: 1px solid #FFFFFF;
            }
        }
        .mess{
            line-height: 46px;
            font-size: 20px;
            color: #5871A9;
            display: inline-block;
            vertical-align: middle;
            .tel{
                position: relative;
                > span{
                    color: rgba(255, 255, 255, 1);
                    cursor: pointer;
                    font-size: 16px;
                }
                i{
                    // padding-left: 13px;
                    cursor: pointer;
                    color: rgba(255, 255, 255, .6);
                }
                .telmain{
                    display: none;
                    position: absolute;
                    top: 32px;
                    right: -11px;
                    z-index: 999;
                    text-align: left;
                    .san{
                        width: 0;
                        height: 0;
                        border-bottom: 17px solid #EAEAEA;
                        border-right: 11px solid transparent;
                        border-left: 11px solid transparent;
                        margin-left: 147px;
                    }
                    .phone{
                        background: #EAEAEA;
                        border-radius: 5px;
                        width: 177px;
                        height: 70px;
                        font-size: 16px;
                        color: #4A4A4A;
                        letter-spacing: 0.8px;
                        line-height: 26px;
                        padding:10px 0 0 12px; 
                        span{
                            display: block;
                            cursor: pointer;
                        }
                    }
                }
            }
            .tel>i:hover + .telmain,.tel>.telmain:hover{
                display: block;
            }
        }

    }
    
}
</style>
