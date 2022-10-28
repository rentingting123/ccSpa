<template>
    <ul>
        <li v-for="list in lists" :key="list.id" @click="todetail(list)">
            <div class="on clearfix">
                <div class="img">
                    <img v-if="list.banner" :src="list.banner" width="100%" height="100%">
                    <div v-else>
                        <img :src="require(`../../assets/bg/${Math.floor(Math.random()*(6 - 1) + 1)}.jpg`)"  width="100%" height="100%">
                    </div>
                </div>
                <div>
                    <h3>{{list.name}}</h3>
                    <p>{{list.secretariat}}</p>
                    <p class="type" :class="{'type0':list.type==0|| !list.type,'type1':list.type==1,'type2':list.type==2}">{{list.type  | competitionType}}</p>
                </div>
            </div>
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
    li{
        width: 100%;
        text-align: left;
        float: left;
        margin-top: 30px;
        cursor: pointer;
        .on{
            width: 100%;
            .img{
                width: 76px;
                height: 106px;
                margin-right: 11px;
                float: left;
            }
            >div{
                float: left;
                width: 175px;
                h3{
                    font-size: 16px;
                    color: #4A4A4A;
                    line-height: 25px;
                    max-height: 50px;
                    overflow: hidden;
                    margin: 5px 0;
                }
                p{
                    font-size: 12px;
                    color: #9B9B9B;
                    line-height: 18px;
                    max-height: 18px;
                    overflow: hidden;
                    margin: 5px 0;
                }
                .type{
                    height: 20px;
                    width: 72px;
                    background: #F5A623;
                    border-radius: 1px;
                    font-size: 14px;
                    color: #FFFFFF;
                    text-align: center;
                    margin:0;
                }
            }
        }
    }
}
</style>
