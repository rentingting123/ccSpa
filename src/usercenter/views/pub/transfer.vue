<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="720">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>{{title}}</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="78" label-position="left" style="text-align:left;">

                <FormItem label="选择权限" prop="role">
                    <Transfer
                        :data="leftData"
                        :target-keys="rightData"
                        :titles="['待授权', '已授权']"
                        filterable
                        :filter-method="filterMethod"
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
                rightData: [],
                formValidate:{
                    name:'',
                    status:1,
                },
                formValidateCopy:{},
                ruleValidate: {

                },
                show:false,
                id:'',
                groupname:'',//组织名字
            }
        },
        created() {
            this.show=this.importShow
            if(this.importData.title){
                this.title=this.importData.title
            }else{
                this.title="授权"
            }
            // if (this.$store.state.common.schoolData.length==0) {
            //     this.$store.dispatch("schoolDataCommon").then((reset)=>{
            //         this.leftData=reset;
            //     })
            // }else{
            //     this.leftData=this.$store.state.common.schoolData
            // }
            this.getList();
        },
        mounted(){

        },
        methods: {
            getList(){
                return new Promise((relove,reject)=>{
                    let data={
                        accreditType:this.importData.accreditType
                    }
                    this.$api.get('/web/specialist/querySchoolAndCompetition',data).then(reset => {
                        if (reset.code == 0) {
                            this.leftData=reset.data
                            relove(reset.data)
                            // this.accessDialog=true;
                        }else {
                            this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            handleSubmit (name) {
                this.$emit('exportData',{show:false,data:this.rightData})
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            handleChange(targetKeys, direction, moveKeys){
                this.rightData=targetKeys;
            }
        }
    }
</script>
