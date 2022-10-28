<template>
    <div class="experts">
        <Row style="margin-bottom:15px;" :gutter="16">
            <Col :span="12">
                <Input v-model="searchName" search placeholder="请输入编号或学校关键字" @on-change="handleSearch" />
            </Col>
            <Col :span="12">
                <Select v-model="poolGroupName" clearable filterable placeholder="请选择分组" @on-change="list">
                    <Option v-for="(item) in filterTeam" :value="item.label" :key="item.value">{{item.label}}</Option>
                </Select>
            </Col>
        </Row>
        <Row>
            <Col :span="24" style="text-align:center;max-height:420px;overflow-y:scroll;">
                <Table :columns="columnsdata" :data="objArr" @on-selection-change="selectChange" :loading='loading'>
                    <template slot="poolGroupName" slot-scope="{ row }">
                        {{row.poolGroupName || '默认分组'}}
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
            poolGroupName: '全部',
            searchName: '',
            idList:[],//选择组成员
            columnsdata: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center',
                },
                {
                    title: '作品编号',
                    align: 'center',
                    minWidth: 100,
                    key: 'id',
                },
                {
                    title: '学校',
                    align: 'center',
                    minWidth: 100,
                    key: 'school',
                },
                {
                    title: '作品组名',
                    align: 'center',
                    minWidth: 100,
                    slot: 'poolGroupName',
                }
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
        list(){
            this.loading = true
            this.$api.get('/review/selectPoolList',{
                rowId: this.rowId,
                attachId: this.attachId,
                poolGroupName: this.poolGroupName=='全部' ? null : this.poolGroupName
            }).then(res=>{
                this.loading = false
                if(res.code == 0){
                    this.oldObjArr = res.data
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
                let baseArr = oldarr.map(item=>{
                    return {
                        ...item,
                        '_disabled': item.reviewStatus==1?true:false
                    }
                })
                let arr = this.oldChoose.concat( baseArr.filter(item=>(this.idList.indexOf(item.id)<0)))
                this.objArr = arr;
            }else{
                this.objArr = this.oldChoose
            }
        },
        // 作品组名列表
        getFilterTeam(){
            this.$api.get('review/resource/selectGroupNames',{
                rowId: this.rowId
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
                            label: res.data[i]+'',
                            value: res.data[i]+''
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
            this.$emit('setWorks',{data:this.idList,selectObj:e})
        },
        // 搜索
        handleSearch(){
            let arr = this.oldObjArr.filter(item=>{
                return (item.id+'').indexOf(this.searchName)!= -1 || item.school.indexOf(this.searchName)!= -1
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
