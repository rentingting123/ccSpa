<template>
  <div class="national clearfix">
      <h1>
        <i class="iconfont">&#xe688;</i>直通国赛
        <el-select v-model="year" placeholder="请选择" @change="init" size="mini" style="margin-left:10px;vertical-align: middle">
          <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <span class="more" @click="$router.push('/competition?tags=3&year='+year)">查看更多</span>
      </h1>
      <ul class="nationalul clearfix">
          <li v-for="list in lists" :key="list.id" @click="todetail(list)">
              <div class="img">
                  <img v-if="list.banner" :src="list.banner" width="100%" height="100%">
                    <div v-else>
                        <img :src="require(`../../../assets/bg/${Math.floor(Math.random()*(6 - 1) + 1)}.jpg`)" width="100%" height="100%">
                        <p>{{list.name}}</p>
                    </div>
                  <p :class="{'type0':list.type==0|| !list.type,'type1':list.type==1,'type2':list.type==2}">{{list.type | competitionType}}</p>
              </div>
            <h3>{{list.name}}</h3>
            <p>{{list.secretariat}}</p>

          </li>
      </ul>
  </div>
</template>

<script>
import network from '@/api/index'
export default {
//   props:['lists'],
  data(){
      return{
          lists:[],
          year: new Date().getFullYear(),
          years:[]
      }
  },
  created(){
      this.getYears();
      this.init();
  },
  methods: {
    async getYears(){
        let res = await network.throughNationalCompetitionYearList();
        if(res=='error' || !res || res==[]) return this.years.push(this.year);
        this.years = res;
    },
    async init(year=this.year){
        let res = await network.throughNationalCompetition({data:{
            provinceId: localStorage.getItem('competitionId'),
            year: year
        }});
        if(res=='error') return;
        this.lists = res.competitionList
    },
    async todetail(item){
        let url = item.url
        if(!url) return;
        url = url.indexOf('http') == -1 ? 'http://' + url : url
        window.open(url)
        let res = await network.updateClickCount({data:{
            id: item.id
        }});
    }
  }
};
</script>


<style lang="less" scoped>
.national{
    margin-top: 50px;
}
.nationalul{
    li{
        width: 220px;
        // height: 420px;
        margin-right: 106px;
        float: left;
        overflow: hidden;
        cursor: pointer;
        .img{
            width: 220px;
            height: 308px;
            background: #D8D8D8;
            border-radius: 6.02px;
            position: relative;
            >p{
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
            >div{
                p{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 64px;
                    padding: 0 28px;
                    font-size: 24px;
                    font-weight: 500;
                    color: #FFFFFF;
                    text-align: center;
                    text-shadow: 2px 1px 8px #000;
                }
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


