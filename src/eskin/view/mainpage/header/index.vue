<template>
    <div class="header">
        <div class="clearfix">
            <img :src="logo" class="logo fl" @click="$router.push('/')">
            <ul class="clearfix fl">
                <li v-for="list in navs" @click="todetail(list)" :class="{'on':path==list.path}">
                    {{list.name}}
                </li>
            </ul>

            <div class="mess clearfix fr">
                <div class="login1 fl" >
                    <span v-if="islogin" class="title">
                        <img :src="user && user.icon?user.icon : circleUrl" alt="" srcset=""><i class="iconfont">&#xe620;</i>
                    </span>
                    <span v-else class="title">
                        <i class="iconfont first">&#xe6b7;</i>登录<i class="iconfont">&#xe620;</i>
                    </span>
                    <div>
                        <div class="san"></div>
                        <p v-if="islogin">
                            <span @click="$router.push('/person')"><i class="iconfont">&#xe655;</i>个人中心</span>
                            <span @click="out"><i class="iconfont">&#xe659;</i>退出</span>
                        </p>
                        <p v-else>
                            <span @click="login"><i class="iconfont">&#xe69c;</i>登录</span>
                            <span @click="torankadminlogin"><i class="iconfont">&#xe6b6;</i>管理员入口</span>
                        </p>
                    </div>
                </div>
                <div class="tel fl">
                    <i class="iconfont">&#xe6b8;</i>
                    <div>
                        <div class="san"></div>
                        <p class="phone">
                            <span>联系电话：</span>
                            <span>{{tel}}</span>
                        </p>
                    </div>
                </div>
            </div>

            <!-- <el-input id="search" ref="input" placeholder="搜索竞赛" v-model="searchName" class="input-with-select search fl">
                <el-button slot="suffix" @click.native="search" icon="el-icon-search el-input__icon"></el-button>
            </el-input> -->
            <el-autocomplete id="search" @keyup.enter.native="searchs" class="input-with-select search fr" ref="input" placeholder="搜索竞赛" v-model="searchName" :fetch-suggestions="handleSelect" @select="search"  >
                <i class="el-icon-search el-input__icon" @click="searchs" slot="suffix"></i>
            </el-autocomplete>

        </div>
    </div>
</template>

<script>
import network from '@/api'
import { getBaseInfo } from '@/common/common.js'
import { tologin } from '@@/utils/util' 
export default {
    props:['path'],
    mounted(){
        let logined = localStorage.getItem("login") || "";
        this.user = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"));
        if (logined) {
            if(this.user){
                this.$store.state.islogin = true
            }
        }
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
            searchName: '',
            logo: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/header/logo.png',
            choose: '/',
            navs:[
                {
                    name: '首页',
                    path: '/',
                    id: 1
                },
                {
                    name: '资讯',
                    path: '/newslist',
                    id: 2
                },
                {
                    name: '竞赛',
                    path: '/competition',
                    id: 3
                },
                // {
                //     name: '培训',
                //     path: '/train',
                //     id: 4
                // },
            ],
            tel: '0571-81902943',
            circleUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1577759731,3108671782&fm=27&gp=0.jpg',
            user:''
        }
    },
    methods:{
        init(){
            let baseInfo = getBaseInfo();
            if(!baseInfo) return;
            if(baseInfo.logoFile){
                this.logo = baseInfo.logoFile
            }
            if(baseInfo.basicTags){
                this.mainworlds = baseInfo.basicTags
            }
            if(baseInfo.cusIphone){
                this.tel = baseInfo.cusIphone
            }

        },
        todetail(list){
            this.$router.push(list.path);
        },
        login(){
            tologin();
        },
        torankadminlogin(){
            window.open("https://rankadmin.moocollege.com/")
        },
        async out(){
            let res = await network.setLoginOut();
            if (res == "error") return;
            //登录信息
            localStorage.removeItem("login");
            //用户组织id
            localStorage.removeItem("groupId");
            //用户信息
            localStorage.removeItem("userInfo");
            this.islogin = false
            this.$router.push("/");
        },
        searchs(){
            if(!this.searchName) return;
            this.$store.state.searchName = this.searchName;
            this.$router.push('/search/'+this.searchName)
        },
        search(item){
            if(!item.value) return;
            this.$store.state.searchName = item.value;
            this.$router.push('/search/'+item.value)
        },
        async handleSelect(name, cb){
            let res = await network.searchprovinceSkin({data:{
                name:name,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return
            let arr = []

            for(let i in res.skinCompetitionList){
                arr.push({
                    value:res.skinCompetitionList[i].name,
                    id:res.skinCompetitionList[i].id,
                    url: res.skinCompetitionList[i].url
                })
            }
            cb(arr)
        }
    }

}
</script>

<style lang="less" scoped>
.header{
    box-shadow: 0 2px 4px 0 rgba(200,197,197,0.50);
    >div{
        padding: 17px 0;
        width: 1220px;
        margin: 0 auto;
        position: relative;
        .logo{
            width: auto;
            height: 80px;
            position: absolute;
            top: 0;
            left: 30px;
            cursor: pointer;
        }
        ul{
            margin: 0 36px 0 336px;
            li{
                width: 116px;
                text-align: center;
                line-height: 46px;
                font-size: 20px;
                color: #4A4A4A;
                letter-spacing: 1.82px;
                float: left;
                cursor: pointer;
            }
            li.on{
                color: #0078E2;
            }
        }
        .search{
            width: 198px;
            height: 46px;
        }
        .mess{
            line-height: 46px;
            font-size: 20px;
            color: #5871A9;
            .title{
                display: inline-block;
                width: 96px;
                text-align: center;
                cursor: pointer;
                .first{
                    margin-right: 10px;
                    font-size: 20px;
                }
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    display: inline-block;
                    // margin-right: 8px;
                    vertical-align: top;
                }
            }
            .login1{
                letter-spacing: 1.82px;
                margin-left: 27px;
                margin-right: 13px;
                position: relative;
                >div{
                    display: none;
                    position: absolute;
                    top: 40px;
                    left: -20px;
                    z-index: 999;
                    text-align: left;
                    .san{
                        width: 0;
                        height: 0;
                        border-bottom: 17px solid #EAEAEA;
                        border-right: 11px solid transparent;
                        border-left: 11px solid transparent;
                        margin-left: 55px;
                    }
                    p{
                        background: #EAEAEA;
                        border-radius: 5px;
                        width: 130px;
                        height: 70px;
                        font-size: 16px;
                        color: #4A4A4A;
                        letter-spacing: 0.8px;
                        line-height: 26px;
                        padding:10px 0 0 0; 
                        span{
                            text-indent: 12px;
                            display: block;
                            cursor: pointer;
                            i{
                                margin-right: 4px;
                            }
                        }
                        span:hover{
                            background: #999999;
                            color: #ffffff;
                        }
                    }
                }
            }
            .login1:hover{
                >div{
                    display: block;
                }
            }
            .tel{
                position: relative;
                i{
                    padding-left: 13px;
                    border-left: 1px solid #CBD3E5;
                    cursor: pointer;
                }
                >div{
                    display: none;
                    position: absolute;
                    top: 36px;
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
            .tel:hover{
                >div{
                    display: block;
                }
            }
        }

    }
    
}
</style>

<style lang="less">
.header{
    .el-input__inner {
        border-radius: 23px !important;
        border: 1px solid #0078E2 !important;
    }
    .el-input__icon{
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 100%;
        font-size: 17px;
        color: #ffffff;
        background-image: linear-gradient(-157deg, #00B0F3 4%, #0078E2 96%);
        cursor: pointer;
    }
    .el-input--suffix .el-input__inner {
        padding-right: 56px;
    }
    .el-input__suffix{
        right: 0;
    }
    .el-button{
        padding: 0;
        border-radius: 100%;
        border: none;
    }
}
.el-popper[x-placement^=bottom]{
    width: 292px !important;
}
</style>