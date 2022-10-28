<template>
       <div class="banner">
            <img src="@/pjl/assets/bg.png" alt="">
            <div class="banner1">
                 
             <div class="head_title">
                 <img src="@/pjl/assets/star.png" alt="">
                 吉林省职业院校大赛管理平台
             </div>
             <div class="banner_head">
                 <span>吉林省职业院校竞赛平台</span>|
                 <span>登录</span>|
                 <span>客服</span>
             </div>
             <div class="banner_search">
                 <div  class="banner_input">
                     <el-input  v-model="searchvalue"></el-input>
                    
                 </div>
                  <div @click="$router.push('/newslist?name='+searchvalue)" class="banner_btn">
                     搜索
                 </div>
             </div>
             <div class="banner_nav">
                 <ul>
                     <li class="current">首页</li>
                     <li @click="jump(m)" v-for="m in menu" :key="m">{{m}}</li>
                 </ul>
             </div>
            </div>
        </div>
</template>

<script>
export default {
 data(){
        return{
            searchvalue:'',
            menu:['申报方案','资源转化','合作企业','数据分析','职教动态','赛事培训']
        }
    },
    methods:{
        jump(m){
            this.$message.info(m+'-建设中')
        },
    }
}
</script>
<style scoped>
::v-deep .banner_search .el-input__inner{
      width: 330px;
                height: 50px !important;
                line-height: 50px !important;
                    border-radius: 10px;
    border: 2px solid #0269AE;
            }
</style>
<style lang="less" scoped>
   .banner{
        position: relative;
        width: 100%;
        .banner1{
                width: 1200px;
    margin: 0px auto;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
        }
        
        .banner_search{
               position: absolute;
    top: 235px;
    right: 0;
    display: flex;
    justify-content: space-between;
            .banner_btn{
               background-color: #0269AE;
    width: 90px;
    height: 50px;
    margin-left: 10px;
    cursor: pointer;
    line-height: 50px;
    border-radius: 4px;
    color: #fff;
    font-size: 19px;
    text-align: center;
        }
            .banner_input{
                  width: 330px;
                height: 50px;
            }
        }
        .banner_nav{
            position: absolute;
            top: 327px;
            width: 1200px;
            height: 90px;
            background-color: rgb(243, 243, 243);
            border-radius: 18px;
            overflow: hidden;
            ul{
                display: flex;
                align-items: center;
                justify-content: space-around;
                li{
                       width: 172px;
                        font-size: 22px;
                        height: 90px;
                        border-bottom: 6px solid #fff;
                        line-height: 90px;
                        color: #1D2C53;
                        cursor: pointer;
                        &:hover{
                             background: #3D93F6;
                            border-bottom: 6px solid rgb(9, 108, 190);
                            color: #fff;
                        }
                }
                .current{
                        background: #3D93F6;
                        border-bottom: 6px solid rgb(9, 108, 190);
                        color: #fff;
                }
            }
        }
        .banner_head{
            cursor: pointer;
            color: #333333;
            font-size: 16px;
            position: absolute;
            top: 25px;
            right: 0;
             span{
                 cursor: pointer;
             }
        }
        .head_title{
            position: absolute;
            top: 10px;
            margin-top: 118px;
            left: 10px;
            font-size: 56px;
            color:#1D2C53;
        }
    }
</style>