<template>
    <div class="header">
        <div class="clearfix">
            <div>
                <img class="logo" @click="$router.push('/')" :src="logo" alt="">
                <div class="search">
                    <el-autocomplete id="search" ref="input" placeholder="搜索竞赛" v-model="searchName" :fetch-suggestions="search" @select="handleSelect"  >
                        <i class="el-icon-search el-input__icon" slot="suffix"></i>
                    </el-autocomplete>
                    <p>
                        <span v-for='item,index in mainworlds' @click="mainworld(`${item}`)">{{item}}</span>
                    </p>
                </div>
                <div class="phone">
                    <span @click="login" v-if="!islogin">
                        <i class="iconfont">&#xe69c;</i>
                        普通用户登录
                    </span>
                    <span @click="tologin" v-if="!islogin">
                        <i class="iconfont">&#xe69c;</i>
                        管理员登录
                    </span>
                    <span>
                        <i class="iconfont">&#xe69e;</i>
                        客服热线：{{tel}}
                    </span>
                    <div class="logo1" v-if="islogin">
                        <img :src="user && user.icon?user.icon : circleUrl" alt="" srcset="">
                        <p>欢迎，{{user && user.idcardName}}</p>
                        <div class="detail">
                            <div class="san"></div>
                            <p @click="$router.push('/person')">个人中心</p>
                            <p @click="out">退出</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import network from '@/api'
import { getBaseInfo } from '@/common/common.js'
export default {
    data(){
        return{
            searchName: '',
            logo: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/header/logo1.png',
            mainworlds:[
                {
                    name: '省级A类竞赛',
                    key: '省级A类竞赛'
                },
                {
                    name: '申请省级竞赛',
                    key: '申请省级竞赛'
                }
            ],
            tel: '0571-81902943',
            circleUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1577759731,3108671782&fm=27&gp=0.jpg',
            user:''
        }
    },
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
    methods:{
        init(){
            let baseInfo = getBaseInfo();
            if(!baseInfo) return;
            if(baseInfo.logoFile){
                this.logo = baseInfo.logoFile
            }
            if(baseInfo.titleTags){
                this.mainworlds = baseInfo.titleTags
            }
            if(baseInfo.cusIphone){
                this.tel = baseInfo.cusIphone
            }

        },
        async search(name, cb){
            let res = await network.searchprovinceSkin({data:{
                name:name
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
        },
        mainworld(val){
            this.searchName = val
            this.$nextTick(()=>{
                this.$refs.input.focus()
            })
            // document.getElementById('focus').click()
        },
        handleSelect(list){
            window.open(list.url)
        },
        login(){
            this.$router.push('/login?url='+this.$route.path)
            // this.islogin = true;
        },
        tologin(){
            location.href="https://rankadmin.moocollege.com/"
        },
        out(){
            this.islogin = false
            localStorage.clear();
        }
    },
    watch:{
        islogin(val){
            if(val){
                this.user = localStorage.getItem("userInfo") && JSON.parse(localStorage.getItem("userInfo"));
            }
        }
    }
}
</script>

<style lang="less" scoped>
.header{
    width: 100%;
    height: 140px;
    background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/header/bg1.png) no-repeat;
    background-size: cover;
    background-position: center;
    font-size: 16px;
    color: #FFFFFF;
    > div{
        width: 1280px;
        margin: 0 auto;
        >div {
            height: 73px;
            padding: 32px 0 0;
            .logo{
                width: 250px;
                float: left;
                cursor: pointer;
            }
            .classfiy{
                float: left;
                width: 60px;
            }
            .search{
                height: 46px;
                width: 500px;
                float: left;
                text-align: left;
                margin-left: 50px;
                // el-input{
                //     height:46px;
                // }
                .el-input__inner{
                    height: 46px;
                }
                p{
                    margin-top: 10px;
                    span{
                        font-size: 16px;
                        color: #4A4A4A;
                        margin: 10px;
                        cursor: pointer;
                        i{
                            color: #0078E2;
                            font-size: 18px;
                        }
                        &:nth-child(3){
                            margin-right: 50px;
                        }
                        &:nth-child(4){
                            margin-right: 10px;
                        }
                    }
                    
                }
                .el-input__icon{
                    color: #0078E2;
                    font-size: 18px;
                }
            }
            .phone{
                font-size: 14px;
                color: #4A4A4A;
                i{
                    color: #0078E2;
                    font-size: 18px;
                }
                span{
                    margin-right: 20px;
                    cursor: pointer;
                    display: inline-block;
                    line-height: 46px;
                }
                float: right;
                line-height: 46px;
            }
        }
    }
}
.logo1{
    height: 46px;
    line-height: 46px;
    display: inline-block;
    position: relative;
    margin: 0 0 0 40px;
    cursor: pointer;
    float: right;
    img{
        width: 40px;
        height: 40px;
        border-radius: 100%;
        display: inline-block;
        margin-right: 8px;
        vertical-align: top;
    }
    >p{
        display: inline-block;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
        width: 120px;
        overflow: hidden;
        height: 46px;
    }
    .detail{
        display: none;
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translateX(-50%);
        color: #ffffff;
        width: 100px;
        z-index: 999;
        .san{
            width: 0;
            height: 0;
            border-right: 14px solid transparent;
            border-left: 14px solid transparent;
            border-bottom: 14px solid #131b24;
            margin: 0 auto;
        }
        p{
            background: #000;
        }
    }
}
.logo1:hover{
    .detail{
        display: block;
    }
}
</style>
<style lang="less">
    .search{
        height: 46px;
        .el-input{
            width: 500px;
            height: 46px;
        }
        .el-input__inner{
            height: 46px;
        }
    }
  .el-dropdown-link {
    cursor: pointer;
    color: #ffffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown{
      color: #ffffff;
  }
  .el-dropdown-menu{
      background-color: #0050BC;
      border: 1px solid #0050bc;
  }
  .el-dropdown-menu__item{
      color: #ffffff;
  }
</style>
