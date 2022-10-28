<template>
<!--动态-->
<div class="netSuiteProject">
    <div class="banner">
        <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/banner_img03.png" class="banner_img">
        <div class="banner_main">
          <div class="zhan"></div>
          <div class="banner_title">
            <h2>大赛动态</h2>
            <h3>Competition news</h3>
          </div>
        </div>
      </div>
    <div id="dynamicState">
        <h1>
            <div class="types">
                <div :class="{on:news.id==active}" @click="newsChoose(news)" v-for="news in newstype" :key="news.id" v-html="news.name"></div>
            </div>
        </h1>
          
        <ul>
            <li v-for="(item,index) in stateData" :key="'dynamicState_' + index" @click="$router.push({path:'/newsDetail',query:{id:item.id,type:'show'}})">
                <div class="txt_top">
                    <p>{{item.newsTitle}}</p>
                    <div class="img">
                        <img :src="item.newsIcon" >
                    </div>
                </div>
                <div class="txt_content" v-html="item.newsInfo">
                    
                </div>
                <div class="txt_bottom">
                    <span class="fl">{{ item.newsTime | time}}</span>
                </div>
            </li>
        </ul>
        <!-- 分页 -->
        <div class="cha-pagination" >
            <el-pagination
                v-if="stateData.length>0"
                class="cha-page"
                background
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-size="pageSize"
                layout="total,prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</div>
</template>


<script>
import network from '@@/api/jxapi/index'
import { mapState } from 'vuex'
import moment from 'moment'
import { removeHtmlTag } from '@@/utils/util';

export default {
    data(){
        return {
            pageSize: 9, // 每页条数
            page: 0, // 当前页数
            total: 0, //分页总条数
            stateData: [], // 返回的data值
            newstype:[
                {
                    name:'全部',
                    id:1,
                },
                {
                    name:'通知动态',
                    id:2,
                    type:'0'
                },
                {
                    name:'新闻动态',
                    id:3,
                    type:'1'
                },
                {
                    name:'活动动态',
                    id:4,
                    type:'2'
                },
                {
                    name:'大赛回顾',
                    id:5,
                    type:'3'
                },
            ],
            active:1,
            // itemIdx: {}, 
            type:'',

        }
    },
    methods: {
        async delState(id){
            this.$confirm('删除该动态后不可恢复，确定要删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // delStatus 删除为0，正常为1
                let delok = await network.saveNews({data:{id:id,delStatus:0}})
                if(delok=='error') return;
                this.getList()
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });                
        },
        handleCurrentChange(){
            this.getList();
        },
        async getList(type){
            this.type = type
            let params={
                competitionId:localStorage.getItem('competitionId'),
                type:this.type,
                pageNum:this.page,
                pageSize:this.pageSize
            }
            let newsList = await network.getNewsList({data:params});
            if(newsList=='error') return;

            this.setStateData(newsList)

        },
        setStateData(newsList){
            let data = newsList.pageData;
            for(let i in data){
                data[i].newsInfo = removeHtmlTag(data[i].newsInfo)
            }

            this.stateData = newsList.pageData;
            this.page = newsList.pageNum;
            this.total = newsList.total;
            this.pageSize = newsList.pageSize;
        },
        newsChoose(news){
            this.active = news.id
            this.page = 1;
            this.getList(news.type)
        }
    },
    async created(){
        this.type=this.$route.query.type
        this.getList();
    },

    filters:{
        time(val){
            if(!val) return;
            return moment(parseInt(val)).format('YYYY-MM-DD hh:mm:ss');
        }
    } 
    
    
}
</script>


<style lang="less" scoped>
.cha-pagination{
    text-align: center;
}
#dynamicState{
    width: 1040px;
    margin: auto;
    min-height: calc(100vh - 251px - 112px);
    background-color: #fff;
    padding: 40px 55px;
    text-align: start;
    overflow: hidden;
    box-sizing: border-box;
    >h1{
        font-size: 30px;
        text-align: center;
        padding-left: 16px;
        font-weight: 500;
        .types{
            height: 100%;
            display: block;
            margin: 0 auto;
            div{
                font-size: 24px;
                cursor: pointer;
                padding: 0 10px;
                display: inline-block;
                color: #4a4a4a;
                font-weight: 150;
            }
            .on{
                color: #1D86FF;
                border-bottom: 4px solid #1d86ff;
            }
        }
    }
    >ul{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin: 30px 0;
        li{
            width: 300px;
            height: 300px;
            padding: 25px 20px 21px;    
            margin-top: 25px;
            margin-right: 10px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
            border-radius: 5px;
            box-sizing: border-box;
            display: inline-block;
            cursor: pointer;
            .txt_top{
                display: flex;
                justify-content: space-between;
                position: relative;
                p{
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                   
                    /*! autoprefixer: ignore next */
                    -webkit-box-orient:vertical;
                    /*! autoprefixer: on */
                    -webkit-line-clamp:2; 
                    height: 44px;
                    width: 168px;
                    font-weight: bold;
                    padding-right: 16px;
                }
                .img{
                    width: 76px;
                    height: 44px;
                    position: relative;
                    overflow: hidden;
                    img{
                        width: 76px;
                        min-height: 44px;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
            .txt_content{
                width: 100%;
                height: 143px;
                margin: 16px 0 16px;
                font-size: 13px;
                letter-spacing: 0.5px;
                line-height: 20px;
                overflow: hidden;
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 7;
                overflow: hidden;
                color: #808080;
                font-weight: 200;
                p{
                    img{
                        display: none !important;
                        width: 0;
                        height: 0;
                    }
                }
            }
            .txt_bottom{
                font-size: 12px;
                text-align: right;
                cursor: pointer;
                padding-top: 10px;
                .fl{
                    float: left;
                    color: #999999;
                }
            }
            
            .txt_bottomEdit{
                margin:0 10px;
                color:#4a4a4a;
            }
            .txt_bottomDlt:hover{
                color: #CB3A4C;
            }
            .txt_bottomEdit:hover{
                color: #1D86FF;
            }
        }
        li:hover{
            box-shadow: 0 2px 8px 0 rgba(0,0,0,0.20);
        }
        .addPoints:hover{
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20); 
        }
    }
    
    .addPoints{
        background: #E8ECF0;
        border-radius: 0px 0px 5px 5px;
        margin-top: 25px;
        padding-bottom: 20px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span{
            color: #CAD2DA;
            font-size: 60px;
        }
        p{
            color: #92A0AE;
            font-size: 16px;
        }
    }
}
  .netSuiteProject {
    .banner {
      width: 100%;
      position: relative;

      img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: -1;
      }

      .banner_main {
        max-width: 1200px;
        height: 251px;
        margin: 0 auto;

        .zhan {
          width: 100%;
          height: 90px;
        }

        .banner_title {
          h2 {
            font-size: 38px;
            color: #fff;
            font-weight: normal;
          }
          h3 {
            font-size: 18px;
            color: #fff;
            margin-top: 10px;
            font-weight: normal;
          }
        }
      }
    }

    .content {
      min-height: 900px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
      background: #fff;
      padding: 1px;
      margin: 0 auto;
    }
  }
</style>