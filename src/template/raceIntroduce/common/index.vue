<template>
    <ul class="abstractDetail">
          <li class="DetaileOne" v-for="(rule,index) in rules" v-if="index<3" @click="$router.push('/rulesDetail/'+rule.id)">
            <a href="javascript:void(0);" >
              <div class="imgModule">
                <img class="img_auto" :src="rule.icon">
              </div>
              <div class="fc"></div>
              <div class="contentDetails">
                
                <h3>{{rule.name}}</h3>
                <p>{{$t('skin.raceIntroduceMore')}} ></p>
              </div>
            </a>
          </li>
    </ul>
</template>

<script>
export default {
    props:{
        rules:Array
    }
}
</script>

<style lang="less" scoped>
    .abstractDetail {
        text-align: center; 
      .DetaileOne {
        display: inline-block;
        width: 400px;
        height: 297px;
        overflow: hidden;
        position: relative;
      }
      .imgModule {
        overflow: hidden;
        width: 100%;
        height: 100%;
        position: relative;
        background: linear-gradient(
          to top,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0)
        );
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .contentDetails {
        position: absolute;
        background:linear-gradient(to top, #000,#fff);
        bottom: 0;
        width: 100%;
        left: 0;
        z-index: 4;
        h3 {
            color: #fff;
            font-size: 16px;
            font-weight: bold;
            padding: 10px;
        }
        p {
            color: #fff;
            font-size: 12px;
            padding: 0 10px 10px;
            text-align: right;
        }
    }
    li a {
    background-color: #000;
    display: block;
    }
    .fc {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 3;
    top: 0;
    left: 0;
    }
</style>
