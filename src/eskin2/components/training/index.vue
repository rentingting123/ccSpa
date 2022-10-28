<template>
    <div class="meeting">
        <h1 class="title title2">
            培训
            <ul class="type">
                <li :class="{'on':type==0}" @click="typechange(0)">全部<p class="line"></p></li>
                <li :class="{'on':type==1}" @click="typechange(1)">进行中<p class="line"></p></li>
                <li :class="{'on':type==2}" @click="typechange(2)">已结束<p class="line"></p></li>
            </ul>
            <el-input class="trainingName"  size="medium" placeholder="搜索培训" @keyup.enter.native="search" suffix-icon="el-icon-search" v-model="trainingName"></el-input>
        </h1>
        <train :lists="lists"/>
        <div style="text-align:center;margin:0 auto 100px;">
            <el-pagination layout="prev, pager, next" @current-change="init" :current-page.sync="pageNum"  :page-size="pageSize" :total="total"> </el-pagination>
        </div>

    </div>
</template>
<script>
import network from '@/api/index'
import train from '../../view/mainpage/common/training'
import moment from 'moment'
export default {
    components:{
        train
    },
    data(){
        return{
            lists:[],
            type: 0,
            total: 0,
            pageNum: 1,
            pageSize: 16,
            trainingName: '',
        }
    },
    created(){
        this.init();
    },
    methods:{
        search(){
            this.pageNum = 1;
            this.lists = [];
            this.total = 0;
            this.init();
        },
        typechange(type){
            this.trainingName = ''
            this.type = type;
            this.pageNum = 1
            this.lists = [];
            this.total = 0
            this.init();
        },
        async init(){
            let res = await network.getTrainList({data:{
                provinceId: localStorage.getItem('competitionId'),
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                status: this.type,
                type: 0, // 查询能显示的
                trainingName: this.trainingName,
            }})
            if(res=='error') return;
            this.lists = res.list;
            this.total = res.total;
        }
    },
    filters:{
        date(val){
           return moment(val).format('YYYY.MM.DD');
        },
        price(list){
           let start = list.trainingEStartTime;
           let end = list.trainingEndTime;
           let now = new Date().getTime();
            if(now > end){
                return '已结束'
            }else if(now < start){
                return '待定'
            }else{
                let val = list.price;
                if(val==0){
                    return '免费'
                }else if(val>0){
                    return '¥ '+val+'起'
                }else{
                    return '待定'
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.meeting{
    width: 1171px;
    margin: 0 auto;
}

h1{
    justify-content: flex-start;
    margin-top: 30px;
    .type{
        margin-left: 88px;
        margin-right: 470px;
    }
    .trainingName{
        width: 210px;
    }
}
</style>