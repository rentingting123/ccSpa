<template>
    <div class="right">
        <h1 class="clearfix">
            <ul class="fl">
                <li :class="{'on':on==4}" @click="choose(4)">赛事资讯<p></p></li><span>/</span>
                <li :class="{'on':on==5}" @click="choose(5)">政策文件<p></p></li><span>/</span>
                <li :class="{'on':on==6}" @click="choose(6)">学生竞赛<p></p></li><span>/</span>
                <li :class="{'on':on==7}" @click="choose(7)">教师发展<p></p></li>
            </ul>
            <span class="more top" @click="$router.push({path:'/newslist',query:{type:on}})">更多内容</span>
        </h1>
        <div class="newslist">
            <el-timeline class="timeLine">
                <el-timeline-item
                    v-for="(newlist, index) in competitionReferList"
                    :key="index"
                    color="#111111"
                    :timestamp="newlist.newsDate">
                    <span @click="tonewsdetail(newlist)" :title="newlist.newsTitle">
                        <img style="max-height:100%;vertical-align: top;" v-if="newlist.provinceType==0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/newshot/hot1.png" srcset="">
                        <img style="max-height:100%;vertical-align: top;" v-else-if="newlist.provinceType==1" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/newshot/hot2.png" srcset="">
                        <img style="max-height:100%;vertical-align: top;" v-else-if="newlist.provinceType==2" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/newshot/hot3.png" srcset="">
                        {{newlist.newsTitle}}
                    </span>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>
<script>
export default {
    props:['competitionReferList','init'],
    data(){
        return{
            on: 4,
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
            let routeUrl = this.$router.resolve({
                path: "/newsdetail",
                query: {id:item.id}
            });
            window.open(routeUrl .href, '_blank');
            // this.$router.push({path:'/newsdetail',query:{id:item.id}})
        }
    }
}
</script>


<style lang="less" scoped>
.right{
    width: 833px;
    height: 241px;
    overflow: hidden;
}
.top{
    top: -10px !important;
}
h1{
    text-align: center;
    font-size: 16px;
    color: #4A4A4A;
    margin: 5px 0 20px !important;
    position: relative;
    li{
        float: left;
        width: 137px;
        cursor: pointer;
        font-weight: 500;
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
    ul{
        span{
            float: left;
            color: #CBD3E5;
        }
    }
}
.newslist{
    background: #F9FAFB;
    width: 833px;
    height: 175px;
    font-size: 16px !important;
}
</style>
<style lang="less">
.el-timeline-item{
  left: 115px !important;
  padding-top: 10px;
  padding-bottom: 5px !important;
}
.el-timeline-item__timestamp.is-bottom{
  position: absolute;
  margin-top: 0 !important;
  top: 4px;
  left: -100px !important;
}

.el-timeline-item__content {
    width: 650px !important;
    text-align: left;
    overflow: hidden;
    height: 20px;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    color: #000000 !important;
}
.el-timeline-item__node--normal {
    left: 0px !important;
    width: 9px !important;
    height: 9px !important;
    background: #666666 !important;
}
.el-timeline{
    font-size: 16px !important;
    padding-top: 6px;
}
.el-timeline-item__timestamp{
    font-size: 14px !important;
}
.el-timeline-item__wrapper{
    top: -7px !important;
}

</style>