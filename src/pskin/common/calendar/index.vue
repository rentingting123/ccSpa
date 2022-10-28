<template>
    <ul class="clearfix">
        <li v-for="(item,index) in lists" :key="item.id" @click="todetail(item)" v-if="index<3">
            <div class="img">
                <img :src="item.bannerOne | imgsrc" width="100%" height="100%">
            </div>
            <h3 :title="item.name" class="dian">{{item.name}}</h3>
            <div class="message">
                <competitionType :type="item.type" />
                <p class="dian" :title="item.secretariat">{{item.secretariat}}</p>
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
    width: 100%;
    li{
        width: 250px;
        height: auto;
        float: left;
        text-align: left;
        margin-right: 21px;
        cursor: pointer;
        .img{
            width: 250px;
            height: 141px;
            position: relative;
            border-radius: 3.36px;
            overflow: hidden;
            p{
                position: absolute;
                top: 42px;
                width: 100%;
                padding: 0 16px;
                font-size: 16px;
                color:#ffffff;
                text-align: center;
                font-weight: 500;
                text-shadow: 2px 1px 8px #000;
            }
        }
        .img:hover{
            img{
                transform: scale(1.1)
            }
        }
        h3{
            font-size: 16px;
            color: #4A4A4A;
            line-height: 25px;
            max-height: 50px;
            overflow: hidden;
            margin: 5px 0;
        }
        .message{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 20px;
            height: 20px;
            overflow: hidden;
            p{
                display: inline-block;
                vertical-align: middle;
            }
            .dian{
                width: 150px;
            }
        }
    }
    li:nth-child(3n){
        margin-right: 0;
    }
}
</style>