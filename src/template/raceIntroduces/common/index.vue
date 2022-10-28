<template>
  <div class="ContestProcess">
    <h4 class="Subtitle">{{$t('skin.raceIntroduceMesstitle')}}</h4>
    <h4 class="Subtitle">{{$t('skin.raceIntroduceMess')}}</h4>
    <div class="ProcessMain" v-if="tabledata.length>0">
      <Table :columns="columns1" :data="tabledata" align="center"></Table>
    </div>
  </div>
</template>

<script>
import network from '@@/api/jxapi/index'
export default {
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
      rules:[]
    };
  },
  computed:{
    id(){
      return this.$store.state.skin.id;
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
  }
};
</script>

<style lang="less" scoped>
.ContestProcess {
  margin: 0 auto;
  margin-top: 46px;
  width: 1200px;
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
</style>

<style lang="less">
.ivu-table th{
  background: #000 !important;
  color: #fff !important;
  text-align: center;
}
</style>
