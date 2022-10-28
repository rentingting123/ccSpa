<template>
    <div class="school">
        <h2>合作高校</h2>
        <div class="header" >
            <i class="iconfont pre" :class="{'no':page==1}"  @click="pre">&#xe69d;</i>
            <ul >
                <li v-for="school,index in datas" :key="school.id" :title="school.name" v-if="index<7">
                    <img v-if="school.logo" :src="school.logo">
                    <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/schoollogo.png">
                </li>
            </ul>
            <i class="iconfont next" :class="{'no':page==pages}"  @click="next">&#xe69b;</i>
        </div>
    </div>
</template>

<script>
import network from '@/api'
export default {
    data(){
        return{
            page: 1,
            pages: 1,
            size: 7,
            datas: []
        }
    },
    created(){
        this.getData();
    },
    methods: {
        async getData(){
            let res = await network.getZjeduSchool({data:{
                page: this.page,
                size: this.size,
            }})
            if(res=='error') return;
            this.datas = res && res.list || []
            this.pages = res && res.pages || 1
        },
        pre(){
            if(this.page==1) return;
            this.page--
            this.getData()
        },
        next(){
            if(this.page==this.pages) return;
            this.page++
            this.getData()
        }
    }
}
</script>

<style lang='less' scoped>
.school{
    width: 1200px;
    margin: 30px auto;

    h2{
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        text-align: left;
    }
    .header{
        width: 100%;
        padding-top: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
        ul{
            width: 1146.5px;
            li{
                width: 136.1px;
                height: 89.1px;
                margin: 0 10px;
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                img{
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            li:nth-child(7n){
                margin-right: 0;
            }
        }
        i{
            display: inline-block;
            font-size: 44px;
            color: #ccc;
            cursor: pointer;
        }
        i:hover{
            color: #999;
        }
        i.no:hover{
            color: #ccc;
        }
    }
}
</style>