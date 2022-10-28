<template>
    <div>
        <ul v-for="(lists,i) in items" class="clearfix" :class="{'on':index==i}">
            <li v-for="(list,j) in lists" :class="{'on':row==j&&index==i}" @mouseover='change(i,j)'>
                <i class="el-icon-location-outline"></i>
                {{list.province}}
            </li>
            <div class="detail clearfix" @click="tocompetition(details)">
                <div class="logo">
                    <img :src="details.bannerUrl" width="100%" height="100%">
                </div>
                <div >
                    <h1>{{details.competitionName}}</h1>
                    <h2>
                        <span class="competitionRange">{{details.range}}</span>
                        <span class="competitionLevel">{{$t('skin.typeno')}} {{details.level}} {{$t('skin.type')}}</span>
                        <span class="isfinish" :class="details.status==2 ? 'orign' : details.status==1 ? 'blue' :'fff'" >
                            {{details.status==2 ? $t('skin.hot') : details.status==1 ? $t('skin.ongoing') : $t('skin.ended')}}
                        </span>
                    </h2>
                    <p>
                        <span>{{$t('skin.di')}} {{details.competitionRound}}{{$t('skin.th')}}</span> / 
                        <span>{{details.time }}</span>
                    </p>
                </div>
            </div>
        </ul>
    </div>
</template>


<script>
import moment from 'moment'
export default {
  props:['lists'],
  data() {
    return {
      details:{},
      items:[],
      index: 0,
      row: 0,
    };
  },
  created(){
        var result = [];
        for (var i = 0; i < this.lists.length; i += 4) {
          result.push(this.lists.slice(i, i + 4));
        }
        this.items = result;
        this.details = result[0][0]
  },
  methods:{
      change(i,j){
          this.index = i;
          this.row = j;
          this.details = this.items[i][j]
      },
      tocompetition(details){
          if(!details.id) return; 
          window.open('https://cc.moocollege.com/#/details?id='+details.id)
      }
  },
  filters:{
      date(val){
          if(!val) return;
            return moment(parseInt(val)).format('YYYY-MM-DD');
      } 
  }
};
</script>
<style lang="less" scoped>
ul{
    width: 100%;
    position: relative;

    li{
        width: 163px;
        height: 44px;
        line-height: 44px;
        margin-right: 16px;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
        float: left;
        cursor: pointer;
    }
    li.on{
        font-weight: bold;
    }
    .detail{
        display: none;
        float: left;
        width: 740px;
        height: 126px;
        background: #F3F3F3;
        padding: 18px 14px;
        cursor: pointer;
        >div{
            float: left;
            width: 520px;

        }

        .logo{
            width: 160px;
            height: 90px;
            margin-right: 16px;
        }
        h1{
            font-size: 20px;
            color: #4A4A4A;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        h2{
            font-size: 14px;
            color: #FFFFFF;
            line-height: 20px;
            margin: 7px 0 8px;
            span{
                display: inline-block;
            }
            .competitionRange{
                background-image: linear-gradient(-120deg, #61B3FF 0%, #298CFF 100%);
                border-radius: 1px;
                padding: 0 5px;
            }
            .competitionLevel{
                background-image: linear-gradient(-90deg, #2A99FF 0%, #0056BB 100%);
                border-radius: 1px;
                padding: 0 5px;
            }
            .isfinish{
                background: #F5A623;
                border-radius: 1px;
                padding: 0 5px;
            }
            .orign{
                background:#F5A623 ;
            }
            .fff{
                background: #9B9B9B;
            }
            .blue{
                background: #1D86FF;
            }
        }
        p{
            font-size: 16px;
            color: #4A4A4A;
            line-height: 22px;
        }


    }
}
ul.on{
    .detail{
        display: block;
    }
}
</style>


