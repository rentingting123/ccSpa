<template>
  <div class="mainPage">
    <header :style="`background-image:url(${bg})`"></header>
    <div class="school">
        <div class="top"><Icon type="md-checkmark-circle" />申请已成功提交</div>
        <p class="main"> 主办方审核后会将结果以短信形式发送给您，请保持联系畅通。</p>
        <p class="main">收到消息后，请在PC端使用手机号登录平台https://cc.moocollege.com</p>
        <!-- <p class="main">并请在1个月内，在平台身份认证提交证明材料。</p> -->
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
import network from '@/api/index'
export default {
  data(){
      return{
        bg:require('./bg_750.jpg'),
      }
  },
  mounted(){
    document.getElementById("app").style.minWidth = 0;
    let id = this.$store.state.skin.id;
    if(!id) return;
    this.init(id);
  },
  beforeDestroy(){
    document.getElementById("app").style.minWidth = "1200px";
  },
  methods:{
    async init(){
      let html = await network.skinGet({data:{type:9}})
      if(html == "error" | !html) return;
      this.bg = html.html.bg;
    },
  }
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
    background: url(./bg_750.jpg) no-repeat;
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
        text-indent: 2em;
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


