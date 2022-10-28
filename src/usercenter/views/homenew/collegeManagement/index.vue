<template>
    <div class="collegemanagement">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <BreadcrumbItem>系统管理</BreadcrumbItem>
                    <BreadcrumbItem>学院管理</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>学院管理</h2>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="search">
                <Input v-model="name" placeholder="搜索" style="width: 300px" />
                <Button type="primary" @click="addIndexShow=true">创建学院</Button>
            </div>
            <p class="totalnums">当前总计：{{data && data.length || 0}}所学院、共{{majors && majors.length || 0}}个专业</p>
            <div class="table">
                <Table border :columns="columns" :data="data">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" @click="toRename(row.id)">重命名</Button>
                        <Button type="primary" size="small" @click="toMajor(row.id)">专业管理</Button>
                        <Button type="primary" size="small" @click="update(row.userId)">重置密码</Button>
                        <Button type="primary" size="small" @click="del(row)">删除</Button>
                    </template>
                </Table>
            </div>
        </div>
        <!-- 创建学院 -->
        <addIndex v-if="addIndexShow" :close='close'/>
        <!-- 重置密码 -->
        <editPassword v-if="passwordEditShow" :close="close" :importEditData="importEditData"/>
        <!-- 重命名 -->
        <rename v-if="renameShow" :close="close" :importEditData="importEditData"/>
        <!-- 专业管理 -->
        <major v-if="majorShow" :majors='majors' :close='close' :id="importEditData"/>

    </div>
</template>

<script>
import {getUserInfo} from '@/common/common'
import addIndex from './common/addIndex'
import editPassword from './common/editPassword'
import rename from './common/rename'
import major from './common/major'
export default {
    components:{
        addIndex,
        editPassword,
        rename,
        major,
    },
    data(){
        return{
            name: '',
            columns: [
                    {
                        title: '学院名称',
                        key: 'name',
                    },
                    {
                        title: '账号名称',
                        key: 'loginName',
                    },
                    
                    {
                        title: '操作',
                        slot: 'action',
                    }
            ],
            data: [],
            addIndexShow: false,
            passwordEditShow: false,
            renameShow: false,
            majorShow: false,
            majors: [],

        }
    },
    created(){
        this.init();
        this.getMajors();
    },
    methods:{
        close(flag){
            this.addIndexShow = false;
            this.passwordEditShow = false;
            this.renameShow = false;
            this.majorShow = false
            this.init()
            if(flag){
                this.getMajors();
            }
        },
        getMajors(){
            let user = getUserInfo();
            let school = user && user.school || ''
            this.$api.get('/Admin/selectMajor',{
                schoolName: school,
                limit: 100000
            }).then(res=>{
                this.majors = []
                if(res.code==0){
                    this.majors = res.data || []
                }
            })
        },
        init(){
            let data = {}
            if(this.name) data.collegeName = this.name
            this.$api.get('/usercenter/school/getSchoolCollege',data).then(res => {
                if(res && res.code==0){
                    this.data = res.data || []
                }
            })
        },
        update(id){
            this.importEditData = id;
            this.passwordEditShow = true
        },
        toRename(id){
            this.importEditData = id;
            this.renameShow = true
        },
        toMajor(id){
            this.importEditData = id;
            this.majorShow = true
        },
        del(row){
            let this_ = this
            this.$Modal.confirm({
                title: "确认要删除该学院信息吗？",
                content: "该学院账号将被注销。删除后无法恢复该学院下的专业。",
                onOk:function(){
                    // todo 删除学院
                    this_.delCollege(row.id)
                },
                onCancel: () => {
                }        
            })
        },
        delCollege(id){
            this.$api.get('/usercenter/school/delCollege',{
                collegeId: id
            }).then(res=>{
                if(res.code==0){
                    this.$Message.success('删除成功');
                    this.init();
                }
            })
        }
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            vm.$store.commit('tabNumExpert','0-6')
        })
    },
}
</script>

<style lang='less' scoped>
.collegemanagement{
    .main{
        padding: 13px 22px;
        .search{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .totalnums{
            font-size: 14px;
            font-weight: 500;
            color: #4A4A4A;
            line-height: 20px;
            margin: 14px 0 13px;
        }
        .table{
            background: #fff;
            padding: 17px;
        }

    }
}
</style>