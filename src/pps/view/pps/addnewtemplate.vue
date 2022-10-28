<template>
  <div class="home">
      <div class="box_head">
          {{titles}}
      </div>
      <div class="bodys">
         <div class="wrapper">
              <div style="width:48%">
              <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                   <el-form-item label="模板类型：" prop="templateType">
                      <el-select v-model="form.templateType" placeholder="请选择模板类型">
                        <el-option
                        v-for="item in mobanlist"
                         :label="item.dictLabel"
                         :key="item.dictValue"
                          :value="item.dictValue"></el-option>
                      </el-select>
                    </el-form-item>
                <el-form-item label="模板标题：" prop="templateTitle">
                  <el-input v-model="form.templateTitle"></el-input>
                </el-form-item>
                <el-form-item label="模板内容：" prop="templateContent">
                     <div>
                          <el-button v-for="att in attrs" size="mini" :key="att.id" @click="addattr(att.dictValue)" round>{{att.dictLabel}}</el-button>
                     </div>
                    <el-input ref="tempContent" v-model="form.templateContent" show-word-limit maxlength="500" minlength="0"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button v-if="!bianji" type="primary" @click="submit">保存</el-button>
                    <el-button v-if="bianji" type="primary" @click="submit(1)">保存修改</el-button>
                </el-form-item>
              </el-form>
          </div>
          <div style="width:48%">
              <div style="margin-bottom:25px;font-size:20px">模板内容预览：</div>
              <div class="shuoming">
                  <div style="    margin-bottom: 20px;">填写说明</div>
                  <div>
                      {{form.templateContent}}
                  </div>
              </div>
          </div>
         </div>
         <div class="box">
             <div >
                 填写说明
             </div>

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.
         </div>
      </div>
  </div>
</template>

<script>
import network from "@/pps/api/index";
export default {
data(){
    return{
        attrs:[],
        rules:{
            templateType:[
                {
                    required:true,
                    message:'请选择模板类型',
                    trigger:'blur'
                }
            ],
            templateTitle:[
                {
                    required:true,
                    message:'请输入模板标题',
                    tirgger:'blur'
                }
            ],
            templateContent:[
                {
                    required:true,
                    message:'请输入模板内容',
                    tirgger:'blur'
                }
            ]
        },
        titles:'新增消息模板',
        bianji:false,
        form:{
            templateContent:''
        },mobanlist:[]
    }
},
async created(){
    this.getDicts()
    if(this.$route.query.id){
        this.bianji = true
        this.titles = '编辑消息模板'
        this.getditial()
    }
     let attrs = await network.getDicts('note_fields')
      if(attrs=='error')return 
      this.attrs = attrs
},
methods:{
    addattr(attr){
      this.form.templateContent += `\$\{${attr}\}`
      this.$nextTick(()=>{
                this.$refs.tempContent.focus()
            })
    },
    async getditial(){
        let res = await network.contemdetail({
            data:{
                id:this.$route.query.id
            }
        })
        if(res == 'error') return
        this.form = res
    },
    async submit(type){
        this.$refs.form.validate(async (valid) => {
            if(!valid) return
            if(type == 1){
                let res = await network.updatecontent({data:
                 this.form
             })
             if(res == 'error') return
             this.$message.success('操作成功！')
             this.$router.go(-1)
            }else{
                let res = await network.addcontent({data:
                 this.form
                 })
                 if(res == 'error') return
                 this.$message.success('操作成功！')
                 this.$router.go(-1)
            }
        })

         
    },
     async getDicts(){
             let dics = await network.getDicts('template_type')
            if(dics == 'error') return
            this.mobanlist= dics
      },
}
}
</script>

<style scoped>
.shuoming{
    padding: 20px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
}
.wrapper{
    display: flex;
    justify-content: space-between;
    
}
.box{
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    background-color: #f7f7f7;
}
.bodys{
    padding: 20px;
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
.home{
    background-color: #fff;
    height: 100%;
    text-align-last: left;
    min-width: 1000px;
}
</style>