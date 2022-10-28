<template>
    <div class="left">
        <div class="pic">
            <img :src="datas.bannerUrl" alt="" srcset="">
            <div class="time">
                {{datas.startTime | date}}~{{datas.endTime | date}}
            </div>
        </div>
        
        <div class="leftmain">
            <h3>{{datas.name}}</h3>
            <p class="dian">举办城市  {{datas.competitionRange}}</p>
            <div v-if="datas.orgs && datas.orgs.competitionOrganizations">
                <div v-for="(item,i) in datas.orgs.competitionOrganizations" :key="i">
                    <p class="dian" v-if="item.units && item.units[0].name">{{item.organization}}  
                        <span v-for="list in item.units" :key="list.name">{{list.name}}</span>
                    </p>
                </div>
            </div>
            <!-- <p class="dian">覆盖院校  {{datas.groupNumVo && datas.groupNumVo.schoolNum || 0}}</p>
            <p class="dian">参与人数  {{datas.groupNumVo && datas.groupNumVo.personNum || 0}}</p> -->
        </div>
        <!-- <div class="foot" @click="todetail(datas.domainUrl)">
            <i class="iconfont">&#xe6c3;</i>
            点击前往分区赛
        </div> -->
        <div class="message">
            <div>{{datas.competitionYear}}</div>
            <p>第{{datas.competitionRound}}届</p>
        </div>
        <div class="province">{{datas.competitionRange | city}}</div>
    </div>
</template>

<script>
import network from '@/api'
import moment from 'moment'
export default {
    props:['id'],
    data(){
        return{
            datas:{}
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            let res = await network.npqueryProvinceInfo({data:{
                competitionId: this.id 
            }});
            if(res=='error') return;
            this.datas = res || {}
        },
        todetail(url){
            if(!url) return this.$message.warning('暂未开通');
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
        }
    },
    watch:{
        id(){
           this.init(); 
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD');
        },
        city(val){
            if(!val) return;
            return val.substring(val.lastIndexOf(',')+1)
        }
    }

}
</script>

<style lang="less" scoped>
.left{
    width: 262px;
    border: 1px solid #E8E7E7;
    position: relative;
    text-align: left;
    .pic{
        width: 100%;
        height: 150px;
        position: relative;
        img{
            width: 100%;
            height: 100%;
        }
        .time{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 24px;
            line-height: 24px;
            background: rgba(0,0,0,.6);
            font-size: 13px;
            color: #FFFFFF;
            letter-spacing: 1.08px;
            padding: 0 17px;
        }
    }
    .leftmain{
        padding: 0 17px;
        padding-bottom: 6px;
        h3{
            font-size: 15px;
            color: #0041AB;
            letter-spacing: 2.14px;
            width: 100%;
            margin-top: 6px;
        }
        p{
            font-size: 12px;
            color: #4A4A4A;
            letter-spacing: 1.09px;
            margin-top: 4px;
        }
    }
    .foot{
        font-size: 12px;
        color: #0041AB;
        letter-spacing: 1.71px;
        text-align: center;
        border-top: 1px solid #E8E7E7;
        line-height: 29px;
        cursor: pointer;
        i{
            font-size: 12px;
        }
    }
    .message{
        position: absolute;
        top: -11px;
        left: -9px;
        width: 57px;
        height: 49px;
        text-align: center;
        >div{
            background: #0041AB;
            font-size: 19px;
            color: #FFFFFF;
            letter-spacing: 1.73px;
        }
        p{
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 1.27px;
            background: #D8D8D8;
        }

    }
    .province{
        position: absolute;
        top: 7px;
        right: 8px;
        opacity: 1;
        padding: 0 4px;
        background: rgba(0,0,0,.6);
        border-radius: 2px;
        font-size: 16px;
        line-height: 1.5;
        color: #FFFFFF;
        letter-spacing: 1.45px;
    }


}
</style>