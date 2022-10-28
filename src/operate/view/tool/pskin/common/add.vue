<template>
    <div>
         <Modal v-model="show" title="省皮肤新增" footer-hide>
            <Form ref="formItem" class="form" :model="formItem" :rules="rules" :label-width="100">
                <FormItem label="省份" prop="competitionId">
                    <Select v-model="formItem.competitionId" @on-change="changeCompetition" filterable remote :remote-method="remoteMethod1" style="width:200px">
                        <Option v-for="option in competitionList" :value="option.provinceId" :key="option.provinceId">{{option.province}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="名称" prop="name">
                   <Input v-model="formItem.name" ></Input>
                </FormItem>
                <FormItem label="定制服务" prop="theme">
                   <Select v-model="formItem.theme" @on-change="changeSkin" style="width:200px">
                        <Option v-for="item in serviceList" :value="item.theme" :key="item.theme">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="皮肤地址" prop="url">
                   <Input v-model="formItem.url"  >
                    <span slot="prepend">http://</span>
                   </Input>
                </FormItem>
                <FormItem label="adminToken" prop="adminToken">
                   <Input v-model="formItem.adminToken"  ></Input>
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
                    { required: true, message: '名称不能为空', trigger: 'blur' }
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
            let res = await network.getSkinList({data:{level:2}});
            if (res == "error") return;
            this.serviceList = res;
        },
        async getCompetitionList(name=''){
            //替换省份选择
            let res = await network.getProvinceList1({data:{
                name:name
            }});
            if(res=='error') return;
            this.competitionList = res
        },
        async changeCompetition(val){
            if(!val) return;
            let form = await network.getDomain({data:{id:val}});
            if(form=='error') return this.formItem.competitionId = '';
            if(form){
                this.$Message.warning('该竞赛已有皮肤');
                return this.formItem.competitionId = '';
            }

            for(let i in this.competitionList){
                if(this.competitionList[i].provinceId == val){
                    this.$set(this.formItem,"name", this.competitionList[i].province+'高校学生竞赛与教师发展数据平台')
                }
            }
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
        remoteMethod1(val){
            this.getCompetitionList(val)
        },
        add(name){
            if(!this.formItem.competitionId) return this.$Message.warning('省份不能为空');
             this.$refs[name].validate(async (valid) => {
                 if(!valid) return;
                 let res = await network.addDomain({data:{
                     ...this.formItem,
                     type:2,
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

