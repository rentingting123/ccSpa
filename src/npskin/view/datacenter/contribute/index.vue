<template>
    <div class="contribute">
        <el-form :label-position="labelPosition" ref="labelPosition" :rules="rules" :inline="true" label-width="80px" :model="formLabelAlign">
            
            <el-form-item label="投稿类型"  style="width:100%;">
                <el-select v-model="type" disabled @change="changeType" placeholder="请选择投稿类型" style="width:100%;">
                    <el-option v-for="op in list" :key="op.type" :label="op.label" :value="op.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title" style="width:100%;">
                <el-input v-model="formLabelAlign.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="上传文件" prop="file" style="width:100%;">
                <upload
                    class="avatar-uploader"
                    :showlist="false"
                    :drag='true'
                    :onSuccess = "coverSuccess"
                    >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </upload>
                <el-input v-model="formLabelAlign.file.name" disabled v-if="formLabelAlign.file" ></el-input>
            </el-form-item>
            <el-form-item label="投稿人" prop="contributor" style="width:45%;">
                <el-input v-model="formLabelAlign.contributor" placeholder="请输入您的姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone" style="width:45%;">
                <el-input v-model="formLabelAlign.phone" placeholder="请输入您的电话"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" style="width:45%;">
                <el-input v-model="formLabelAlign.email" placeholder="请输入您的邮箱"></el-input>
            </el-form-item>
            <el-form-item label="所属高校" prop="school" style="width:45%;">
                <el-input v-model="formLabelAlign.school" placeholder="请输入您的高校"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('labelPosition')">投稿</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import network from '@/api'
import upload from '@@/components/fileUpload/index'
  export default {
    components:{
        upload
    },
    data() {
      return {
        labelPosition: 'top',
        formLabelAlign: {},
        type:this.$route.params.id,
        list:[{
            label:'心路历程（参赛师生感言、感悟等）',
            value:'0',
            type:'心路历程'
        },{
            label:'科教协同（与竞赛相关的学术讲座等）',
            value:'1',
            type:'科教协同'
        },{
            label:'研究论文（与竞赛相关的论文）',
            value:'2',
            type:'研究论文'
        },{
            label:'总结交流（全国、省市分区赛工作总结）',
            value:'3',
            type:'总结交流'
        },{
            label:'媒体社评（有关竞赛的媒体采访、社会和企业等对竞赛的评价等）',
            value:'4',
            type:'媒体社评'
        },{
            label:'竞赛简讯（有关竞赛的报道等)',
            value:'5',
            type:'竞赛简讯'
        }],
        groupId: '',
        rules:{
            title:[{required: true, message: '标题不能为空', trigger: 'blur'}],
            contributor:[{required: true, message: '投稿人不能为空', trigger: 'blur'}],
            phone:[{required: true, message: '电话不能为空', trigger: 'blur'}],
            email:[{required: true, message: '邮箱不能为空', trigger: 'blur'}],
            school:[{required: true, message: '高校不能为空', trigger: 'blur'}],
            //type:[{required: true, message: '请选择投稿类型', trigger: 'blur'}],
            file:[{required: true, message: '请上传文件', trigger: 'blur'}],
        }

      };
    },
    created(){
        this.groupId = localStorage.getItem('groupId');
    },
    methods:{
        changeType(t){
            this.$router.push('/datacenter/contribute/'+t)
        },
        coverSuccess(file,filelist){
            let files = {
                name: filelist.name,
                fileUrl: file.location
            }
            this.$set(this.formLabelAlign, 'file', files)
        },
        submitForm(formName) {
            this.$refs[formName].validate(async (valid) => {
                if (!valid) return;
                let param = {
                    ...this.formLabelAlign,
                    type:this.list[this.type].type,
                    groupId: this.groupId
                }
                let res = await network.npsendcontribute({data:param})
                if(res=='error') return;
                this.$message.success('提交成功，请等待通知');
                this.formLabelAlign = {}
            });
        },
    },
     watch: {
    $route(to, from) {
      if (to.params.id != from.params.id) {
        this.type=to.params.id;
      }
    }
  }
    
  }
</script>

<style lang="less" scoped>
.contribute{
    width: 590px;
    margin: 0 auto;
    text-align: left;
}
</style>