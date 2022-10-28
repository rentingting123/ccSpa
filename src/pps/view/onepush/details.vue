<template>
  <div class="home">
      <div class="head">
          <div @click="$router.go(-1)"><i class="el-icon-arrow-left"></i></div>
          <div>查看详情</div>
          <div></div>
      </div>
      <div class="body">
         <div class="box">
             <div class="title">
                 <span v-for="item in mobanlist" :key="item.dictValue">
                    <span v-if="obj.templateType == item.dictValue">{{item.dictLabel}}</span>
                    </span>
             </div>
             <div class="middle">
                 <div style="color: rgb(163, 163, 163);">{{obj.createTime | dtime}}</div>
                 <div style="color:#0A84FF">教务处</div>
             </div>
             <div class="content">{{obj.content}}</div>
         </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import network from "@/pps/api/index";
export default {
    created(){
        this.getDicts()
        this.getlist()
    },
    data(){
        return{
            mobanlist:[],
            obj:{}
        }
    },
methods:{
    async getDicts(){
             let dics = await network.getDicts('template_type')
            if(dics == 'error') return
            this.mobanlist= dics
      },
    async getlist(){
        let res = await network.message({data:{
            id:this.$route.query.id
        }})
        if(res == 'error') return
        this.obj = res
    }
},
 filters:{
         dtime(val){
        if(val){
            return moment(val).format('YYYY/MM/DD')
        }else{
            return ''
        }
    }
 }
}
</script>

<style scoped>
.content{
    font-size: 14px;
    color: rgb(104, 104, 104);
    margin-bottom: 7px;
}
.title{
    font-size: 17px;
color: #000000;
margin-bottom: 10px;
}
.middle{
    margin-bottom: 10px;
    font-size: 12px;
    color: rgb(163, 163, 163);
    display: flex;
    justify-content: space-between;
}
.box{
    line-height: 24px;
    background-color: #fff;
    padding: 14px;
       height: calc(100vh - 116px);
}
.body{
    padding: 14px;
     
}
.home {
    min-width: 250px;
    background-color: #F9F9F9;
    height: 100vh;
}
.head{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
        line-height: 60px;
    text-align-last: center;
    box-sizing: border-box;
    padding: 0 15px;
    background-color: #fff;
}
</style>
