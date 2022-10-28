<template>
    <div class="certificate">
        <ul class="clearfix">
            <li v-for="(img,index) in imgs" :key="index">
                <img :src="img.url" >
                <p>{{img.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            imgs:[
                {
                    name:'国家级信息安全认证',
                    url: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/certificate/pic1.svg',
                    id: 1
                },
                {
                    name:'多维度满足主办方需求',
                    url: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/certificate/pic2.svg',
                    id: 2
                },
                {
                    name:'赋能主办方提升运营力',
                    url: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/certificate/pic3.svg',
                    id: 3
                }               
                
            ]
        }
    }
}
</script>



<style lang="less" scoped>
.certificate{
    width: 100%;
    height: 166px;
    background: #203343;
    ul{
        width: 1100px;
        margin: 0 auto;
        li{
            height: 84px;
            line-height: 84px;
            float: left;
            width: 300px;
            margin: 40px 25px;
            border: 1px solid #FFFFFF;
            img{
                float: left;
                width: 50px;
                height: 50px;
                margin: 17px 22px;
            }
            p{
                display: inline-block;
                text-align: left;
                color: #FFFFFF;
                width: 200px;
                font-size: 18px;
            }
        }
    }
}
</style>
