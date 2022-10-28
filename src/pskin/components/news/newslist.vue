<template>
    <div class="news">
        <h1 class="clearfix">
            <ul class="fl">
                <li :class="{'on':type==null}" @click="choose(null)">全部<p></p></li>
                <li :class="{'on':type==4}" @click="choose(4)">赛事资讯<p></p></li>
                <li :class="{'on':type==5}" @click="choose(5)">政策文件<p></p></li>
                <li :class="{'on':type==6}" @click="choose(6)">学生竞赛<p></p></li>
                <li :class="{'on':type==7}" @click="choose(7)">教师发展<p></p></li>
            </ul>
        </h1>
        <div class="clearfix">
            <div class="newslist fl">
                <el-timeline class="timeLine">
                    <el-timeline-item
                        v-for="(newlist, index) in competitionReferList"
                        :key="index"
                        color="#111111"
                        :timestamp="newlist.newsDate">
                        <span @click="tonewsdetail(newlist)" :title="newlist.newsTitle">
                            <img style="max-height:100%;vertical-align: top;" v-if="newlist.provinceType==0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/newshot/hot1.png" srcset="">
                            <img style="max-height:100%;vertical-align: top;" v-else-if="newlist.provinceType==1" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/newshot/hot2.png" srcset="">
                            {{newlist.newsTitle}}
                        </span>
                    </el-timeline-item>
                </el-timeline>
                <el-pagination
                    class="pagination"
                    @current-change="handleCurrentChange"
                    :current-page.sync="page"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total="total">
                </el-pagination>
            </div>
            <div class="topnews fr">
                <div v-for="item in newsBannerList" :key="item.id" @click="tonewsdetail(item)">
                    <img :src="item.banner" width="100%" height="100%">
                    <p>{{item.newsBannerText}}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            type: null,
            competitionReferList:[],
            newsBannerList:[],
            pagesize: 15,
            page: 1,
            total: 20
        }
    },
    created(){
        this.type = this.$route.query.type?this.$route.query.type:null;
        this.init()
    },
    methods:{
        tonewsdetail(item){
            let routeUrl = this.$router.resolve({
                path: "/newsdetail",
                query: {id:item.id}
            });
            window.open(routeUrl .href, '_blank');
            // this.$router.push({path:'/newsdetail',query:{id:item.id}})
        },
        choose(val){
            this.$router.push({path:'/newslist',query:{type:val}})
            this.type=val;
            this.page = 1;
            this.init();
        },
        handleCurrentChange(val){
            this.init();
        },
        async init(){
            let res = await network.getNewsHeadline({data:{
                page: this.page,
                size: this.pagesize,
                referType: this.type,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.total = res.total;
            this.competitionReferList = res.competitionReferList?res.competitionReferList:[]
            this.newsBannerList = res.newsBannerList?res.newsBannerList:[]
        }
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 1000px;
    margin: 0 auto;
    padding: 0 0 40px;
}
h1{
    text-align: center;
    font-size: 16px;
    color: #4A4A4A;
    margin: 40px 0 30px;
    position: relative;
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
}
.newslist{
    width: 660px;
}
.topnews{
    width: 281px;
    height: auto;
    >div{
        width: 281px;
        height: 157.6px;
        position: relative;
        margin-bottom: 28px;
        cursor: pointer;
        p{
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
            font-size: 12.6px;
            color: #FFFFFF;
            line-height: 14.4px;
            text-align: left;
            padding: 20px 12px 10px;
            background-image: linear-gradient(-180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0.7) 70%);
            // border-radius: 0px 0px 5px 5px;
        }
    }
    >div:nth-child(3n){
        margin-bottom: 0;
    }
}
.pagination{
    margin-top: 40px;
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
  left: -100px;
}

.el-timeline-item__content {
    width: 540px !important;
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
}
.el-timeline-item__timestamp{
    font-size: 14px !important;
}
.el-timeline-item__wrapper{
    top: -7px !important;
}


</style>
