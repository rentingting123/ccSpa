<template>
    <div class="online">
        <!-- 轮播图 -->
        <banner :banners='banners'/>
        <h2>新商业</h2>
        <div class="coursemain">
            <div v-for="item in businessNavs" :key="item.id">
                <course :item='item'/>
            </div>
        </div>
        <h2>新技术</h2>
        <div class="coursemain last">
            <div v-for="item in technologyNavs" :key="item.id">
                <course :item='item'/>
            </div>
        </div>
    </div>
</template>

<script>
import banner from '@/zjedu/components/banner'
import course from '@/zjedu/components/courselist'
import network from '@/api'
export default {
    components:{
        course,
        banner,
    },
    data(){
        return{
            businessNavs:[],
            technologyNavs: [],
            banners:[],
        }
    },
    async created(){
        let res = await network.getZjeduOnline();
        if(res=='error') return;
        this.banners = res && res.banners || []
        // this.businessNavs = res && res.businessNavs || []
        // this.technologyNavs = res && res.technologyNavs || []
    },
    methods:{
    }
}
</script>

<style lang='less' scoped>
.online{
    h2{
        width: 1200px;
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        margin: 36px auto 16px;
        text-align: left;
    }
    .coursemain{
        width: 1200px;
        margin: 0 auto;
        text-align: left;
        >div{
            width: 280px;
            height: auto;
            margin-right: 26px;
            margin-top: 30px;
            display: inline-block;
            vertical-align: top;
            &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4){
                margin-top: 0;
            }
            &:nth-child(4n){
                margin-right: 0;
            }
        }
        &.last{
            margin-bottom: 30px;
        }
    }
}
</style>