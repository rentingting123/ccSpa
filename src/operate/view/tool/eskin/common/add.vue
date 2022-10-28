<template>
    <div>
         <Modal v-model="show" title="校数据中心新增" footer-hide>
            <Form ref="formItem" class="form" :model="formItem" :rules="rules" :label-width="100">
                <FormItem label="学校" prop="competitionId">
                    <Select v-model="formItem.competitionId" @on-change="changeCompetition" filterable remote :remote-method="getCompetitionList" style="width:200px">
                        <Option v-for="option in competitionList" :value="option.schoolCode" :key="option.schoolCode">{{option.schoolName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="名称" prop="name">
                   <Input v-model="formItem.name"></Input>
                </FormItem>
                <FormItem label="定制服务" prop="theme">
                    <Select v-model="formItem.theme" @on-change="changeSkin" style="width:200px">
                        <Option v-for="item in serviceList" :value="item.theme" :key="item.theme">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="皮肤地址" prop="url">
                    <Input v-model="formItem.url" >
                        <span slot="prepend">http://</span>
                    </Input>
                </FormItem>
                <FormItem label="adminToken" prop="adminToken">
                   <Input v-model="formItem.adminToken" ></Input>
                </FormItem>
                <FormItem >
                    <Button @click="add('formItem')" type="primary" :loading="loading">新增</Button>
                    <Button @click="show=false" :loading="loading" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
import network from '@/operate/api/index'
import util from '@/operate/api/common'
export default {
    props:['close'],
    data(){
        return{
            show:true,
            formItem:{},
            serviceList:[],
            loading:false,
            competitionList:[],
            rules:{
                name: [
                    { required: true, message: '竞赛名称不能为空', trigger: 'blur' }
                ],
                adminToken: [
                    { required: true, message: 'adminToken不能为空', trigger: 'blur' }
                ],
                theme: [
                    { required: true, message: '皮肤类型不能为空', trigger: 'blur' }
                ],
                url: [
                    { required: true, message: '皮肤地址不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created(){
        this.getSkinList();
        this.getCompetitionList();
    },
    methods:{
        // 获取类型
        async getSkinList() {
            // 4 校皮肤 3 国省系列赛 2 省皮肤   1 一体皮肤和老版本皮肤
            let res = await network.getSkinList({data:{level:4}});
            if (res == "error") return;
            this.serviceList = res;
        },
        async getCompetitionList(name=''){
            //替换省份选择
            let res = await network.school({data:{
                name:name,
                limit: 10,
            }});
            if(res=='error') return;
            this.competitionList = res
        },
        async changeCompetition(e){
            if(!e) return;
            let form = await network.getDomain({data:{id:e}});
            if(form=='error') return this.formItem.competitionId = '';
            if(form){
                this.$Message.warning('该学校数据中心已存在');
                return this.formItem.competitionId = '';
            }
            
            // 设置名称
            this.competitionList.map(item =>{
                if(item.schoolCode == e){
                    this.$set(this.formItem, "name", item.schoolName+'数据中心')
                    this.$set(this.formItem, "provinceId", item.provinceId)
                }
            })
            
        },
        changeSkin(e){
            this.serviceList.map(item => {
                if (item.theme == e) {
                    this.formItem.skin = item.urlkey;
                }
            });
            this.formItem.adminToken = this.formItem.adminToken || util.randomChar(10);
            this.formItem.domain = this.formItem.domain || util.randomChar(10);

            if(process.env.NODE_ENV=='production'){
                this.formItem.url = this.formItem.url || this.formItem.domain + '.'+this.formItem.skin+'.moocollege.com'
            }else{
                this.formItem.url = this.formItem.url || this.formItem.domain + '.'+this.formItem.skin+'.mycloudedu.net'
            }
        },
        add(name){
            if(!this.formItem.competitionId) return this.$Message.warning('学校不能为空');
            this.$refs[name].validate(async (valid) => {
                if(!valid) return;
                let res = await network.addDomain({data:{
                    ...this.formItem,
                    type:3,
                }});
                if(res=='error') return;
                this.$Message.success('添加成功')
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

