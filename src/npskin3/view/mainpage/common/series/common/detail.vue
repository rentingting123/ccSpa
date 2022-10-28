<template>
    <div class="details">
        <div class="main">
            <img :src="datas.bannerUrl">
            <div class="show">
                <div>
                    <p>
                        主办方：
                    </p>
                    <el-tooltip placement="top">
                        <div slot="content" style="max-width:400px">{{organizers}}</div>
                        <p class="dian">{{organizers}}</p>
                    </el-tooltip>
                    
                </div>
                <div>
                    <p>承办方：</p>
                    <el-tooltip placement="top">
                        <div slot="content" style="max-width:400px">{{sponsor}}</div>
                        <p class="dian">{{sponsor}}</p>
                    </el-tooltip>
                    <!-- <p class="dian">{{sponsor}}</p> -->
                </div>
                <div>
                    <p>覆盖院校：</p>
                    <p class="dian">{{datas.groupNumVo&&datas.groupNumVo.schoolNum || 0}}</p>
                </div>
                <div>
                    <p>参与人数：</p>
                    <p class="dian">{{datas.groupNumVo&&datas.groupNumVo.personNum || 0}}</p>
                </div>
                <div class="button" @click="todetail(datas)">
                    <i class="iconfont">&#xe6f5;</i>
                    进入官网
                </div>
            </div>
        </div>
        <timeshaft :id='gid' />
    </div>
</template>

<script>
import network from '@/api'
import moment from 'moment'
import timeshaft from './timeshaft'
export default {
    props:['id','gid'],
    components:{
        timeshaft,
    },
    data(){
        return{
            datas: {},
            organizers: '',
            sponsor: '',
            timeLists: []
        }
    },
    methods:{
        async getCompetitionDetail(){
            let res = await network.npqueryProvinceInfo({data:{
                competitionId: this.id 
            }});
            if(res=='error') return;
            this.datas = res || {}
            // 主办方 承办方
            let arr = res && res.orgs && res.orgs.competitionOrganizations || []
            let str1 = '',str2 = ''
            for(let i in arr){
                if(arr[i].organization=='主办方'){
                    for(let j in arr[i].units){
                        str1 += ' ' + arr[i].units[j].name
                    }
                }
                if(arr[i].organization=='承办方'){
                    for(let j in arr[i].units){
                        str2 += ' ' + arr[i].units[j].name
                    }
                }
            }
            this.organizers = str1
            this.sponsor = str2
        },
        async getTimelists(){
            let res = await network.npgetTimes({data:{groupId: this.gid}});
            if(res=='error') return;
            this.timeLists = res || []

            // let res = await network.npgetTimesLine({data:{competitionId: this.id}});
            // if(res=='error') return;
            // this.timeLists = res || []
        },
        async init(){
            this.getCompetitionDetail();
            // this.getTimelists()
        },
        async todetail(data){
            if(data.domainUrl){ // 有地址直接跳转地址
                let url = data.domainUrl.indexOf('http') == -1 ? 'http://' + data.domainUrl : data.domainUrl
                window.open(url)
            }else if(data.id){ // 没有地址，有cid，去根据cid获取url
                let res = await network.checkSkinEnableById({data:{
                    id: data.id
                }})
                if(res=='error') return
                if(res && res.url){
                    let url = res.url.indexOf('http') == -1 ? 'http://' + res.url : res.url
                    window.open(url)
                }else{
                    this.$message.warning('暂未开通')
                }
            }else{
                this.$message.warning('暂未开通')
            }
           
        }
    },
    watch:{
        id:{
            immediate: true,
            handler(val){
                this.init()
            }
        }
    }
}
</script>

<style lang='less' scoped>
.details{
    width: 1106px;
    height: 353px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #D5D5D5;
    padding: 9px 11px 21px;
    margin-top: 23px;
    .main{
        width: 1078px;
        height: 221px;
        background: #F6F6F6;
        border-radius: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 17px;
        img{
            width: 353px;
            height: 199px;
        }
        .show{
            width: 625px;
            height: 200px;
            font-size: 0;
            >div{
                display: inline-block;
                vertical-align: top;
                width: 300px;
                height: auto;
                p:first-child{
                    width: 100%;
                    height: 22px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #A4A4A4;
                    line-height: 22px;
                    margin: 10px 0;
                }
                &:nth-child(2n+1){
                    margin-right: 50px;
                }
                &:nth-child(2n){
                    width: 200px;
                    margin-right: 0;
                }
                p:last-child{
                    width: 100%;
                    height: 28px;
                    font-size: 20px;
                    font-weight: bold;
                    color: #4A4A4A;
                    line-height: 28px;
                    margin-bottom: 8px;
                }
            }
            .button{
                width: 103px;
                height: 32px;
                line-height: 32px;
                background: #6283FF;
                border-radius: 8px;
                text-align: center;
                font-size: 14px;
                font-weight: 400;
                color: #FFFFFF;
                letter-spacing: 1px;
                cursor: pointer;
                i{
                    font-size: 14px;
                }
            }
        }
    }
}
</style>