<template>
    <div class="news">
        <h title="新闻资讯">
            <el-input class="searchname" size="mini" @keyup.enter.native="search" placeholder="搜索新闻" v-model="q" style="width:275px;float:right">
                <el-button slot="append" @click.native="init" icon="el-icon-arrow-right"></el-button>
            </el-input>
        </h>

        <div class="newsMain">
            <ul class="type">
                <li :class="{'on':on==null}" @click="choose(null)">全部</li>
                <li :class="{'on':on==5}" @click="choose(5)">政策文件</li>
                <li :class="{'on':on==4}" @click="choose(4)">赛事资讯</li>
                <li :class="{'on':on==9}" @click="choose(9)">赛事通知</li>
                <li :class="{'on':on==6}" @click="choose(6)">竞赛排行</li>
                <li :class="{'on':on==7}" @click="choose(7)">教发指数</li>
            </ul>
            <ul class="newslist">
                <li v-for="(item, index) in competitionReferList" :key="index" @click="tonewsdetail(item)">
                    <h3 class="dian">{{item.newsTitle}}</h3>
                    <p class="times">{{item.newsDate | date}}</p>
                    <!-- <p class="newsType">{{item.newsType | newsType}}</p> -->
                </li>
            </ul>
            <div class="img">
                <el-carousel height="407px" arrow="never" ref="news" indicator-position='none'>
                    <el-carousel-item v-for="(item,index) in newsBannerList" :key="index" >
                        <img :src="item.banner" width="100%" height="100%" @click="tonewsdetail(item)">
                    </el-carousel-item>
                </el-carousel>
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/right_red.png" class="pre arrow" @click="prev">
                <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/right_red.png" class="next arrow" @click="next">
            </div>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
import h from '@/nskin/components/h'
import moment from 'moment'
export default {
    components:{
        h,
    },
    data(){
        return{
            q: '',
            competitionReferList:[],
            newsBannerList:[],
            on: null,
        }
    },
    created(){
        this.init(this.on)
    },
    methods:{
        async init(referType=null){
            let res = await network.getNewsHeadline({data:{
                page: 1,
                size: 12,
                referType: referType,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.competitionReferList = res.competitionReferList?res.competitionReferList:[]
            this.newsBannerList = res.newsBannerList?res.newsBannerList:[]
        },
        choose(type){
            this.on = type;
            this.init(type)
        },
        search(){
            if(!this.q) return;
            this.$router.push('/newslist?q='+this.q)
        },
        tonewsdetail(item){
            this.$router.push({
                path: "/newsdetail",
                query: {id:item.id}
            });
        },
        prev(){
            this.$refs.news.prev()
        },
        next(){
            this.$refs.news.next()
        }
    },
    filters:{
        newsType(val){
            if(val=='竞赛评估'){
                return '学生竞赛'
            }else{
                return val
            }
        },
        date(val){
            if(!val) return ''
            return moment(val).format('YYYY-MM-DD')
        }
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 100%;
    .newsMain{
        width: 1200px;
        margin: 0 auto;
        font-size: 0;
        height: 407px;
        text-align: left;
        margin-top: 17px;
        .type{
            display: inline-block;
            vertical-align: top;
            width: 167px;
            height: 100%;
            background: #252223;
            padding: 5px;
            li{
                margin-top: 23px;
                text-align: center;
                height: 24px;
                font-size: 18px;
                line-height: 24px;
                color: #FFFFFF;
                cursor: pointer;
                &.on{
                    color: #ED1E26;
                }
            }
        }
        .newslist{
            width: 490px;
            height: 100%;
            background: #F2F7F7;
            text-align: left;
            display: inline-block;
            vertical-align: top;
            padding: 28px 28px 0 33px;
            li{
                cursor: pointer;
                margin-bottom: 11px;
                h3{
                    width: 350px;
                    height: 19px;
                    font-size: 14px;
                    line-height: 19px;
                    color: #131313;
                    display: inline-block;
                    vertical-align: top;
                    padding-right: 6px;
                    font-weight: normal;
                }
                .newsType{
                    width: 60px;
                    height: 19px;
                    overflow: hidden;
                    font-size: 14px;
                    line-height: 19px;
                    color: rgba(19, 19, 19, 0.46);
                    display: inline-block;
                    vertical-align: top;
                    text-align: right;
                }
                .times{
                    width: 75px;
                    height: 19px;
                    overflow: hidden;
                    font-size: 12px;
                    line-height: 19px;
                    color: rgba(19, 19, 19, 0.46);
                    display: inline-block;
                    vertical-align: top;
                    text-align: right;
                }
                &:hover{
                    h3, .newsType, .times{
                        color: #D0021B;
                    }
                }
            }
            &:last-child{
                margin-bottom: 11px;
            }
        }
        .img{
            width: 540px;
            height: 407px;
            background: #F2F2F2;
            display: inline-block;
            vertical-align: top;
            position: relative;
            img{
                cursor: pointer;
            }
            .arrow{
                width: 51px;
                height: 51px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 999;
                cursor: pointer;
                display: none;
                &.pre{
                    left: 34px;
                    transform: translateY(-50%) rotate(180deg);
                }
                &.next{
                    right: 29px;
                }
            }
            &:hover{
                .arrow{
                    display: block;
                }
            }
        }
    }
    /deep/.el-input-group__append {
        background: #252223;
        color: #fff;
        border: 1px solid #252223;
    }
    /deep/.el-input-group--append .el-input__inner, .el-input-group__prepend{
        border-color: #252223;
    }
}
</style>


