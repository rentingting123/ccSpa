<template>
    <div class="discipline">
        <h1>客服操作</h1>
        <div>
            <div class="search" >
                <el-input v-model="competitionId" style="width: 300px;" placeholder="请输入竞赛id"></el-input>
                <el-button type="primary" @click="synchrodata" v-loading='loading'>同步数据</el-button>
                <el-button type="primary" @click="updateStatus" v-loading='loading'>竞赛变为进行中</el-button>
                <el-button type="primary" @click="saveCompetitionRank" v-loading='loading'>设置为排行榜竞赛</el-button>
            </div>

            <div class="search">
                <el-input v-model="loginName" style="width: 160px;" placeholder="请输入竞赛登录账号"></el-input>
                <el-input v-model="competitionName" style="width: 300px;" placeholder="请输入新的竞赛名称"></el-input>
                <el-button type="primary" @click="updateCompetitionName" v-loading='loading'>修改竞赛名称</el-button>
            </div>

            <div class="search">
                <el-input v-model="competitionId" style="width: 300px;" placeholder="请输入竞赛id"></el-input>
                <el-input v-model="price" style="width: 160px;" placeholder="请输入金额"></el-input>
                <el-button type="primary" @click="saveCompetitionContractPrice" v-loading='loading'>设置竞赛金额（赋能设置）</el-button>
            </div>
        </div>
        <!-- 发送邮件 -->
        <sendEmail />


    </div>
</template>

<script>
import network  from '@/operate/api/index'
import sendEmail from './sendEmail'
export default {
    components:{
        sendEmail,
    },
    data(){
        return{
            competitionId: '',
            loading: false,
            competitionName: '',
            loginName: '',
            price: '',
        }
    },
    methods:{
        async synchrodata(){
            if(!this.competitionId) return this.$message.warning('请输入竞赛id');
            this.loading = true
            let res = await network.synchrodata({data:{
                competitionId: this.competitionId
            }});
            this.loading = false
            if(res=='error') return;
            this.$message.success('同步成功')
        },
        async updateStatus(){
            if(!this.competitionId) return this.$message.warning('请输入竞赛id');
            this.loading = true
            let res = await network.updateStatus({data:{
                competitionId: this.competitionId
            }});
            this.loading = false
            if(res=='error') return;
            this.$message.success('修改成功')
        },
        async saveCompetitionRank(){
            if(!this.competitionId) return this.$message.warning('请输入竞赛id');
            this.loading = true
            let res = await network.saveCompetitionRank({data:{
                competitionId: this.competitionId
            }});
            this.loading = false
            if(res=='error') return;
            this.$message.success('修改成功')
        },
        async updateCompetitionName(){
            if(!this.competitionName) return this.$message.warning('请输入新的竞赛名称');
            if(!this.loginName) return this.$message.warning('请输入竞赛登录账号');
            this.$Modal.confirm({
                title: "提示",
                content: "修改后该账号下所有名称都会变更，请确认是否更改？",
                onOk: async ()=>{
                    this.loading = true
                    let res = await network.updateCompetitionName({data:{
                        competitionName: this.competitionName,
                        loginName: this.loginName,
                    }})
                    this.loading = false
                    if(res=='error') return;
                    this.$message.success('修改成功')
                },
                onCancel: () => {
                }        
            })
        },
        async saveCompetitionContractPrice(){
            if(!this.competitionId) return this.$message.warning('请输入竞赛id');
            if(!this.price) return this.$message.warning('请输入金额');
            this.loading = true
            let res = await network.saveCompetitionContractPrice({data:{
                competitionId: this.competitionId,
                price:this.price
            }});
            this.loading = false
            if(res=='error') return;
            this.$message.success('修改成功')
        }
    }
}
</script>

<style lang='less' scoped>
.discipline{
    padding: 20px;
    .search{
        margin-top: 20px;
        text-align: left;
    }
}
</style>