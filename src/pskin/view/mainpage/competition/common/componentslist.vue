<template>
    <ul class="clearfix">
        <li v-for="(list,index) in lists" v-if="index<6" :class="{'no':index>2}" :key="list.id"  @click="todetail(list)">
            <div class="img">
                <img v-if="list.bannerOne" :src="list.bannerOne" width="100%" height="100%">
                <img v-else :src="require(`../../../../assets/bg/${Math.floor(Math.random()*(6 - 1) + 1)}.jpg`)" width="100%" height="100%">
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
    props:['lists'],
    components:{competitionType},
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
    }
}
</script>


<style lang="less" scoped>
ul{
    // padding-top: 13px;
    li{
        width: 270px;
        float: left;
        margin: 0 30px 50px 0;
        cursor: pointer;
        .img{
            width: 270px;
            height: 152px;
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
            font-size: 16px;
            color: #4A4A4A;
            line-height: 25px;
            height: 25px;
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
    li.no{
        margin-bottom: 0;
    }
    li:nth-child(3n){
        margin-right: 0;
    }
}
</style>

