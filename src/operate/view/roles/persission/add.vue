<template>
    <div class="edit" >
        <el-button type="primary" v-if="!data" @click="toEdit">新增路由</el-button>
        <el-button type="primary" size="mini" v-else @click="toEdit">修改</el-button>

        <el-dialog :visible.sync="show" title="新增/修改路由" width='500px' :close-on-click-modal='false'>
            <el-form ref="obj" :model="obj" :rules="rules" label-width="100px" >
                <el-form-item label="权限名" prop="name">
                    <el-input v-model="obj.name"  />
                </el-form-item>
                <el-form-item label="白名单路由" prop="white_urls">
                    <el-input v-model="obj.white_urls" />
                </el-form-item>
                <el-form-item label="权限编码" prop="perm_code">
                    <el-input v-model="obj.perm_code" />
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="obj.description" />
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
                name: '',
                white_urls: '',
                perm_code: '',
                description: ''
            },
            rules:{
                name: [{required: true, message: '权限名不能为空', trigger: 'blur'}],
                white_urls: [{required: true, message: '白名单路由不能为空', trigger: 'blur'}],
                perm_code: [{required: true, message: '权限编码不能为空', trigger: 'blur'}],
                description: [{required: true, message: '描述不能为空', trigger: 'blur'}],
            }
        }
    },
    methods:{
        toEdit(){
            this.show = true
            if(this.data){
                this.obj = JSON.parse(JSON.stringify(this.data))
                this.obj.roleId = this.data.id
            }
        },
        submit(formName){
            this.$refs[formName].validate(async (valid) => {
                if(!valid) return;
                let res = await network.addPersission({data:this.obj})
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