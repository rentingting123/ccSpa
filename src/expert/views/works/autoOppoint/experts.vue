<template>
    <div class="experts">
        <Row style="margin-bottom:15px;" :gutter="16">
            <Col :span="12">
                <Input v-model="searchName" search placeholder="请输入姓名或学校关键字" @on-change="handleSearch" />
            </Col>
            <Col :span="12">
                <Select v-model="expertGroupId" clearable filterable placeholder="请选择分组" @on-change="list">
                    <Option v-for="(item) in filterTeam" :value="item.value" :key="item.value">{{item.label}}</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col :span="24" style="text-align:center;max-height:420px;overflow-y:scroll;">
                <Table :columns="columnsdata" :data="objArr" @on-selection-change="selectChange" :loading='loading'>
                    <template slot="expertGroupId" slot-scope="{ row }">
                        {{row.expertGroupId || '默认分组'}}
                    </template>
                </Table>
            </Col>
        </Row>
    </div>
</template>
<script>
import {cloneDeep} from 'lodash'
export default {
    props:["rowId", 'attachId'],
    data () {
        return {
            filterTeam:[], //分组
            expertGroupId: '全部',
            searchName: '',
            idList:[],//选择组成员
            columnsdata: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center',
                },
                {
                    title: '专家姓名',
                    align: 'center',
                    minWidth: 100,
                    key: 'idcardName',
                },
                {
                    title: '该赛段已分配',
                    align: 'center',
                    width: 80,
                    key: 'reviewNum',
                },
                {
                    title: '学校',
                    align: 'center',
                    minWidth: 100,
                    key: 'school',
                },
                // {
                //     title: '专家组名',
                //     align: 'center',
                //     minWidth: 100,
                //     key: 'expertGroupId',
                // },
            ],
            objArr:[],
            oldObjArr: [],
            oldChoose: [],
            loading: false,

        }
    },
    created() {
        this.list();
        this.getFilterTeam();
    },
    methods: {
        list () {
            this.loading = true
            this.$api.post('web/specialist/queryUser',{
                groupId:this.$webapi.getlocal("groupId"),
                rowId: this.rowId,
                expertGroupId: this.expertGroupId=='全部' ? null : this.expertGroupId
            }).then(res=>{
                this.loading = false
                if(res.code == 0){
                    this.oldObjArr = res.data || []
                    this.getObjArr(res.data)
                }else{
                    this.$netcode.getApiCode(res)
                }
            })
        },
        getObjArr(oldarr){
            this.oldChoose = this.oldChoose.map(item=>{
                return {
                    ...item,
                    '_checked': true
                }
            })
            if(oldarr && oldarr.length>0){
                let arr = this.oldChoose.concat( oldarr.filter(item=>(this.idList.indexOf(item.id)<0)))
                this.objArr = arr;
            }else{
                this.objArr = this.oldChoose
            }
        },
        // 作品组名列表
        getFilterTeam(){
            this.$api.get('review/selectExpertGroupIds',{
                groupId: this.$webapi.getlocal("groupId")
            }).then((res)=>{
                if(res.code==0){
                    let arr = [
                        {
                            label: '全部',
                            value: '全部',
                        }
                    ]
                    for(let i in res.data){
                        arr.push({
                            label: res.data[i].groupName+'',
                            value: res.data[i].expertGroupId+''
                        })
                    }
                    this.filterTeam = arr

                }else{
                    this.filterTeam = [
                        {
                            label: '全部',
                            value: '全部',
                        }
                    ]
                    this.$netcode.getApiCode(res)
                }
            })
            
        },
        // 选择数据变化
        selectChange(e){
            this.oldChoose = cloneDeep(e);
            this.idList=[];
            e.forEach((val)=>{
                this.idList.push(val.id);
            })
            this.$emit('setExperts',{data:this.idList,selectObj:e})
        },
        // 搜索
        handleSearch(){
            let arr = this.oldObjArr.filter(item=>{
                return item.idcardName.indexOf(this.searchName)!= -1 || item.school.indexOf(this.searchName)!= -1
            })
            this.getObjArr(arr)
        },

    }
}
</script>

<style lang="less" scoped>
.experts{
    width: 450px;
    text-align: left;
}
</style>