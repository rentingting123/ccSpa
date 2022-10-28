<template>
    <div class="tab-competition">
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" :closable="false" width="600">
         <p slot="header">
             <Icon type="information-circled"></Icon>
             <span>请选择切换竞赛</span>
         </p>
         <div style="text-align:center">
           <Form ref="formValidate"  :model="formValidate" :rules="ruleValidate" label-position="top" style="text-align:left;">
                <RadioGroup v-model="formValidate.competitionVal">
                    <Radio :label="item.id" style="display:block;" class="mb" v-for="item in dataArr" :key="item.id">
                       <span class="label tab-comp">
                           {{item.name}}
                           <span v-if="item.year">({{item.year}})</span>
                        </span>
                    </Radio>
                </RadioGroup>
                <span v-if="dataArr.length<1">该角色暂无分配评审作品</span>
                <!-- :target-keys="targetKeys" -->
          </Form>
         </div>
            <div slot="footer">
                <Button type="default" @click="handleReset('formValidate')">取消</Button>
                <Button type="primary" @click="showAgreeF" style="margin-left: 15px">确定</Button>
                <!-- <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 15px">确定</Button> -->
            </div>
      </Modal>
      <Modal width="800px" v-model="showAgree" footer-hide :closable="false" :mask-closable="false">

                <p slot="header" style="text-align:center">
                    <Icon type="information-circled"></Icon>
                    <span>评审须知</span>
                </p>
                
                <div id="agreef" style="height:500px;overflow:auto">
                    <img style="width:100%" src="https://oss.moocollege.com/0/fls/1.png"/>
                    <img style="width:100%" src="https://oss.moocollege.com/0/fls/2.png"/>
                    <img style="width:100%" src="https://oss.moocollege.com/0/fls/3.png"/>
                </div>
                <!-- <iframe :style="{width: '100%', height: '500px'}" src="https://web.moocollege.com/mooc/1.pdf"></iframe> -->
                <!-- <img src="https://web.moocollege.com/mooc/compDetail/banner_2.jpg" /> -->
                <div style="border-top: 1px solid #333;text-align:center; padding-top: 10px">
                    <label style="font-size:24px">
                        <input name="agree" v-model="checkAgree" type="checkbox" @click="clickAgree" />
                        我已阅读并同意
                        <span v-if="countdown > 0">
                            ({{countdown}})s
                        </span>
                    </label>
                </div>

      </Modal>
    </div>
</template>
<script>
    import {selectGroup, getUserInfo} from "@@/utils/commons";
    export default {
        props:["importData","importShow",'login',],
        data () {
            return {
                leftData:[],
                formValidate:{
                    competitionVal: Number(localStorage.getItem('competitionVal')) || ''
                },
                showAgree: false,
                dataArr:[],
                countdown: 5,
                formValidateCopy:{},
                ruleValidate: {
                    idcardName: [
                        { required: true, message: '姓名不能为空', trigger: 'blur' }
                    ],
                },
                show:false,
                id:'',
                groupname:'',//组织名字
                menuData:[],//权限数据
                rightData:[],//右侧显示数据
                checkAgree: false
            }
        },
        watch:{
            // 'formValidate.competitionVal':function(val){
            //     console.log(val);
            // }
        },
        created() {
            this.show=this.importShow
            // debugger
            // this.formValidate.competitionVal = await localStorage.getItem('competitionVal');
            console.log('competitionVal', this.formValidate)
        },
        mounted(){
            selectGroup(this.getCompetition,true,true)
            // this.getCompetition();
        },
        methods: {
            clickAgree(e) {
                if (e.target.checked) {
                    let dom = document.getElementById("agreef")
                    if (this.countdown == 0 || dom.scrollTop + dom.clientHeight >= dom.scrollHeight - 50) {
                        localStorage.setItem('agreef',1)
                        this.showAgree = false;
                        document.getElementsByTagName('body')[0].style.overflow = 'visible'
                        this.handleSubmit('formValidate')
                    } else {
                        this.$Message.warning('请先阅读完评审需知');
                        e.target.checked = false;
                    }
                }
            },
            // 获取组学校列表
            getCompetition(){

                    var data={
                        groupId:this.$webapi.getlocal("groupId")
                    }
                  return  this.$api.get('/usercenter/user/getSpecialistCompetition',data).then(reset => {
                        if (reset.code == 0) {
                            this.dataArr=reset.data
                            if (localStorage.getItem('competitionVal')) {
                                this.formValidate.competitionVal = Number(localStorage.getItem('competitionVal'))
                            } else {
                                this.formValidate.competitionVal=reset.data[0].id
                            }

                            return reset.data
                        }
                    })
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            showAgreeF() {
                // debugger
                if (this.formValidate.competitionVal == 4885 && !localStorage.getItem("agreef")) {
                    this.showAgree = true;
                    this.countdown = 15;

                    setInterval(() => {
                        if (this.countdown == 0) {
                            clearInterval();
                        } else {
                            this.countdown --;
                        }
                    }, 1000);
                } else {
                    this.handleSubmit('formValidate');
                }
            },
            handleSubmit (name) {
                localStorage.setItem('competitionVal', this.formValidate.competitionVal)
                // 查询个人银行卡信息是否完善，未完善保存在缓存中
                let user = getUserInfo();
                if(user && user.bankNumber){
                    this.$webapi.savelocal("showNoBankMess", 0)
                }else{
                    this.$webapi.savelocal("showNoBankMess", 1)
                }

                var _this=this;
                this.$emit('exportData',{show:false,data:this.formValidate.competitionVal})
                // setTimeout(function(){
                //     _this.$router.push("/expert/judge")
                // },50)


            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            }
        }
    }
</script>

<style lang="less" scoped>
    .label.tab-comp {
        max-width: 480px;
        display: inline-block;
        white-space: normal;
        vertical-align: text-top;
    }
</style>
