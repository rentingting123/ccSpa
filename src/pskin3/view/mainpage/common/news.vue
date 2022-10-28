<template>
    <div class="news">
        <top referType='10' title='头条资讯' />
        <div class="right">
            <div class="h2title">
                <div>

                    <ul class="open">
                        <li v-for="list in openList" :key="list.id" :class="list.type==open?'on':''" @click='setOpen(list.type)'>
                            {{list.name}}
                            <p></p>
                        </li>
                    </ul>

                </div>
                <div >
                    <span class="more" @click="toMore">查看更多</span>
                </div>
            </div>
            <ul class="newslist">
                <li v-for="(list,index) in lists" :key="list.id" :title="list.newsTitle">
                    <newsList :lists='list' :index="index" time="true" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
// referType  4 赛事咨询 5 政策文件  10  头条咨询 30 省赛通知 100 省赛公示
import top from "./news-top";
import normal from "./news-normal";
import h2Title from '@/pskin3/components/h2';
import newsList from '@/pskin3/components/news'
import network from '@/api/index'

export default {
    components:{
        normal,
        top,
        h2Title,
        newsList,
    },
    data() {
        return {
            openList: [
                {
                    name: '竞赛资讯',
                    id: 4,
                    type: '4'
                }, {
                    name: '省赛通知',
                    id: 30,
                    type: '30'
                }, {
                    name: '省赛公示',
                    id: 100,
                    type: '100'
                }
            ],
            open: '4',
            lists: [],
            page: 1,
            pagesize: 7
        }
    },
    created() {
        this.init();
    },
    methods: {
        setOpen(val){
            this.open = val;
            this.init();
        },
        async init() {
            let res = await network.getHeadline2020({data:{
                page: this.page,
                size: this.pagesize,
                referType: this.open,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.lists = res.pageData || []
        },
        toMore() {
            this.$router.push({ path: `/newslist?type=${this.open}` });
        }
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 1100px;
    margin: 0 auto;
    margin-top: 27px;
    display: flex;
    justify-content: flex-start;
    align-content: center;

    .newslist{
        padding: 16px;
        li{
            margin-bottom: 13px;

            &:last-child{
                margin-bottom: 0;
            }
        }
    }
    .right {
        width: 100%;
        margin-left: 10px;
        box-shadow: 0px 2px 8px 0px rgb(227 227 227 / 94%);
    }

    .h2title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: left;
        padding: 0 15px;
        color: #B0B1B2;
        display: flex;
        justify-content: space-between;
        align-content: center;
        border-bottom: 1px solid #E4E4E4;
        >div{
            display: flex;
            justify-content: flex-start;
            align-content: center;
        }
        h2{
            font-size:16px;
            font-weight:bold;
            color: #006EE6;
        }
        .h2right{
            font-size: 12px;
            margin-left: 4px;
            line-height: 40px;
        }
        .turn{
            margin-right: 10px;
            i{
                display: inline-block;
                width: 20px;
                line-height: 20px;
                background:rgba(240,240,240,1);
                border:1px solid rgba(255,255,255,1);
                text-align: center;
                cursor: pointer;
            }
        }
        .more{
            font-size:12px;
            font-weight:400;
            color:rgba(176,177,178,1);
            cursor: pointer;
        }
        .open{
            li{
                width: auto;
                line-height: 40px;
                position: relative;
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                margin: 0 15px;
                color: #000;
                font-size: 16px;
                p{
                    width: 100%;
                    height: 2px;
                    background: #006EE6;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    -webkit-transform: translateX(-50%);
                    transform: translateX(-50%);
                    display: none;
                }
                &.on{
                    color: #006EE6;
                    font-weight: bold;
                    p{
                        display: block;
                    }
                }
            }
        }

    }
}
</style>
