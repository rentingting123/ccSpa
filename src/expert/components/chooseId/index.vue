<template>
    <div class="sourch">
        <Select :value="cId" placeholder="请选择赛项" style="min-width:160px;">
            <Option v-for="(item) in compData" :value="item.id" :key="item.id" @click.native="cIdChanges(item)">{{item.name}}</Option>
        </Select>
        <Select :value="rowId" placeholder="请选择赛段" style="min-width:160px;margin-left:15px;">
            <Option v-for="(item) in rowidData" :value="item.rowId" :key="item.rowId" @click.native="rowIdChanges(item)">{{item.rowName}}</Option>
        </Select>
    </div>

</template>

<script>
export default {
    props: {
        rowIdChange: Function,
        cIdChange: Function,
        rowId: [String, Number],
        cId: [String, Number]
    },
    data(){
        return{
            compData: [],
            rowidData: [],
        }
    },
    created(){
        let compId = this.$webapi.getlocal("compId")
        this.getCompChild(compId)
    },
    methods:{
        // 获取竞赛列表
        getCompChild (competitionId) {
            let data={
                competitionId: competitionId
            }
            this.$api.get('web/competition/childsReviewCompetition',data).then(reset => {
                if (reset.code == 0) {
                    this.compData=reset.data
                    if (this.compData.length > 0) {
                        let _compData = this.compData[0]
                        if(this.cId){
                            console.log(this.cId,this.compData)
                            _compData = this.compData.filter(a=>a.id == this.cId)[0]
                            if(this.rowId) _compData.rowId = this.rowId
                        }
                        this.cIdChanges(_compData)
                    }
                }else {
                    this.$netcode.getApiCode(reset)
                }
            })
        },
        // 赛段
        rowIdChanges(e){
            this.rowIdChange && this.rowIdChange(e)
        },
        // 赛项
        async cIdChanges(e){
            this.cIdChange && this.cIdChange(e)
            this.$store.commit("selComptitionName",e.name)
            this.$webapi.savelocal("competitionName",e.name)
            this.getRowId(e.id)
        },

        getRowId(id){
            let data = {
                competitionId: id || this.cId
            }
            this.$api.get('web/competition/rowIds',data).then(res =>{
                if(res.code == 0){
                    this.rowidData = res.data || []
                }else{
                    this.$netcode.getApiCode(res)
                }
            })
            
        },
    }
}
</script>

<style lang='less' scoped>
.sourch{
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
</style>