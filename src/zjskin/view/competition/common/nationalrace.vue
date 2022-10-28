<template>
  <div class="national clearfix">
      <h1>
        <i class="iconfont">&#xe688;</i>直通国赛
        <span class="more" @click="$router.push('/competition?tags=直通国赛')">查看更多</span>
      </h1>
      <ul class="clearfix">
          <li v-for="list in lists" :key="list.id" @click="todetail(list)">
              <div class="img">
                  <img :src="list.banner" width="100%" height="100%">
                  <p :class="{'type0':list.type==0,'type1':list.type==1,'type2':list.type==2}">{{list.type | competitionType}}</p>
              </div>
            <h3>{{list.name}}</h3>
            <p>{{list.sponsor}}</p>

          </li>
      </ul>
  </div>
</template>

<script>
import componentsList from "./componentslist";
import top from "./top";
export default {
  props:['lists'],
  components: {
    componentsList,
    top,
  },
  methods: {
    todetail(list){
        window.open(list.url)
    }
  }
};
</script>


<style lang="less" scoped>
.national{
    margin-top: 100px;
}
ul{
    li{
        width: 220px;
        height: 420px;
        margin-right: 100px;
        float: left;
        overflow: hidden;
        cursor: pointer;
        .img{
            width: 220px;
            height: 308px;
            background: #D8D8D8;
            border-radius: 6.02px;
            position: relative;
            p{
                position: absolute;
                top: 24px;
                left: 0;
                width: 113px;
                height: 32px;
                line-height: 32px;
                font-size: 18px;
                color: #FFFFFF;
                text-align: center;
                background: #F5A623;
                border-radius: 1.57px;
            }
        }
        h3{
            font-size: 16px;
            color: #4A4A4A;
            line-height: 26px;
            max-height: 52px;
            overflow: hidden;
            margin: 5px 0;
        }
        >p{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 18px;
            max-height: 18px;
            overflow: hidden;
        }
    }
    li:nth-child(4n){
        margin-right: 0;
    }
}
</style>


