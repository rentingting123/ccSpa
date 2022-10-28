<template>
    <div class="news">
        <!-- 面包屑 -->
        <breadcrumb title1="新闻资讯" border='true' />
        <div class="search">
            <el-input class="trainingName" @keyup.enter.native="search" placeholder="搜索新闻" v-model="searchName">
                <el-button slot="append" @click.native="search" icon="el-icon-arrow-right"></el-button>
            </el-input>
        </div>
        <div class="img">
            <p>全国普通高校教师教学发展指数（2020版）发布</p>
        </div>
        <newMain :searchName='searchName' ref="newMain" />
    </div>
</template>

<script>
import newMain from './common/main'
import breadcrumb from '@/nskin/components/breadcrumb'
export default {
    components:{
        newMain,
        breadcrumb,
    },
    data(){
        return{
            searchName: ''
        }
    },
    created(){
        this.searchName = this.$route.query.q || '';
    },
    methods:{
        search(){
            this.$refs.newMain.init(true);
        },
    }
}
</script>

<style lang="less" scoped>
.news{
    width: 1200px;
    margin: 0 auto;
    background: #ffffff;
    padding-bottom: 50px;
    text-align: left;
    .search{
        text-align: right;
        margin-top: -16px;
        .trainingName{
            width: 250px;
        }
    }
    .img{
        margin-top: 30px;
        width: 1200px;
        height: 364px;
        background: url('./newstop.png') no-repeat;
        background-size: 100%;
        padding-top: 131px;
        p{
            width: 934px;
            height: 93px;
            line-height: 93px;
            background: rgba(255, 255, 255, 0.7);
            font-size: 38px;
            font-weight: bold;
            color: #000000;
            text-align: center;
            margin: 0 auto;
        }
    }
    
    /deep/.el-input-group__append {
        background: #252223;
        color: #fff;
        border: 1px solid #252223;
    }
    /deep/.el-input-group--append .el-input__inner, .el-input-group__prepend{
        border-color: #252223;
    }

}
</style>


