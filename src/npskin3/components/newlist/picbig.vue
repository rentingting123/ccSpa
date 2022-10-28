<template>
    <ul>
        <li v-for="list in lists" :key="list.id" @click="toNews(list)">
            <div class="img">
                <img :src="list.newsIcon" width="100%" height="100%">
            </div>
            <p>{{list.competitionName}}</p>
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
        width: 401px;
        height: 392px;
        cursor: pointer;
        margin-top: 24px;
        position: relative;
        &:hover{
            img{
                transform: scale(1.1);
            }
        }
        .img{
            width: 401px;
            height: 392px;
            overflow: hidden;
        }
        p{
            width: 100%;
            background: rgba(74, 74, 74, 0.88);
            font-size: 14px;
            font-weight: 400;
            color: #ffffff;
            line-height: 18px;
            letter-spacing: 1px;
            text-align: left;
            padding: 15px 10px;
            position: absolute;
            bottom: 0;
            left: 0;
        }
    }
}
</style>