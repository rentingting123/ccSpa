<template>
    <div>
        <Modal v-model="show" title="特殊皮肤编辑" footer-hide>
            <Form ref="formItem" class="form" :model="formItem" :rules="rules" :label-width="100">
                <FormItem label="id" prop="competitionId">{{formItem.competitionId}}</FormItem>
                <FormItem label="名称" prop="name">
                    <Input v-model="formItem.name" ></Input>
                </FormItem>
                <FormItem label="皮肤地址" prop="url">
                    <Input v-model="formItem.url" ></Input>
                </FormItem>
                <FormItem >
                    <Button @click="ok('formItem')" type="primary" :loading="loading">修改</Button>
                    <Button @click="show = false" :loading="loading" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import network  from '@/operate/api/index'
export default {
    props:['formItem','close'],
    data(){
        return{
            show:true,
            loading:false,
            serviceList:[],
            rules:{
                name: [
                    { required: true, message: '竞赛名称不能为空', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '皮肤地址不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
    },
    methods:{
        async ok(name){
            
            if(!this.formItem.competitionId) return this.$Message.warning('省份id不能为空');
           
            this.$refs[name].validate(async (valid) => {
                if(!valid) return;
                this.loading = true;

                let res = await network.operateEdit({data:{
                    ...this.formItem
                }});
                this.loading = false;
                if(res=='error') return;
                this.$Message.success('修改成功');
                this.show = false;
            })
        }
    },
    watch:{
        show(val){
            if(!val){
                return this.close && this.close();
            }
        }
    }

}
</script>

<style lang="less" scoped>
.form{
    width: 80%;
    margin: 20px auto;
}
</style>


