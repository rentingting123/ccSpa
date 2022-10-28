<template>
<div class="top clearfix">
    <h1 class="title">
        人气竞赛TOP3
        <span class="more" @click="$router.push('/competition')">查看更多</span>
    </h1>
    <ul>
        <li v-for="list,index in lists" v-if="index<3" :class="{'one':index==0,'two':index==1,'three':index==2}">
            <div class="logo"><img :src="require('../../../../assets/prize/'+(index+1)+'.png')" width="100%"></div>
            <div class="topmain" @click="todetail(list)">
                <img :src="list.bannerOne | imgsrc" width="100%" height="100%">
                <div>
                    <h3>{{list.name}}</h3>
                    <p class="type">火热报名</p>
                    <p class="secretariat">{{list.secretariat}}</p>
                </div>
            </div>
            <div class="num"><img :src="require('../../../../assets/prize/0'+(index+1)+'.png')" width="100%"></div>
        </li>
    </ul>
    
</div>
</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            lists:[],
            hover: 0,
        }
    },
    created(){
       this.init();
    },
    methods:{
        async init(){
            let res = await network.rankingtopList({data:{
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            
            this.lists = res.competitionList || []
        },
        async todetail(item){
            let url = item.url
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
            let res = await network.updateClickCount({data:{
                id: item.id
            }});
        }
    },
    filters:{
        imgsrc(val){
            if(val){
                if(val.indexOf('!w') !=  -1){
                    return val
                }
                return val+"!w480";
            }
            let num = Math.floor(Math.random()*(6 - 1) + 1)
            let arr = 'https://web.moocollege.com/mooc/hzq/pskin3/bg/'+num+'.jpg';
            return arr
        }
    }
}
</script>


<style lang="less" scoped>
.top{
   width: 1171px;
   background: #FFFFFF;
}
ul{
    padding: 30px 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li{
        width: 330px;
        height: auto;
        .logo{
            width: 101px;
            margin: 0 auto;
            margin-bottom: 8px;
        }
        .num{
            width: 222px;
            margin: 0 auto;
            margin-top: 13px;
        }
        .topmain{
            width: 100%;
            height: 185.4px;
            overflow: hidden;
            cursor: pointer;
            position: relative;
            >div{
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, rgba(0,0,0,0.8) 100%);
                border-radius: 0px 0px 5px 5px;
                padding: 11px;
                h3{
                    font-size: 18px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                }
                p{
                    display: inline-block;
                    margin-top: 7px;
                }
                .type{
                    width: 62px;
                    height: 20px;
                    line-height: 20px;
                    border: 1px solid #FFFFFF;
                    border-radius: 12px;
                    font-size: 12px;
                    color: #FFFFFF;
                    letter-spacing: 0.38px;
                    text-align: center;
                    margin-right: 8px;
                }
                .secretariat{
                    font-size: 14px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                }

            }
        }
        .topmain:hover{
            >img{
                transform: scale(1.1);
            }
        }


    }
    li.one{
        width: 432px;
        .logo{
            width: 136px;
        }
        .topmain{
            height: 243.2px;
        }
    }
    li.two{
        order: -1;
    }
}
</style>

