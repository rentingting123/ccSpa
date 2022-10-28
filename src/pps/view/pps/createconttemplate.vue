<template>
      <div class="home">
            <el-form ref="form" :rules="rules" :model="formData" label-width="140px">
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
                              <el-form-item label="重要程度：" prop="priority">
                                 <el-select :disabled="disabled" v-model="formData.priority" placeholder="请选择">
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
                                     <el-select :disabled="disabled" filterable  @change="duanxinchange" v-model="formData.templateType">
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
                             <el-form-item label="选择内容模板：" prop="contentTemplateId">
                                     <el-select :disabled="disabled" filterable  @change="duanxinchange" v-model="formData.contentTemplateId">
                                      <el-option v-for="item in duanxinlist" 
                                      :key="item.templateCode || item.id" 
                                      :label="item.templateName || item.templateTitle"
                                      :value="item.templateCode || item.id"
                                      ></el-option>
                                    </el-select>
                              </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-col :span="12">
                               <el-form-item label="推送内容标题:">
                                     <!-- :disabled="formData.pushChannel == 2" -->
                                 <el-input disabled v-model="formData.contenttitle"></el-input>
                               </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-form-item label="推送内容:">
                             <!-- :disabled="formData.pushChannel == 2" -->
                        <el-input  disabled type="textarea"  v-model="formData.templateContent"></el-input>
                        </el-form-item>
                 </el-row>
            </div>
            </div>
            <div class="box">
                   <div class="box_head">
                        目标用户
                  </div>
                  <div style="padding:16px">
                    <el-row >
                        <el-col :span="4">
                          <el-form-item label-width="120px" label="选择标签：" prop="classificationId">
                              <el-select @change="getchild" :disabled="disabled" v-model="formData.classificationId" placeholder="请选择">
                                      <el-option
                                        v-for="item in tabslist"
                                        :key="item.id"
                                        :label="item.classificationName"
                                        :value="item.id">
                                      </el-option>
                                    </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                           <el-form-item label-width="20px" prop="labelId">
                              <el-select :disabled="disabled" v-model="formData.labelId" placeholder="请选择">
                                     <el-option  
                                        v-for="item in tabschildlist"
                                        :key="item.id"
                                        :label="item.labelName"
                                        :value="item.id"></el-option>
                                    </el-select>
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
                                <el-radio-group :disabled="disabled" v-model="formData.pushType">
                                  <el-radio v-for="item in pusherlist" :key="item.value" :label="item.value">{{item.label}}</el-radio>
                                </el-radio-group>
                              </el-form-item>
                        </el-col>
                        <el-col :span="4">
                               <el-form-item label="" label-width="0">
                                      <el-date-picker
                                      :disabled="disabled"
                                      v-if="formData.pushType == 1"
                                      v-model="formData.pushTime"
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
                      <el-button type="primary" v-if="!$route.query.id" @click="submit">确认提交</el-button>
                      <el-button type="primary" v-if="disabled" @click="$router.go(-1)">返回</el-button>
                      <el-button type="primary" v-if="$route.query.id && !disabled" @click="submit(1)">提交编辑</el-button>
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
            rules:{
                  pushChannel:[
                        {
                          required: true,
                          message: '请选择推送渠道',
                          trigger: 'blur'
                        }
                  ],
                  priority:[
                        {
                          required: true,
                          message: '请选择重要程度',
                          trigger: 'blur'
                        }
                  ],
                  // contentTemplateId:[
                  //       {
                  //             required:true,
                  //             message:'请选择内容模板',
                  //             trigger:'blur'
                  //       }
                  // ],
                  classificationId:[
                        {
                              required:true,
                              message:'请选择标签分类',
                              trigger:'blur'
                        }
                  ],
                  classificationId:[
                        {
                              required:true,
                              message:'请选择标签',
                              trigger:'blur'
                        }
                  ],
                  pushType:[
                        {
                              required:true,
                              message:'请选择推送时间',
                              trigger:'blur'
                        }
                  ]
            },
            duanxinlist:[],
            formData:{
                  mesType:'2',
                  userNum:undefined,
            contentTemplateId : undefined,
            contenttitle : undefined,
            templateContent: undefined,
             pushChannel:1,
             labelId:undefined
            },
            tabslist:[],
            tabschildlist:[],
            dengyulist:[
              {
                        label:'等于',
                        value:0,
                  },
                  {
                        label:'不等于',
                        value:1,
                  },
                  {
                        label:'包含',
                        value:2,
                  },
                  {
                        label:'不包含',
                        value:3,
                  },
            ],
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
            ],userlist:[
                   {
                        label:'年级',
                        value:0
                  },
                  {
                        label:'性别',
                        value:1
                  },
                  {
                        label:'专业',
                        value:1
                  },
                  {
                        label:'角色',
                        value:1
                  },
            ],
            tablist:[
                  {
                        label:'分类1',
                        value:0
                  },
                  {
                        label:'分类2',
                        value:1
                  },
                  {
                        label:'分类3',
                        value:2
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
      if(this.$route.query.del){
            this.disabled = true
      }
      if(this.$route.query.id){
            this.getdetial()
      }
      this.getduanxinlist()
      this.getDicts()
      this.gettabs()
},
methods:{
      async getdetial(){
            let res = await network.scenedetail({data:{
                  id:this.$route.query.id
            }})
            if(res == 'error') return
            if(res.priority){
                  res.priority = res.priority*1
            }
            this.formData = res
            this.duanxinchange(res.contentTemplateId)
      },
      async peoplenum(){
           let res = await network.estimatebyid({data:{
                 id:this.formData.labelId
           }})
           if(res == 'error') return
           this.formData.userNum = res
      },
      getchild(){
            this.formData.labelId = undefined
            this.tabslist.forEach(item => {
                  if(item.id == this.formData.classificationId){
                        this.tabschildlist = item.gtUserLabel
                  }
            })
      },
      async gettabs(){
            let res = await network.labelciflist()
            if(res == 'error') return
            this.tabslist = res
      },
      async getDicts(){
             let dics = await network.getDicts('template_type')
            if(dics == 'error') return
            // console.log(dics);
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
            this.formData.contentTemplateId = undefined
            this.formData.contenttitle = undefined
            this.formData.templateContent = undefined
            if(this.formData.pushChannel !== 2){
                  let res = await network.contentlist()
                  if(res == 'error') return
                  this.duanxinlist = res.rows
            }else{
                  let res = await network.selectmessage()
                  if(res == 'error') return
                  this.duanxinlist = res
            }
      },
      async submit(type){
            this.$refs.form.validate(async (valid)=>{
                  if(!valid) return
                  if(this.formData.pushChannel !== 2){
                        if(type == 1){
                              let res = await network.updatescene({data:this.formData})
                               if(res == 'error') return
                              this.$message.success(res)
                              this.$router.go(-1)
                        }else{
                              let res = await network.addscene({data:this.formData})
                               if(res == 'error') return
                              this.$message.success(res)
                              this.$router.go(-1)
                        }
                  }else{
                        let params = {
                              pushChannel:this.formData.pushChannel,
                              priority:this.formData.priority,
                              classificationId:this.formData.classificationId,
                              labelId:this.formData.labelId,
                              pushType:this.formData.pushType,
                              cron:this.formData.cron,
                              mesType:'2',
                              gtContentTemplate:{
                                    templateType:this.formData.templateType,
                                    templateTitle:this.formData.contenttitle,
                                    templateContent:this.formData.templateContent,
                                    noteId:this.formData.contentTemplateId,
                              }
                        }
                        let res = await network.addnote({data:params})
                        if(res == 'error') return
                        this.$router.go(-1)
                        this.$message.success('发送成功')
                  }
            })
            
      }
}
}
</script>

<style scoped>
.closed{
      font-size: 19px;
    height: 28px;
    line-height: 42px;
    text-align-last: center;
    cursor: pointer;
    width: 47px;
    display: inline-block;
}
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
.boxx{
      box-sizing: border-box;
  width: 100%;
  border: 1px solid rgb(221, 221, 221);
  text-align-last: left;
  padding: 16px;
margin-bottom:20px;
}
.boxtitle{
  font-weight: 800;
  margin-bottom: 20px;
}
</style>
