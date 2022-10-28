<template>
    <div class="school">
       <h2Title title='校赛合作院校' />
       <ul>
           <li v-for="school in schoolList" :key="school.id">
               <img :src="school.logo" :title='school.name' @click="toHref(school)"/>
           </li>
       </ul>
    </div>
</template>

<script>
import h2Title from '../h2'
export default {
    components:{
        h2Title
    },
    data(){
        return{
            schoolList: [
                {
                    "id": 36113,
                    "logo": "https://mycloudedu-image-center.oss-cn-hangzhou.aliyuncs.com/v2_customer/PpstC1yPF1ZDMQnGaAahiHQw42LD9pQfGT6enAPdJPZA4CPSyCiqptkv9jRShvds_1484119950038.png",
                    "name": "浙江大学",
                    "introduction": null,
                    "url": "http://www.zju.edu.cn"
                },
                {
                    "id": 36126,
                    "logo": "https://mycloudedu-image-center.oss-cn-hangzhou.aliyuncs.com/v2/org/logo2/2821",
                    "name": "温州大学",
                    "introduction": null,
                    "url": "http://www.wzu.edu.cn/"
                },
                {
                    id: 36131,
                    introduction: null,
                    logo: "https://mycloudedu-image-center.oss-cn-hangzhou.aliyuncs.com/v2/org/logo2/3400",
                    name: "中国计量大学",
                    url: "http://www.cjlu.edu.cn/"
                },
                {
                    "id": 36114,
                    "logo": "https://mycloudedu-image-center.oss-cn-hangzhou.aliyuncs.com/v2/org/logo2/1500",
                    "name": "杭州电子科技大学",
                    "introduction": null,
                    "url": "http://www.hdu.edu.cn/"
                },
                {
                    "id": 36115,
                    "logo": "https://mycloudedu-image-center.oss-cn-hangzhou.aliyuncs.com/v2/org/logo2/1240",
                    "name": "浙江工业大学",
                    "introduction": null,
                    "url": "http://www.zjut.edu.cn/"
                },
                {
                    id: 36128,
                    introduction: null,
                    logo: "https://mycloudedu-image-center.oss-cn-hangzhou.aliyuncs.com/v2/org/logo2/1242",
                    name: "浙江工商大学",
                    url: "http://www.zjgsu.edu.cn/"
                },
                {
                    id: 36144,
                    introduction: null,
                    logo: "https://mycloudedu-image-center.oss-cn-hangzhou.aliyuncs.com/v2/org/logo2/1212",
                    name: "浙大城市学院",
                    url: "http://www.zucc.edu.cn/"
                },
            ],
        }
    },
    methods:{
        toHref(item){
            window.open(item.url)
        }
    }
}
</script>


<style lang="less" scoped>
.school{
    width: 1100px;
    margin: 0 auto;
    margin-top: 27px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(227,227,227,0.94);
    ul{
        text-align: left;
        padding: 22px 60px;
        li{
            display: inline-block;
            vertical-align: top;
            width:125px;
            height:89px;
            margin-right: 17px;
            margin-top: 17px;
            text-align: center;
            line-height: 89px;
            cursor: pointer;
            &:nth-child(7n){
                margin-right: 0;
            }
            &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6),&:nth-child(7){
                margin-top: 0;
            }
            img{
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
}
</style>
