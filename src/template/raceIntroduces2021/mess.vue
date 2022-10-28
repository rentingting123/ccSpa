<template>
    <div class="main" :class="{'bottom': bottom}">
        <h2>{{data && data.name}}</h2>
        <a @click="toDetail(data)">查看详情</a>
        <div class="line"></div>
    </div>
</template>

<script>
import { tologin } from '@@/utils/util'
import network from "@@/api/jxapi/index";
import {getToken} from "@@/utils/oauth"
export default {
    props: ['data', 'bottom'],
    computed:{
        id(){
            return this.$store.state.skin.id
        }
    },
    methods:{
        toDetail(data){
            console.log(data.prop);
            if(!data.prop){
                if(data.url){
                    window.open(data.url)
                }
            }else if(data.prop=='manual'){
                if(!data.url) return;
                this.$router.push({name:'manual',query:{url:encodeURIComponent(data.url)}})
            }else if(data.prop=='expert'){
                window.open('http://cc.moocollege.com/expert/login')
            }else if(data.prop=='works'){
                this.submitWork();
            }else if(data.prop=='entryGuide'){
                this.$router.push('/details/entryGuide')
            }else if(data.prop=='signup'){
                this.$router.push("/apply");
            }
        },
        async submitWork(){
            if (!getToken()) {
                tologin();
            }
            let competition = await network.groupChildInfo({data:{competitionId:this.id}});
            if (competition == "error") return;
            window.location.href='https://cc.moocollege.com/#/details?id='+this.id+'&autoLogin=true'
        },
    }
}
</script>

<style lang='less' scoped>
.main {
    padding: 36px 0 0 30px;
    position: relative;
    z-index: 2;
    h2 {
        font-size: 22px;
        color: #ffffff;
    }
    a {
        font-size: 14px;
        color: #ffffff;
        display: block;
        margin: 8px 0;
        cursor: pointer;
    }
    .line {
        width: 42px;
        height: 5px;
        background: #ffffff;
    }
    &.bottom{
        padding: 185px 0 0 30px;
    }
}
</style>