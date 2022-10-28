<template>
    <div class="provincialcenter">
        <h title='省级数据平台'>
            <el-tooltip class="item" effect="dark" content="点击省、市、自治区名称，直达各省数据中心" placement="right-end">
                    <i class="iconfont">&#xe656;</i>
            </el-tooltip>
            <span class="more" @click="$router.push('/hotmap')">省级赛事热力图</span>
        </h>

        <ul>
            <li v-for="list in lists" :key="list.id" >
                <p class="dian" @click="todetal(list)" :class="{'on':list.url}">
                    <i></i>{{list.province}}
                </p>
            </li>
        </ul>

    </div>
</template>

<script>
import network from '@/api/index'
import h from '@/nskin/components/h'
export default {
    components:{
        h,
    },
    data(){
        return{
            lists:[]
        }
    },
    created(){
        this.init()
    },
    methods:{
        todetal(list){
            if(!list.url) return;
            let url = list.url
            url = url.indexOf('http') == -1 ? 'http://' + url.trim() : url
            window.open(url)
        },
        async init(){
            let res = await network.provincialCenter({data:{
                provinceId: 1
            }});
            if(res == 'error') return;
            var arr = []
            for(let i in res){
                if(!(res[i].province=='香港特别行政区' || res[i].province=='澳门特别行政区' || res[i].province=='台湾省' ||res[i].province=='中国' || res[i].province=='亚太' || res[i].province=='国际')){
                    res[i].url ? res[i].sort=1 : res[i].sort = 0
                    arr.push(res[i])
                }
            }
            arr.sort((a,b)=>{
                return a.sort == b.sort ? 0: a.sort < b.sort ? 1 : -1
            })
            this.lists = arr;
        }
    }
}
</script>

<style lang="less" scoped>
.provincialcenter{
    width: 1200px;
    height: auto;
    margin: 0 auto;
    .more{
        font-size: 18px;
        line-height: 24px;
        color: #252223;
        opacity: 0.53;
        float: right;
    }
    ul{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 25px 19px;
        background: #F2F7F7;
        margin-top: 11px;
        li{
            flex: 0 0 10%;
            margin-top: 6px;
            text-align: left;
            p{
                cursor: pointer;
                width: 100px;
                font-size: 18px;
                color: #9C9C9C;
                letter-spacing: 1px;
                line-height: 33px;
                i{
                    width: 4px;
                    height: 4px;
                    background: #131313;
                    border-radius: 100%;
                    margin-right: 8px;
                    display: inline-block;
                    vertical-align: middle;
                }
                &:hover{
                    cursor: no-drop;
                }
                &.on{
                    color: #131313;
                    font-weight: bold;
                    cursor: pointer;
                    &:hover{
                        color: #ED1E26;
                        font-weight: bold;
                        i{
                            background: #ED1E26;
                        }
                    }
                }
            }
        }
    }
}
</style>