<template>
    <div class="training">
        <!-- 轮播图 -->
        <banner :banners='banners'/>
        <!--  -->
        <h2>教发赋能</h2>
        <p class="mess">{{mess}}</p>
        <training :datas='datas'/>
        <h2>专 题 系 列</h2>
        <img src="http://web.moocollege.com/mooc/hzq/zjedu/training/nav2.png" width="742px" >
        <h2>定制服务流程</h2>
        <img src="http://web.moocollege.com/mooc/hzq/zjedu/training/nav3.png" width="940px" >
    </div>
</template>

<script>
import network from '@/api'
import banner from '@/zjedu/components/banner'
import train from '@/zjedu/components/train'
import training from '@/zjedu/view/mainpage/common/training'
export default {
    components:{
        banner,
        train,
        training,
    },
    data(){
        return{
            datas: [],
            page: 1,
            size: 8,
            banners:[],
            mess: '杭州简学科技有限公司作为高校教师教学发展研究专家工作组成员和高校竞赛评估与管理体系研究专家工作组成员，与浙江大学、爱课程网、中国高等教育培训中心等开展广泛的战略合作，拥有强大专家库资源，通过整合国内外优秀课程资源以教学研讨会、工作坊、线上直播等的方式，提升教师教学发展水平。',
            
        }
    },
    created(){
        this.getData()
    },
    methods:{
        async getData(){
            let res = await network.getZjeduTraining({data:{
                page: this.page,
                size: this.size
            }})
            if(res=='error') return;
            this.datas = res && res.list || []
            this.banners = res && res.banners || []
        },
        toDetail(item){
            this.$router.push({path:'/training/'+item.id})
        }
    }
}
</script>

<style lang='less' scoped>
.training{
    h2{
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        padding: 20px 0 17px;
    }
    .mess{
        width: 1170px;
        font-size: 18px;
        font-weight: 400;
        color: #303132;
        line-height: 35px;
        margin: 18px auto;
        text-align: left;
    }
    ul{
        width: 1170px;
        margin: 0 auto;
        li{
            display: inline-block;
            vertical-align: top;
            width: 270px;
            height: 208px;
            margin-bottom: 30px;
            margin-right: 30px;
            cursor: pointer;
            &:nth-child(4n){
                margin-right: 0;
            }
        }
    }
    >img{
        margin: 20px 0 60px;
    }

}
</style>