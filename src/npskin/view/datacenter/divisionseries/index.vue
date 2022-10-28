<template>
    <div class="divisionseries">
        <left :id='id' v-if="id"/>
        <right :pnskin2="npskin2" :lists='lists' :id="id" :changeid='changeid'/>
    </div>
</template>

<script>
import left from './common/left'
import right from './common/right'
import network from '@/api'
export default {
    props:['npskin2'],
    components:{
        left,
        right,
    },
    data(){
        return{
            id: '',
            lists: []
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let res =!this.npskin2? await network.npqueryProvince({data:{
                groupId: localStorage.getItem('groupId')
            }}): await network.npqueryContest({data:{
                groupId: localStorage.getItem('groupId')
            }})
            if(res=='error') return;
            this.lists = res || [];
            if(this.lists.length>0) this.id = this.lists[0].competitionId
        },
        changeid(id){
            this.id = id
        }
    }
}
</script>

<style lang="less" scoped>
.divisionseries{
    padding: 31px 28px;
    margin: 0 auto;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
</style>