<template>
    <div class="ranking">
        <div class="title">
            <h1><i class="el-icon-caret-right breadcrumbIcon"></i> 2017-2021高校学生竞赛</h1>
            <a-radio-group @change="init" v-model="type" size="small">
                <a-radio-button value="本科">本科</a-radio-button>
                <a-radio-button value="高职">高职</a-radio-button>
            </a-radio-group>
        </div>
        <div class="rank">
            <detail :lists="lists" />
            <span @click="tomore">查看更多 > </span>
        </div>
    </div>
</template>

<script>
import detail from '../../common/list'
import network from '@/mnskin/api/index'
export default {
    data(){
        return{
            type: '本科',
            lists:[],
            version: ''
        }
    },
    components:{
        detail
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let res = await network.getHomepageTeachersDevelopment({data:{
                provinceId: 1,
                page: 1,
                size: 5,
                version: this.type=='本科' ? '学生竞赛本科2017-2021' : '学生竞赛高职2017-2021'
            }});
            if(res=='error') return;
            this.lists = res.list || [];
        },
        tomore(){
            this.$router.push('/assessment?type='+this.type)
        }
    }
}
</script>

<style lang="less" scoped>
.ranking{
    width: 100%;
    margin-top: .2rem;
    background: #ffffff;
    padding: .28rem 0;
    .title{
        width: 100%;
        text-align: left;
        display: flex;
        justify-content: space-between;
        padding: 0 .32rem 0.28rem;
        h1{
            font-size: .32rem;
            color: #252223;
            display: inline-block;
            margin: 0;
        }
    }
    .rank{
        width: 100%;
        background: #ffffff;
        text-align: left;
        >span{
            font-size: .28rem;
            color: #9B9B9B;
            letter-spacing: .0175rem;
            margin-left: .38rem;
            cursor: pointer;
        }
    }
    /deep/.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
        border-color: #ED1E26;
        background: #ED1E26;
        color: #ffffff;
    }
    /deep/.ant-radio-button-wrapper{
        border-color: #252223;
        background: #252223;
        color: #ffffff;
    }
}
</style>