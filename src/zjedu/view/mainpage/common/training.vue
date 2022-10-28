<template>
    <div class="course">
        <ul >
            <li v-for="item in datas" :key="item.id" >
                <div class="img">
                    <img :src="item.bannerUrl" width="100%" height="100%">
                </div>
                <div class="name dian2" v-html="item.name"></div>
                <div class="button" @click="toDetail(item)">
                    点击进入报名
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['datas'],
    data(){
        return{

        }
    },
    methods:{
        toDetail(item){
            this.$router.push('/training/'+item.id)
        }
    }
}
</script>

<style lang='less' scoped>
.course{
    width: 1200px;
    margin: 0 auto;
    
    ul{
        margin-top: 21px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        li{
            width: 585px;
            height: 214px;
            overflow: hidden;
            margin-bottom: 30px;
            position: relative;
            .img{
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
            .name{
                position: relative;
                z-index: inherit;
                width: 294px;
                height: 66px;
                font-size: 24px;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 33px;
                margin: 31px 0 0 21px;
                text-align: left;
            }
            .button{
                font-size: 14px;
                font-weight: 400;
                color: #4A4A4A;
                text-align: center;
                width: 120px;
                height: 32px;
                line-height: 32px;
                background: #FFFFFF;
                border-radius: 32px;
                position: relative;
                z-index: inherit;
                margin: 56px 0 0 21px;
                cursor: pointer;
            }   
        }
    }
}
</style>