<template>
    <ul>
        <li v-for="list in lists" :key="list.id" @click="toNews(list)">
            <div class="img">
                <img :src="list.newsIcon" width="100%" height="100%">
            </div>
            <p class="dian">{{list.competitionName}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['lists','type'],
    methods:{
        toNews(list){
            this.$router.push('/details/'+list.id+'?type='+this.type)
        }
    }
}
</script>

<style lang='less' scoped>
ul{
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    li{
        width: 262px;
        height: 191px;
        background: #FFFFFF;
        border: 1px solid #E8E7E7;
        cursor: pointer;
        margin-top: 20px;
        &:hover{
            img{
                transform: scale(1.1);
            }
        }
        .img{
            width: 262px;
            height: 150px;
            overflow: hidden;
        }
        p{
            width: 100%;
            font-size: 15px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 41px;
            letter-spacing: 1px;
            text-align: center;
            padding: 0 10px;
        }
    }
}
</style>