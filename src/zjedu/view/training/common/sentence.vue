<template>
    <ul>
        <li v-for="item in datas" :key="item.id">
            <div class="mess">{{item.mess}}</div>
            <h4>{{item.name}}</h4>
            <p>{{item.introduce}}</p>
            <div class="img">
                <img :src="item.image" >
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
    text-align: left;
    li{
        display: inline-block;
        vertical-align: top;
        width: 272px;
        height: 236px;
        background: #FFFFFF;
        border-radius: 2px;
        overflow: hidden;
        padding: 17px 20px;
        margin: 0 18px 20px 0;
        position: relative;
        &:nth-child(3n){
            margin-right: 0;
        }
        .mess{
            font-size: 16px;
            font-weight: 400;
            color: #425172;
            line-height: 24px;
            height: 120px;
            overflow: hidden;
            &::before{
                content: '“';
                font-size: 32px;
                color: rgba(0, 0, 0, 0.4);
                display: block;
                line-height: 16px;
            }
            &::after{
                content: '”';
                font-size: 32px;
                color: rgba(0, 0, 0, 0.4);
                display: block;
                line-height: 16px;
                text-align: right;
            }
        }
        h4{
            font-size: 16px;
            font-weight: 600;
            color: #4A4A4A;
            line-height: 24px;
            margin: 0 0 4px;
        }
        >p{
            font-size: 12px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 22px;
        }
        .img{
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                max-width: 100%;
                max-height: 100%;
            }
        }
        
        &:hover{
            .img{
                display: block;
            }
        }
    }
}
</style>