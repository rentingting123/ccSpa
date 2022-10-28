<template>
    <ul>
        <li v-for="item in datas" :key="item.id">
            <div class="avatar">
                <img :src="item.avatar" width="100%">
            </div>
            <div class="mainmess">
                <h4>{{item.name}}</h4>
                <p v-html="item.mess"></p>
            </div>
        </li>
    </ul>
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
ul{
    background: #F8F8FB;
}
li{
    width: 100%;
    background: #fff;
    padding: 20px 24px;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    .avatar{
        width: 89px;
        height: 89px;
        border-radius: 100%;
        margin-right: 20px;
    }
    .mainmess{
        width: 705px;
        height: auto;
        text-align: left;
        h4{
            font-size: 20px;
            font-weight: 800;
            color: #4A4A4A;
            line-height: 24px;
        }
        p{
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 24px;
            margin-top: 9px;
        }
    }

}
</style>