<template>
    <div class="edit" >
        <el-button type="primary" v-if="!data" size="mini" @click="toEdit">新增角色</el-button>
        <el-button type="primary" v-else size="mini" @click="toEdit">修改</el-button>

        <el-dialog :visible.sync="show" title="新增/修改角色" width='400px' :close-on-click-modal='false'>
            <el-form ref="obj" :model="obj" :rules="rules" label-width="80px" >
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="obj.name"  />
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
                description: ''
            },
            rules:{
                name: [{required: true, message: '角色名不能为空', trigger: 'blur'}],
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
                let res = await network.addRole({data:this.obj})
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