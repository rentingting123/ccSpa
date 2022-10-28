<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>新增角色</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="78" label-position="left" style="text-align:left;">
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
        props:["importData","importShow"],
        data () {
            return {
                leftData:[],
                formValidate:{
                    name:'',
                    status:1,
                },
                formValidateCopy:{},
                ruleValidate: {
                    name: [
                        { required: true, message: '角色名称不能为空', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '状态不能为空'},
                    ],
                },
                show:false,
                id:'',
                groupname:'',//组织名字
                menuData:[],//权限数据
                rightData:[],//右侧显示数据
            }
        },
        created() {
            this.show=this.importShow
            this.id=this.importData
            // this.list(this.id).then((value)=>{
                this.getTarget().then(val=>{
                    val.forEach((val,index)=>{
                        this.leftData.push({
                            label:val.name,
                            key:val.id,
                            type:val.type,
                            sort:val.sort,
                            status:val.status,
                            permCode:val.permCode,
                            operation:val.operation,
                        })
                    })
                });
            // })
        },
        mounted(){

        },
        methods: {

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
                this.$emit('exportData',{show:false})
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post(this.id)
                    } else {
                        this.$refs.focusBool.focus();
                    }
                })
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            post (e) {
                var data={
                    name:this.formValidate.name,
                    state:this.formValidate.state
                }
                if (this.formValidate.status) {
                    data.status=this.formValidate.status
                }
                if (this.formValidate.description) {
                    data.description=this.formValidate.description
                }
                if (this.rightData!=0) {
                    data.permissionList=this.rightData
                }
                // if (this.formValidateCopy.permissionList.sort().toString()!=this.formValidate.permissionList.sort().toString()) {
                //     data.permissionList=this.formValidate.permissionList
                // }
                this.$api.post('/usercenter/role',data).then(reset => {
                    if (reset.code == 0) {
                        // this.accessDialog=true;
                        this.$Message.success("成功!")
                        this.show=false;
                        this.$emit('exportData',{show:false})
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
