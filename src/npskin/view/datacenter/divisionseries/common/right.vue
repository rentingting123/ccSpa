<template>
    <div class="right">
        <ul>
            <li v-for="list in lists" :key="list.competitionId" :class="{'on':list.competitionId==id}" @click="change(list, list.domainUrl)"> 
                <h3 :title="list.province" class="dian">{{list.province}}</h3>
                <p class="dian" style="margin-top:3px" v-if="list.secretariat && list.secretariat.length>0">
                    秘书处:<span v-for="school in list.secretariat" :key="school" style="margin: 0 4px;">{{school}}</span>
                </p>
                <!-- 20210430 结构赛要求只显示进行中 -->
                <div class="isfinish t2" v-if="list.isfinish==1 || list.isfinish==2">
                    进行中
                </div>
                <!-- <div class="isfinish" :class="{'t1':list.isfinish==2,'t2':list.isfinish==1,'t3':list.isfinish==0}">
                    {{list.isfinish==1?'进行中':list.isfinish==2?'火热报名':list.isfinish===3 ?'筹备中':'已结束'}}
                </div> -->
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['lists','changeid','id'],
    created(){
    },
    methods:{
        change(list, url){
            this.changeid && this.changeid(list.competitionId)
            // 210415 机器人邀请赛特殊要求，后期可以删除
            if(list.competitionId=='5126') return this.$message.warning('竞赛报名请联系王秋辉15821479161');

            if(!url) return this.$message.warning('暂未开通');
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
        }
    }
}
</script>

<style lang="less" scoped>
.right{
    width: 916px;
    ul{
        text-align: left;
        li{
            display: inline-block;
            vertical-align: top;
            text-align: center;
            width: 168px;
            height: 63px;
            background: #FFFFFF;
            border: 1px solid #E8E7E7;
            margin-right: 18px;
            margin-bottom: 15px;
            position: relative;
            cursor: pointer;
            h3{
                margin-top: 12px;
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 0;
                padding: 0 6px;
            }
            p{
                font-size: 12px;
                color: #4A4A4A;
                letter-spacing: 1.09px;
                width: 95%;
                margin: 0 auto;
            }
        }
        li:nth-child(5n){
            margin-right: 0;
        }
        li.on{
            background: #0041AB;
            border: 1px solid #E8E7E7;
            h3,p{
                color: #FFFFFF;
            }
        }
    }
    .isfinish{
        width: 51px;
        height: 14px;
        line-height: 14px;
        background: #9B9B9B;
        border-radius: 3px;
        position: absolute;
        top: -5px;
        left: -6px;
        font-size: 11px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
    }
    .t1{
        background: #DA3145;
    }
    .t2{
        background: #00AA91;
    }
    .t3{
        background: #9B9B9B;
    }
}
</style>