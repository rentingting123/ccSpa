<template>
    <div style="display:inline-block">
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>分配专家</span>
            </p>
           
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
    export default {
        props:["importData","importShow"],
        data () {
            return {
                show: false,
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
                    userIds:this.idList,
                    competitionId:this.$webapi.getlocal("competitionId"),
                    groupId:this.$webapi.getlocal("groupId")
                    // pattern:this.$webapi.getlocal("pattern"),//0：按作品 1：按附件
                    // attachId:this.nameIndex
                }
                // if (this.$webapi.getlocal("pattern")==0) {
                //     data.pattern=0
                // }else if (this.$webapi.getlocal("pattern")==1){
                //     data.pattern=1
                //     data.attachId=this.nameIndex
                // }
                // if (this.importData.isAll) {
                //     data.isAll=this.importData.isAll
                // }else{
                //     data.resourcePoolIds=this.importData.idList
                // }
                // if (this.whiteSpecialistId) {
                //     data.whiteSpecialistId=this.whiteSpecialistId
                // }
                this.$api.post('/review/specialist/offlineDistribution',data).then(reset => {
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
                if (e.data.length>0) {
                    this.idList=e.data;
                }else{
                    this.$Message.warning({
                        content:"请选择需要分配的专家",
                        duration:3
                    })
                }

            },
        }
    }
</script>
