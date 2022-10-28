<template>
    <ul>
        <li v-for="list,index in lists" :key="list.id"  @click="todetail(list)">
            <div class="img">
                <img :src="list.bannerOne | imgsrc" width="100%" height="100%">
            </div>
            <h3 class="ellipse" :title="list.name">{{list.name}}</h3>
            <div class="mess">
                <competitionType :type="list.type" />
                <p class="dian">{{list.secretariat}}</p>
            </div>
            <!-- 210401,无数据暂时要求隐藏 -->
            <!-- <img  v-if="list.sort==0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/省A.svg" alt="" srcset="">
            <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/其他.svg" alt="" srcset=""> -->
        </li>
    </ul>
</template>

<script>
import network from '@/api/index'
import competitionType from '@/pskin/components/competitionType'
export default {
    components:{competitionType},
    props:['lists'],
    created(){
        console.log(this.lists)
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
        width: 270px;
        margin: 0 30px 30px 0;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        position: relative;
         >img{
            position: absolute;
            top: 0;
            right: 0;
        }
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
    li:nth-child(4n){
        margin-right: 0;
    }
}
</style>

