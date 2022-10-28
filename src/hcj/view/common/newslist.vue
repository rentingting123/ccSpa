<template>
    <div class="organization">
        <h2><p>{{name}}</p></h2>
        <ul>
            <li v-for="list in lists" @click="todetail(list)">
                <div>
                    <p class="dian" :title="list.newsTitle">{{list.newsTitle}}</p>
                    <span>{{list.newsTime | date}}</span>
                </div>
            </li>
        </ul>
        
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props:['name','lists','path'],
    
    methods:{
        todetail(list){
            let path = this.$route.path
            if(this.path){
                this.$router.push({path:'/datacenter/newsdetail', query:{'id':list.id}})
            }else{
                this.$router.push({path:'/datacenter/news/detail', query:{'id':list.id, 'path':path}})
            }
        }
    },
    filters:{
        date(val){
            if(!val) return;
            let value = parseInt(val)
            return moment(value).format('YYYY-MM-DD')
        }
    }
}
</script>

<style lang="less" scoped>
.organization{
    text-align: left;
    ul{
        text-align: left;
        li{
            width: 100%;
            height: 38px;
            border-bottom: 1px dashed #e1e1e1;
            cursor: pointer;
            div{
                line-height: 38px;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0.52px;
                p{
                    display: inline-block;
                    vertical-align: top;
                    width: 700px;
                    height: 38px;
                }
                span{
                    float: right;
                }
            }
        }
    }
}
</style>

<style lang="less">
.organization{
    text-align: left;
    h2{
        width: 100%;
        border-bottom: 1px solid #AFAFAF;
        line-height: 37px;
        p{
            display: inline-block;
            border-bottom: 3px solid #BB0294;
            font-size: 16px;
            color: #000000;
        }
    }
}
</style>
