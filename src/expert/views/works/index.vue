<template>
    <div class="works">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem >分配作品</BreadcrumbItem>
                    <BreadcrumbItem>分配作品</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2 v-if="nav==1">作品</h2>
                    <h2 v-if="nav==2">专家</h2>
                </div>
            </div>
        </div>
        <div class="worksMain" v-loading='loading'>
            <div class="header">
                <div class="left">
                    <chooseId :rowId='rowId' :cId='cId' :rowIdChange='rowIdChange' :cIdChange='cIdChange' class="chooseId"/>
                    <Input search v-model="searchValue" placeholder="作品编号/作品名称/学校/团队名/参赛者" @on-search="searchChange"/>
                </div>
                <div class="right">
                    <!-- 作品分组 -->
                    <workGroup :rowId='rowId' :competitionId='cId' :close='close'/>
                    <Button type="default" style="margin-left:10px;" @click="createRateWorks" :loading='createLoadingShow'>生成空作品</Button>
                    <Button type="default"  @click="downloadCode" :loading='createLoadingShow' >下载作品二维码</Button>
                    <Button type="primary"  @click="oppointAutoClick" >自动分配</Button>
                </div>
            </div>

            <div class="navs">
                <ul>
                    <li @click="chooseNav(1)" :class="{'on': nav==1}">作品</li>
                    <li @click="chooseNav(2)" :class="{'on': nav==2}">专家</li>
                </ul>
                <div class="nums">
                    <p>
                        <span v-if="nav==1">团队数: {{numbers.teamNum || 0}}</span>
                        <span v-if="nav==2">分配专家数: {{numbers.expertNum || 0}}</span>
                        <span>作品总数: {{numbers.poolNum || 0}}</span>
                        <span>作品未审核数: {{numbers.uncheckedPoolNum || 0}}</span>
                        <span>已分配作品数: {{numbers.distributionPoolNum || 0}}</span>
                    </p>
                </div>
            </div>

            <div class="tables">
                <worksrecord v-if="nav==1" :loading.sync='loading' :rowId='rowId' :competitionId='cId' :search='searchValue' :pattern='pattern' ref='worksrecord'/>
                <record v-if="nav==2" :loading.sync='loading' :rowId='rowId' :cId='cId' :search='searchValue' ref='record' :notime="true"/>
            </div>
        </div>

        <!-- 选择专家 -->
        <autoOppoint :importShow="autoShow" v-if="autoShow" :rowId='rowId' :competitionId='cId' :pattern='pattern' @exportData="exportAutoData" ></autoOppoint>
    </div>
</template>

<script>
import chooseId from '@/expert/components/chooseId'
import paging from "@/expert/components/pub/page"
import workGroup from './workGroup'
import autoOppoint from "./autoOppoint"
import worksrecord from './worksrecord'
import record from '@/expert/views/record/common/record'
export default {
    components:{
        chooseId,
        paging,
        workGroup,
        autoOppoint,
        worksrecord,
        record,

    },
    data(){
        return{
            rowId: '',
            cId: '',
            pattern: '',
            searchValue: '',
            createLoadingShow:false,
            autoShow:false,
            nav: 1,
            numbers: {}, //数据
            loading: false,
        }
    },
    created(){
        this.nav = this.$route.query.name || 1
    },
    methods:{
        getPattern(countType){
            this.$api.get('review/review/rule/get',{
                rowId: this.rowId, 
                competitionId: this.cId
            }).then(res => {
                this.$store.commit("patternDataCommon", res.data)

                this.pattern= res && res.data && res.data.pattern
                // 获取列表
                if(this.nav==1){
                    this.$refs.worksrecord.list();
                }
            })
        },
        rowIdChange(e){
            this.rowId = e.rowId
            this.getNumbers()
            this.getPattern();
        },
        cIdChange(e){
            this.rowId = e.rowId
            this.cId = e.id
            this.getNumbers()
            this.getPattern();
        },
        getNumbers(){
            this.$api.get('review/selectReviewNums',{
                rowId: this.rowId,
                competitionId: this.cId
            }).then(res=>{
                this.numbers = res && res.data || {}
            })
        },
        close(){
            this.chooseNav(1)
            this.getNumbers()
        },
        searchChange(){
            if(this.nav==1){
                this.$refs.worksrecord.handleSubmit();
            }else if(this.nav==2){
                this.$refs.record.handleSubmit();
            }
        },
        chooseNav(index){
            this.nav = index
            this.$router.push('/expert/works?name='+index)
            // 获取列表
            if(this.nav==1){
                this.$nextTick(()=>{
                    this.$refs.worksrecord.list();
                })
            }
        },
        // 会评生成空作品
        createRateWorks(){
            var _this=this;

            this.$Modal.confirm({
                title: "提示",
                content: "确定为会评时没有上传作品的团队生成空作品吗?",
                onOk:function(){
                    _this.createLoadingShow=true;
                    let data={
                        competitionId:_this.cId, //赛项id
                        rowId:_this.rowId,//赛程id
                    }
                    _this.$api.get("/web/competition/createResourcePool",data)
                    .then(res => {
                        _this.createLoadingShow=false
                        // 跳到作品列表
                        _this.chooseNav(1)
                        _this.getNumbers()
                        if (res.code == 0) {
                            _this.$Message.warning({
                                content:"创建成功",
                                duration:3
                            })
                        }else {
                            _this.$netcode.getApiCode(res)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        async downloadCode(){
            this.createLoadingShow=true;
            var data={
                rowId:this.rowId,
            }
            this.$api.exportGet("/review/downloadResourceQrZip", data)
            .then(res => {
                this.createLoadingShow=false;
            })
        },
        // 自动分配
        oppointAutoClick(){
            this.autoShow=true;
        },
        exportAutoData(e){
            this.autoShow=e.show;
            if(e.isSure){
                this.chooseNav(1)
                this.getNumbers()
            }
        },

    }
}
</script>

<style lang='less' scoped>
.works{
    .worksMain{
        padding: 15px;
        .header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            
            .left{
                display: flex;
                justify-content: flex-start;
                margin: 15px 0;
                .chooseId{
                    margin-right: 15px;
                }
            }
            .right{
                margin: 15px 0;
            }
        }
        .navs{
            display: flex;
            justify-content: space-between;
            align-items: center;
            ul{
                list-style: none;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                li{
                    font-size: 14px;
                    font-weight: 400;
                    color: rgba(0, 0, 0, 0.65);
                    line-height: 22px;
                    margin: 0 25px;
                    cursor: pointer;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #fff;
                    &.on{
                        color: #1890FF;
                        border-bottom: 2px solid #1890FF;
                    }
                }
            }
            .nums{
                p{
                    font-size: 14px;
                    font-weight: 400;
                    color: #4A4A4A;
                    line-height: 20px;
                    span{
                        margin-right: 10px;
                    }
                }
            }
        }
        .tables{
            padding: 15px;
            background: #fff;
        }

    }
}
</style>