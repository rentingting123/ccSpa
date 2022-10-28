<template>
    <div>
        <Modal  v-model="show"  @on-cancel="show=false" :mask-closable="false" width="700">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>专业管理</span>
            </p>

            <Transfer
                v-if="transferShow"
                :data="data"
                :target-keys="rightData"
                :selected-keys="selectedkeys"
                :list-style="listStyle"
                filterable
                :titles="['专业库', '学院专业']"
                :filter-method="filterMethod"
                style="margin: 0 auto"
                @on-change="handleChange2"
                @on-selected-change='onSelectedChange'>
            </Transfer>
            <div slot="footer">
                <Button type="primary" @click="toAddNewName">新增专业</Button>
                <Button type="primary" @click="submit">确定</Button>
                <Button type="error" @click="show=false" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>

        <Modal v-model="addNewName" @on-cancel="addNewName=false" :mask-closable="false" width="550">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>新建专业</span>
            </p>
            <div style="text-align:center;margin-top:30px;">
                <Form ref="formValidate" :label-width="80" label-position="left" style="text-align:center;">
                    <FormItem label="专业名称" >
                        <Input v-model="newName" placeholder="请填写专业名称"></Input>
                    </FormItem>

                    <FormItem class="footer">
                        <Button type="primary" @click="toAddMajor">确定</Button>
                        <Button type="error" @click="addNewName=false" style="margin-left: 8px">取消</Button>
                    </FormItem>
                </Form>
            </div>
        </Modal>

    </div>
</template>

<script>
import {getUserInfo} from '@/common/common'
export default {
    props: ['majors', 'id', 'close'],
    created(){
        let user = getUserInfo();
        this.school = user && user.school
        this.code = user && user.schoolcolCodeID

        this.$api.get('/usercenter/school/selectMajorByCollege',{
            id: this.id
        }).then(res=>{
            if(res.code==0){
                let arr = []
                res.data.map(item=>{
                    arr.push(item.name.replace(this.school, ''))
                })
                this.rightData = arr
            }
        })
    },
    computed:{
        data:{
            get(){
                let arr = []
                this.majors.map((res,i)=>{
                    arr.push({
                        key: res,
                        label: res,
                    })
                })
                return arr
            },
            set(val){
                this.data = val
            }
        }
    },
    data(){
        return{
            school: '',
            code: '',
            show: true,
            rightData: [],
            selectedkeys: [],
            addNewName: false,
            newName: '',
            listStyle: {
                width: '300px',
                height: '400px'
            },
            transferShow: true
        }
    },
    methods:{
        filterMethod(data, query){
            return data.label.indexOf(query) > -1;
        },
        handleChange2(val){
            this.rightData = val
        },
        submit(){
            this.$api.post('/usercenter/school/saveCollegeMajor',{
                id: this.id,
                majors: this.rightData
            }).then(res=>{
                if(res.code==0){
                    this.$Message.success('提交成功')
                    this.show = false
                }
            })
        },
        toAddNewName(){
            this.newName = ''
            this.addNewName = true;
            this.transferShow = false
        },
        toAddMajor(){
            if(!this.newName) return this.$Message.warning('请填写专业名称')
            this.$api.post('/Admin/insertMajor',{
                code: this.code,
                major: this.newName,
                name: this.school
            }).then(res=>{
                if(res.code==0){
                    this.$Message.success('新增专业成功')
                    this.majors.unshift(this.newName)
                    this.selectedkeys.unshift(this.newName)
                    this.addNewName = false
                    this.transferShow = true
                }
            })
        },
        onSelectedChange(val){
            this.selectedkeys = val
        }
    },
    watch:{
        show(val){
            if(!val) return this.close && this.close(true)
        },
    }
}
</script>

<style lang='less' scoped>

</style>