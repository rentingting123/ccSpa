<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>设置账户角色</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="68" label-position="left" style="text-align:left;">
                <FormItem label="姓名" prop="idcardName">
                    <p style="text-align:left;">{{formValidate.idcardName}}</p>
                </FormItem>
                <FormItem label="登录名" prop="loginName">
                    <p style="text-align:left;">{{formValidate.loginName}}</p>
                </FormItem>
                <FormItem label="绑定组织" prop="targetId">
                    <Select remote :remote-method="findUser" v-model="selMod" :label-in-value="true" filterable :placeholder="selMod" style="max-width:150px;" >
                        <Option v-for="(item,index) in orgaData" @click.native="getItem(item)" :value="item.id" :key="item.id">{{item.groupName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="选择角色" prop="role">
                    <Transfer
                        filter-placeholder="请输入搜索字"
                        :titles="['备选项', '已拥有']"
                        :data="leftData"
                        :target-keys="rightData"
                        filterable
                        @on-change="handleChange"></Transfer>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
                <!-- :target-keys="targetKeys" -->
          </Form>
         </div>
         <div slot="footer">
         </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        props:["importEditData","importEditShow"],
        data () {
            return {
                leftData:[],
                formValidate:{},
                formValidateCopy:{},
                ruleValidate: {

                },
                eshow:false,
                id:'',
                groupName:'',//组织名字
                orgaData:[],//组织数据
                rightData:[],//右侧显示数据
                orgaDataItemId:'',
                orgaDataItemType:'',
                selMod:''
                
            }
        },
        created() {
            this.show=this.importEditShow
            this.id=this.importEditData
            this.list(this.id).then((value)=>{
                this.getTarget();
                if(this.$store.state.system.roleAll.length==0){
                    this.$store.dispatch("roleAllSystem").then(()=>{
                        this.$store.state.system.roleAll.forEach((val,index)=>{

                            this.leftData.push({
                                label:val.name,
                                key:val.id,
                                type:val.type
                            })
                        })
                    })
                }else{
                    this.$store.state.system.roleAll.forEach((val,index)=>{
                        this.leftData.push({
                            label:val.name,
                            key:val.id,
                            type:val.type
                        })
                    })
                }
                this.rightData=value;
            })
        },
        mounted(){

        },
        methods: {
            //模糊查询
            findUser(val){
                this.groupName=val
                this.getTarget()
            },
            getItem(item){
                this.orgaDataItemId=item.id
                this.orgaDataItemType=item.type
            },
            // 获取账号信息
            list(e){
                return new Promise((relove,reject)=>{
                    this.$api.get('/usercenter/role/user/'+e,null).then(reset => {
                        if (reset.code == 0) {
                            this.formValidate=reset.data;
                            console.log(reset.data.groupName)
                            this.selMod=reset.data.groupName

                            // this.formValidate.targetId=10001;
                            // this.checkedRole=new Set(this.formValidate.roleList)
                            this.formValidate.roleList=Array.from(new Set(this.formValidate.roleList))
                            this.formValidateCopy.roleList={...this.formValidate.roleList}
                            this.formValidateCopy.targetId={...this.formValidate.targetId}
                            relove(this.formValidate.roleList)
                        }else {
                            this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            // 获取组织列表
            getTarget(){
                var data={}
                if (this.groupName) {
                    data.groupName=this.groupName
                }
                this.$api.get('/usercenter/group/queryname',data).then(reset => {
                    if (reset.code == 0) {
                        this.orgaData=reset.data;
                        // this.accessDialog=true;
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
            cancel () {
                this.$emit('exportEditData',{show:false})
            },
            handleSubmit (name) {
                this.post(this.id)
            },
            handleReset (name) {
               this.$emit('exportEditData',{show:false})
            },
            post (e) {
                var data={
                    id:e
                }
                if (this.formValidateCopy.roleList!=this.rightData) {
                    data.roleList=this.rightData
                }
                if (this.formValidateCopy.targetId!=this.formValidate.targetId) {
                    // data.targetId=this.formValidate.targetId
                    // data.targetType=this.formValidate.type
                    data.targetId=this.orgaDataItemId
                    data.targetType=this.orgaDataItemType
                }
                this.$api.put('/usercenter/role/user',data).then(reset => {
                    if (reset.code == 0) {
                        this.$Message.success("成功!")
                        this.$emit('exportEditData',{show:false})
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })

            },
            handleChange(targetKeys, direction, moveKeys){
                this.rightData=targetKeys;
            }
        }
    }
</script>
