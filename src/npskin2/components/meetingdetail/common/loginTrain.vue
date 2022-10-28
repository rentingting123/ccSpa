<template>
    <el-dialog title="培训报名" :visible.sync="dialogVisible" :append-to-body="true" width="60%">
        <el-form ref="form1" :model="form1" label-width="160px">
            <el-form-item v-for="list in lists1" :key="list.value" :label="list.name" :prop="list.value+'@'+list.name"
            :rules="[{ required: list.flag, message: `${list.name}不能为空`, trigger: 'blur' }]">
                <el-input v-model="form1[list.value+'@'+list.name]" :disabled="list.value=='phone' || list.value=='name'"></el-input>
            </el-form-item>
            
        </el-form>
        <el-form ref="form2" :model="form2" label-width="160px">
            <el-form-item v-for="list in lists2" :key="list.value" :label="list.name" :prop="list.value+'@'+list.name"
                :rules="[{ required: list.flag, message: `${list.name}不能为空`, trigger: 'blur' }]">
                <el-input v-model="form2[list.value+'@'+list.name]"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit('form1','form2')">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import network from '@/api/index'
import { getUserInfo } from '@@/utils/commons'
export default {
    props:['id','close'],
    data(){
        return{
            dialogVisible: true,
            lists1: [],
            lists2: [],
            form1:{},
            form2:{},
            user:{}
        }
    },
    created(){
        this.user = getUserInfo();
        this.init();
    },
    methods:{
        async init(){
            let res = await network.selectSignupFieldList({data:{
                id: this.id
            }});
            if(res=='error') return;
            for(let i in res){
                if(res[i].type==1){
                    this.lists1.push(res[i])
                    // 单独操作姓名电话
                    if(res[i].value =='phone'){
                        this.form1[res[i].value+'@'+res[i].name] = this.user && this.user.contactPhone
                    }
                    if(res[i].value =='name'){
                        this.form1[res[i].value+'@'+res[i].name] = this.user && this.user.idcardName
                    }
                }else{
                    this.lists2.push(res[i])
                }
            }
        },
        submit(formName1, formName2){
            this.$refs[formName1].validate((valid) => {
                if(!valid) return;
                this.$refs[formName2].validate((valid) => {
                    if(!valid) return;
                    this.$confirm('提交后不可修改，确定提交吗', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async ()=>{
                        let obj = {
                            trainingId: this.id
                        }
                        Object.keys(this.form1).forEach((key)=>{
                            let keys = key.split("@");
                            obj[keys[0]] = this.form1[key]
                        })
    
                        let arr = []
                        Object.keys(this.form2).forEach((key)=>{
                            let keys = key.split("@");
                            arr.push({
                                name: keys[1],
                                keyValue: keys[0],
                                value: this.form2[key],
                            })
                        })
                        obj.customDetails = arr
    
                        let res = await network.trainingSignUp({data:obj});
                        if(res=='error') return;
                        this.dialogVisible = false
                    })
                })
            })
        }
    },
    watch:{
        dialogVisible(val){
            if(!val){
                return this.close && this.close();
            }
        }
    }
}
</script>