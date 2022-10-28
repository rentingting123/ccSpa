<template>
    <div class="leg" v-if="legs.length>0">
        <h1>{{$t('skin.raceIntroduceMesstitle')}}</h1>
        <h2>{{$t('skin.raceIntroduceMess')}}</h2>
        <div v-for="(leglist,index) in legs" :key="index">
            <div v-for="(leg,i) in leglist" :key="i" class="leglev" v-if="leg.type==0 || (leg.display && leg.isNeed)">
                <div v-if="leg.type==0" class="detail one">
                    <div>
                        {{leg.startTime | time}}~<br>
                        {{leg.endTime | time}}
                        <p class="name">
                            {{leg.name}}
                        </p>
                        <div class="line"/>
                    </div>
                </div>
                <div v-if="leg.display && leg.isNeed && leg.type!=0" class="detail two">
                    <div >
                        <p class="iconp">
                            <i class="iconfont icon-xianxiabaoming" v-if="leg.type==1">&#xe66f;</i>
                            <i class="iconfont icon-zuopin" v-else-if="leg.type==2">&#xe670;</i>
                            <i class="iconfont icon-hetongpingshen" v-else-if="leg.type==3">&#xe66d;</i>
                            <i class="iconfont icon-jiangbei" v-else-if="leg.type==4">&#xe66e;</i>
                            <i class="iconfont icon-gerenshezhi" v-else>&#xe61b;</i>
                        </p>
                        <div class="foot">
                            <p class="time">{{leg.startTime | time}}~{{leg.endTime | time}}</p>
                            <p class="name">
                                {{leg.name}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi/index'
export default {
    data(){
        return{
            legs:[]
        }
    },
    props:{
        id:Number,String,
        baseInfo:Object
    },
    async created(){
        let legs = await network.getTimesLists({data:{competitionId:this.id}});
        
        let arr = []
        let lastArr = []

        for(let i in legs){          
            if(legs[i].type==0){
                arr=[];
                lastArr.push(arr) 
            }
                arr.push(legs[i])
        }

       this.legs = lastArr

    },
    filters:{
        time(val){
            if(!val) return;
            val = val.replace(/-/g,'.');
            return val.substring(5,10)
        }
    }
}
</script>

<style lang="less" scoped>
.leglev{
    display: inline-block;
    margin-right: 75px;
}
.detail{
    width: 180px;
    height: 200px;
    border-radius: 10px;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    margin-bottom: 20px;
}
.leglev:nth-child(4n+5){
    margin-right: 0
}
.leglev:nth-child(4n+6){
    margin-left:255px;
}
.leglev:nth-child(1){
    margin-left: 0
}
.one{
    background: #000;
    font-size: 30px;
    color: #FFFFFF;
    >div{
        margin-top: 30px;
        margin-left: 30px;
    }
    .name{
        font-size: 22px;
        margin: 22px 0 12px 0;
        height: 33px;
        overflow: hidden;
    }
    .line{
        width: 21px;
        height: 5px;
        background: #FFFFFF;
        
    }
}
.two{
    background: #FFFFFF;
    text-align: center;
    .iconp{ 
        width: 100%;
        height: 120px;
        line-height: 120px;
        i{
            color: #000;
            font-size: 44px;
        }
    }
    .foot{
        height: 80px;
        background: #000;
        font-size: 14px;
        color: #FFFFFF;
        .time{
            padding-top: 20px;
        }
        
    }

}
h1,h2{
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 24px;
}
h1{
    margin-top: 30px;
}
h2{
    margin-bottom: 40px;
}

</style>


