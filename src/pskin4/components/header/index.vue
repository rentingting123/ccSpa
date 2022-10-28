<template>
    <div class="header">
        <div class="clearfix">
            <!-- <img :src="logo" class="logo fl" @click="$router.push('/')"> -->
            <span class="logo fl" @click="$router.push('/')">全国大学生工程综合能力竞赛虚拟仿真赛道</span>
            <ul class="clearfix fl">
                <li v-for="list in navs" :key="list.id" @click="todetail(list)" :class="{'on':path==list.path}">
                    {{list.name}}
                    <p></p>
                </li>
            </ul>

            <el-autocomplete id="search" @keyup.enter.native="searchs" class="input-with-select search fr" ref="input" placeholder="搜索竞赛" v-model="searchName" :fetch-suggestions="handleSelect" @select="search"  >
                <template slot="append"  @click="searchs">搜索</template>
            </el-autocomplete>

            <div class="mess clearfix fr">
                <div class="login1 fl" >
                    <span v-if="islogin" class="title">
                        <img :src="user && user.icon?user.icon : circleUrl" alt="" srcset=""><i class="iconfont">&#xe620;</i>
                    </span>
                    <span v-else class="title">
                        登录<i class="iconfont">&#xe620;</i>
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
    // box-shadow: 0 2px 4px 0 rgba(200,197,197,0.50);
    >div{
        padding: 17px 0;
        width: 1100px;
        margin: 0 auto;
        position: relative;
        .logo{
            height: 80px;
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            line-height: 80px;
            font-size: 22px;
            margin-left: -100px;
            color: #576a89;
            font-weight: 500;
        }
        ul{
            margin: 0 14px 0 350px;
            li{
                width: 95px;
                text-align: center;
                line-height: 46px;
                font-size:16px;
                font-weight: bold;
                color: #4A4A4A;
                letter-spacing: 1.82px;
                float: left;
                cursor: pointer;
                position: relative;
                p{
                    width:35px;
                    height:2px;
                    background: #0078E2;
                    position: absolute;
                    bottom: 0px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: none;
                }
            }
            li.on{
                color: #0078E2;
                p{
                    display: block;
                }
            }
        }
        .search{
            width: 198px;
            height: 46px;
        }
        .mess{
            line-height: 46px;
            font-size:14px;
            color: #5871A9;
            .title{
                display: inline-block;
                width: 96px;
                text-align: center;
                cursor: pointer;
                img{
                    width: 32px;
                    height: 32px;
                    border-radius: 100%;
                    display: inline-block;
                    margin-right: 4px;
                    vertical-align: middle;
                }
            }
            .login1{
                letter-spacing: 1.82px;
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
        .input-with-select{
            width: 280px;
            margin-left: 43px;
        }
    }


}
</style>

<style lang="less">

.header{
    .el-input-group__append{
        background:rgba(22,103,240,1);
        color: #ffffff;
    }
    #search{
        width: 211px !important;
    }
}
.el-autocomplete-suggestion{
    width: 282px !important;
}

</style>
