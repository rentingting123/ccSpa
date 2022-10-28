<template>
  <div class="national clearfix">
      <h1>
        <i class="iconfont">&#xe688;</i>直通国赛

        <el-select v-model="year" placeholder="请选择" @change="init" size="mini" style="margin-left:10px;vertical-align: middle">
          <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
        </el-select>

        <span class="more" @click="$router.push('/competition?tags=3&year='+year)">查看更多</span>
      </h1>
      <ul class="clearfix">
          <li v-for="(list,index) in lists" v-if="index<3" :key="list.id" @click="todetail(list)">
              <div class="img">
                <img :src="list.bannerOne | imgsrc" width="100%" height="100%">
              </div>
            <h3 :title="list.name" class="dian">{{list.name}}</h3>
            <div class="message clearfix">
                <competitionType :type="list.type" />
                <p class="dian" :title="list.secretariat">{{list.secretariat}}</p>
            </div>

          </li>
      </ul>
  </div>
</template>

<script>
import network from '@/api/index'
import competitionType from '@/pskin/components/competitionType'
export default {
  data(){
      return{
          lists:[],
          year: new Date().getFullYear(),
          years:[]
      }
  },
  components:{competitionType},
  created(){
      this.getYears()
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
  },
    filters:{
        imgsrc(val){
            if(val){
                if(val.indexOf('!w') !=  -1){
                    return val
                }
                return val+"!w480";
            }
            let num = Math.floor(Math.random()*(6 - 1) + 1)
            let arr = 'https://web.moocollege.com/mooc/hzq/pskin3/bg/'+num+'.jpg';
            return arr
        }
    }
};
</script>


<style lang="less" scoped>
.national{
    margin-top: 60px;
}
ul{
    li{
        width: 370px;
        // height: 420px;
        margin-right: 45px;
        float: left;
        overflow: hidden;
        cursor: pointer;
        .img{
            width: 370px;
            height: 208.3px;
            background: #D8D8D8;
            border-radius: 7.26px;
            overflow: hidden;
            position: relative;
        }
        .img:hover{
            img{
                transform: scale(1.1)
            }
        }
        h3{
            font-size: 20px;
            color: #4A4A4A;
            letter-spacing: 0;
            line-height: 28px;
            overflow: hidden;
            margin: 9px 0 6px;
        }
        .message{
            font-size: 14px;
            color: #4C4C4C;
            letter-spacing: 0;
            line-height: 20px;
            p{
                float: left;
                width: 306px;
            }
            .type{
                width: 60px;
                height: 16px;
                line-height: 16px;
                background: #F5A623;
                border-radius: 2px;
                margin: 1px 4px 1px 0;
                font-size: 12px;
                color: #FFFFFF;
                letter-spacing: 0.38px;
                text-align: center;
            }
        }
        >p{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 18px;
            max-height: 18px;
            overflow: hidden;
        }
    }
    li:nth-child(3n){
        margin-right: 0;
    }
}
</style>


