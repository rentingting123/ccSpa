<template>
    <div class="compony">
        <ul >
            <li v-for="item in datas && datas.children" :key="item.id">
                <img :src="item.image" alt="">
            </li>
        </ul>
        <p>{{datas && datas.mess}}</p>
    </div>
</template>

<script>
export default {
    props: ['datas'],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
.compony{
    background: #fff;
    padding: 20px 24px;
    text-align: left;
    li{
        display: inline-block;
        vertical-align: top;
        
    }
    p{
        font-size: 14px;
        font-weight: 400;
        color: #4A4A4A;
        line-height: 24px;
        margin-top: 20px;
    }
}
</style>