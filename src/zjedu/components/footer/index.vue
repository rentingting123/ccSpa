<template>
  <div class="footNav" id='footNav'>
    <div>
      <div class="left">
        <img @click="toHref('https://cc.moocollege.com')" src="http://web.moocollege.com/mooc/hzq/zjedu/logo.png" >
        <h3>课程内容版权均归课程内容提供者（机构）所有</h3>
        <p>浙ICP备15007838号</p>
        <p>浙公网安备：33010602004724号</p>
      </div>

      <div class="center1">
        <p>平台介绍</p>
        <p>帮助中心</p>
      </div>
      
      <div class="center">
        <p>主办单位：杭州简学科技有限公司</p>
        <p>客服电话：0571-89937640</p>
      </div>

      <div class="right">
        <img src="https://web.moocollege.com/nskin/static/img/weixin.670ae99.jpg" width="100%" height="100%">
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    toHref(url){
      window.open(url);
    },
  },
};
</script>

<style lang="less" scoped>
.footNav {
  width: 100%;
  height: 160px;
  background: #1B2630;
  >div{
    width: 1200px;
    margin: 0 auto;
    padding: 30px 0 ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      text-align: left;
      width: 340px;
      img{
        width: auto;
        height: 39px;
        margin-bottom: 8px;
      }
      h3{
        font-size: 12px;
        font-weight: 400;
        color: #D3DAEB;
        line-height: 17px;
      }
      p{
        font-size: 12px;
        font-weight: 400;
        color: #D3DAEB;
        line-height: 17px;
        margin-top: 4px;
        opacity: 0.4;
      }
    }
    .center1{
      text-align: left;
      p{
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 20px;
        margin-bottom: 12px;
      }
    }

    .center{
      text-align: left;
      p{
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 20px;
        margin-bottom: 12px;
      }
    }
    .right{
      width: 100px;
      height: 100px;
      float: right;
    }
  }
}
</style>