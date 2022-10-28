<template>
    <div class="nav">
        <ul class="clearfix">
            <li v-for="item in data" :key="item.id" :class="{'on':item.id==1}">
                <a :href="'#' + item.for">{{item.name}}<p></p></a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[
                {
                    name:'首页',
                    id: '1',
                    for: '1'
                },
                {
                    name:'省级竞赛',
                    id: '2',
                    for: '2'
                },
                {
                    name:'理工',
                    id: '7',
                    for: '7'
                },
                {
                    name:'创新创业·技能',
                    id: '3',
                    for: '3'
                },
                {
                    name:'财经·法学',
                    id: '4',
                    for: '4'
                },
                {
                    name:'艺术·医学·文学·教师教学',
                    id: '5',
                    for: '5'
                },
                {
                    name:'直通国赛',
                    id: '6',
                    for: '6'
                }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.nav{
    width: 100%;
    height: 107px;
    font-size: 17px;
    color: #4A4A4A;
    text-align: center;
    ul{
        width: 1280px;
        height: 80px;
        margin: 0 auto 0;
        padding-top: 35px;
        li{
            float: left;
            max-width: 210px;
            margin: 0 46px;
            p{
                width:17px;
                border: 2px solid #4AA1F2;
                margin: 0 auto;
                margin-top: 5px;
                display: none;
            }
        }
        li.on{
            font-size: 25px;
            color: #4A4A4A;
            font-weight: bold;
            position: relative;
            top: -5px;
            a{
                p{
                    display: block;
                }
            }
        }
    }
}
</style>
