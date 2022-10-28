<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem >竞赛评审</BreadcrumbItem>
                    <BreadcrumbItem to="/expert/judge">评审列表</BreadcrumbItem>
                    <BreadcrumbItem>专家评审记录</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2 style="display:inline-block;">专家评审记录</h2>
                    <Button style="float:right;" type="primary" @click="back">返回</Button>
                </div>
            </div>
        </div>

        <div class="page-component-view">
    		<div class="page-component-bd">
    			<!--查询条件-->
    			<div class="tableListForm">
                    <div>
                        <Input v-model="searchName" class="searchName" search placeholder="手机号或者姓名" @on-search="handleSubmit"></Input>
                        <DatePicker type="datetimerange" @on-change='YearsChange' format="yyyy-MM-dd HH:mm:ss" placeholder="登录时间" style="width: 300px;margin-left:15px"></DatePicker>
                    </div>
                    <Button type="primary" @click="importResult" :loading="importBtnLoad">导出</Button>
    			</div>
                
                <record v-if="rowId && competitionId" :rowId='rowId' :cId='competitionId' :search='searchName' :years='years' :getPattern='getPattern' ref='record'/>
    		</div>
        </div>
    </div>
</template>
<script>
    import record from '@/expert/views/record/common/record'
    export default {
        components:{
            record,
        },
        data () {
            return {
                importBtnLoad:false,
                searchName: '',
                rowId: '',
                competitionId: '',
                pattern: '', // 0：作品 1：附件
                years: [],
            }
        },
        created() {
            this.rowId = this.$route.query.rowId || ''
            this.competitionId = this.$route.query.competitionId || ''
            if(!this.rowId || !this.competitionId){
                this.$message.warning('未找到对应的竞赛')
                return this.$router.push('/expert/judge')
            }
        },
        methods: {
            getPattern(pattern){
                this.pattern = pattern
            },
            // 搜索
            handleSubmit(){
                this.$refs.record.handleSubmit();
            },
            // 导出结果
            importResult(){
                this.importBtnLoad=true;
                var data={
                    groupId:this.$webapi.getlocal("groupId"),
                    pattern:this.pattern,// 0：作品 1：附件
                    competitionId:this.competitionId, //赛项id
                    rowId:this.rowId,//赛程id
                }
                this.$api.exportPost("/review/resource/expertDistributionInfo", data)
                .then(res => {this.importBtnLoad=false})
            },
            // 返回
            back(){
                this.$router.back(-1)
            },
            YearsChange(time){
                this.years = time
                this.$nextTick(()=>{
                    this.$refs.record.handleSubmit();
                })
            },
        }
    }
</script>
<style scoped lang='less'>
    .page-component-bd{
        padding:15px;
        .tableListForm{
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 15px;
            .searchName{
                width: 200px;
            }
        }
    }
</style>
