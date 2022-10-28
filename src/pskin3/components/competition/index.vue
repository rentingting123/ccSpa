<template>
    <div class="competitionlist" @click="toHref">
        <div class="competitionlistimg"><img :src='data.bannerOne | imgsrc' width="100%" height="100%"/></div>
        <div class="competitionlistright">
            <h3 class="dian">{{data.name}}</h3>
            <p class="competitionlistsponsor dian2">{{data.descrption}}</p>
            <div class="competitionlisttype">
              <competitionType :type='data.type' class="competiotiontype"/>
              {{data.secretariat}}
            </div>
        </div>
     </div>
</template>

<script>
import competitionType from '../competitionType'
import network from "@/api/index";
export default {
    props:['data'],
    components:{
        competitionType
    },
    methods:{
        async toHref(){
            let url = this.data.url
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
.competitionlist{
    width: 518px;
    height: 90px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    cursor: pointer;
    &:hover{
        img{
            transform: scale(1.1);
        }
    }
    .competitionlistimg{
        width:160px;
        height:90px;
        overflow: hidden;
    }
    .competitionlistright{
        margin-left: 16px;
        width: 342px;
        height: 90px;
        text-align: left;
        h3{
            font-size:15px;
            font-weight:bold;
            color:rgba(74,74,74,1);
            line-height:1;
        }
        .competitionlistsponsor{
            margin: 10px 0 7px;
            width: 100%;
            height:40px;
            font-size:13px;
            font-weight:400;
            color:rgba(145,145,145,1);
            line-height:20px;
        }
        .competitionlisttype{
            font-size:13px;
            font-weight:400;
            color:rgba(145,145,145,1);
            line-height:16px;
            display: inline-flex;
            .competiotiontype{
                margin-right: 8px;
            }
        }

    }
}
</style>