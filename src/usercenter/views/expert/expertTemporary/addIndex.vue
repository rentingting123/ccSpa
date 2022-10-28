<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="520">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>新增账号</span>
         </p>
         <div style="text-align:center">
            <Tabs v-model="nameAdd">
                <TabPane label="添加账号" name="add1">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top" style="text-align:left;">
                         <Row>
                             <Col :span="14" :offset='1'>
                                 <FormItem label="账号" prop="loginName">
                                    <Input v-model="formValidate.loginName" placeholder="账号"></Input>
                                 </FormItem>
                             </Col>
                             <Col :span="14" :offset='1'>
                                 <FormItem label="初始密码" prop="passWord">
                                    <Input v-model="formValidate.passWord" placeholder="初始密码"></Input>
                                 </FormItem>
                             </Col>
                             <!-- <Col :span="24" style="text-align:center;">
                                 <FormItem>
                                     <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                                     <Button type="error" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                                 </FormItem>
                             </Col> -->
                         </Row>
                   </Form>
                </TabPane>
                <TabPane label="批量添加" name="add2">
                    <Row>
                        <Col :span="6" :offset='7'>
                            <Input v-model="numValue" style="text-align:center;width:100px;">
                                <span slot="prepend" @click="minusNum"><Icon type="ios-remove" /></span>
                                <span slot="append" @click="addNum"><Icon type="ios-add" /></span>
                            </Input>
                        </Col>
                     <!-- <Col :span="14" :offset='1'>
                         <FormItem label="初始密码" prop="passWord">
                            <Input v-model="formValidate.passWord" placeholder="初始密码"></Input>
                         </FormItem>
                     </Col> -->
                        <Col :span="4" style="text-align:center;">
                        <!-- <FormItem> -->
                            <Button type="success" @click="handleSure('formValidate')">生成</Button>
                        <!-- </FormItem> -->
                        </Col>
                    </Row>
                    <Row style="margin-top:10px;">
                        <Col :span="6" :offset='7' v-if="successedShow">
                            <p style="font-size:14px;"><Icon type="ios-checkmark-circle" color="#50C419" />已生成新账号</p>
                        </Col>
                        <Col :span="6" :offset='7' v-if="successedShow">
                            <p style="font-size:14px;cursor:pointer;" @click="exportXls"><Icon type="ios-download-outline" />导出xls</p>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>

         </div>
         <div slot="footer" v-show="nameAdd=='add1'?true:false">
             <Button type="default" @click="handleReset('formValidate')">取消</Button>
             <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 15px">确定</Button>
         </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        props:["importData","importShow"],
        data () {
            return {
                numValue:1,
                formValidate:{
                    loginName:'',
                    passWord:'123456',
                },
                nameAdd:"add1",
                successedShow:false,
                schoolData:[],
                formValidateCopy:{},
                ruleValidate: {
                    loginName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' },
                        { pattern: /^[0-9]{6}$/,message:'请输入六位数字', trigger: "blur" }
                    ],
                    passWord: [
                        { required: true, message: '初始密码不能为空',trigger: 'blur'},
                    ],
                },
                show:false,
                id:'',
                backData:''
            }
        },
        watch:{
            // nameAdd:function(e){
            //     console.log(e);
            // }
        },
        created() {
            this.show=this.importShow
        },
        mounted(){

        },
        methods: {
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post()
                    } else {
                        this.$refs.focusBool.focus();
                    }
                })
            },
            // 批量生成临时账号
            handleSure(){

                var data={
                    groupId:this.$webapi.getlocal("groupId"),
                    num:this.numValue
                }
                this.$api.get('/web/specialist/batchGenerate',data).then(reset => {
                    if (reset.code == 0) {
                        // this.accessDialog=true;
                        this.successedShow=true;
                        this.backData=reset.data
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            post (e) {
                var data={
                    groupId:this.$webapi.getlocal("groupId"),
                    loginName:this.formValidate.loginName,
                    type:6
                }
                if (this.formValidate.passWord) {
                    data.passWord=this.formValidate.passWord
                }else{
                    data.passWord='123456'
                }
                this.$api.post('/web/specialist/insert',data).then(reset => {
                    if (reset.code == 0) {
                        // this.accessDialog=true;
                        this.$Message.success("添加成功!")
                        this.show=false;
                        this.$emit('exportData',{show:false})
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })

            },
            handleChange(targetKeys, direction, moveKeys){
                this.rightData=targetKeys;
            },
            //批量添加账号
            addNum(){
                this.numValue++;
            },
            minusNum(){
                if (this.numValue<=1) {
                    this.numValue=1
                }else{
                    this.numValue--
                }
            },
            // 导出xls
            exportXls(){
                var data={
                    uuid:this.backData
                }
                this.$api.exportGet('/web/specialist/temporary/export',data)
                // .then(res => {
                //     const aLink = document.createElement("a");
                //     let blob = new Blob([res])
                //     const fileName = '临时账号生成单.xls';
                //     aLink.href = URL.createObjectURL(blob)
                //     aLink.download = fileName
                //     aLink.click()
                //     document.body.appendChild(aLink)
                // })
            }
        }
    }
</script>
