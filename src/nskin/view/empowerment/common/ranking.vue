<template>
  <div class="home">
      <div class="head">
          <div class="com">
              <div class="title">申请排行榜扩容竞赛</div>
              <div style="margin-top:4px">
                  <Applay />
              </div>
             
          </div>
          <div class="right">按照首字母拼音排序</div>
      </div>
      <div>
          <div v-if="show" class="none">
          <div>
              <div><img style="width: 220px;height: 200px;" src="../../../assets/bg/none.png" alt=""></div>
          <div class="none_com">暂无相关竞赛</div>
          </div>
      </div>
      <div v-else  class="down" ref="scrooldown"  @mouseleave="mouseleave()">
             <!-- <vue-seamless-scroll :data="list" :class-option="defaultOption"> -->
             <div class="child" >
                 <table>
                 <tr v-for="(item,index) in listData1" :key="index">
                     <td  class="child_content">
                         <span >{{item.competitionindexcolCompetitionName}}</span>
                     </td>
                 </tr>
             </table>
             <table>
                 <tr class="colordad" v-for="(item,index) in listData2" :key="index">
                     <td  class="child_content">
                         <span >{{item.competitionindexcolCompetitionName}}</span>
                     </td>
                 </tr>
             </table>
             </div>
    <!-- </vue-seamless-scroll> -->
      </div>
      </div>
  </div>
</template>

<script>
// import vueSeamlessScroll from 'vue-seamless-scroll'
import Applay from '@/nskin/view/assessment/common/apply'
import network from '@/api/index'
export default {
    components:{
        // vueSeamlessScroll,
        Applay,  
    },
    data(){
        return {
            list:[],
            show:false,
            skinEdit:false,
            listData1:[],
            listData2:[],
        }
    },
    created(){
        this.getList()
    },
    methods:{
        mouseleave(){
             this.$refs.scrooldown.scrollTop = 0
        },
         close(){
          this.skinEdit = false
        },
        async getList(){
            let list = await network.getApplyRankingList()
            if(list.length > 0){
                 this.list = list
                 this.show = false
                if(list=="error") return 
                if(list.length % 2 !== 0){
                    this.list.push({})
                }
                list.forEach((item,index) => {
                        if((index+1)%2 !== 0){
                            this.listData1.push(item)
                        }else{
                            this.listData2.push(item)
                        }
                })
            }else{
                this.show = true
            }
            }
    },
    computed: {
            defaultOption () {
                return {
                    step: 0.5, // 数值越大速度滚动越快
                    limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
                    hoverStop: true, // 是否开启鼠标悬停stop
                    direction: 1, // 0向下 1向上 2向左 3向右
                    openWatch: true, // 开启数据实时监控刷新dom
                    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                    waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
                }
            }
 
        },　　
    
}
</script>

<style scoped lang='less'>
.home{
    width: 1172px;
    margin: 0 auto;
    margin-top: 40px;
    .head{
        padding: 0 34px;
        height: 91px;
        background-color: #000000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .com{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .title{
            font-size: 28px;
            font-weight: bold;
            color: #FFFFFF;
            letter-spacing: 2px;
        }
        .right{
            font-size: 14px;
            font-weight: 400;
            color: #FFFFFF;
            letter-spacing: 1px;
        }
    }
        .none{
         height: 328px;
        background-color: #fff;
        padding: 0 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        .none_com{
            font-size: 16px;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
            margin-top: 9px;
        }
    }
     .down::-webkit-scrollbar {
        /*滚动条整体样式*/
        width : 3px;  /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
        }
        .down::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        box-shadow   : inset 0 0 5px rgba(88, 88, 88, 0.2);
        background   : #cacaca;
        }
        .down::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow   : inset 0 0 5px rgba(138, 138, 138, 0.2);
        border-radius: 0px;
        background   : #f1f1f1;
    }
    .down{
        width: 1172px;
        height: 328px;
        background-color: #fff;
        padding: 0 19px 0 16px;
        overflow: hidden;
        // scrollbar-width: none;
        // overflow-y: scroll;
        &:hover{
            overflow-y: scroll ;
            padding: 0 16px 0 16px;
        }
        .child{
             display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .child_content{
                background-color: #fff;
                height: 52px;
                line-height: 52px;
                text-align: left;
                width: 561px;
                padding-left: 17px;
                font-size: 18px;
                font-weight: 400;
                color: #4A4A4A;
            }
            table{
               tr:nth-child(2n){
                   td{
                       background-color: #E6EBEB;
                   }
               }
            }
            
        }
        
    }
}
</style>