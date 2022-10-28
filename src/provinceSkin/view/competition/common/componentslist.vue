<template>
    <ul class="clearfix">
        <li v-for="list,index in lists" :class="{'no':index>3}" :key="list.id"  @click="todetail(list)">
            <div class="img">
                <img v-if='list.banner' :src="list.banner" width="100%" height="100%">
                <div v-else>
                    <img :src="require(`../../../assets/bg/${Math.floor(Math.random()*(6 - 1) + 1)}.jpg`)" width="100%" height="100%">
                    <p>{{list.name}}</p>
                </div>
                <p :class="{'type0':list.type==0|| !list.type,'type1':list.type==1,'type2':list.type==2}">{{list.type | competitionType}}</p>
            </div>
            <h3>{{list.name}}</h3>
            <p>{{list.secretariat}}</p>
        </li>
    </ul>
</template>

<script>
import network from '@/api/index'
export default {
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
    }
}
</script>


<style lang="less" scoped>
ul{
    // padding-top: 13px;
    li{
        width: 160px;
        float: left;
        margin: 0 49px 17px 0;
        cursor: pointer;
        .img{
            width: 160px;
            height: 224px;
            position: relative;
            border-radius: 4.38px;
            >p{
                position: absolute;
                left: 0;
                top: 16px;
                height: 20px;
                width: 72px;
                background: #F5A623;
                border-radius: 1px;
                font-size: 14px;
                color: #FFFFFF;
                text-align: center;
            }
            >div{
                p{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    top: 48px;
                    padding: 0 18px;
                    font-size: 18px;
                    font-weight: 500;
                    color: #FFFFFF;
                    text-align: center;
                    text-shadow: 2px 1px 8px #000;
                }
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
        >p{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 18px;
            height: 18px;
            overflow: hidden;
        }
    }
    li.no{
        margin-bottom: 0;
    }
    li:nth-child(4n){
        margin-right: 0;
    }
}
</style>

