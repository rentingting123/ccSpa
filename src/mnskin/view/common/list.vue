<template>
    <ul>
        <li v-for="list,index in newlists" :key="index" v-if="list.score>0">
            <div class="num" :class="{'on':list.rank<=3, 'big':list.rank>=999}">{{list.rank}}</div>
            <div class="name dian" :class="{'weight':list.rank<=3}" v-html="list.schoolName"></div>
            <p class="score">
              <span>{{list.score}} </span>
              <img v-if="list.floatingRanking>0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/up.png" >
              <img v-else-if="list.floatingRanking<0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/down.png" >
            </p>
        </li>
    </ul>
</template>

<script>
export default {
    props:['lists'],
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
}
</script>

<style lang="less" scoped>
ul{
    li{
        display: flex;
        align-items: center;
        padding: 0 .32rem;
        height: 0.74rem;
        line-height: 0.74rem;
        .num{
          padding:0 4px;
          border-radius: 8px;
          height: .34rem;
          margin-right: .10rem;
          line-height: .34rem;
          font-size: .28rem;
          color: #fff;
          background-color:#171A25;
          text-align: center;
          &.big{
            width: auto;
          }
        }
        .name{
          width: 4.61rem;
          font-size: .28rem;
          color: #131313;
          text-align: left;
          font-weight: bold;
        }
        .score{
            font-size: .28rem;
            color: #ACB0B0;
            vertical-align: middle;
            margin-left: .2rem;
            span{
              width: .83rem;
              display: inline-block;
              text-align: left;
              font-weight: bold;
            }
            img{
              width: .14rem;
              margin-left: .1rem;
            }
            img.big{
              width: .28rem;
            }
        }
        &:nth-child(2n+1){
          background: #F8F8F8;
        }

    }
}
</style>