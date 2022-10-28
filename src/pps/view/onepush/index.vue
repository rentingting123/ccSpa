<template>
  <div class="home">
      <div class="head">
          <div>
              <img src="./pic/del1.png" alt="">
          </div>
          <div>我的消息</div>
          <div @click="allclear">
              <img src="./pic/del.png" alt="">
          </div>
      </div>
      <div class="navs">
          <div @click="change(3)" :class="{current : indexs == 3}">全部</div>
          <div @click="change(0)" :class="{current : indexs == 0}">教务处</div>
          <div @click="change(1)" :class="{current : indexs == 1}">教研训练</div>
          <div @click="change(2)" :class="{current : indexs == 2}">成果管理</div>
      </div>
      <div class="body">
          <div v-for="item in list" :key="item.id" class="box" @click="todetails(item.id)">
              <div v-if="item.isRead == '0'" class="red"></div>
              <div class="title">
                  <span v-for="obj in mobanlist" :key="obj.dictValue">
                    <span v-if="item.templateType == obj.dictValue">{{obj.dictLabel}}</span>
                    </span>
                </div>
              <div class="content">{{item.content}}</div>
              <div class="footerbox">
                  <div>{{item.createTime | dtime}}</div>
                  <div>教务处</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import network from "@/pps/api/index";
export default {
    data(){
        return{
            indexs:3,
            list:[],
            formData:{
                sourceType:undefined
            },
            mobanlist:[],
            total:0
        }
    },
created(){
    this.getDicts()
    this.getlist()
},
methods:{
    change(num){
        this.indexs = num
        if(num == 3){
            this.formData.sourceType = undefined
        }else{
            this.formData.sourceType = num
        }
        this.getlist()     
    },
    async allclear(){
        let res = await network.removeunread()
        if(res == 'error') return
        this.$message.success('消息清理成功！')
    },
    async getDicts(){
        let dics = await network.getDicts('template_type')
        if(dics == 'error') return
        this.mobanlist= dics
    },
    async getlist(){
       let res = await network.onpushlist({data:this.formData})
       if(res == 'error') return
       this.list = res
    },
    todetails(id){
        this.$router.push({path:'/details',query:{id:id}})
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
.current{
    color: #0A84FF;
}
.current::after{
       content: '';
    display: block;
    position: absolute;
    bottom: -3px;
    left: 50%;
    height: 2px;
    width: 90%;
    background-color: #0A84FF;
    transform: translate(-50%);
}
.navs>div{
    position: relative;
    cursor: pointer;
}
.navs{
    
        padding: 15px 20px 0;
        box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
}
.red{
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 10px;
    right: 10px;
}
.content{
    font-size: 14px;
    color: rgb(104, 104, 104);
    margin-bottom: 7px;
}
.title{
    font-size: 17px;
    margin-bottom: 10px;
}
.box{
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    padding: 14px;
    line-height: 24px;
    box-sizing: border-box;
    margin-bottom: 15px;
    padding: 15px;
}
.footerbox{
    font-size: 12px;
    color: rgb(163, 163, 163);
    display: flex;
    justify-content: space-between;
}
.body{
    padding: 14px;
}
.home {
    background-color: #F9F9F9;
    min-height: 100vh;
}
.head{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 60px;
        line-height: 60px;
    text-align-last: center;
       padding: 0 14px;
    background-color: #fff;
    box-sizing: border-box;
}
</style>
