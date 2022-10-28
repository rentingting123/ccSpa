<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>指定专家组会评</span>
            </p>
            <!-- <div style="text-align:center" v-if="pattern==1">
                <Tabs type="card" v-model="nameIndex">
                    <TabPane :label="item.attachName" :name="item.attachId" v-for="(item,index) of patternDataList" :key="index">
                        <modalForm @exportData="exportName"></modalForm>
                    </TabPane>
                </Tabs>
            </div> -->
            <div style="text-align:center">
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
                nameIndex:'name1',
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
            this.pattern=this.$store.state.common.pattern;
            this.patternDataList=this.$store.state.common.patternData.reviewStandardListDto.reviewStandardList
            this.nameIndex=this.patternDataList[this.numIndex].attachId
        },
        mounted(){

        },
        methods: {
            getPattern(){
                var data={
                    competitionId:this.$webapi.getlocal("competitionId"),
                    rowId:this.$webapi.getlocal("rowId")
                }
                console.log('lidazuizhuanadmin');
                this.$api.get('review/review/rule/get',data).then(reset => {
                    if (reset.code == 0) {
                        // console.log(reset.data);
                        this.objData=reset.data;
                        this.pattern=reset.data.pattern;
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
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
                this.spinShow=true;
                var data={
                    competitionId:this.$webapi.getlocal("competitionId"),
                    groupId:this.$webapi.getlocal("groupId"),
                    specialistGroups:this.idList,
                }
                // if (this.whiteSpecialistId) {
                //     data.whiteSpecialistId=this.whiteSpecialistId
                // }
                this.$api.post('/review/specialist/offlineDistribution',data).then(reset => {
                    if (reset.code == 0) {
                        this.spinShow=false;
                        // this.accessDialog=true;
                        this.$Message.success("分配成功!")
                        if(this.$webapi.getlocal("pattern")==0){
                            conosle.log(12);
                            this.$emit('exportData',{show:false,isSure:true})
                        }else if(this.$webapi.getlocal("pattern")==1){
                            if (this.numIndex<this.patternDataList.length) {
                                this.numIndex=this.numIndex+1
                                this.nameIndex=this.patternDataList[this.numIndex].attachId
                            }
                        }
                    }else {
                        this.spinShow=false;
                        this.$emit('exportData',{show:false,isSure:true})
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
            // 选择专家组
            exportName(e){
                this.idList=e.data;
                this.whiteSpecialistId=e.whiteSpecialistId
            },
        }
    }
</script>
