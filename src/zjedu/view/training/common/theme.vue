<template>
    <ul>
        <li v-for="item in datas" :key="item.id">
            <div class="toptitle">{{item.name}}</div>
            <div v-for="res in item.children" :key="res.id" class="children">
                <h4>
                    {{res.title}}
                    <small> <i class="iconfont">&#xe6e0;</i> 播放</small>
                </h4>
                <p>{{res.name}} {{res.mess}}</p>
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
    text-align: left;
    padding: 20px 16px;
    li{
        .toptitle{
            width: 100%;
            line-height: 40px;
            background: #1DBD76;
            text-align: center;
            font-size: 16px;
            font-weight: 500;
            color: #FFFFFF;
        }
        .children{
            border-bottom: 1px solid #D8D8D8;
            h4{
                font-size: 14px;
                font-weight: 500;
                color: #303132;
                line-height: 20px;
                margin: 14px 0 5px;
                small{
                    font-size: 14px;
                    font-weight: 500;
                    color: #3FBF8F;
                    line-height: 20px;
                    margin-left: 6px;
                    vertical-align: text-top;
                    cursor: pointer;
                }
            }
            p{
                font-size: 14px;
                font-weight: 400;
                color: #6F6F6F;
                line-height: 20px;
                padding-bottom: 11px;
            }
        }
    }
}
</style>