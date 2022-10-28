<template>
  <div class="ContestAbstract" style="">
    <div class="main">
      <div class="titleContent">
        <h3>{{$t('skin.raceIntroduceTitle')}}</h3>
        <p>COMPETITION RULES</p>
      </div>
      <div class="ContestPurpose">
        <ul v-if="type" class="abstractDetail clearFloat">
          <li class="DetaileOne" v-if="data1.id" @click="$router.push('/rulesDetail/'+data1.id)">
            <a href="javascript:void(0);">
              <div class="imgModule">
                <img class="img_auto" :src="data1.icon">
              </div>
              <div class="fc"></div>
              <div class="contentDetails">
                
                <h3>{{data1.name}}</h3>
                <p>{{$t('skin.raceIntroduceMore')}} ></p>
              </div>
            </a>
          </li>

          <li class="DetaileTwo" v-if="data2.id && data3.id">
            <ul class="li" >
              <li @click="$router.push('/rulesDetail/'+data2.id)" v-if="data2.id" class="smallli">
                <a href="javascript:void(0);">
                  <div class="imgModule">
                    <img class="img_auto" :src="data2.icon">
                  </div>
                  <div class="fc"></div>
                  <div class="contentDetails">
                    
                    <h3>{{data2.name}}</h3>
                    <p>{{$t('skin.raceIntroduceMore')}} ></p>
                  </div>
                </a>
              </li>
              <li @click="$router.push('/rulesDetail/'+data3.id)" v-if="data3.id" class="smallli">
                <a href="javascript:void(0);">
                  <div class="imgModule">
                    <img class="img_auto" :src="data3.icon">
                  </div>
                  <div class="fc"></div>
                  <div class="contentDetails">
                    
                    <h3>{{data3.name}}</h3>
                    <p>{{$t('skin.raceIntroduceMore')}} ></p>
                   
                  </div>
                </a>
              </li>
            </ul>
          </li>

          <li class="DetaileThree" v-if="data4.id" @click="$router.push('/rulesDetail/'+data4.id)">
            <a href="javascript:void(0);">
              <div class="imgModule">
                <img class="img_auto" :src="data4.icon">
              </div>
              <div class="fc"></div>
              <div class="contentDetails">
                
                <h3>{{data4.name}}</h3>
                <p>{{$t('skin.raceIntroduceMore')}} ></p>
              </div>
            </a>
          </li>
          <div style="clear:both;"></div>
        </ul>
        <ruleShow v-else :rules="rules"/>
      </div>

      <div class="ContestProcess">
        <h4 class="Subtitle">{{$t('skin.raceIntroduceMesstitle')}}</h4>
        <h4 class="Subtitle">{{$t('skin.raceIntroduceMess')}}</h4>
        <div class="ProcessMain" v-if="tabledata.length>0">
          <Table :columns="columns1" :data="tabledata" align="center"></Table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from '@@/api/jxapi/index'
import ruleShow from './common/index'
export default {
  components:{
    ruleShow
  },
  data() {
    return {
      columns1:[
        {
          title: '阶段',
          align:'center',
          key: 'name'
        },
        {
          title: '作品申报/在线测试',
          key: 't1',
          align:'center',
        },
        {
          title: '作品评审',
          align:'center',
          key: 't2'
        },
        {
          title: '结果公示',
          align:'center',
          key: 't3'
        },
        {
          title: '结果公布',
          align:'center',
          key: 't4'
        },
      ],
      tabledata: [],
      data1: {},
      data2: {},
      data3: {},
      data4: {},
      type:false,
      rules:[]
    };
  },
  computed:{
    id(){
      return this.$store.state.skin.id;
    },
    baseInfo(){
      return this.$store.state.skin.competitionDetail;
    }
  },
  methods:{
    async getTabledata(){
      let times = this.$store.state.skin.competitionDetail.competitionTimes.competition_times;
      if(times.length<1) return;
      let arr = [];
      let j = -1
      for(let i in times){
        if(times[i].type==0){
          j++;
          arr[j] = []
        }
        arr[j].push(times[i])
      }
      let table = []

      for(let i in arr){
        let obj = {}
        obj.name = arr[i][0].name;
        obj.t1 = arr[i][1].endTime ? arr[i][1].startTime+' - '+arr[i][1].endTime : arr[i][1].startTime; 
        obj.t2 = arr[i][2].endTime ? arr[i][2].startTime+' - '+arr[i][2].endTime : arr[i][2].startTime; 
        obj.t3 = arr[i][3].endTime ? arr[i][3].startTime+' - '+arr[i][3].endTime : arr[i][3].startTime; 
        obj.t4 = arr[i][4].endTime ? arr[i][4].startTime+' - '+arr[i][4].endTime : arr[i][4].startTime; 
        table.push(obj)
      }
      this.tabledata = table;
      // console.log(this.tabledata);
    }
  },
  async created() {
      this.getTabledata();
      let rules = await network.getChild({competitionId:this.id})
      if(rules=='error') return;
      
      if(rules.length % 4 == 0){
        this.type = true
        this.data1 = rules[0]?rules[0]:{};
        this.data2 = rules[1]?rules[1]:{};
        this.data3 = rules[2]?rules[2]:{};
        this.data4 = rules[3]?rules[3]:{};
      }else{
        this.type = false;
        this.rules = rules;
      } 
  }
};
</script>

<style lang="less" scoped>
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
  // background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
.ContestAbstract {
  background: #f7f7f7;
  min-height: 400px;
  background-image:url(https://web.moocollege.com/mooc/hzq/vueskin/assets/abstractBg.png);
  background-position:  center 335px;
  background-repeat:  no-repeat;
  padding-bottom: 74px;

  .main {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    padding-top: 60px;

    .titleContent {
      width: 100%;
      text-align: center;
      margin-bottom: 46px;

      h3 {
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #111;
        text-align: center;
        margin: 0 0 10px;
      }
    }
  }

  .ContestPurpose {
    overflow: hidden;
    margin: 0 auto;
    min-height: 100px;

    .abstractDetail {
      .DetaileOne {
        float: left;
        width: 447px;
        height: 297px;

        overflow: hidden;
      }

      .DetaileTwo {
        float: left;
        width: 444px;
        height: 298px;

        overflow: hidden;
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
      .DetaileThree {
        float: left;
        width: 309px;
        height: 297px;

        overflow: hidden;
      }
    }

    .abstractDetail.clearFloat {
      li {
        position: relative;
        a {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .DetaileThree .abstractDetail.clearFloat li[data-v-68840e4c] {
    position: relative;
    width: 100%;
    height: 50%;
    overflow: hidden;
  }

  .ContestProcess {
    margin-top: 46px;

    .Subtitle {
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      color: #111;
      margin-bottom: 20px;
      color: #fff;
      text-align: center;
    }

    .ProcessMain {
      .table {
        text-align: center;
        width: 100%;
        max-width: 100%;
        margin-bottom: 20px;

        thead {
          tr {
            background: #000;
            th {
              padding: 20px;
              color: #fff;
              text-align: center;
              width: 23.2%;
              border-right: 1px solid #9a999f;

              &:first-child {
                width: 14.2%;
              }

              &:last-child {
                width: 16.2%;
                border-right: 0;
              }
            }
          }
        }

        tbody {
          tr {
            background: #fff;
            td {
              padding: 20px;
              text-align: center;
              border-right: 1px solid #9a999f;
              // border-bottom: 1px solid #9a999f;
              vertical-align: middle;
              border-top: 1px solid #9a999f;
            }
          }
        }
      }
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
.smallli {
  width: 444px;
  height: 149px;
}
</style>

<style lang="less">
.ivu-table th{
  background: #000 !important;
  color: #fff !important;
  text-align: center;
}
</style>
