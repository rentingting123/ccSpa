<template>
    <ul>
        <li v-for="list,index in lists" :key="list.id"  v-if="index<3" @click="todetail(list)">
            <div class="img">
                <img :src="list.bannerOne | imgsrc" width="100%" height="100%">
            </div>
            <h3 class="ellipse" :title="list.name">{{list.name}}</h3>
            <div class="mess">
                <competitionType :type="list.type" />
                <p class="dian">{{list.secretariat}}</p>
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
    li{
        width: 370px;
        margin: 0 30px 30px 0;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        .img{
            width: 370px;
            height: 208.3px;
            position: relative;
            border-radius: 3.63px;
            overflow: hidden;
        }
        .img:hover{
            img{
                transform: scale(1.1)
            }
        }
        h3{
            font-size: 20px;
            color: #4A4A4A;
            line-height: 28px;
            height: 28px;
            overflow: hidden;
            margin: 5px 0;
        }
        .mess{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 18px;
            height: 18px;
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

