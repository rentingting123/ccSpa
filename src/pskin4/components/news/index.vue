<template>
    <div class="newslistss" :class="index==0?'first':''" @click="tonewsdetail(lists)">
        <span></span>
        <p v-if="lists.provinceType=='0'">国</p>
        <p v-else class="newsprovince">省</p>
        <div class="dian" :class="time?'on':''">{{lists.newsTitle}}</div>
        <i v-if="time">{{lists.newsDate}}</i>
    </div>
</template>

<script>
export default {
    props:['lists','index','time'],
    methods:{
        tonewsdetail(item){
            let routeUrl = this.$router.resolve({
                path: "/newsdetail",
                query: {id:item.id}
            });
            window.open(routeUrl .href, '_blank');
        }
    }
}
</script>

<style lang="less" scoped>
.newslistss{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    cursor: pointer;
    &.first{
        span{
             background:rgba(219,67,83,1);
        }
        div{
            font-weight: bold;
        }
    }
    span{
        display: block;
        width:4px;
        height:4px;
        margin-top: 5px;
        background: #7195B7;
    }
    p{
        width:16px;
        height:15px;
        background:rgba(219,39,61,1);
        border-radius:1px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:15px;
        letter-spacing:1px;
        font-size: 12px;
        text-align: center;
        margin: 0 8px;
        &.newsprovince{
            background: #006EE6;
        }
    }
    div{
        width:298px;
        font-size:14px;
        color:rgba(74,74,74,1);
        line-height:15px;
        text-align: left;
        &.on{
            width: 600px;
        }
    }
    i{
        font-size:12px;
        line-height:15px;
        color:rgba(155,155,155,1);
        font-style: normal;
        margin-left: 40px;
    }
}
</style>