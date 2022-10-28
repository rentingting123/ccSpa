<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem >竞赛评审</BreadcrumbItem>
                    <BreadcrumbItem to="/expert/judge">评审列表</BreadcrumbItem>
                    <BreadcrumbItem>作品评审记录</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2 style="display:inline-block;">作品评审记录</h2>
                    <Button style="float:right;" type="primary" @click="$router.back(-1)">返回</Button>
                </div>
            </div>
        </div>
        <div class="page-component-view">
    		<div class="page-component-bd">
    			<!--查询条件-->
    			<div class="tableListForm">
                    <Input v-model="search" search placeholder="搜索" @on-search="handleSubmit"></Input>
                    <Button type="primary" @click="importResult" :loading="importBtnLoad">导出</Button>
    			</div>
    			<worksrecord v-if="competitionId && rowId" :rowId='rowId' :cId='competitionId' :search='search' :getPattern='getPattern' ref='worksrecord'/>
    		</div>
        </div>
    </div>
</template>

<script>
import worksrecord from '@/expert/views/worksrecord/common'
export default {
    components:{
        worksrecord
    },
    data(){
        return{
            search: '',
            importBtnLoad: false,
            rowId: '',
            competitionId: '',
            pattern: '',
        }
    },
    created(){
        this.rowId = this.$route.query.rowId || ''
        this.competitionId = this.$route.query.competitionId || ''
        if(!this.rowId || !this.competitionId){
            this.$message.warning('未找到对应的竞赛')
            return this.$router.push('/expert/judge')
        }
        
    },
    methods:{
        getPattern(pattern){
            this.pattern = pattern
        },
        // 查询
        handleSubmit(){
            this.$refs.worksrecord.handleSubmit();
        },
        // 导出
        importResult(){
            this.importBtnLoad=true;
            var data={
                groupId: this.$webapi.getlocal("groupId"),
                pattern: this.pattern,// 0：作品 1：附件
                competitionId: this.competitionId, //赛项id
                rowId: this.rowId,//赛程id
            }
            this.$api.exportPost("/review/resource/exportPoolReviewList", data)
            .then(res => {this.importBtnLoad=false})
        },
        
    }
}
</script>

<style lang='less' scoped>
.page-component-bd{
    padding: 20px;
    .tableListForm{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding: 0 15px;
        /deep/.ivu-input-wrapper{
            width: 200px;
        }
    }
}
</style>