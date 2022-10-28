<template>
    <div class="course">
        <h2>优选好课 <small @click="$router.push('/course')">更多</small> </h2>
        <ul>
            <li v-for="item in datas" :key="item.id">
                <courselist :item='item' />
            </li>
        </ul>
    </div>
</template>

<script>
import courselist from '@/zjedu/components/courselist'
import network from '@/api'
export default {
    components:{
        courselist
    },
    props:[''],
    data(){
        return{
            datas: []
        }
    },
    async created(){
        let res = await network.getZjeduCourse({data:{
            type: 1,
            page: 1,
            size: 8
        }});
        if(res=='error') return;
        this.datas = res && res.data || []
    }
}
</script>

<style lang='less' scoped>
.course{
    width: 1200px;
    margin: 20px auto 0;
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
            height: 280px;
            margin-right: 26px;
            margin-bottom: 30px;
            &:nth-child(4n){
                margin-right: 0;
            }
        }
    }
}
</style>