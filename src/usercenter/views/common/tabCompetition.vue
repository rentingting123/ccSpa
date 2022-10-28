<template>
    <div>
      <Modal v-model="show" :mask-closable="false" width="600">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>请选择切换竞赛</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="top" style="text-align:left;">
                <RadioGroup v-model="formValidate.competitionVal">
                    <Radio :label="item.id" style="display:block;" class="mb" v-for="(item,index) in dataArr" :key="index">
                       <span>{{item.name}}</span>
                    </Radio>
                </RadioGroup>
                <!-- :target-keys="targetKeys" -->
          </Form>
         </div>
            <div slot="footer">
                <Button type="default" @click="handleReset('formValidate')">取消</Button>
                <Button type="primary" @click="show=false" style="margin-left: 15px">确定</Button>
            </div>
      </Modal>
    </div>
</template>
<script>
    export default {
        props:["close"],
        data () {
            return {
                leftData:[],
                formValidate:{
                    competitionVal:''
                },
                dataArr:[],
                formValidateCopy:{},
                ruleValidate: {
                    idcardName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                },
                show:true,
            }
        },
        watch:{
            // 'formValidate.competitionVal':function(val){
            //     console.log(val);
            // }
            show(val){
                if(!val) return this.close && this.close();
            }
        },
        created() {
        },
        mounted(){
            this.getCompetition();
        },
        methods: {
            // 获取组学校列表
            getCompetition(){
                return new Promise((relove,reject)=>{
                    var data={
                        groupId:this.$webapi.getlocal("groupId")
                    }
                    this.$api.get('/usercenter/user/getSpecialistCompetition',data).then(reset => {
                        if (reset.code == 0) {
                            this.dataArr=reset.data
                            this.formValidate.competitionVal=reset.data[0].id
                            relove(this.dataArr)
                            // this.accessDialog=true;
                        }else {
                            this.$netcode.getApiCode(reset)
                        }
                    })
                })

            },
            handleSubmit (name) {
                var _this=this;
                this.$emit('exportData',{show:false,data:this.formValidate.competitionVal})
                // setTimeout(function(){
                //     _this.$router.push("/expert/judge")
                // },50)
            },
        }
    }
</script>
