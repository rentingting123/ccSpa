<template>
  <div class="demo">
    <ul>
      <li v-for="list,index in newlists" :key="index" v-if="list.score>0">
        <!-- <img class="prize" v-if="list.rank==1" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/01.png" />
        <img class="prize" v-else-if="list.rank==2" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/02.png" />
        <img class="prize" v-else-if="list.rank==3" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/03.png" /> -->
        <div class="num">
          <p :class="{'big':list.rank>99}">{{list.rank}}</p>
        </div>
        <div class="name dian" :class="{'weight':list.rank<=3}" v-html="list.schoolName"></div>
        <p class="score">
          <span>{{list.score}}</span>
          <img v-if="list.floatingRanking>0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/up.png" >
          <img v-else-if="list.floatingRanking<0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/down.png" >
          <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/line.png" >
        </p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
    props:['lists', 'type'],
    created(){
      this.init()
    },
    data(){
      return{
        newlists:[],
      }
    },
    methods:{
      init(){
        let olditem = {}
        let arr = []
        this.lists.forEach((item,index)=>{
          if(olditem.score==item.score){
            item.rank=olditem.rank;
          }else{
            item.rank = index+1;
          }
          olditem = item;
          arr.push(item)
        })
        this.newlists = arr;
      }
    },
    watch:{
      lists(){
        this.init()
      }
    }
};
</script>

<style lang="less" scoped>
ul {
  padding-bottom: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  li {
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    .prize {
      width: 35px;
      height: 35px;
      margin-right: 10px;
    }
    .num {
      width: 35px;
      height: 35px;
      margin-right: 10px;
      p {
        margin: 4.5px;
        width: 26px;
        height: 26px;
        line-height: 26px;
        border-radius: 100%;
        background: #171A25;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 1px;
        text-align: center;
      }
      p.big{
        background: none;
        color: #6DBBFF;
        letter-spacing: 0;
      }
    }
    .name {
      width: 200px;
      font-size: 16px;
      color: #4a4a4a;
      letter-spacing: 0;
      text-align: left;
    }
    .score {
      font-size: 14px;
      color: #9c9c9c;
      letter-spacing: 0.88px;
      vertical-align: middle;
      display: inline-block;
      height: 100%;
      line-height: 60px;
      padding-right: 10px;
      span{
        display: inline-block;
        width: 50px;
        text-align: left;
      }
      img{
        width: 8px;
      }
    }
    &:nth-child(6n+4),&:nth-child(6n+5),&:nth-child(6n+6){
      background: rgba(230, 235, 235, 0.4);
    }
  }
}
</style>