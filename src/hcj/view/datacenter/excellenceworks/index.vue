<template>
    <div>
        <div class="top">
            <div class="left duoxuan">
                <el-form :model="form"  :inline="true">
                   <div class="kaishi">
                        <div class="lleft">
                        <el-form-item prop="year">
                        <el-cascader v-model="value" placeholder="请选择" @change="competitionsChange" :options="yearList"></el-cascader>
                    </el-form-item>
                    <el-form-item prop="childId">
                         <el-select v-model="form.childId" @change="init()" placeholder="选择参赛类别">
                            <el-option
                                v-for="(item2,index) in cslbList2"
                                :key="index"
                                :label="item2.name"
                                :value="item2.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="awardName">
                        <el-select @change="init()" v-model="form.awardName" placeholder="选择奖项">
                            <el-option label="全部奖项" value=""></el-option>
                            <el-option
                                v-for="item3 in jxList3"
                                :key="item3.id"
                                :label="item3.name"
                                :value="item3.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                   <div class="rright">
                        <el-form-item prop="title">
                        <div class="right">
                             <el-input
                                 v-model="form.title"
                                 placeholder="请输入作品名称、姓名"
                                 @keyup.enter.native="init"
                                 size="mini"
                                 style="width:200px; height: 32px;"
                             >
                                 <i  slot="suffix" @click="init()" class="el-input__icon el-icon-search"></i>
                             </el-input>
                        </div>
                    </el-form-item>
                   </div>
                   </div>
                </el-form>
            </div>
        </div>
        <div v-loading = loading>
            <div v-if="total == 0">暂无数据</div>
            <piclist1 v-else :lists="lists" />
        </div>
        <div class="sysBox" style="text-align:center;margin:20px 0;">
            <el-pagination
                background
                layout="prev, pager, next"
                :hide-on-single-page="true"
                :page-size="form.pageSize"
                :current-page.sync="form.pageNum"
                @current-change="init"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import piclist1 from '@/hcj/view/common/piclist1'
import {setItem, getItem } from "@/common/common.js";
import { mapState } from "vuex";
export default {
    components: {
        piclist1
    },
    data() {
        return {
            loading:false,
            value:[],
            form:{
                year:'',
                awardName:'',
                childId:'',
                title:'',
                parentId:'',
                flag:0,
                pageNum: 1,
                pageSize: 12,
            },
            lists: [],
            total: 0,
            yearValue: '',
            cslbValue: '选择参赛类别',
            jxValue: '',
            yearList: [],
            cslbList2: [],
            maxyear:{
                competitionId: "", 
                competitionName: "",
                competitionYear: 1
            },
            jxList3:[
                {
                    id:'一等奖',
                    name:'一等奖'
                },
                {
                    id:'二等奖',
                    name:'二等奖'
                },
                {
                    id:'三等奖',
                    name:'三等奖'
                },
                {
                    id:'全场大奖',
                    name:'全场大奖'
                },
                {
                    id:'其他',
                    name:'其他'
                },
            ]
        }
    },
    created() {
        this.getYearList(); //获取年份列表
    },
    methods: {
          async competitionsChange(val) {
              this.form.year = val[0]
              this.form.parentId = val[1]
            //   获取赛项
           this.getJCLBList()
          },
        async init() {
            this.loading = true
            let myform = JSON.stringify(this.form)
            setItem('form',myform)
            let res = await network.getPreviousYearsResourcePool({
                data: this.form
            })
            if (res == 'error') return;
            if(!res) {
                this.total = 0
                this.lists = []
            }else{
                this.total = res.total || 0
                this.lists = res.list
            }
            this.loading = false
        },
        //获取年份列表
        async getYearList(type) { 
        let res = await network.getYearListForHuaCan({data:{
            groupId: getItem("groupId"),
        }});
        if(res=='error') return;
        res.forEach(item => {
            if(item.competitionYear == 2021){
            // if(item.competitionYear > this.maxyear.competitionYear){
                this.maxyear  = item
            }
            this.yearList.push({
                value:item.competitionYear,
                label:item.competitionYear,
                children:[{
                    value: item.competitionId,
                    label: item.competitionName,
                }]
            })
        })
        this.$set(this.form,'year',this.maxyear.competitionYear)
        this.$set(this.form,'parentId',this.maxyear.competitionId);
        this.value = [this.form.year,this.form.parentId]
        this.getJCLBList()
        },
        // 获取参赛类别列表数据
        async getJCLBList() {
        let res = await network.getCompetitionType({data:{
            groupId: getItem("groupId"),
            year:this.form.year
        }});
        if(res=='error') return;
        if(res.length > 0){
            this.form.flag = 1
        }else{
            this.form.flag = 0
        }
            this.cslbList2 = res
            this.init()
        },


      
    },
     computed:{
    ...mapState('skin',{
      gid:state=>state.id
    })
  }
}
</script>
<style lang="less">
.sysBox .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #bb0294; // 进行修改背景和字体
    color: #fff;
}
.left .el-select .el-input--suffix  .el-input__inner {
                height: 32px;
                text-align: center;
                width: 140px;
            }
 .left .el-select .el-input--suffix  .el-input__inner  .el-input__icon {
                line-height: 0;
            }
.duoxuan .el-cascader .el-input .el-input__inner {
            height: 32px !important;
            // margin-right: 16px;
            width: 140px !important;
        }
    
.right  .el-input__inner {
        height: 32px;
    }

</style>
<style lang="less" scoped>
.el-icon-search{
    cursor: pointer;
}
.top {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .left {
        width: 100%;
        .el-select {
            width: 140px;
            height: 32px;
        }
    }
    .kaishi{
        display: flex;
        justify-content: space-between;
    }
    .right {
        .el-input {
            height: 32px;
        }
    }
}
</style>