<template>
    <div class="expert-detail">
        <Button type="default" style="margin-left:10px;" @click="showDetail">作品分组</Button>

        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" :transfer='false' width="800" style='z-index:1200' >
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>作品分组</span>
            </p>
            <div class="work-group">
                <div v-for="(list,index) in detailslist" :key="index" class="work-group-list">
                    <Input type="text" v-model="detailslist[index]" style="width:300px" :disabled='already'/>
                    <distributionExpert />
                    <Button type="primary" style="margin-left:5px;" v-if="already" @click="toExpert((detailslist[index]))">分配专家</Button>
                    <Icon type="ios-trash-outline" v-else @click="del(index)" />
                </div>
                <p @click="addGroup" class="addGroup" v-if="!already"><Icon type="md-add-circle" /> 增加分组</p>
            </div>
            <div slot="footer">
                <Button type="error" style="float:left" :loading="loading" v-if="already" @click="closeAll">解散所有分组</Button>
                <Button type="default" @click="expertList" :loading="loading">下载导入模板</Button>
                <div style="display:inline-block;margin:0 15px"><uploadComponent :info="uploadInfo" importData="review/import/updateWorkGroupList" @exportData="uploadClose"></uploadComponent></div>
                <Button type="default" @click="show=false" :loading="loading">关闭</Button>
                <Button type="primary" @click="handleSubmit" style="margin-left: 15px" :loading="loading">提交</Button>
            </div>
        </Modal>

        <!-- 分配专家弹窗 -->
       <oppointExport :importShow="oppointExportShow" :importData="importData" v-if="oppointExportShow" @exportData="exportExportData"></oppointExport>
        

    </div>
</template>

<script>
import oppointExport from "./oppointExport"
import distributionExpert from './distribution-expert'
import uploadComponent from "@/expert/components/pub/upload"
export default {
    props:['rowId','close', 'competitionId'],
    components:{
        distributionExpert,
        uploadComponent,
        oppointExport
    },
    data(){
        return{
            show: false, //评审详情
            details:[],
            already: false,
            loading: false,
            detailslist:[""],
            oppointExportShow: false,
            importData: [],
            uploadInfo:'导入功能用于批量修改作品组名及组内排序。请先导出表格，修改后再导入。注：只可修改作品组名及组内排序。',
        }
    },
    methods:{
        toExpert(id){
            this.$api.get('/review/resource/selectGroupPoolIds',{
                poolGroupName: id,
                rowId: this.rowId
            }).then(res=>{
                if(res.code == 0 ){
                    this.importData = {
                        rowId: this.rowId,
                        idList: res.data
                    }
                    this.oppointExportShow = true
                }else{
                    this.$netcode.getApiCode(res)
                }
            })
        },
        // 导出全部作品
        expertList(){
            this.loading=true;
            var data={
                competitionId:this.competitionId,
                rowId:this.rowId
            }
            this.$api.exportPost("/review/review/export/getAllReviewList", data)
            .then(res => {this.loading=false})
        },
        exportExportData(e){
            this.oppointExportShow=e.show
        },
        showDetail(){
            var data={
                rowId:this.rowId
            }
            this.detailslist = [""]
            this.$api.get('review/resource/selectGroupNames',data).then((res)=>{
                if (res.code == 0) {
                    if(!res.data){
                        this.already = false
                        this.show = true
                    }else{
                        this.detailslist = res.data
                        this.already = true
                        this.show = true
                    }
                }else {
                    this.$netcode.getApiCode(res)
                }
            })
            
        },
        uploadClose(){
            this.show = false
            this.close && this.close()
        },
        cancel(){
            this.show = false
        },
        del(i){
            this.detailslist.splice(i,1)
        },
        addGroup(){
            this.detailslist.push("")
        },
        handleSubmit(){
            if(this.already) return this.show = false;
            if(this.detailslist.length<1){
                return this.$Message.warning('请添加分组')
            }
            let obj = {}
            for(let i in this.detailslist){
                if(!obj[this.detailslist[i]]){
                    obj[this.detailslist[i]] = true
                }else{
                    return this.$Message.warning('请勿重复添加分组')
                }
                if(!this.detailslist[i]){
                    return this.$Message.warning('请完善分组信息')
                }
            }
            let _this = this
            this.$Modal.confirm({
                title: '确定要提交分组吗',
                content: '保存组后将不可修改组的数量及名称，如需修改，请解散所有分组后才可重新提交',
                okText: '确定',
                cancelText: '取消',
                'z-index': '1201',
                onOk:()=>{
                    let data = {
                        "rowId": this.rowId,
                        "poolGroupNames": _this.detailslist
                    }
                    this.loading = true
                    this.$api.post('/review/resource/saveGroupNames',data).then(res=>{
                        
                        if(res.code==0){
                            // setTimeout(()=>{
                                this.loading = false
                                this.$Message.success('后台正在处理分组，请稍后刷新列表查看')
                                this.close && this.close()
                                this.show = false
                            // },4000)
                        }else{
                            this.loading = false
                            _this.$netcode.getApiCode(res)
                        }
                    })
                },
                onCancel:()=>{}
            })
        },
        closeAll(){
            this.$Modal.confirm({
                title: '确认要解散全部分组及已分配的专家吗？',
                content: '解散后将不可恢复',
                okText: '确定',
                cancelText: '取消',
                'z-index': '1201',
                onOk:()=>{
                    this.loading = true
                    this.$api.get('/review/resource/delPoolGroupInfo',{
                        rowId: this.rowId
                    }).then(res=>{
                        if(res.code == 0){
                            setTimeout(()=>{
                                this.loading = false
                                this.$Message.success('解散成功')
                                this.show = false
                                this.close && this.close()
                            },2000)
                        }else{
                            this.loading = false
                            this.$netcode.getApiCode(res)
                        }
                    })
                },
                onCancel:()=>{}
            })
        }
    }
}
</script>

<style lang="less" scoped>
.expert-detail{
    display: inline-block;
    vertical-align: top;
    text-align: left;
}
.work-group{
    width: 405px;
    margin: 0 auto;
    padding: 30px 0;
    .work-group-list{
        margin-bottom: 20px;
        i{
            font-size:18px;
            margin-left:5px;
            cursor: pointer;
        }
    }
    .addGroup{
        font-size:14px;
        font-weight:400;
        color:rgba(74,161,242,1);
        line-height:20px;
        display: inline-block;
        cursor: pointer;
        i{
            margin-right: 5px;
        }
    }
}
</style>