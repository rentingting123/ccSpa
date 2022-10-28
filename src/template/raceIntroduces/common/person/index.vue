<template>
    <div class="leg">
        <h1>{{title}}</h1>
        <h2>{{smalltitle}}</h2>
        <div>
            <div v-for="(leg,i) in leglist" :key="i" class="leglev" >
                <p class="iconp">
                    <img :src="leg.image" />
                </p>
                <div class="foot">
                    <p class="time ellipse" :title="leg.title">{{leg.title}}</p>
                    <p class="name ellipse" :title="leg.mess"> {{leg.mess}}</p>
                </div>
            </div>
        </div>

        <!-- 管理人员可编辑 -->
        <div v-if="$store.state.skin.adminRole" class="edit">
          <edit :list="leglist" :close="getList" :title1="title" :title2="smalltitle"></edit>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
import edit from './edit'
export default {
    components:{
        edit
    },
    data(){
        return{
            leglist:[],
            title: '',
            smalltitle: ''
        }
    },
    created(){
        this.getList()
    },
    methods:{
        async getList(){
            let res = await network.skinGet({data:{type:18}})
            if(res=='error') return;
            this.leglist = res.html || []
            this.title = res.title || ''
            this.smalltitle = res.smalltitle || ''
        }
    }
}
</script>

<style lang="less" scoped>
.leg{
    position: relative;
}
.leglev{
    margin-right: 75px;
    width: 180px;
    height: 200px;
    border-radius: 10px;
    display: inline-block;
    vertical-align: top;
    overflow: hidden;
    margin-bottom: 20px;
    background: #FFFFFF;
    text-align: center;
    .iconp{ 
        width: 100%;
        height: 120px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            height: 80px;
            width: auto;
        }
    }
    .foot{
        height: 80px;
        background: #000;
        font-size: 14px;
        color: #FFFFFF;
        padding: 0 10px;
        .time{
            padding-top: 20px;
        }
        
    }

}
.leglev:nth-child(5n){
    margin-right: 0
}
h1,h2{
    font-size: 16px;
    color: #FFFFFF;
    text-align: center;
    line-height: 24px;
}
h1{
    margin-top: 30px;
}
h2{
    margin-bottom: 40px;
}
.ellipse {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

</style>


