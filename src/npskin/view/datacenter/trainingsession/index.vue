<template>
    <div class="meeting">
        <!-- <h1 class="clearfix">
            <ul class="fl">
                <li :class="{'on':type==0}" @click="typechange(0)">全部<p class="line"></p></li>
                <li :class="{'on':type==1}" @click="typechange(1)">进行中<p class="line"></p></li>
                <li :class="{'on':type==2}" @click="typechange(2)">已结束<p class="line"></p></li>
            </ul>
            <el-input class="trainingName fr"  size="medium" placeholder="搜索培训" @keyup.enter.native="search" suffix-icon="el-icon-search" v-model="trainingName"></el-input>
        </h1> -->
        <div style="text-align: center">
            <img :src="noInfo" />
            <h1>暂无培训</h1>
        </div>
        <ul class="lists clearfix">
            <li v-for="list,index in lists">
                <div class="logo" @click="$router.push('/datacenter/trainingsessiondetail/'+list.id)">
                    <img :src="list.bannerUrl" alt="">
                    <p>
                        {{list.province}}
                        <span>{{list.trainingBeginTime | date}}-{{list.trainingEndTime | date}}</span>
                    </p>
                </div>
                <h2 class="ellipse" :title="list.name">{{list.name}}</h2>
                <p class="h3">
                    {{list | price}}
                    <span>{{list.personNum || 0}}人已报名</span>
                </p>
            </li>
        </ul>
        <div style="text-align:center;margin:0 auto 100px;">
            <el-pagination layout="prev, pager, next" :hide-on-single-page='true' @current-change="init" :current-page.sync="pageNum"  :page-size="pageSize" :total="total"> </el-pagination>
        </div>

    </div>
</template>
<script>
import network from '@/api/index'
import moment from 'moment'
export default {
    data(){
        return{
            lists:[],
            type: 0,
            total: 0,
            pageNum: 1,
            pageSize: 16,
            trainingName: '',
            noInfo:"https://web.moocollege.com/mooc/hzq/vueskin/assets/npskin/noInfo.png"
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
                groupId: localStorage.getItem('groupId'),
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                status: this.type,
                type: 0, // 查询能显示的
                trainingName: this.trainingName,
            }})
            if(res=='error') return;
            this.lists = res && res.list || [];
            this.total = res && res.total | 0;
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
    width: 1280px;
    margin: 0 auto;
    padding: 20px 40px 0;
}
h1{
    font-size: 25px;
    color: #4A4A4A;
    text-align: left;
    i{
        font-size: 16px;
        color: #0078E2;
        margin-right: 20px;
    }
}
h1{
    text-align: center;
    font-size: 16px;
    color: #4A4A4A;
    margin: 40px 0 30px;
    position: relative;
    i{
        top: 0 !important;
    }
    li{
        float: left;
        width: 137px;
        cursor: pointer;
        font-size: 16px;
        color: #4A4A4A;
        p{
            width: 15px;
            height: 4px;
            background: #0078E2;
            margin: 0 auto;
            display: none;
        }
    }
    li.on{
        font-size: 22px;
        color: #4A4A4A;
        font-weight: bold;
        position: relative;
        top: -5px;
        p{
            display: block;
        }
    }
    span{
        float: left;
    }
    .trainingName{
        width: 210px;
        position: relative;
        top: -5px;
    }
}
.lists{
    li{
        width: 270px;
        height: 208px;
        float: left;
        margin-right: 40px;
        margin-bottom: 30px;
        overflow: hidden;
        cursor: pointer;
        .logo{
            width: 100%;
            height: 152px;
            overflow: hidden;
            position: relative;
            background: #D8D8D8;
            border-radius: 3.63px;
            img{
                width: 100%;
                height: 100%;
            }
            p{
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(22,22,22,0.60) 100%);
                border-radius: 4.03px;
                font-size: 14px;
                color: #FFFFFF;
                letter-spacing: 0.88px;
                text-align: left;
                padding: 7px;
                span{
                    float: right;
                }
            }
        }
        .logo:hover{
            img{
                transform: scale(1.1)
            }
        }
        h2{
            font-size: 16px;
            color: #4A4A4A;
            letter-spacing: 0;
            margin: 8px 0 6px;
            text-align: left;
            font-weight: bold;
        }
        .h3{
            font-size: 14px;
            color: #FC3782;
            letter-spacing: 0;
            text-align: left;
            span{
                font-size: 14px;
                color: #4C4C4C;
                letter-spacing: 0;
                margin-left: 15px;
            }
        }
    }
    li:nth-child(4n){
        margin-right: 0;
    }
}

</style>

<style lang="less">
.meeting .el-input--medium .el-input__icon{
    top: 0;
    margin: 0;
}
</style>