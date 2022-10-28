<template>
    <div class="relation">
        <el-button type="primary" size="mini" @click="toEdit">路由管理</el-button>
        <el-dialog :visible.sync="show" title="路由管理" width='700px' :close-on-click-modal='false'>
            <el-transfer
                filterable
                :filter-method="filterMethod"
                filter-placeholder="请输入路由名称"
                v-model="value"
                :data="items">
            </el-transfer>

            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>

        </el-dialog>
    </div>
</template>

<script>
import network from '@/operate/api'
export default {
    props: ['data', 'lists'],
    data(){
        return{
            id: '',
            show: false,
            value: [],
            filterMethod(query, item){
                return item.label.indexOf(query) > -1;
            },
        }
    },
    computed:{
        items(){
            return this.lists.map(res=>{
                return {
                    label: res.name,
                    key: res.id,
                    id: res.id,
                }
            })
        }
    },
    methods:{
        toEdit(){
            this.show = true;

            if(this.data){
                this.id = this.data.user_id
                this.getValues()
            }
        },
        async getValues(){
            let res = await network.getUserRole({data:{
                userId: this.id
            }});
            if(res=='error') return;
            this.value = res || []
        },
        async submit(){
            let res = await network.addUserRole({data:{
                userId: this.id,
                roles: this.value
            }})
            if(res=='error') return;
            this.$message.success('修改成功')
            this.show = false
        }
    }
}
</script>

<style lang='less' scoped>
.relation{
    display: inline-block;
    vertical-align: top;
}
</style>