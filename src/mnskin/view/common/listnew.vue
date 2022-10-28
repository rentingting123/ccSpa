<template>
    <ul>
        <li v-for="list,index in lists" v-if="list.score>0" :key="index">
            <div class="num" :class="{'on':list.index<=3, 'big':list.index>=999}">{{list.index}}</div>
            <div class="name dian" :class="{'weight':list.index<=3}" v-html="list.schoolName"></div>
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
        line-height: 0.74rem;
        .num{
          width: .75rem;
          margin-right: .10rem;
          font-size: .28rem;
          color: #171A25;
          text-align: center;
          .num.big{
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
            font-weight: bold;
            span{
              width: .83rem;
              display: inline-block;
              text-align: left;
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