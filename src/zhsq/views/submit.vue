<template>
  <div class="mainPage">
    <header :style="`background-image:url(${bg})`"></header>
    <div class="school">
        <div class="top"><Icon type="md-checkmark-circle" />帐号申请成功</div>
        <p class="main">登录地址：https://rank.moocollege.com</p>
        <p class="main">点击右上角管理员入口</p>
        <p class="main">登录系统时会要求提交证明文件，请按要求下载模版盖学院章或教务处章。审核成功后即可正式生效使用</p>
        <p class="main"><br>
            若有疑问请联系客服<br>
            QQ：1923594101<br>
            电话：17357146574
        </p>
        <p class="footer">-    杭州简学科技有限公司     -</p>
    </div>


  </div>
</template>
<script>
import network from '@/zhsq/api/index'
export default {
  data(){
      return{
        bg:require('../assets/bg_750.jpg'),
      }
  },
  mounted(){
    document.getElementById("app").style.minWidth = 0;
  },
  beforeDestroy(){
    document.getElementById("app").style.minWidth = "1200px";
  },
}
</script>

<style lang="less" scoped>
.mainPage{
  width: 7.5rem;
  height: auto;
  margin: 0 auto;
  header{
    width: 100%;
    height: 3rem;
    background: url(../assets/bg_750.jpg) no-repeat;
    background-size: 7.5rem 3rem;
    background-position: center;
  }
  .school{
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(52,57,92,0.30);
    border-radius: 10px;
    width: 6.88rem;
    margin: 0 auto;
    padding: 0.2rem 0.24rem 0.27rem;
    position: relative;
    z-index: 2;
    top: -0.78rem;
    font-size: 16px;
    color: #4A4A4A;
    .top{
        text-align: center;
        font-weight: bold;
        margin: .36rem 0;
        i{
            color: rgb(24,169,100);
            margin-right: 0.5em;
        }
    }
    .main{
        text-align: left;
        // text-indent: 2em;
    }
    .footer{
        font-size: 12px;
        color: #9B9B9B;
        text-align: center;
        margin-top: 1rem;
    }
  }

}

</style>


