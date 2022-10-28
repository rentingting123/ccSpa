<template>
      <div class="home">
            <el-form ref="form"  :rules="rules" :model="formData" label-width="140px">
            <div class="box">
                  <div class="box_head">
                        推送内容
                  </div>
                  <div style="padding:16px">
                  <el-row>
                       <el-col :span="8">
                              <el-form-item label="推送渠道：" prop="pushChannel">
                                   <el-radio-group :disabled="disabled" @change="getduanxinlist" v-model="formData.pushChannel">
                                      <el-radio-button 
                                      v-for="item in qvdaolist" 
                                      :label="item.value"
                                      :key="item.value">
                                      {{item.lable}}
                                      </el-radio-button>
                                    </el-radio-group>
                              </el-form-item>
                       </el-col>
                         <el-col :span="8">
                               <el-form-item prop="contentType" v-if="formData.pushChannel == 1" label="内容类型：">
                                   <el-radio-group  :disabled="disabled"  @change="changeshuru" v-model="formData.contentType">
                                      <el-radio-button 
                                      v-for="item in contentslist" 
                                      :label="item.value"
                                      :key="item.value">
                                       {{item.lable}}
                                      </el-radio-button>
                                    </el-radio-group>
                              </el-form-item>
                       </el-col>
                         <el-col :span="8">
                              <el-form-item prop="priority" v-if="formData.pushChannel == 1" label="重要程度：">
                                 <el-select  :disabled="disabled"  v-model="formData.priority" placeholder="请选择">
                                      <el-option
                                        v-for="item in importlist"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                      </el-option>
                                    </el-select>
                              </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-col>
                             <el-form-item v-if="formData.pushChannel == 2" label="选择内容模板类型：" prop="templateType">
                                     <el-select :disabled="disabled" filterable  v-model="formData.templateType">
                                     <el-option
                                      v-for="item in messageoptions"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                                    </el-select>
                              </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-col>
                               <el-form-item v-if="formData.pushChannel !== 2 && formData.contentType !== 1" label="模板类型：" prop="templateType">
                                  <el-select  :disabled="disabled"  v-model="formData.templateType" placeholder="请选择模板类型">
                                    <el-option
                                    v-for="item in mobanlist"
                                     :label="item.dictLabel"
                                     :key="item.dictValue"
                                      :value="item.dictValue"></el-option>
                                  </el-select>
                                </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row >
                       <el-col>
                             <el-form-item  v-if="formData.contentType !== 0 "  prop="contentTemplateId" label="选择内容模板：">
                                     <el-select  :disabled="disabled"  filterable  @change="duanxinchange" v-model="formData.contentTemplateId" placeholder="">
                                     <el-option v-for="item in duanxinlist" 
                                      :key="item.templateCode || item.id" 
                                      :label="item.templateName || item.templateTitle"
                                      :value="item.templateCode || item.id"
                                      ></el-option>
                                    </el-select>
                                    <!-- <el-button v-if="formData.pushChannel == 2" type="text">短信模板管理</el-button> -->
                              </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-col :span="12">
                               <el-form-item prop="contenttitle" label="推送内容标题:">
                                 <el-input :disabled="formData.pushChannel == 2 || formData.contentType==1 || disabled" v-model="formData.contenttitle"></el-input>
                               </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-form-item prop="templateContent" label="推送内容:">
                        <el-input  :disabled="formData.pushChannel == 2 || formData.contentType==1 || disabled" type="textarea"  v-model="formData.templateContent"></el-input>
                        </el-form-item>
                 </el-row>
            </div>
            </div>
            <div class="box">
                   <div class="box_head">
                        目标选择
                  </div>
                  <div style="padding:16px">
                        <el-row>
                              <el-form-item label="目标用户：" prop="targetUser">
                                 <el-radio-group  :disabled="disabled"  @change="mubiaouser" v-model="formData.targetUser">
                                   <el-radio v-for="item in uesrlist" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                                 </el-radio-group>
                               </el-form-item>
                        </el-row>
                        <el-row v-if="formData.targetUser == 2">
                              <el-col :span="6">
                                     <el-form-item label="选择标签：" prop="classificationId">
                                           <el-select  :disabled="disabled"  @change="getnewtabs" v-model="formData.classificationId"  placeholder="标签类">
                                            <el-option 
                                            v-for="item in tabslists"
                                            :key="item.id"
                                            :label="item.classificationName" 
                                            :value="item.id">
                                            </el-option>
                                          </el-select>
                                    </el-form-item>
                              </el-col>
                                <el-col :span="6">
                                     <el-form-item label="" label-width="20px">
                                           <el-select  :disabled="disabled"  v-model="formData.labelId"  placeholder="标签">
                                            <el-option 
                                            v-for="item in tabschildlist"
                                            :key="item.id"
                                            :label="item.labelName" 
                                            :value="item.id">
                                            </el-option>
                                          </el-select>
                                    </el-form-item>
                              </el-col>
                        </el-row>
                        <el-row  v-if="formData.targetUser == 3">
                              <el-col :span="6">
                                    <el-form-item label="选择用户：">
                                          <el-input  :disabled="disabled"  placeholder="请输入姓名/学号" v-model="formData.user"></el-input>
                                    </el-form-item>
                              </el-col>
                        </el-row>
                        <el-row>
                                      <el-col :span="6">
                                    <el-form-item label="查看预估人数：" prop="userNum">
                                          <el-input  disabled  v-model="formData.userNum"></el-input>
                                    </el-form-item>
                              </el-col>
                              <el-col :span="2">
                                      <el-button  :disabled="disabled" @click="peoplenum" type="primary">预估人数</el-button>
                              </el-col>
                        </el-row>
                  </div>
            </div>
             <div class="box">
                   <div class="box_head">
                        推送时间
                  </div>
                  <div  style="padding:16px">
                        <el-row>
                        <el-col :span="5">
                              <el-form-item label="推送时间：" prop="pushType">
                                <el-radio-group  :disabled="disabled"  v-model="formData.pushType">
                                  <el-radio v-for="item in pusherlist" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                                </el-radio-group>
                              </el-form-item>
                        </el-col>
                        <el-col :span="4">
                               <el-form-item  :disabled="disabled"  label="" label-width="0">
                                      <el-date-picker
                                      v-if="formData.pushType == 1"
                                      v-model="formData.cron"
                                      type="datetime"
                                      placeholder="选择日期时间"
                                      >
                                    </el-date-picker>
                               </el-form-item>
                                
                        </el-col>
                  </el-row>
                  </div>
             </div>
             <div>
                      <el-button type="primary" v-if="!disabled" @click="submit">确认提交</el-button>
                      <el-button type="primary" v-if="disabled" @click="$router.go(-1)">返回</el-button>
             </div>
            </el-form>
      </div>
</template>

<script>
import network from "@/pps/api/index";
export default {
data(){
      return{
             messageoptions:[
            {
                label:'验证码',
                value:0
            },
            {
                label:'短信通知',
                value:1
            },
            {
                label:'推广短信',
                value:2
            },
            {
                label:'国际/港澳台消息',
                value:3
            },
        ],
            disabled:false,
            mobanlist:[],
            rules:{
                  pushChannel:[
                        {
                              required:true,
                              message:'请选择推送渠道',
                              trigger:'blur'
                        }
                  ],
                  // priority:[
                  //       {
                  //             required:true,
                  //             message:'请选择重要程度',
                  //             trigger:'blur'
                  //       }
                  // ],
                  // contentTemplateId:[
                  //       {
                  //             required:true,
                  //             message:'请选择短信模板',
                  //             trigger:'blur'
                  //       }
                  // ],
                  contenttitle:[
                        {
                              required:true,
                              message:'请选输入推送标题',
                              trigger:'blur'
                        }
                  ],
                  templateContent:[
                        {
                              required:true,
                              message:'请输入推送内容',
                              trigger:'blur'
                        }
                  ],targetUser:[
                        {
                              required:true,
                              message:'请选择目标用户',
                              trigger:'blur'
                        }
                  ],
                  templateContent:[
                        {
                              required:true,
                              message:'请输入推送内容',
                              trigger:'blur'
                        }
                  ],
                  pushType:[
                        {
                              required:true,
                              message:'请输入推送时间',
                              trigger:'blur'
                        }
                  ],
            },
            tabslists:[],
            duanxinlist:[],
            tabschildlist:[],
            formData:{
                  userNum:undefined,
                  mesType:'1',
                  contentTemplateId:undefined,
                  user:undefined,
                  pushChannel:1,
                  contentType:1,
                  contenttitle:undefined,
                  tuititle:undefined,
                  templateContent:undefined,
                  targetUser:undefined,
                  tabone:undefined,
                  classificationId:undefined,
                  labelId:'',
                  priority:0,
                  pushType:undefined,
                  cron:undefined
            },
            qvdaolist:[
                  {
                        lable:'个推空间',
                        value:1,
                  },
                  {
                        lable:'短信',
                        value:2,
                  },
                  {
                        lable:'邮件',
                        value:3,
                  },
            ],
            pusherlist:[
                   {
                        label:'立即推送',
                        value:0
                  },
                  {
                        label:'定时推送',
                        value:1
                  },
            ],
             uesrlist:[
                  {
                        label:'全体学生',
                        value:0
                  },
                  {
                        label:'全体学生、全体老师',
                        value:1
                  },
                  {
                        label:'标签用户',
                        value:2
                  },
                  {
                        label:'选择用户',
                        value:3
                  },
            ],
            contentslist:[
                  {
                        lable:'直接输入',
                        value:0
                  },
                  {
                        lable:'自定义内容',
                        value:1
                  }
            ],
             importlist:[
                  {
                        label:'重要',
                        value:0
                  },
                  {
                        label:'中等',
                        value:1
                  },
                  {
                        label:'一般',
                        value:2
                  }
            ]
      }
},
created(){
      this.getDicts()
      this.getduanxinlist()
      
      if(this.$route.query.id){
            this.getditail()
            this.disabled = true
      }else{
            this.gettabclass()
      }
},
methods:{
       async peoplenum(){
           let res = await network.estimatesnum({data:{
                 labelId:this.formData.labelId,
                 targetUser:this.formData.targetUser,
                 user:this.formData.user,
           }})
           if(res == 'error') return
           this.formData.userNum = res
      },
      async getditail(){
            let res = await network.scenedetail({data:{
                  id:this.$route.query.id
            }})
            if(res == 'error') return
            res.targetUser = res.targetUser * 1
            res.priority = res.priority * 1
            res.labelId = res.labelId * 1
            this.duanxinchange(res.contentTemplateId)
            this.formData = res
            this.gettabclass()
      },
      mubiaouser(){
            if(this.formData.targetUser !== 2){
                  this.formData.user = undefined
            }else if(this.formData.targetUser !== 3){
                  this.formData.labelId = undefined
                  this.formData.classificationId = undefined
            }else{
                  this.formData.user = undefined
                  this.formData.labelId = undefined
                  this.formData.classificationId = undefined
            }
            
      },
      changeshuru(){
            this.formData.contenttitle = undefined
            this.formData.templateContent = undefined
            this.formData.contentTemplateId = undefined
            this.formData.templateType = ''
      },
      async getDicts(){
             let dics = await network.getDicts('template_type')
            if(dics == 'error') return
            this.mobanlist= dics
      },
      async gettabclass(){
             let res = await network.labelciflist()
            if(res == 'error') return
            this.tabslists = res
            if(this.$route.query.id){
                  this.tabslists.forEach(item => {
                  if(item.id == this.formData.classificationId){
                        this.tabschildlist = item.gtUserLabel
                  }
            })
            }
      },
      getnewtabs(){
                  this.formData.labelId  = ''
            this.tabslists.forEach(item => {
                  if(item.id == this.formData.classificationId){
                        this.tabschildlist = item.gtUserLabel
                  }
            })
      },
      async duanxinchange(id){
            if(this.formData.pushChannel !== 2){
                  let res = await network.contemdetail({data:{
                        id:id
                  }})
                  if(res == 'error') return
                  this.$set(this.formData,'contenttitle',res.templateTitle)
                  this.$set(this.formData,'templateContent',res.templateContent)
            }else{
                  this.duanxinlist.forEach(item => {
                  if(item.templateCode == id){
                        this.formData.contenttitle = item.templateName
                        this.formData.templateContent = item.templateContent
                  }
            })
            }
      },
      async getduanxinlist(){
            this.formData.contenttitle = undefined
            this.formData.templateContent = undefined
            if(this.formData.pushChannel !== 2){
                  if(this.formData.contentType == ''){
                        this.formData.contentType = 1
                  }
                  this.formData.contentTemplateId = undefined
                  let res = await network.contentlist()
                  if(res == 'error') return
                  this.duanxinlist = res.rows
            }else{
                  this.formData.priority = undefined
                  this.formData.contentType = ''
                  this.formData.templateType = ''
                  let res = await network.selectmessage()
                  if(res == 'error') return
                  this.duanxinlist = res
            }
      },
      async submit(){
             this.$refs.form.validate(async (valid)=>{
                   if(!valid) return
                   if(this.formData.pushChannel !== 2){
                         if(this.formData.contentType == 0){
                         this.formData.gtContentTemplate = {
                                     templateType: this.formData.templateType,
                                     templateTitle:this.formData.contenttitle,
                                     templateContent:this.formData.templateContent
                               }
                        }
                        let res = await network.addmanual({data:this.formData})
                              if(res == 'error') return
                              this.$refs.form.resetFields()
                              this.$message.success('发送成功')
                   }else{
                               let params = {
                                     labelId:this.formData.labelId,
                                     classificationId:this.formData.classificationId,
                              pushChannel:this.formData.pushChannel,
                              priority:this.formData.priority,
                              classificationId:this.formData.classificationId,
                              targetUser:this.formData.targetUser,
                              user:this.formData.user,
                              pushType:this.formData.pushType,
                              cron:this.formData.cron,
                              mesType:'1',
                              gtContentTemplate:{
                                    templateType:this.formData.templateType,
                                    templateTitle:this.formData.contenttitle,
                                    templateContent:this.formData.templateContent,
                                    noteId:this.formData.contentTemplateId,
                              }
                        }
                        let res = await network.addnote({data:params})
                        if(res == 'error') return
                        this.$set(this.formData,'userNum',undefined)
                        // this.formData.userNum = undefined
                        //   this.$refs.form.resetFields()
                        this.$message.success('发送成功')
                        this.$router.go(0)
                   }
             })      
                   
            
      }
}
}
</script>

<style scoped>
.box ::v-deep .el-form-item__content{
      text-align-last: left;
}
.box ::v-deep .el-radio-button{
      margin-right: 20px;
}
.box ::v-deep .el-radio-button__inner{
      border-left: 1px solid #DCDFE6;
      border-radius: 4px;
}
.box ::v-deep .el-radio-button__orig-radio:checked+.el-radio-button__inner{
      border-left: none !important;
}
.box_head::before{
        content: '';
    display: block;
    position: absolute;
    top: 14px;
    left: 0;
    background-color: #1890FF;
    width: 2px;
    height: 22px;
}
.box_head{
      position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #1890FF;
    -moz-text-align-last: left;
    text-align-last: left;
    padding-left: 18px;
}
.box{
      width: 100%;
      background: #fff;
      margin-bottom: 16px;
}
.home{
    /* background-color: #fff; */
    height: 100%;
    min-width: 1000px;
}
</style>
