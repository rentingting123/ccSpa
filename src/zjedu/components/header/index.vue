<template>
    <div class="header" :class="{'home':home}">
        <div>
            <div>
                <img src="http://web.moocollege.com/mooc/hzq/zjedu/logo.png" v-if="home" class="logo" @click="$router.push('/')">
                <img src="http://web.moocollege.com/mooc/hzq/zjedu/logo1.png" v-else class="logo" @click="$router.push('/')">
                <ul>
                    <li v-for="list in navs" :key="list.path" @click="!list.disabled && todetail(list)" :class="{'on':path==list.path, 'disabled':list.disabled}">
                        {{list.name}}
                    </li>
                </ul>
            </div>

            <div class="mess">
                <div class="search">
                    <el-input type="text" size="small" v-model="keyword" placeholder="搜索课程" @keyup.enter.native="search"></el-input>
                    <div class="searchButton" @click="search">
                        <i class="el-icon-search"></i>
                    </div>
                </div>
                <p class="login">
                  <a href="https://moocollege.open.zju.edu.cn/login" target="_blank">  <span>登录</span>
                    <span>/</span>
                    <span>注册</span></a>
                </p>
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
        home(){
            return this.path=='/' || this.path=='/training' || this.path=='/online' 
        }
    },
    data(){
        return{
            navs:[
                {
                    name: '首页',
                    path: '/',
                    id: 1
                },
                {
                    name: '一流课程',
                    path: '/course',
                    id: 2
                },
                {
                    name: '教发赋能',
                    path: '/training',
                    id: 3
                },
                {
                    name: '创新实训',
                    path: '/online',
                    id: 4,
                    disabled: true
                },
            ],
            keyword: '',
        }
    },
    methods:{
        init(){
            let baseInfo = getBaseInfo();
            if(!baseInfo) return;
            if(baseInfo.logoFile){
                // this.logo = baseInfo.logoFile
            }

        },
        todetail(list){
            if(list.out){
                window.open(list.path)
            }else{
                this.$router.push(list.path);
            }
        },
        search(){
            if(!this.keyword) return;
            this.$router.push({path:'/course',query:{keyword: this.keyword}})
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    box-shadow: 0 2px 4px 0 rgba(200,197,197,0.50);
    background: #FFFFFF;
    >div{
        width: 1280px;
        height: 60px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .logo{
            height: 50px;
            width: auto;
            margin: 5px 0;
            margin-left: 38px;
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
                color: #303132;
                letter-spacing: 1.82px;
                padding: 0 14px;
                margin-left: 80px;
                cursor: pointer;
            }
            li.on{
                border-radius: 4px;
                border: 1px solid #303132;
            }
            li.disabled{
                cursor: no-drop;
                opacity: 0.5;
            }
        }
        .mess{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .search{
                position: relative;
                width: 180px;
                height: 32px;
                border-radius: 32px;
                overflow: hidden;

                .searchButton{
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 32px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    background: #1DBD76;
                    font-size: 16px;
                    color: #fff;
                    border-radius: 32px;
                    cursor: pointer;
                }
            }
            .login{
                margin-left: 22px;
                font-size: 14px;
                font-weight: 400;
                color: #1DBD76;
                line-height: 20px;
                span{
                    cursor: pointer;
                }
                span:nth-child(2){
                    margin: 0 3px;
                    cursor: auto;
                }
            }
        }

    }
    &.home{
        background: none;
        position: absolute;
        z-index: 999;
        top: 0;
        width: 100%;
        box-shadow: none;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
        ul{
            li{
                color: #fff;
                &.on{
                    border: 1px solid #fff;
                }
            }
        }
        .mess{
            .search{
                .searchButton{
                    background: #fff;
                    color: #000000;
                }
            }
            .login{
                color: #FFFFFF;
            }
        }
    }
    /deep/.el-input__inner{
        background: #f3f5f7;
        border: none;
    }
    
}
</style>
