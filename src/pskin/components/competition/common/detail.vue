<template>
    <ul class="clearfix">
        <li v-for="(list,index) in lists" @click="todetail(list)" :key="list.id">
            <div class="img">
                <img :src="list.bannerOne | imgsrc" width="100%" height="100%">
            </div>
            <div class="message">
                <h3 class="dian" :title="list.name">{{list.name}}</h3>
                <div class="clearfix">
                    <competitionType :type="list.type" />
                    <p class="dian" :title="list.secretariat">{{list.secretariat}}</p>
                </div>
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
    margin-bottom: -50px;
    text-align: left;
    li{
        float: left;
        width: 270px;
        height: 204px;
        overflow: hidden;
        margin-right: 30px;
        margin-bottom: 50px;
        cursor: pointer;
        .img{
            width: 270px;
            height: 152px;
            border-radius: 3.36px;
            overflow: hidden;
        }
        .img:hover{
            img{
                transform: scale(1.1)
            }
        }
        .message{
            width: 100%;
            h3{
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 0;
                margin: 7px 0 4px;
            }
            >div{
                font-size: 14px;
                color: #4C4C4C;
                letter-spacing: 0;
                line-height: 20px;
                p{
                    float: left;
                }
                .dian{
                    width: 206px;
                }
            }
        }

        
    }
    li:nth-child(4n){
        margin-right: 0;
    }
}
</style>
