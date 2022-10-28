<template>
    <div class="expert">
        <el-button type="primary" size="small" @click="isLogin" round>评审申请</el-button>
        <el-dialog
            title="请先登陆"
            v-if="login"
            :visible.sync="login"
            :append-to-body="true"
            :close-on-click-modal="false" 
            :close-on-press-escape="false"
            width="700px"
            >
            <Login :close="close"/>
        </el-dialog>

        <el-dialog
            class="persubmit"
            :visible.sync="message"
            :append-to-body="true"
            :close-on-click-modal="false" 
            :close-on-press-escape="false"
            width="800px"
            >
                <!-- <h1 class="">全国数学建模大赛浙江赛区学校报名信息提交</h1> -->
                <el-form class="form" ref="form" :model="form" label-width="120px">
                    <el-form-item label="学校代码" prop="schoolCode" :rules="{required: true, message: '学校代码不能为空', trigger: 'blur'}">
                        <el-input v-model="form.schoolCode"></el-input>
                    </el-form-item>
                    <el-form-item label="学校名称" prop="schoolName"  :rules="{required: true, message: '学校名称不能为空', trigger: 'blur'}">
                        <el-input v-model="form.schoolName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="专家名称1" prop="name1" :rules="{required: false, message: '专家名称1不能为空', trigger: 'blur'}">
                        <el-input v-model="form.name1"></el-input>
                    </el-form-item>
                    <el-form-item label="专家手机号1" prop="tel1" :rules="{required: false, message: '专家手机号1不能为空', trigger: 'blur'}">
                        <el-input v-model="form.tel1"></el-input>
                    </el-form-item>
                    <el-form-item label="专家职称1" prop="job1" :rules="{required: false, message: '专家职称1不能为空', trigger: 'blur'}">
                         <el-select v-model="form.job1" placeholder="请选择">
                            <el-option v-for="item in jobOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评阅题目号1" prop="number1" :rules="{required: false, message: '评阅题目号1不能为空', trigger: 'blur'}">
                        <el-select v-model="form.number1" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专家名称2" prop="name2" :rules="{required: false, message: '专家名称2不能为空', trigger: 'blur'}">
                        <el-input v-model="form.name2"></el-input>
                    </el-form-item>
                    <el-form-item label="专家手机号2" prop="tel2" :rules="{required: false, message: '专家手机号1不能为空', trigger: 'blur'}">
                        <el-input v-model="form.tel2"></el-input>
                    </el-form-item>
                    <el-form-item label="专家职称2" prop="job2" :rules="{required: false, message: '专家职称2不能为空', trigger: 'blur'}">
                           <el-select v-model="form.job2" placeholder="请选择">
                            <el-option v-for="item in jobOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评阅题目号2" prop="number2" :rules="{required: false, message: '评阅题目号2不能为空', trigger: 'blur'}">
                        <el-select v-model="form.number2" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="专家名称3" prop="name3" :rules="{required: false, message: '专家名称3不能为空', trigger: 'blur'}">
                        <el-input v-model="form.name3"></el-input>
                    </el-form-item>
                    <el-form-item label="专家手机号3" prop="tel3" :rules="{required: false, message: '专家手机号1不能为空', trigger: 'blur'}">
                        <el-input v-model="form.tel3"></el-input>
                    </el-form-item>
                    <el-form-item label="专家职称3" prop="job3" :rules="{required: false, message: '专家职称3不能为空', trigger: 'blur'}">
                            <el-select v-model="form.job3" placeholder="请选择">
                            <el-option v-for="item in jobOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="评阅题目号3" prop="number3" :rules="{required: false, message: '评阅题目号3不能为空', trigger: 'blur'}">
                        <el-select v-model="form.number3" placeholder="请选择">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" :loading="loadingPre" @click="message=false" >取 消</el-button>
                    <el-button type="primary" :loading="loadingPre" @click="submit('form')" > 确 认</el-button>
                </div>
        </el-dialog>
    </div>
</template>

<script>
import network from "@/api/index";
import Login from "./login";
import {getToken,removeToken} from '@@/utils/oauth'
export default {
    components:{
        Login
    },
    data(){
        return{
            message: false,
            login: false,
            loadingPre: false,
            form: {},
            options:[
                {
                    value: 'a',
                    label: 'A'
                },
                {
                    value: 'b',
                    label: 'B'
                },
                {
                    value: 'c',
                    label: 'C'
                },
                {
                    value: 'd',
                    label: 'D'
                },
                {
                    value: 'e',
                    label: 'E'
                },
            ],
            jobOpt:[
                {
                    value: '教授',
                    label: '教授'
                },
                {
                    value: '副教授',
                    label: '副教授'
                },
                    {
                    value: '讲师',
                    label: '讲师'
                },
            ]
        }
    },
    methods:{ 
        async isLogin(){
            let login = getToken();
            if(!login){
                this.login = true
            }else{
                this.user = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"));
                let _school = await network.getSchoolApply({data:{
                    type:5,
                    userId:this.user.id,
                    }})
                if(_school=='error') return;
                _school = _school ? _school : {}
                _school.schoolName = _school.schoolName?_school.schoolName:this.user.school
                this.form = _school;
                this.message = true;
                
            }
        },
         submit(name){
            this.$refs[name].validate(async (valid)=>{
                if(!valid) return;
                this.loadingPre = true;
                let res = await network.setSchoolApply({data:{
                    type:5,
                    userId:this.user.id,
                    html:this.form
                }})
                this.loadingPre = false;
                if(res=='error') return;
                this.message = false;
            })
        },
        close() {
            this.login = false;
            this.user = localStorage.getItem("userInfo")&&JSON.parse(localStorage.getItem("userInfo"));
            this.form.schoolName = this.user.school
            this.message = true;
            this.isLogin();
        },
        outLogin(){
           removeToken()
            localStorage.removeItem("defaultUserId");
            localStorage.removeItem("userInfo");
            this.message = false;
        }
    }
}
</script>

<style lang="less" scoped>
.expert{
    margin-top: 25px !important;
    margin-left: 179px !important;
}
</style>