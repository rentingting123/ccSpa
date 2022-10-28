<template>
    <ul class="clearfix">
        <li v-for="(list,index) in lists" @click="todetail(list)" :key="list.id" :class="{'first':index==0}">
            <div class="on" v-if="index==0">
                <img :src="list.banner" width="100%" height="100%">
                <h3>{{list.name}}</h3>
                <p class="type" :class="{'type0':list.type==0,'type1':list.type==1,'type2':list.type==2}">{{list.type  | competitionType}}</p>
            </div>
            <div class="on1 clearfix" v-else>
                <div class="img">
                    <img :src="list.banner" width="100%" height="100%">
                </div>
                <div>
                    <h3>{{list.name}}</h3>
                    <p>{{list.sponsor}}</p>
                    <p class="type" :class="{'type0':list.type==0,'type1':list.type==1,'type2':list.type==2}">{{list.type  | competitionType}}</p>
                </div>
            </div>
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
        float: left;
        width: 280px;
        margin-right: 30px;
        cursor: pointer;
        .on{
            width: 100%;
            height: 350px;
            position: relative;
            h3{
                position: absolute;
                bottom: 0;
                left: 0;
                font-size: 16px;
                color: #FFFFFF;
                line-height: 20px;
                width: 100%;
                padding: 20px 12px 10px;
                background-image: linear-gradient(-180deg, rgba(0,0,0,0) 0, rgba(0,0,0,0.7) 70%);
                border-radius: 0px 0px 5px 5px;
            }
            .type{
                position: absolute;
                top: 24px;
                left: 0;
                width: 113px;
                height: 32px;
                line-height: 32px;
                font-size: 18px;
                color: #FFFFFF;
                text-align: center;
                background: #F5A623;
                border-radius: 1.57px;
                
            }
            
        }
        .on1{
            width: 100%;
            height: 154px;
            margin-bottom: 40px;
            .img{
                width: 110px;
                height: 155px;
                margin-right: 20px;
                float: left;
            }
            >div{
                float: left;
                width: 150px;
                h3{
                    font-size: 15px;
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
                    margin: 0;
                }
            }
        }
    }
    li.first{
        width: 250px;
    }
    li:nth-child(3n+1){
        margin-right: 0;
    }
    li:nth-child(1){
        margin-right: 40px;
    }
}
</style>


