<template>
    <div class="competitionList">
        <h1 class="titlesss">
            榜单内竞赛(57项)
        </h1>
        <ul class="competitionMain">
            <li v-for="(item,i) in types" :key="item.key" class="types">
                <div class="mess big" v-if="!item.checked" @click="changeTypes(item, i)" :style="{'background-image': `url('${item.background}')`}">
                    <div>
                        <p class="name">{{item.name}}</p>
                        <p class="title">{{item.title}}</p>
                    </div>
                </div>
                <div class="mess small" v-else @click="changeTypes(item, i)" :style="{'background-image': `url('${item.background}')`}">
                    <div>
                        <p class="name">{{item.name}} <i class="el-icon-right"></i></p>
                    </div>
                </div>

                <div :class="{'on': item.checked}" class="lists">
                    <ul >
                        <template v-if="item.lists.length>0">
                            <li v-for="(list,i) in item.lists" :key="list.id+''+i" @click="toDetail(list)" class="dian">
                                {{list.name}}
                            </li>
                        </template>
                        <template v-else>
                            <li style="justify-content: center;">
                                暂无数据
                            </li>
                        </template>
                    </ul>

                    <div class="pages">
                        <el-pagination 
                            background
                            layout="prev, pager, next" 
                            @current-change="pagechange" 
                            :current-page.sync="pageNum" 
                            :page-size="pageSize" 
                            :hide-on-single-page='true'
                            :total="total">
                        </el-pagination>                
                    </div>
                </div>

            </li>
        </ul>
    </div>
</template>

<script>
import network from '@/api'
import bubble from './bubble'
export default {
    components:{
        bubble
    },
    data(){
        return{       
            types:[
                {
                    key: 1,
                    name:'电子信息',
                    title: 'ELECTRONIC INFORMATION',
                    num: 0,
                    background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/bg_tag1.jpg',
                    checked: true,
                    lists:[],
                },
                {
                    key: 2,
                    name:'理工',
                    title: 'POLYTECHNIC',
                    num: 0,
                    background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/bg_tag2.jpg',
                    checked: false,
                    lists:[],
                },
                {
                    key: 3,
                    name:'人文社科',
                    title: "SOCIAL SCIENCE",
                    num: 0,
                    background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/bg_tag3.jpg',
                    checked: false,
                    lists:[],
                },
                {
                    key: 4,
                    name:'综合',
                    title: 'COMPREHENSIVE',
                    num: 0,
                    background: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/bg_tag4.jpg',
                    checked: false,
                    lists:[],
                },
            ],
            type: 1,
            pageNum: 1,
            pageSize: 7,
            total: 0,
            index: 0, //控制选择的类别，数组下标

        }
    },
    created(){
        this.init(0);
    },
    methods:{
        changeTypes(item, i){
            this.pageNum = 1
            this.type = item.key
            this.init(i)
        },
        pagechange(){
            this.init(this.index)
        },
        async init(i){
            let res = await network.selectRankCompetitionsPage({data:{
                type: this.type,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            }})
            if(res=='error') return;
            
            this.types.map(res=>{
                res.checked = false
                res.lists = []
            })
            this.index = i
            this.types[i].checked = true
            this.types[i].lists = res && res.list || []
            this.total = res && res.total || 0
        },
        toDetail(list){
            let routeUrl = this.$router.resolve({
                path: '/empowerment/detail/'+list.id,
                query: {}
            });
            window.open(routeUrl .href, '_blank');
        }
    },
}
</script>

<style lang='less' scoped>
.competitionList{
    width: 1172px;
    margin: 0 auto;
    background-color: #FFFFFF;
    .titlesss{
        width: 1172px;
        height: 90px;
        background: #000000;
        line-height: 90px;
        font-size: 28px;
        color: #FFFFFF;
        text-indent: 34px;
        text-align: left;
    }
    .competitionMain{
        width: 1172px;
        height: 476px;
        overflow: hidden;
        font-size: 0;
        text-align: left;
        .types{
            width: auto;
            height: 100%;
            display: inline-block;
            vertical-align: top;
            .mess{
                height: 100%;
                background-size: 160px 476px;
                background-position: left top;
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                
            }
            .big{
                width: 160px;
                &:hover{
                    >div{
                        background-color: rgba(237, 29, 38, 0.7);
                    }
                }
                >div{
                    text-align: center;
                    font-weight: bold;
                    color: #FFFFFF;
                    background-color: rgba(0,0,0,0.5);
                    width: 100%;
                    height: 100%;

                    .name{
                        font-size: 30px;
                        line-height: 45px;
                        margin-bottom: 9px;
                        padding-top: 187px;
                    }
                    .title{
                        font-size: 12px;
                        line-height: 18px;
                    }
                }
            }
            .small{
                width: 80px;
                >div{
                    background-color: rgba(237, 29, 38, 0.7);
                    font-weight: bold;
                    color: #FFFFFF;
                    width: 100%;
                    height: 100%;
                    .name{
                        width: 30px;
                        height: 120px;
                        font-size: 30px;
                        line-height: 45px;
                        margin: 0 auto;
                        padding-top: 13px;
                    }
                }
            }
            .lists{
                width: 612px;
                height: 100%;
                font-size: 0;
                vertical-align: top;
                display: none;
                overflow: hidden;
                ul{
                    height: 427px;
                    overflow: hidden;
                }
                li{
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                    height: 61px;
                    line-height: 61px;
                    font-size: 18px;
                    font-weight: 400;
                    color: #4A4A4A;
                    text-indent: 10px;
                    cursor: pointer;
                    padding: 0 10px;
                    &:nth-child(2n+1){
                        background: #E6EBEB;
                    }
                    &:hover{
                        color: rgba(237, 29, 38, 1);
                    }
                }
                &.on{
                    display: inline-block;
                }
            }
            .pages{
                width: 612px;
                display: block;
                text-align:center;
                margin:10px auto 0;
            }

        }
        
    }
    /deep/.el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #ED1E26;
    }
}
</style>