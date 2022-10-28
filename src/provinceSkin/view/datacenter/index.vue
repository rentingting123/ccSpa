<template>
    <div class="datacenter">
        <h1><i class="iconfont">&#xe629;</i>数据中心</h1>
        <div class="datamain">
            <ul class="clearfix">
                <li v-for="list in lists" @click="todetail(list)">
                    <i class="el-icon-location-outline"></i>
                    {{list.name}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lists:[
                {
                    name: '浙江省',
                    url: ''
                },
                {
                    name: '新疆维吾尔自治区',
                    url: ''
                },
                {
                    name: '宁夏回族自治区',
                    url: ''
                },
                {
                    name: '广西壮族自治区',
                    url: ''
                },
                {
                    name: '浙江省',
                    url: ''
                },
                {
                    name: '浙江省',
                    url: ''
                },
                {
                    name: '浙江省',
                    url: ''
                },
                {
                    name: '浙江省',
                    url: ''
                },
                {
                    name: '浙江省',
                    url: ''
                },
            ]
        }
    },
    methods:{
        todetail(item){
            let url = item.url;
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
        }
    }
}
</script>

<style lang="less" scoped>
.datacenter{
    margin-top: 50px;
    h1{
        width: 1170px;
        margin: 0 auto;
        font-size: 25px;
        color: #4A4A4A;
        text-align: left;
        i{
            font-size: 16px;
            color: #0078E2;
            margin-right: 20px;
        }
    }
    .datamain{
        width: 100%;
        padding: 37px 0 12px;
        background: #F9FAFB;
        ul{
            width: 1120px;
            display: block;
            margin: 0 auto;
            li{
                width: 160px;
                float: left;
                margin-bottom: 30px;
                font-size: 14px;
                color: #747474;
                letter-spacing: 1px;
                line-height: 20px;
                cursor: pointer;
                text-align: left;
            }
        }
    }
}
</style>