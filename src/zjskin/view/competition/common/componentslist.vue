<template>
    <ul class="clearfix">
        <li v-for="list in lists" :key="list.id" @click="todetail(list)">
            <div class="img">
                <img :src="list.banner" width="100%" height="100%">
                <p :class="{'type0':list.type==0,'type1':list.type==1,'type2':list.type==2}">{{list.type | competitionType}}</p>
            </div>
            <h3>{{list.name}}</h3>
            <p>{{list.sponsor}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    props:['lists'],
    methods:{
        todetail(list){
            window.open(list.url)
        }
    }
}
</script>


<style lang="less" scoped>
ul{
    li{
        width: 160px;
        float: left;
        margin: 13px 49px 17px 0;
        cursor: pointer;
        .img{
            width: 160px;
            height: 224px;
            position: relative;
            border-radius: 4.38px;
            p{
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
        }
        h3{
            font-size: 15px;
            color: #4A4A4A;
            line-height: 25px;
            height: 50px;
            overflow: hidden;
            margin: 5px 0;
        }
        p{
            font-size: 12px;
            color: #9B9B9B;
            line-height: 18px;
            height: 18px;
            overflow: hidden;
        }
    }
    li:nth-child(4n){
        margin-right: 0;
    }
}
</style>

