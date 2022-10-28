<template>
    <div class="expert-detail">
        <div class="expert-detail-read" @click="showDetail">查看详情</div>

        <!-- 评审详情 -->
        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="80%"  style="z-index:1200">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>评审详情</span>
            </p>
            <div>
                <!-- <Input search placeholder="搜索" v-model="searchName" @on-enter="showDetail" style="width: 210px"/> -->
                <div style="width:100%;max-height:420px;overflow-y:scroll;">
                    <Table width="100%" style="margin-top:20px" border :columns="details" :data="detailslist" :loading='loading'>
                        <template slot-scope="{ row }" slot="action"> 
                            <span class="tableAction" @click="remove(row)">移除专家及评分</span>
                        </template>
                    </Table>
                </div>
            </div>
            <div slot="footer">
                <span class="addexpert" @click="addExpertData"><Icon type="ios-add-circle" />增加评审专家</span>
                <Button type="primary" @click="cancel" style="margin-left: 15px">确定</Button>
            </div>
        </Modal>
        
        <addExpert v-if="importShow" :nornalList='nornalList' :importShow='importShow' :importData='importData' @exportData='exportData' :rowId='rowId' :pattern='pattern'/>
        

    </div>
</template>

<script>
import addExpert from './addExpert'
export default {
    components:{
        addExpert
    },
    props:['importData', 'pattern', 'rowId'],
    data(){
        return{
            show: false, //评审详情
            loading: false,
            searchName: '',
            details: [],
            detailslist:[],
            importShow: false,
            nornalList: []
        }
    },
    methods:{
        addExpertData(){
            // if(this.detailslist.length<1){
            //     return this.$Message.warning('请先分配专家')
            // }
            for(let i in this.detailslist){
                this.nornalList.push(this.detailslist[i].id)
            }
            this.importShow = true
        },
        exportData(e){
            this.importShow = e.show;
            if(e.reload){
                this.showDetail()
            }
        },
        showDetail(){
            this.detailslist = []
            this.loading = true
            this.$api.get('/review/resource/selectPoolReviewDetail',{
                poolId: this.importData.id
            }).then(res=>{
                this.loading = false
                if(res.code == 0){
                    this.detailslist = res.data
                    this.setList(res.data)
                }else{
                    this.$netcode.getApiCode(res)
                }
            })
            this.show = true
        },
        coldata(){
            return [
                {
                    title: '姓名',
                    key: 'idcardName',
                    width: 100,
                    fixed: 'left'
                },
                {
                    title: '分数',
                    key: 'score',
                    width: 100,
                    align: 'center',
                },
                {
                    title: '省份',
                    key: 'province',
                    width: 100,
                },
                {
                    title: '手机号',
                    key: 'contactPhone',
                    width: 120,
                },
                {
                    title: '学校',
                    key: 'school',
                    width: 200,
                },
                {
                    title: '院系',
                    key: 'academy',
                    width: 120,
                },
                {
                    title: '专业',
                    key: 'major',
                    width: 120,
                },
                {
                    title: '职务',
                    key: 'jobTitle',
                    width: 100,
                },
                {
                    title: '操作',
                    slot: 'action',
                    width: 200,
                },

            ]
        },
        setList(objArr){
            var j=1
            var arr1=this.coldata();
            objArr.forEach((val,index)=>{
                val.reviewStandardList.forEach((self,nums)=>{
                    if (index==0) {
                        var obj={}
                        if (this.pattern=="1") {
                            obj={
                                align: 'center',
                                key:"attachName",
                                renderHeader:(h,params)=>{
                                    let str=self.attachName+"("+self.weight+"%)"
                                    return h('div', [
                                        h('span',str)
                                    ]);
                                },
                                children:[],
                            }
                        }else{
                            obj={}
                        }
                    }
                    self.reviewScores.forEach((value,num)=>{
                        val["score"+nums+num]=value.score;
                        if (index==0) {
                            if (this.pattern=="1") {
                                let children={
                                    key: 'score',
                                    align: 'center',
                                    minWidth: 200,
                                    renderHeader:(h,params)=>{
                                        let str=value.title+"("+value.weight+"%)"
                                        return h('div', [
                                            h('span',str)
                                        ]);
                                    },
                                    render:(h,params)=>{
                                        var valStr=0
                                        if (params.row['score'+nums+num]) {
                                            valStr=params.row['score'+nums+num]
                                        }
                                        return h('div',[
                                            h('span',valStr)
                                        ])
                                    }
                                }
                                obj.children.push(children)
                            }else{
                                obj={
                                    align: 'center',
                                    minWidth:200,
                                    key: 'score',
                                    renderHeader:(h, params) => {
                                        var valStr=""
                                        valStr=value.title+"("+value.weight+"%)"
                                        return h('div', [
                                            h('span',valStr)
                                        ]);
                                    },
                                    render:(h,params)=>{
                                        var str=0
                                        if (params.row['score'+nums+num]) {
                                            str=params.row['score'+nums+num]
                                        }
                                        return h('div',[
                                            h('span',str)
                                        ])
                                    }
                                }
                                arr1.splice(j,0,obj);
                                j++;
                            }
                        }
                    })
                    if (index==0 && this.pattern=="1") {
                        arr1.splice(j,0,obj);
                        j++;
                    }
                })//reviewStandardList
            })
            this.details = arr1
        },
        cancel(){
            this.show = false
        },
        remove(row){
            this.$Modal.confirm({
                title: '确认要移除该专家及评分吗？',
                content: '删除专家及评分后将不可恢复。',
                onOk:()=>{
                    this.$api.get('/review/resource/delPoolSpecialistInfo',{
                        userId: row.id, //专家id
                        poolId: this.importData.id, //作品id
                    }).then(res=>{
                        if(res.code == 0){
                            this.showDetail()
                        }else{
                            this.$netcode.getApiCode(res)
                        }
                    })
                },
                onCancel: () => {}
            })
        }
    }
}
</script>

<style lang="less" scoped>
.expert-detail{
    padding: 30px 0;
    .expert-detail-read{
        margin: 0 auto;
        color: #2d8cf0;
        cursor: pointer;
    }
}
.tableAction{
    font-size:14px;
    font-weight:400;
    color:rgba(203,82,104,1);
    line-height:20px;
    cursor: pointer;
}
.addexpert{
    float: left;
    font-size: 16px;
    color: #4AA1F2;
    cursor: pointer;
    i{
        margin-right: 5px;
    }
}
</style>