<template>
    <div class="meeting">
        <h1><i class="iconfont">&#xe629;</i>培训会议</h1>
        <ul class="type clearfix">
            <li :class="{'on':type==1}" @click="typechange(1)">进行中<p class="line"></p></li>
            <li :class="{'on':type==2}" @click="typechange(2)">已结束<p class="line"></p></li>
        </ul>
        <ul class="lists clearfix">
            <li v-for="list in lists">
                <div class="logo" @click="$router.push('/meetingdetail/'+list.id)">
                    <img :src="list.bannerUrl" alt="">
                    <p>
                        {{list.province}}
                        <span>{{list.trainingBeginTime | date}}-{{list.trainingEndTime | date}}</span>
                    </p>
                </div>
                <h2>{{list.name}}</h2>
                <h3>
                    {{list.price | price}}
                    <span>{{list.personNum || 0}}人已报名</span>
                </h3>
            </li>
        </ul>
        <div style="text-align:center;margin-bottom:10px;">
            <el-pagination layout="prev, pager, next" @current-change="init" :current-page.sync="pageNum"  :page-size="pageSize" :total="total"> </el-pagination>
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
            type: 1,
            total: 50,
            pageNum: 1,
            pageSize: 8,
        }
    },
    created(){
        this.init();
    },
    methods:{
        typechange(type){
            this.type = type;
            this.init();
        },
        async init(){
            let res = await network.getTrainList({data:{
                provinceId: localStorage.getItem('competitionId'),
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                status: this.type
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
        price(val){
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
</script>

<style lang="less" scoped>
.meeting{
    width: 1170px;
    margin: 0 auto;
    margin-top: 100px;
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
.type{
    width: 192px;
    margin: 0 auto;
    li{
        width: 58px;
        margin: 0 19px;
        font-size: 15px;
        color: #4A4A4A;
        letter-spacing: 0.94px;
        font-weight: bold;
        float: left;
        margin-bottom: 30px;
        cursor: pointer;
        transform: translateY(-30px);
        cursor: pointer;
        .line{
            width: 15px;
            height: 2px;
            background: #0078E2;
            margin: 0 auto;
            margin-top: 6px;
            display: none;            
        }
    }
    li.on{
        font-size: 18px;
        color: #4A4A4A;
        letter-spacing: 1.12px;
        p{
            display: block;
        }
    }
}
.lists{
    li{
        width: 270px;
        height: auto;
        float: left;
        margin-right: 30px;
        margin-bottom: 30px;
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
        }
        h3{
            font-size: 14px;
            color: #FC3782;
            letter-spacing: 0;
            text-align: left;
            font-weight: 150;
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