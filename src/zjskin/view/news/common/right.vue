<template>
    <div class="right">
        <h1 class="clearfix">
            <ul class="fl">
                <li :class="{'on':on==4}" @click="choose(4)">赛事资讯<p></p></li><span>/</span>
                <li :class="{'on':on==5}" @click="choose(5)">政策文件<p></p></li><span>/</span>
                <li :class="{'on':on==6}" @click="choose(6)">学生竞赛<p></p></li><span>/</span>
                <li :class="{'on':on==7}" @click="choose(7)">教发指数<p></p></li>
            </ul>
            <span class="more" @click="$router.push({path:'/newslist',query:{type:on}})">更多内容</span>
        </h1>
        <div class="newslist">
            <el-timeline class="timeLine">
                <el-timeline-item
                    v-for="(newlist, index) in competitionReferList"
                    :key="index"
                    color="#111111"
                    :timestamp="newlist.newsDate">
                    <span @click="tonewsdetail(newlist)">{{newlist.newsTitle}}</span>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
<script>
import network from '@@/api/jxapi/index'
import moment from 'moment'
export default {
    props:['competitionReferList','init'],
    data(){
        return{
            on: 0,
            news: []
        }
    },
    created(){
        this.init();
    },
    methods:{
        choose(type){
            this.on = type;
            this.init && this.init(type)
        },
        tonewsdetail(item){
            this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    }
}
</script>


<style lang="less" scoped>
.right{
    margin-right: 54px;
    width: 803px;
    height: 241px;
}
h1{
    text-align: center;
    font-size: 15px;
    color: #4A4A4A;
    margin: 5px 0 20px !important;
    position: relative;
    li{
        float: left;
        width: 137px;
        cursor: pointer;
        p{
            width: 15px;
            height: 4px;
            background: #0078E2;
            margin: 0 auto;
            margin-top: 5px;
            display: none;
        }
    }
    li.on{
        font-size: 18px;
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
}
.newslist{
    background: #F9FAFB;
    width: 803px;
    height: 175px;
}
</style>
<style lang="less">
.el-timeline-item{
  left: 105px;
  padding-top: 10px;
  padding-bottom: 5px !important;
}
.el-timeline-item__timestamp.is-bottom{
  position: absolute;
  margin-top: 0 !important;
  top: 4px;
  left: -84px;
}

.el-timeline-item__content {
    width: 650px;
    text-align: left;
    overflow: hidden;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
.el-timeline-item__node--normal {
    left: 0px;
    width: 9px;
    height: 9px;
}

</style>