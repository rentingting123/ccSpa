<template>
    <div class="mytrain">
        <el-input placeholder="请输入内容" class="search" v-model="search">
            <template slot="append">搜索</template>
        </el-input>
        <ul>
            <li v-for="list in lists" class="clearfix">
                <img :src="list.img" alt="" srcset="">
                <div>
                    <h2 v-html="list.name"></h2>
                    <p>
                        培训时间 <span v-html="list.time"></span>
                    </p>
                    <p>
                        培训地点 <i ></i><span v-html="list.address"></span>
                    </p>
                    <el-button type="primary" disabled size="small" round>报名缴费</el-button>
                    <el-button type="primary" disabled size="small" round>证书下载</el-button>
                    <el-button  size="small" disabled round>申请发票</el-button>
                    <el-button  size="small" disabled round>查看发票</el-button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            search: '',
            lists:[
                {
                    img: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/banner/banner1.jpg',
                    name:'2019年浙江省第九届会展策划创意大赛',
                    time: '2019-08-08 13:00~2019-08-08 18:00',
                    address: '浙江省杭州市浙江外国语学院'
                },
                {
                    img: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/banner/banner1.jpg',
                    name:'2019年浙江省第九届会展策划创意大赛',
                    time: '2019-08-08 13:00~2019-08-08 18:00',
                    address: '浙江省杭州市浙江外国语学院'
                },
                {
                    img: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/banner/banner1.jpg',
                    name:'2019年浙江省第九届会展策划创意大赛',
                    time: '2019-08-08 13:00~2019-08-08 18:00',
                    address: '浙江省杭州市浙江外国语学院'
                },
                {
                    img: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/banner/banner1.jpg',
                    name:'2019年浙江省第九届会展策划创意大赛',
                    time: '2019-08-08 13:00~2019-08-08 18:00',
                    address: '浙江省杭州市浙江外国语学院'
                },

            ]
        }
    }
}
</script>

<style lang="less" scoped>
.mytrain{
    padding: 40px;
    .search{
        width: 256px;
    }
    ul{
        li{
            margin-top: 40px;
            img{
                width: 240px;
                height: 135px;
                float: left;
                margin-right: 17px;
            }
            >div{
                width: 675px;
                // height: 135px;
                float: left;
                h2{
                    font-size: 24px;
                    color: #4A4A4A;
                    letter-spacing: 2.18px;
                    margin-bottom: 10px;
                }
                p{
                    font-size: 16px;
                    color: #4A4A4A;
                    letter-spacing: 1.45px;
                    margin-bottom: 14px;
                }
            }
        }
    }
}
</style>