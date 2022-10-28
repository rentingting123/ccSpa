<template>
    <div>
        <!-- 轮播图 -->
        <banner :banners='datas && datas.banners || []'/>
        <!-- 数据 -->
        <!-- <nums :datas='datas && datas.nums || []'/> -->
        <!-- 精选说课 -->
        <!-- <live :datas='datas && datas.live || []'/> -->
        <!-- 优选好课 -->
        <course />
        <!-- 教发赋能 -->
        <div style="width: 1200px;margin: 0 auto;">
            <h2>教发赋能 <small @click="$router.push('/training')">更多</small> </h2>
            <training :datas='datas && datas.training || []'/>
        </div>
        <!-- 新闻 -->
        <news />
        <!-- 培训训练营 -->
        <!-- <online :datas='datas && datas.navs || []'/> -->
        <!-- 名师空间 -->
        <teacher :datas='datas && datas.teacher || []' />
        <!-- 合作院校 -->
        <school />
    </div>
</template>

<script>
import banner from '@/zjedu/components/banner'
import nums from './common/nums'
import course from './common/course'
import live from './common/live'
import training from './common/training'
import news from './common/news'
import online from './common/online'
import teacher from './common/teacher'
import school from './common/school'
import network from '@/api'

export default {
    components:{
        banner,
        nums,
        course,
        live,
        training,
        news,
        online,
        teacher,
        school,
    },
    data(){
        return{
            datas:{
                banners: [],
                nums: [],
                schools: [],
                navs: [],
                training: [],
            }
        }
    },
    async created(){
        let res = await network.getHomeData()
        if(res=='error') return;
        this.datas = res
    }
}
</script>

<style lang='less' scoped>
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
</style>