<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>编辑角色</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="68" label-position="left" style="text-align:left;">
                <FormItem label="角色名称" prop="name">
                    <Input v-model="formValidate.name"></Input>
                </FormItem>
                <FormItem label="描述" prop="description">
                    <Input v-model="formValidate.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
                </FormItem>
                <FormItem label="状态" prop="status">
                    <RadioGroup v-model="formValidate.status">
                        <Radio :label="1">正常</Radio>
                        <Radio :label="0">禁用</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="选择权限" prop="role">
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
                show:false,
                id:'',
                groupname:'',//组织名字
                menuData:[],//权限数据
                rightData:[],//右侧显示数据
            }
        },
        created() {
            this.show=this.importEditShow
            this.id=this.importEditData
            this.list(this.id).then((value)=>{
                this.getTarget().then(val=>{
                    val.forEach((items,index)=>{
                        this.leftData.push({
                            label:items.name || '无',
                            key:items.id,
                            type:items.type,
                            sort:items.sort,
                            status:items.status,
                            permCode:items.permCode,
                            operation:items.operation,
                        })
                    })
                    this.rightData=value;
                });

            })
        },
        mounted(){

        },
        methods: {
            // 获取账号信息
            list(e){
                return new Promise((relove,reject)=>{
                    this.$api.get('/usercenter/role/'+e,null).then(reset => {
                        if (reset.code == 0) {
                            this.formValidate=reset.data;
                            // this.formValidate.targetId=10001;
                            // this.checkedRole=new Set(this.formValidate.roleList)
                            this.formValidate.roleList=Array.from(new Set(this.formValidate.permissionList))
                            this.formValidateCopy={...this.formValidate}
                            relove(this.formValidate.roleList)

                        }else {
                            this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            // 获取组织列表
            getTarget(){
                return new Promise((relove,reject)=>{
                    this.$api.get('/usercenter/permission/all',null).then(reset => {
                        if (reset.code == 0) {
                            this.menuData=reset.data;
                            relove(this.menuData)
                            // this.accessDialog=true;
                        }else {
                            this.$netcode.getApiCode(reset)
                        }
                    })
                })

            },
            cancel () {
                this.show=false;
                this.$emit('exportEditData',{show:false})
            },
            handleSubmit (name) {
                this.post(this.id)
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportEditData',{show:false})
            },
            post (e) {
                var data={
                    id:e,
                    permissionList:this.rightData
                }
                if (this.formValidateCopy.status!=this.formValidate.status) {
                    data.status=this.formValidate.status
                }
                if (this.formValidateCopy.description!=this.formValidate.description) {
                    data.description=this.formValidate.description
                }
                if (this.formValidateCopy.name!=this.formValidate.name) {
                    data.name=this.formValidate.name
                }
                // if (this.formValidateCopy.permissionList.sort().toString()!=this.formValidate.permissionList.sort().toString()) {
                //     data.permissionList=this.formValidate.permissionList
                // }
                this.$api.put('/usercenter/role',data).then(reset => {
                    if (reset.code == 0) {
                        // this.accessDialog=true;
                        this.$Message.success("成功!")
                        this.show=false;
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
