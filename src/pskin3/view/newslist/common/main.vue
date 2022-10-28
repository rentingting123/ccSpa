<template>
    <div class="newsmain">
        <div class="newstop">
            <div>
                <h2>资讯列表</h2>
                <i class="el-icon-bottom-right h2right"></i>
            </div>
            <ul class="newstopnavs">
                <li v-for="item in navs" :class="referType==item.value?'on':''" @click="navChoose(item.value)" :key="item.id">
                    {{item.name}}
                    <p></p>
                </li>
            </ul>

        </div>
        <ul class="newsmaindetail" v-loading='loading'>
            <li v-for="(item, index) in lists" :key="item.id">
                <detail :lists='item' :index='index' time='true'/>
                <div v-if="(index+1)%5==0" class="hr"/>
            </li>
        </ul>

        <el-pagination  :hide-on-single-page='true'  background class="pages" layout="total, prev, pager, next" @current-change="init" :current-page.sync="page"  :page-size="size" :total="total"> </el-pagination>

    </div>
</template>

<script>
import detail from '@/pskin3/components/news'
import network from '@/api/index'
export default {
    components:{
        detail
    },
    data(){
        return{
            loading: false,
            navs:[
                {
                    name: '全部资讯',
                    id: '1',
                    value: ''
                },
                {
                    name: '赛事资讯',
                    id: '4',
                    value: '4'
                },
                {
                    name: '政策文件',
                    id: '5',
                    value: '5'
                },{
                    name: '省赛通知',
                    id: '30',
                    value: '30'
                }, {
                    name: '省赛公示',
                    id: '100',
                    value: '100'
                }
            ],
            page: 1,
            size: 20,
            referType: '',
            total: 0,
            lists: []
        }
    },
    created(){
        let type = this.$route.query.type
        if(type==4 || type==5 || type==30 || type==100) this.referType = type
        this.init()
    },
    methods:{
        navChoose(val){
            this.referType = val;
            this.$router.push({ path: `/newslist?type=${val}` });
            this.page = 1
            this.init()
        },
        async init(){
            this.loading = true
            let res = await network.getHeadline2020({data:{
                page: this.page,
                size: this.size,
                referType: this.referType,
                provinceId: localStorage.getItem('competitionId')
            }});
            this.loading = false
            if(res=='error') return;
            this.lists = res.pageData || []
            this.total = res.total || 0;
        }
    }
}
</script>

<style lang="less" scoped>
.newsmain{
    width:750px;
    height: auto;
    .newstop{
        border-bottom: 1px solid #dbdbdb;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        >div{
            display: flex;
            justify-content: flex-start;
            align-content: center;
        }
        h2{
            font-size:16px;
            font-weight:bold;
            color: #006EE6;
            line-height: 40px;
        }
        .h2right{
            font-size: 12px;
            margin-left: 4px;
            line-height: 40px;
        }
        .newstopnavs{
            margin-left: 40px;
            li{
                width: auto;
                line-height: 40px;
                position: relative;
                display: inline-block;
                vertical-align: top;
                margin: 0 25px;
                cursor: pointer;
                &.on{
                    color: #006EE6;
                    p{
                        display: block;
                    }
                }
                p{
                    width: 100%;
                    height: 2px;
                    background: #006EE6;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    display: none;
                }
            }
        }
    }
    .newsmaindetail{
        min-height: 50px;
        li{
            margin-top: 13px;
            .hr{
                width: 100%;
                height: 1px;
                background: #dbdbdb;
                margin-top: 13px;
            }
        }
    }
    .pages{
        margin: 30px 0 30px;
    }
}
</style>
