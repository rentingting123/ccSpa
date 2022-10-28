<template>
    <div>
        <el-button @click="toChoose">立即报名</el-button>

        <el-dialog title="选择区域" :visible.sync="dialogVisible"  width="600px">
            <div class="groupId">
                <p v-for="list,index in lists" :key="list.competitionId" >
                    <el-radio 
                        v-model="choose" 
                        :label="list.competitionId" 
                        :disabled="list.isfinish!=1 && list.isfinish!=2" 
                        border 
                        @change="(e)=>{getDetails(e,index)}">{{list.province}}</el-radio>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit1">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="选择类型" :visible.sync="show" :append-to-body='true' width="600px">
            <div class="groupId">
                <p v-for="list,i in childrens" :key="i" >
                    <el-radio v-model="children" :label="list" border >{{list}}</el-radio>
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="show = false">取 消</el-button>
                <el-button type="primary" @click="submit2">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import network from '@/api'
export default {
    data(){
        return{
            dialogVisible: false,
            show: false,
            choose: '',
            chooseIndex: '',
            lists:[],
            children: '',
            childrens: null,
        }
    },
    created(){

    },
    methods:{
        async toChoose(){
            let groupId = localStorage.getItem('groupId')
            let res = await network.npqueryProvince({ data: { groupId: groupId } })
            this.lists = res || []
            this.dialogVisible = true
        },
        async getDetails(e, i){
            let res = await network.npqueryProvinceInfo({data:{
                competitionId: e
            }})
            if(res=='error') return;
            if(res && res.childLabels && res.childLabels.length>0){
                this.childrens = res.childLabels
                this.show = true
            }
            this.chooseIndex = i
            this.$set(this.lists[i], 'childLabels', res && res.childLabels)
        },
        submit1(){
            if(!this.choose){
                this.dialogVisible = false
            }else{
                if(this.lists[this.chooseIndex].childLabels){
                    return this.$message.warning('请选择该赛区中的类型')
                }else{
                    this.$router.push('/apply?competitionId='+this.choose)
                    this.dialogVisible = false
                }
            }
        },
        submit2(){
            if(!this.children){
                return this.$message.warning('请选择类型')
            }else{
                this.$router.push('/apply?competitionId='+this.choose+'&label='+this.children)
                this.show = false
                this.dialogVisible = false
            }
        }
    },
    watch:{
        show(val){
            if(!val) this.children = ''
        },
        dialogVisible(val){
            if(!val) this.choose = ''
        }
    }
}
</script>

<style lang="less" scoped>
p{
    margin: 10px 0;
    padding-left: 30px;
}
.groupId{
    text-align: left;
}
.el-radio.is-bordered+.el-radio.is-bordered{
    margin-left: 0;
}

</style>