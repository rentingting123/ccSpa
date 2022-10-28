<template>
    <div class="meeting" v-if="show">
        <div>
            <h1 class="title title2">培训会议
                <ul class="type">
                    <li :class="{'on':type==0}" @click="typechange(0)">全部<p class="line"></p></li>
                    <li :class="{'on':type==1}" @click="typechange(1)">进行中<p class="line"></p></li>
                    <li :class="{'on':type==2}" @click="typechange(2)">已结束<p class="line"></p></li>
                </ul>
                <span class="more" @click="$router.push('/train')">查看更多</span>
            </h1>
            <training :lists='lists' />
        </div>
    </div>
</template>
<script>
import network from '@/api/index'
import training from '../common/training'
export default {
    components:{
        training
    },
    data(){
        return{
            lists:[],
            type: 0,
            total: 0,
            pageNum: 1,
            pageSize: 8,
            show: true
        }
    },
    created(){
        this.init(true);
    },
    methods:{
        typechange(type){
            this.type = type;
            this.lists = [];
            this.init();
            this.total = 0
        },
        async init(show){
            let res = await network.getTrainList({data:{
                provinceId: localStorage.getItem('competitionId'),
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                status: this.type,
                type: 0, // 查询能显示的
            }})
            if(res=='error') return this.show=false;
            this.lists = res && res.list||[];
            if(show && this.lists.length<1 && this.type==0){
                this.show = false
            }
            this.total = res && res.total;
        }
    },

}
</script>

<style lang="less" scoped>
.meeting{
    margin-top: 30px;
    background: #FFFFFF;
    >div{
        width: 1171px;
        margin: 0 auto;
    }
}
</style>