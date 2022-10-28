<template>
  <div class="ContestDynamic">
    <div class="container">
      <div class="titleContent">
        <h3>{{$t('skin.competitionNews')}}</h3>
        <p>COMPETITION NEWS</p>
      </div>
      
      <ul class="newsnotice">
        <li @click="choose(0)" :class="{'on':type==0}">{{$t('skin.newsType0')}}</li>
        <li @click="choose(1)" :class="{'on':type==1}">{{$t('skin.newsType1')}}</li>
      </ul>
      <div class="timeLineAll">
        <el-timeline class="timeLine">
          <el-timeline-item v-for="(newlist, index) in news" :key="index" color="#111111" :timestamp="newlist.newsTime | time">
            <div  @click="$router.push({path:'/newsDetail',query:{id:newlist.id,type:'show'}})">
              {{newlist.newsTitle}}
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>

      <div class="pagination">
        <el-pagination layout="prev, pager, next" :current-page.sync="page" @current-change="init" :page-size="pageSize" :total="total"> </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import network from '@@/api/jxapi/index'
import moment from 'moment'
export default {
  data(){
    return{
      news:[],
      type:'0',//0 大赛通知  1大赛新闻 
      page:1,
      pageSize:10,
      total:0
    }
  },
  computed:{
    id(){
      return this.$store.state.skin.id
    }
  },
  created(){
    this.init();  
  },
  methods:{
    choose(index){
      this.type = index;
      this.page = 1;
      this.init();
    },
    async init(){
      let params={
        competitionId:this.id,
        type:this.type,
        pageNum:this.page,
        pageSize:this.pageSize
      }
      let newslist = await network.getNewsList({data:params})

      if(newslist=='error') return;
      this.news = newslist.pageData;
      this.total = newslist.total;
      this.pageSize = newslist.pageSize;
      this.page = newslist.pageNum;
    }
  },
  filters:{
    time(val){
        if(!val) return;
        return moment(parseInt(val)).format('YYYY/MM/DD');
    }
  }
}
</script>

<style lang="less" scoped>
.ContestDynamic {
  width: 100%;
  text-align: center;

  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .titleContent {
      width: 100%;
      text-align: center;
      // margin-top: 80px;
      margin-bottom: 46px;

      h3 {
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        // margin-top: 20px;
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
  .newsnotice{
    display: block;
    margin: 0 auto;
    li{
      width: 142px;
      height: 42px;
      line-height: 42px;
      display: inline-block;
      margin: 0 13px;
      border: 1px solid #111111;
      text-align: center;
      font-size: 14px;
      color: #111111;
      cursor: pointer;
    }
    li.on{
      background: #111111;
      color: #FFFFFF;
    }
  }
  .timeLineAll{
    display: flex;
    justify-content: center;
    margin: 30px 0;
    .timeLine{
      margin: 0 auto;
      display: inline-block;
      cursor: pointer;
    }
  }
  .pagination{
    margin-bottom: 60px;
  }
}
</style>

<style lang="less">
.el-timeline-item{
  left: 105px;
}
.el-timeline-item__timestamp.is-bottom{
  position: absolute;
  margin-top: 0 !important;
  top: 4px;
  left: -84px;
}

.el-timeline-item__content {
    width: 400px;
    text-align: left;
}
</style>


