<template>
    <div class="edit" >
        <el-button type="primary" v-if="!data" size="mini" @click="toEdit">新增用户</el-button>
        <el-button type="primary" v-else size="mini" @click="toEdit">修改</el-button>

        <el-dialog :visible.sync="show" title="新增/修改用户" width='400px' :close-on-click-modal='false'>
            <el-form ref="obj" :model="obj" :rules="rules" label-width="80px" >
                <el-form-item label="用户名" prop="realname">
                    <el-input v-model="obj.realname" />
                </el-form-item>

                <el-form-item label="登录账号" prop="username">
                    <el-input v-model="obj.username"  />
                </el-form-item>
                
                <el-form-item>
                    <el-button @click="submit('obj')" style="margin-right: 8px">确定</el-button>
                    <el-button type="primary" @click="show=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
import network from "@/operate/api";
export default {
    props: ['close', 'data'],
    data(){
        return{
            show: false,
            obj:{
                username: '',
                realname: ''
            },
            rules:{
                username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
                realname: [{required: true, message: '登录账号不能为空', trigger: 'blur'}],
            }
        }
    },
    methods:{
        toEdit(){
            this.show = true
            if(this.data){
                this.obj = JSON.parse(JSON.stringify(this.data))
            }
        },
        submit(formName){
            this.$refs[formName].validate(async (valid) => {
                if(!valid) return;
                let res = await network.addUser({data:this.obj})
                if(res=='error') return;
                this.$message.success('操作成功')
                this.show = false;
                this.close && this.close()
            })
        }
    }
}
</script>

<style lang='less' scoped>
.edit{
    display: inline-block;
    vertical-align: top;
    margin: 0 10px;
}
</style>