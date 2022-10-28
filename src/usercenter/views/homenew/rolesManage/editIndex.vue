<template>
    <div>
      <Modal v-model="show" :mask-closable="false" width="800">
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
                    <Select v-model="selMod" :label-in-value="true" filterable  style="max-width:150px;" >
                        <Option v-for="(item,index) in orgaData" :value="item.id" @click.native="getItem(item)" :key="item.id">{{item.groupName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="选择角色" prop="role">
                    <Transfer
                        filter-placeholder="请输入搜索字"
                        :titles="['可选清单', '已有清单']"
                        :data="leftData"
                        :target-keys="rightData"
                        filterable
                        @on-change="handleChange"></Transfer>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                    <Button type="error" @click="show=false" style="margin-left: 8px">取消</Button>
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
        props:["importEditData","close"],
        data () {
            return {
                show: true,
                leftData:[],
                formValidate:{},
                ruleValidate: {},
                eshow:false,
                id:'',
                groupName:'',//组织名字
                orgaData:[],//组织数据
                rightData:[],//右侧显示数据
                targetId:'',
                targetType:'',
                selMod:'',
                selectGroup: '',
            }
        },
        async created() {
            this.formValidate=this.importEditData;
            this.id=this.importEditData.id
            this.selectGroup = JSON.parse(this.$webapi.getlocal('selectGroup'));
            this.targetId = this.selectGroup.objectId
            this.targetType = this.selectGroup.type
            this.selMod = this.selectGroup.objectId

            this.getTarget();
            this.setData();
        },
        methods: {
            setData(value){
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
                this.getRightData(this.selMod)
            },
            getRightData(gid=this.$webapi.getlocal('groupId')){
                let data = {
                    userId: this.id,
                    groupId: gid
                }
                this.$api.get('/usercenter/role/selectUserRole',data).then(reset => {
                    if (reset.code == 0) {
                        this.rightData = []
                        reset.data.forEach((val,index)=>{
                            this.rightData.push(val.id)
                        })
                        // this.rightData = reset.data || []
                    }else{
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
            getItem(item){
                this.targetId=item.id
                this.targetType=item.type
                this.getRightData(this.selMod);
            },
            // 获取组织列表
            getTarget(){
                let data = {
                    groupId: this.$webapi.getlocal('groupId')
                }
                this.$api.get('/usercenter/group/queryDowmGroup',data).then(reset => {
                    if (reset.code == 0) {
                        this.orgaData = reset.data || []
                        this.orgaData.splice(0,0,{
                            groupName: this.selectGroup.objectName,
                            id: this.selectGroup.objectId,
                            type: this.selectGroup.type
                        })
                    }else{
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
            handleSubmit (name) {
                var data={
                    id: this.id,
                    targetType: this.targetType,
                    targetId: this.targetId,
                    roleList: this.rightData
                }
                this.$api.put('/usercenter/role/user',data).then(reset => {
                    if (reset.code == 0) {
                        this.$Message.success("成功!")
                        this.show = false
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })

            },
            handleChange(targetKeys, direction, moveKeys){
                this.rightData=targetKeys;
            }
        },
        watch:{
            show(val){
                if(!val) return this.close && this.close();
            }
        }
    }
</script>
