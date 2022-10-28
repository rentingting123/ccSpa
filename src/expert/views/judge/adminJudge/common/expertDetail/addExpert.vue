<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>增加评审专家</span>
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
                <modalForm @exportData="exportName" :rowId='rowId'></modalForm>
            </div>
            <div slot="footer">
                <Button type="default" @click="cancel">关闭</Button>
                <Button type="primary" @click="handleSubmit()" style="margin-left: 15px">提交</Button>
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
        props:["importData","importShow",'nornalList', 'pattern', 'rowId'],
        components:{
            modalForm
        },
        data () {
            return {
                nameIndex:'',
                objData:{},
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
            this.patternDataList=this.$store.state.common.patternData.reviewStandardListDto.reviewStandardList
            this.nameIndex=this.patternDataList[this.numIndex].attachId
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

            handleSubmit () {
                if(this.idList.length<1) {
                    return this.$Message.warning('请选择要增加的评审专家')
                }
                let arr = this.nornalList.concat(this.idList)
                this.spinShow=true
                var data={
                    selfGroupId:this.$webapi.getlocal("groupId"),
                    resourcePoolIds:[this.importData.id],
                    specialistId: arr,
                    type:1,//1：专家 2：专家组
                    rowId:this.rowId,
                    pattern:this.pattern,//0：按作品 1：按附件
                    // attachId:this.nameIndex
                }
                if (this.pattern==1){
                    data.attachId=this.nameIndex
                }
                
                if (this.whiteSpecialistId) {
                    data.whiteSpecialistId=this.whiteSpecialistId
                }
                this.$api.post('/review/specialist/distribution',data).then(reset => {
                    if (reset.code == 0) {
                        this.$Message.success("添加成功!")
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                    this.show=false;
                    this.$emit('exportData',{show:false,isSure:true,reload: true})
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
