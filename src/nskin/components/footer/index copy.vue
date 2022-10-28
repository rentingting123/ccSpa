<template>
  <div class="footNav" id='footNav'>
    <div>
      <div class="left">
        <img @click="toHref('https://cc.moocollege.com')" src="https://web.moocollege.com/mooc/hzq/competition/newhome/logo.png" >
        <div>
          <h3>杭州简学科技有限公司</h3>
          <p>0571-81902943（周一至周五)</p>
          <p>浙江省杭州市紫金创业园B座11F</p>
        </div>
      </div>

      <div class="center">
        <div>
          <p class="title">摩课云服务</p>
          <ul>
            <li @click="toHref('https://cc.moocollege.com')">竞赛管理平台<p></p></li>
            <li @click="toHref('https://rankadmin.moocollege.com')">数据管理中心<p></p></li>
            <li class="code">
              报名小程序
              <img src="https://web.moocollege.com/mooc/hzq/competition/newhome/%E6%8A%A5%E5%90%8D%E5%B0%8F%E7%A8%8B%E5%BA%8F.jpg">
              <p></p></li>
            <li class="code">
              评审小程序
              <img src="https://web.moocollege.com/mooc/hzq/competition/newhome/%E8%AF%84%E5%AE%A1%E5%B0%8F%20%E7%A8%8B%E5%BA%8F.jpg">
              <p></p></li>
          </ul>
        </div>
        </div>
        <div>
          <p class="title">关于我们</p>
          <ul>
            <li @click="toPath('/introductionPlatform')">平台简介<p></p></li>
            <li @click="toPath('/expendingServices')">服务支持<p></p></li>
          </ul>
        </div>
        <div>
          <p class="title">帮助中心</p>
          <ul>
            <li @click="toPath('/helpcenter?type=2')">平台疑问<p></p></li>
            <li @click="toPath('/helpcenter?type=3')">登录疑问<p></p></li>
            <li @click="toPath('/helpcenter?type=4')">竞赛疑问<p></p></li>
            <li @click="toPath('/helpcenter?type=5')">账号疑问<p></p></li>
            <li @click="toPath('/helpcenter?type=6')">密码疑问<p></p></li>
          </ul>
        </div>
        <div>
          <p class="title">申领账号</p>
          <ul>
            <li @click="toHref('https://zhsq.moocollege.com')">高校管理账号申领<p></p></li>
            <li @click="toregister">赛事主办方账号申领<p></p></li>
          </ul>
        </div>
      </div>

      <div class="right">
        <img src="https://web.moocollege.com/nskin/static/img/weixin.670ae99.jpg" >
        <p>扫一扫关注微信公众号</p>
      </div>

    </div>
  </div>
</template>


<script>
import { toregister } from "@@/utils/util";
export default {
  data() {
    return {
    };
  },
  methods: {
    toregister() {
      toregister(true);
    },
    toHref(url){
      window.open(url);
    },
    toPath(path){
      scrollTo(0, 0);
      this.$router.push(path);
    },
  },
};
</script>

<style lang="less" scoped>
.footNav {
  width: 100%;
  height: 154px;
  background: #606767;
  >div{
    width: 1200px;
    margin: 0 auto;
    padding: 33px 0 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      img{
        width: 77px;
        height: 84px;
        margin-right: 29px;
      }
      >div{
        display: inline-block;
        vertical-align: top;
        text-align: left;
        h3{
          font-size: 18px;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 25px;
          margin: 14px 0 13px;
        }
        p{
          font-size: 12px;
          font-weight: 400;
          color: #C9C9C9;
          line-height: 17px;
        }
      }
    }
    .center{
      width: auto;
      height: 93px;
      border-left: 1px solid #ffffff;
      padding-left: 64px;
      text-align: left;
      >div{
        margin-bottom: 4px;
        &:last-child{
          margin-bottom: 0;
        }
        .title{
          width: 98px;
          display: inline-block;
          vertical-align: top;
          text-align: left;
          font-size: 12px;
          font-weight: bold;
          color: #FBFBFB;
          line-height: 17px;
        }
        ul{
          display: inline-block;
          vertical-align: top;
          li{
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 17px;
            color: #C9C9C9;
            margin-left: 13px;
            position: relative;
            cursor: pointer;
            img{
              position: absolute;
              bottom: 34px;
              left: 0;
              width: 100px;
              display: none;
            }
            &:hover{
              img{
                display: block;
              }
            }
            p{
              display: inline-block;
              width: 2px;
              height: 11px;
              margin-left: 13px;
              background: #C9C9C9;
              position: relative;
              top: 2px;
            }
            &:first-child{
              margin-left: 0;
            }
            &:last-child{
              p{
                display: none;
              }
            }
          }
        }
      }
    }
    .right{
      width: 180px;
      img{
        width: 100px;
        height: 100px;
      }
      p{
        width: 62px;
        margin-left: 12px;
        font-size: 12px;
        font-weight: 400;
        color: #C9C9C9;
        line-height: 17px;
        display: inline-block;
        vertical-align: bottom;
      }
    }
  }
}
</style>