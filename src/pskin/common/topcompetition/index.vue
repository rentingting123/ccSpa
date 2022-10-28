<template>
    <ul class="clearfix">
        <li v-for="(list,index) in lists" @click="todetail(list)" :key="list.id" class="clearfix" @mouseover="hover=index">
            <img class="prize" v-if="index==0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/1.png"/>
            <img class="prize" v-else-if="index==1" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/2.png"/>
            <img class="prize" v-else-if="index==2" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/3.png"/>
            <div v-else class="num">
                0{{index+1}}
            </div>
            <div class="topmain">
                <div class="img" v-if="index==hover">
                    <img :src="list.bannerOne | imgsrc" width="100%" height="100%">
                </div>
                <div class="message">
                    <h3 class="dian" :title="list.name">{{list.name}}</h3>
                    <div class="clearfix">
                        <competitionType :type="list.type" />
                        <p class="dian" :title="list.secretariat">{{list.secretariat}}</p>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import network from '@/api/index'
import competitionType from '@/pskin/components/competitionType'
export default {
    components:{competitionType},
    props:['lists'],
    data(){
        return{
            hover: 0,
        }
    },
    methods:{
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
ul{
    li{
        margin: 0 0 30px 0;
        cursor: pointer;
        .prize{
            width: 30px;
            height: 30px;
            float: left;
            margin-right: 8px;
        }
        .num{
            width: 30px;
            height: 30px;
            border-radius: 100%;
            line-height: 30px;
            margin-right: 8px;
            float: left;
            text-align: center;
            font-size: 15px;
            color: #9B9B9B;
            letter-spacing: 0.5px;
        }
        .topmain{
            width: 170px;
            float: left;
            .img{
                width: 170px;
                height: 93px;
                margin-bottom: 8px;
                border-radius: 3.36px;
                overflow: hidden;
            }
            .message{
                h3{
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 0;
                }
                >div{
                    font-size: 13px;
                    color: #4C4C4C;
                    letter-spacing: 0;
                    line-height: 18px;
                    margin-top: 4px;
                    p{
                        float: left;
                    }
                    .dian{
                        width: 106px;
                    }
                }
            }
        }

    }
    li:nth-child(5n){
        margin-bottom: 20px;
    }
}
</style>

