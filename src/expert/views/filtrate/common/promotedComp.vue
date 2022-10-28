<template>
	<div class="leading-in" v-if="show">
        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="500">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>组织晋级</span>
            </p>
            <div style="text-align:left;">
                <Form ref="formValidate" style="width:100%;" :model="formValidate" label-position="top">
                    <FormItem label="请选择直属上级" prop="comp">
                        <Select v-model="formValidate.comp" placeholder="请选择竞赛">
                            <Option :value="item.id" v-for="(item,index) in compArr" :key="index" @click.native="itemChange(item)">{{item.groupName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="请选择直属上级赛项" prop="competition">
                        <Select v-model="formValidate.competition" placeholder="请选择赛项">
                            <Option :value="item.id" v-for="(item,index) in competitionArr" @click.native="itemchildChange(item)" :key="index">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Form>
                <div class="copyPool">
                    <Checkbox v-model="copyPool">
                        <Tooltip max-width="200" placement='top' content="勾选后晋级时会自动把团队作品一起晋级上去">
                            作品晋级 <Icon type="md-information-circle" class="icon" />
                        </Tooltip>
                    </Checkbox>
                  
                </div>
                <span class="jieshu" v-if="comname"> 届数：{{comname}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="jieshu" v-if="comyear">年份：{{comyear}}</span>
            </div>
            <div slot="footer">       
                <Button type="default" v-loading="btnLoading" @click="handleReset('formValidate')">取消</Button>
                <Button type="primary" v-loading="btnLoading" @click="handleSubmit('formValidate')">确定</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
	export default {
        props:["importData","importShow",'id','rowId'],
        components:{

        },
		data() {
			return {
                comyear:undefined,
                comname:undefined,
                formValidate:{
                    comp:"",
                    competition:""
                },
                btnLoading:false,
                compArr:[],
                competitionArr:[],
                show:false,
                copyPool: true, // 是否作品晋级，默认有
			}
		},
		created() {
			this.list();
		},
		methods: {
			list(){
                let _this = this
                let data={
                    groupId:this.$webapi.getlocal("groupId"),
                }
                return new Promise((relove,reject)=>{
                    this.$api.get('/usercenter/group/queryUpGroup',data).then(reset => {
                        if (reset.code == 0) {
                            this.show=this.importShow
							this.compArr=reset.data
                        }else {
                            _this.pageShow=false;
                            _this.show=false;
                            _this.$emit('exportData',{show:false})
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            // 选择竞赛
            itemChange(e){
                let _this = this
                let data={
                    groupId:e.id,
                    competitionId:localStorage.getItem('compId')
                }
                return new Promise((relove,reject)=>{
                    this.$api.get('/web/group/queryCompetitionIdByGroupId',data).then(reset => {
                        if (reset.code == 0) {
                            this.show=this.importShow
							this.competitionArr=reset.data
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            itemchildChange(item){
                console.log(item);
                this.comyear=item.competitionYear
                this.comname=item.competitionRound
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },

            handleSubmit (name) {
                let this_ = this
                if (this.formValidate.competition) {
                    this.$Modal.confirm({
                        title: "提示",
                        content: "请先核对本竞赛已晋级的数据,然后再赛级晋级，提交后无法再次修改",
                        onOk:function(){
                            this_.post()
                        },
                        onCancel: () => {
                        }        
                    })
                    
                }else{
                    this.$Message.warning("请选择完整!")
                }
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            post (e) {
                var data={
                    competitionId:this.id,
                    rowId:this.rowId,
                    newCompetitionId:this.formValidate.competition,
                    copyPool: this.copyPool
                }
                this.btnLoading=true
                this.$api.get('/review/review/promotionUpGroup',data).then(reset => {
                    if (reset.code == 0) {
                        this.$Message.success("晋级成功!")
                        this.show=false;
                        this.$emit('exportData',{show:false, reload: true})
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                     this.btnLoading=false
                })
            },

        }
	}
</script>

<style lang="less" scoped>
.jieshu{
       display: inline-block;
    padding: 4px 10px;
    border-radius: 16px;
    background-color: #eef0f4;
    color: #2d8cf0;
}
.copyPool{
    display: inline-block;
    vertical-align: middle;
    width: 109px;
    height: 30px;
    line-height: 30px;
    background: #EEF0F4;
    border-radius: 15px;
    text-align: center;
    margin-right: 20px;
    color: #2d8cf0;
    /deep/.ivu-checkbox-wrapper{
        margin-right: 0;
    }
    .icon{
        font-size: 19px;
        color: #A9B0B5;
    }

}
</style>
