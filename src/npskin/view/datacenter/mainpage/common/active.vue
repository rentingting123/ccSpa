<template>
    <div class="active" v-loading="loading">
        <h2 class="title">
            <p>赛事动态</p>
            <span @click="$router.push('/datacenter/news/dynamicevents')">more</span>
        </h2>
        <ul >
            <li v-for="list in lists" @click="$router.push('/datacenter/news/detail?id='+list.id)">
                <p class="dian" :title="list.newsTitle">{{list.newsTitle}}</p>
                <time>{{list.newsTime | date}}</time>
            </li>
        </ul>
    </div>
</template>


<script>
import network from "@/api"
import moment from 'moment'
export default {
    data(){
        return{
            lists:[],
            loading:false
        }
    },
    async created(){
        // if(localStorage.getItem('eventDynamics')){
        //     this.lists = eval(localStorage.getItem('eventDynamics'))
        // }else{
              this.loading = true
              let id = localStorage.getItem('groupId');
              let res = await network.npgetNewsList({data:{
                  groupId: id,
                  type: 22,
                  pageNum: 1,
                  pageSize: 9
              }})
              this.loading = false
              if(res=='error') return;
              localStorage.setItem('eventDynamics',JSON.stringify(res.pageData))
              this.lists = res.pageData || []
        // }
      
    },
    filters:{
        date(val){
            if(!val) return;
            let value = parseInt(val)
            return moment(value).format('MM-DD')
        }
    }
}
</script>

<style lang="less" scoped>
.active{
    width: 440px;
    // height: 387px;

    ul{
        text-align: left;
        li{
            width: 100%;
            line-height: 40px;
            height: 40px;
            border-bottom: 1px dotted #C4C4C4;
            cursor: pointer;
            p{
                display: inline-block;
                vertical-align: top;
                width: 350px;
            }
            time{
                float: right;
            }
        }
    }

}
</style>
<style lang="less">
h2.title{
    width: 100%;
    border-bottom: 1px solid #AFAFAF;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p{
        line-height: 2;
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
        color: #0041AB;
        letter-spacing: 1.45px;
        border-bottom: 3px solid #6BB8FF;
    }
    span{
        text-align: center;
        background: #6BB8FF;
        border-radius: 8px;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
        cursor: pointer;
        padding: 0 6px;
        line-height: 1.5;
    }
}
</style>