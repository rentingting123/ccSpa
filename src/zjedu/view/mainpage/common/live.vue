<template>
    <div class="course">
        <h2>精选说课</h2>
        <ul >
            <li v-for="item in datas" :key="item.id" @click="toHref(item)">
                <div class="img">
                    <img :src="item.image" width="100%" height="100%">
                </div>
                <div class="name dian2">
                    {{item.name}}
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
        toHref(item){
            if(item && item.url){
                window.open(item.url)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.course{
    width: 1200px;
    margin: 38px auto 0;
    h2{
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        margin: 0  auto;
        text-align: left;
        small{
            float: right;
            font-size: 16px;
            font-weight: 400;
            color: #303132;
            line-height: 37px;
            opacity: 0.4;
            cursor: pointer;
        }
    }
    ul{
        margin-top: 21px;
        li{
            display: inline-block;
            vertical-align: top;
            width: 280px;
            height: auto;
            margin-right: 26px;
            margin-bottom: 30px;
            cursor: pointer;
            &:nth-child(4n){
                margin-right: 0;
            }
            .img{
                width: 100%;
                height: 155px;
                overflow: hidden;
                &:hover{
                    img{
                        transform: scale(1.01);
                    }
                }
            }
            .name{
                padding: 11px 17px;
                border: 1px solid #E0E0E0;
                border-top: none;
                font-size: 16px;
                font-weight: bold;
                color: #4A4A4A;
                line-height: 22px;
                min-height: 67px;
                text-align: left;
            }
        }
    }
}
</style>