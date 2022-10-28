<template>
      <div class="home">
            <el-form ref="form" :rules="rules" :model="formData" label-width="120px">
            <div class="box">
                  <div class="box_head">
                        基础信息
                  </div>
                  <div style="padding:16px">
                  <el-row>
                       <el-col :span="8">
                              <el-form-item label="标签显示名：" prop="labelName">
                                  <el-input :disabled="disabled" v-model="formData.labelName"></el-input>
                              </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-col>
                             <el-form-item label="标签分类：" prop="labelClassification">
                                     <el-select :disabled="disabled" v-model="formData.labelClassification" placeholder="">
                                      <el-option 
                                      v-for="item in classlist"
                                      :key="item.id"
                                      :label="item.classificationName" 
                                      :value="item.id"></el-option>
                                      
                                    </el-select>
                              </el-form-item>
                       </el-col>
                 </el-row>
                 <el-row>
                       <el-col :span="12">
                               <el-form-item label="备注:" prop="remark">
                                  <el-input :disabled="disabled" type="textarea" v-model="formData.remark"></el-input>
                               </el-form-item>
                       </el-col>
                 </el-row>
            </div>
            </div>
             <div class="box">
                   <div class="box_head">
                        标签规则
                  </div>
                  <div style="padding:16px 120px 16px 120px">
                        <div class="user">
                              <div class="user_title">用户属性标签</div>
                          <el-row  v-for="(item,index) in onelist" :key="index">
                              <el-col :span="4">
                                 <el-form-item label-width="20px">
                                     <el-select :disabled="disabled" @change="changelabelType2(item.labelType,index)"  v-model="item.labelType" placeholder="分类">
                                      <el-option 
                                      v-for="item in shuxinglist"
                                      :key="item.dictValue"
                                      :label="item.dictLabel" :value="item.dictValue"></el-option>
                                    </el-select>
                              </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label-width="40px">
                                     <el-select :disabled="disabled" v-model="item.labelCondition" placeholder="关系">
                                      <el-option 
                                      v-for="item in guanxilist"
                                      :key="item.dictValue"
                                      :label="item.dictLabel" :value="item.dictValue"></el-option>
                                    </el-select>
                              </el-form-item>
                              </el-col>
                               <el-col :span="8">
                             <el-form-item label="" label-width="40px">
                                       <el-select :disabled="disabled" v-model="item.labelOption" multiple placeholder="">
                                      <el-option
                                      v-for="item in changelabelTypelist2[index]"
                                      :key="item.dictValue || item"
                                       :label="item.dictLabel || item" :value="item.dictValue || item"></el-option>
                                    </el-select>
                              </el-form-item>
                       </el-col>
                       <el-col :span="2">
                         <el-button  :disabled="disabled" v-if="index == 0 && onelist.length < shuxinglist.length " @click="addlist(1)" type="text">+新增</el-button>
                         <span class="closed" :disabled="disabled" @click="dellist(index,1)" v-else type="text"><i class="el-icon-close"></i></span>
                       </el-col>
                        </el-row>
                          
                        </div>
                        <div class="user">
                              <div class="user_title">用户数据标签</div>
                         <el-row  v-for="(item,index) in twolist" :key="index">
                              <el-col :span="4">
                                 <el-form-item label-width="20px">
                                     <el-select :disabled="disabled" @change="changelabelType(item.labelType,index)"  v-model="item.labelType" placeholder="分类">
                                      <el-option 
                                      v-for="item in shujulist"
                                      :key="item.dictValue"
                                      :label="item.dictLabel" :value="item.dictValue"></el-option>
                                    </el-select>
                              </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                <el-form-item label-width="40px">
                                     <el-select :disabled="disabled" v-model="item.labelCondition" placeholder="关系">
                                      <el-option 
                                      v-for="item in guanxilist"
                                      :key="item.dictValue"
                                      :label="item.dictLabel" :value="item.dictValue"></el-option>
                                    </el-select>
                              </el-form-item>
                              </el-col>
                              
                               <el-col :span="8">
                              <el-form-item label="" label-width="40px">
                                    <el-select :disabled="disabled" v-model="item.labelOption" multiple placeholder="">
                                          <el-option
                                          v-for="item in changelabelTypelist[index]"
                                          :key="item.dictValue || item"
                                           :label="item.dictLabel || item" :value="item.dictValue || item"></el-option>
                                    </el-select>
                              </el-form-item>
                       </el-col>
                       <el-col :span="2">
                             <el-button  :disabled="disabled" v-if="index == 0 && twolist.length < shujulist.length " @click="addlist(2)" type="text">+新增</el-button>
                              <span class="closed" :disabled="disabled" @click="dellist(index,2)" v-else type="text"><i class="el-icon-close"></i></span>
                       </el-col>
                        </el-row>
                        </div>
                        <el-row>
                               <el-form-item style="margin-top:20px" label="查看预估人数：">
                                          <span style="padding: 0 21px;font-size: 14px;">{{formData.userNum}}</span>
                                          <el-button type="primary" :disabled="disabled"  @click="peoplenum">预估人数</el-button>
                                    </el-form-item>
                        </el-row>
                  </div>
            </div>
             <div>
                      <el-button type="" @click="fanhui">取消</el-button>
                      <el-button type="primary" v-if="!$route.query.id" @click="submit(1)">确认提交</el-button>
                      <el-button type="primary" v-if="$route.query.id" @click="submit">确认</el-button>
             </div>
            </el-form>
      </div>
</template>

<script>
import network from "@/pps/api/index";
export default {

data(){
      return{
            onelist:[{
                 labelCondition:'',
                  labelOption:[],
                  ruleType:1,
                  labelType:'' 
            }],
            twolist:[{
                 labelCondition:'',
                  labelOption:[],
                  ruleType:2,
                  labelType:'' 
            }],
            disabled:false,
            rules:{
                  
                  labelName: [{
                    required: true,
                    message: '请输入标签名',
                    trigger: 'blur'
                  }],
                  labelClassification: [{
                    required: true,
                    message: '请输入标签分类',
                    trigger: 'change'
                  }],
                  remark: [{
                    required: true,
                    message: '请输入备注',
                    trigger: 'blur'
                  }],
                  labelName: [{
                    required: true,
                    message: '请输入标签规则',
                    trigger: 'blur'
                  }],
            },
            classlist:[],
            changelabelTypelist2:[],
            changelabelTypelist:[],
            formData:{
                  userNum:undefined,
              labelRuleList:[
                {
                  labelCondition:'',
                  labelOption:[],
                  ruleType:1,
                  labelType:''
                }
              ]
            },
            shuxinglist:[],
             guanxilist:[],
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
            shujulist:[],
            guanjianlist:[],
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
async created(){
     this.getDic()
     this.getDic1()
     this.getDic2()
     this.getDic3()
 let res = await network.ciflist({data:{
      cifType:this.$route.query.type}
})
if(this.$route.query.id){
      this.getdetail()
      
}
if(res == 'error') return
this.classlist = res.rows
},
methods:{
      async getDic2(){
            let dics = await network.getDicts('title_keyword')
            if(dics == 'error') return
            this.guanjianlist = dics
      },
      async getDic3(){
            let dics = await network.getDicts('user_rule_date')
            if(dics == 'error') return
            this.shujulist = dics
      },
      
      async peoplenum(){
            this.formData.labelRuleList = this.onelist.concat(this.twolist)
             this.formData.labelRuleList.forEach(item => {
                   if(Array.isArray(item.labelOption)){
                        item.labelOption = item.labelOption.join(',')
                  }
            })
            let res = await network.estimatesnum({data:{
               labelRule : this.formData.labelRuleList
           }})
           if(res == 'error') return
           this.formData.userNum = res
           this.formData.labelRuleList.forEach(item => {
                        item.labelOption =item.labelOption.split(',')
            })
      },
      async getdetail(){
            this.disabled = true
           let res = await network.labeldetail({data:{
                 id:this.$route.query.id
           }})
           if(res == 'error') return
           res.labelRules.forEach((item,index) => {
                 this.changelabelType2(item.labelType,index)
            //      item.labelOption = item.labelOption?.split(',')
           })
            res.labelRules.forEach((item,index) => {
                  let arr1 = []
                  let arr2 = []
                   if(Array.isArray(item.labelOption)){
                         item.labelOption = item.labelOption?.split(',')
                   }
                 
                 if(item.ruleType == 1){
                       arr1.push(item)
                       this.onelist = arr1
                 }else if(item.ruleType == 2){
                       arr2.push(item)
                       this.twolist = arr2
                 }
           })
           this.$set(this.formData,'labelName',res.labelName)
           this.$set(this.formData,'labelClassification',res.labelClassification*1)
           this.$set(this.formData,'remark',res.remark)
           this.$set(this.formData,'labelRuleList',res.labelRules)
      },
      async changelabelType2(Type,index){
            this.onelist[index].labelOption = undefined
            let res = await network.ruleoption({data:{
                  ruletype:1,
                  type:Type
            }})
            if(res == 'error') return
            this.changelabelTypelist2.splice(index,1,res)
      },
      async changelabelType(Type,index){
            this.twolist[index].labelOption = undefined
            let res = await network.ruleoption({data:{
                  ruletype:1,
                  type:Type
            }})
            if(res == 'error') return
            this.changelabelTypelist.splice(index,1,res)
      },
     async getDic(){
            let dics = await network.getDicts('user_rule_nature')
            if(dics == 'error') return
            this.shuxinglist = dics
      },
       async getDic1(){
            let dics = await network.getDicts('rule_condition')
            if(dics == 'error') return
            this.guanxilist = dics
      },
  fanhui(){
    this.$router.go(-1)
  },
  dellist(index,type){
        if(type == 1){
              this.onelist.splice(index, 1);
        }else{
              this.twolist.splice(index, 1);
        }
  },
  addlist(type){
        if(type == 1){
                  let obj = this.onelist[this.onelist.length-1]
                  if(obj.labelCondition == '' || obj.labelType == '' || obj.labelOption.length == 0){
                        this.$message.error('请将内容属性标签信息填写完整')
                  }else{
                        this.onelist.push({
                           labelCondition:'',
                            labelOption:[],
                            ruleType:1,
                            labelType:'' 
                      })
                  }
              
        }else{
              if(this.twolist.length > 0 ){
                   let obj = this.twolist[this.twolist.length-1]
                  if(obj.labelCondition == '' || obj.labelType == '' || obj.labelOption==''){
                        this.$message.error('请将关键词标签信息填写完整')
                  }else{
                        this.twolist.push({
                           labelCondition:'',
                              ruleType:2,
                              labelOption:[],
                              labelType:'' 
                      })
                  } 
              }else{
                     this.twolist.push({
                           labelCondition:'',
                              ruleType:2,
                              labelOption:[],
                              labelType:'' 
                      })
              }
               
        }
    
  },
 submit(type){
              this.$refs.form.validate(async (valid)=>{
                    if(!valid) return 
                    this.onelist.forEach(item => {
                           if(item.labelCondition == '' || item.labelType == '' || item.labelOption.length <= 0){
                                 this.$message.error('请将标签规则信息填写完整')
                                 return
                           }
                    })
                    this.twolist.forEach(item => {
                           if(item.labelCondition == '' || item.labelType == '' || item.labelOption.length <= 0){
                                 this.$message.error('请将标签规则信息填写完整')
                                 return
                           }
                    })
                    this.formData.labelRuleList = this.onelist.concat(this.twolist)
            this.formData.labelRuleList.forEach(item => {
            //       if(item.labelCondition == '' || item.labelType == '' || item.labelOption.length <= 0){
            //             this.$message.error('请将标签规则信息填写完整1')
            //       }else{
                        if(Array.isArray(item.labelOption)){
                              item.labelOption = item.labelOption.join(',')
                        }
            //       }
                 
            })
            
            let obj =  Object.assign({},{labelType:this.$route.query.type},this.formData)
            if(type == 1){
                  let res = await network.createlabel({data:obj})
                  if(res == 'error'){
                        this.formData.labelRuleList.forEach((item,index) => {
                              item.labelOption = item.labelOption?.split(',')
                        })
                         return
                  }else{
                        this.$message.success('新增成功！')
                        this.$router.go(-1)
                  }
            }else {
                  this.$router.go(-1)
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
.user ::v-deep .el-select{
  width: 100%;
}
.user{
  margin-top: 10px;
border: 1px solid #ccc;
    padding: 20px 0;
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
.user_title{
      padding-left: 20px;
    margin-bottom: 20px;
}
.box{
      width: 100%;
      background: #fff;
      margin-bottom: 16px;
}
.home{
    /* background-color: #fff; */
    height: 100%;
    text-align-last: left;
}
</style>