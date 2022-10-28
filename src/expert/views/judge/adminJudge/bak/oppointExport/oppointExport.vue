<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>指定专家网评</span>
            </p>
            <div style="text-align:center" v-if="pattern==1">
                <!-- <p><Icon type="ios-alert" /><span>每次</span></p> -->
                <Tabs type="card" v-model="nameIndex">
                    <TabPane :label="item.attachName" :name="item.attachId" v-for="(item,index) of patternDataList" :key="index">
                        <modalForm @exportData="exportName" v-if="nameIndex==item.attachId"></modalForm>
                    </TabPane>
                </Tabs>
            </div>
            <div style="text-align:center" v-else>
                <modalForm @exportData="exportName"></modalForm>
            </div>
            <div slot="footer">
                <Button type="default" @click="handleReset('formValidate')">关闭</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 15px">提交</Button>
            </div>
            <div v-if="spinShow">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>正在分配...</div>
                </Spin>
            </div>
      </Modal>
    </div>
</template>
<script>
    import modalForm from "./modalForm"
    export default {
        props:["importData","importShow"],
        components:{
            modalForm
        },
        data () {
            return {
                nameIndex:'',
                objData:{},
                pattern:0,//0 按作品评审 1 按附件评审
                patternDataList:[],//评审附件
                idList:[],//选择专家
                numIndex:0,
                whiteSpecialistId:[],
                spinShow:false
            }
        },
        watch:{

        },
        created() {
            this.show=this.importShow
            this.pattern=this.$store.state.common.patternData.pattern
            this.patternDataList=this.$store.state.common.patternData.reviewStandardListDto.reviewStandardList
            this.nameIndex=this.patternDataList[this.numIndex].attachId
            // this.reviewComments=this.patternData[0].reviewComments
            // this.list();
            // console.log(this.$store.state.common.patternData)
        },
        mounted(){

        },
        methods: {
            // 选择数据变化
            selectChange(e){
                this.idList=[];
                e.forEach((val)=>{
                    this.idList.push(val.id);
                })
            },
            // 是否全选
            selectionAllChange(e){
                this.selectionAll=!this.selectionAll;
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false,isSure:false})
            },

            handleSubmit (name) {
                this.post()
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false,isSure:false})
            },
            post (e) {
                this.spinShow=true
                var data={
                    selfGroupId:this.$webapi.getlocal("groupId"),
                    // resourcePoolIds:this.importData.idList,
                    specialistId:this.idList,
                    type:1,//1：专家 2：专家组
                    rowId:this.$webapi.getlocal("rowId"),
                    // pattern:this.$webapi.getlocal("pattern"),//0：按作品 1：按附件
                    // attachId:this.nameIndex
                }
                if (this.$webapi.getlocal("pattern")==0) {
                    data.pattern=0
                }else if (this.$webapi.getlocal("pattern")==1){
                    data.pattern=1
                    data.attachId=this.nameIndex
                }
                if (this.importData.isAll) {
                    data.isAll=this.importData.isAll
                }else{
                    data.resourcePoolIds=this.importData.idList
                }
                if (this.whiteSpecialistId) {
                    data.whiteSpecialistId=this.whiteSpecialistId
                }
                this.$api.post('/review/specialist/distribution',data).then(reset => {
                    if (reset.code == 0) {
                        this.spinShow=false
                        // this.accessDialog=true;
                        this.$Message.success("分配成功!")
                        if(this.$webapi.getlocal("pattern")==1){
                            if (this.numIndex<this.patternDataList.length) {
                                this.numIndex=this.numIndex+1
                                this.nameIndex=this.patternDataList[this.numIndex].attachId
                            }
                        }else if(this.$webapi.getlocal("pattern")==0){
                            this.show=false;
                            this.$emit('exportData',{show:false,isSure:true})
                        }
                    }else {
                        this.$emit('exportData',{show:false,isSure:true})
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
            // 选择专家
            exportName(e){
                this.idList=e.data;
                this.whiteSpecialistId=e.whiteSpecialistId
            },
        }
    }
</script>
