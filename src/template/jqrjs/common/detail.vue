<template>
    <div class="skin3entry">

        <div class="li" :style="`background-image:url(${bg0})`">
                 <a :href="videourl" target="_blank">
                <div>
                    <h1>竞赛视频</h1>
                    <h2>查看详情></h2>
                    <p class="line"/>
                </div>
            </a>
        </div>
        <div class="li li2" :style="`background-image:url(${bg2})`">
            <div  @click="toSignup">
                <h1>报名入口</h1>
                <h2>查看详情></h2>
                <p class="line"/>
            </div>
            <p v-if="!openSignup">暂未开放</p>
        </div>
        <div class="li" :style="`background-image:url(${bg3})`">
            <div @click="$router.push('/details/entryGuide')">
                <h1>参赛指南</h1>
                <h2>查看详情></h2>
                <p class="line"/>
            </div>
            
        </div>
        <div class="li li2" :style="`background-image:url(${bg1})`">
            <a :href="worksfile" target="_blank">
                <div>
                    <h1>操作手册</h1>
                    <h2>查看详情></h2>
                    <p class="line"/>
                </div>
            </a>
        </div>

        <!-- 管理人员可编辑 -->
        <div v-if="$store.state.skin.adminRole" class="edit">
            <edit v-if="loading" :editOk="init" :skin="skin"></edit>
        </div>

    </div>
</template>

<script>
import edit from "./edit";
import network from "@/api/index";
import utils from '@@/utils/util'
export default {
    data(){
        return{
            skin:'',
            bg0:"https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg4.png",
            bg1:"https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg1.png",
            bg2:"https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg2.png",
            bg3:"https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg3.png",
            videourl: '',
            loading:true,
            worksfile: '',
            openSignup: 0
        }
    },
    components:{
        edit,
    },
    methods:{
        async init(){
            // this.loading = false
            this.bg1="https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg1.png"
            this.bg2="https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg2.png"
            this.bg3="https://web.moocollege.com/mooc/hzq/vueskin/assets/skin3/bg3.png"
            let html = await network.skinGet({data:{type:10}})
            this.loading = true
            if(html == "error" | !html) return;
            html = html.html
            this.skin = html

            if(html.signup) this.bg2 = html.signup;
            if(html.guide) this.bg3 = html.guide;
            if(html.works) this.bg1 = html.works;
            if(html.video) this.bg0 = html.video;
            this.videourl = html.videourl || '';
            this.worksfile = html.worksfile || ''
            this.openSignup = html.openSignup || 0

           
        },
        toSignup(){
            if(this.openSignup){
                this.$router.push('/apply')
            }
        }
    },
    created(){
        this.init();
    }
}
</script>

<style lang="less" scoped>
.skin3entry{
    // position: relative;
    margin-top: 48px;
    .edit {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
    }
}

.li{
    width: 274px;
    height: 187px;
    margin: 0 4px 4px 0;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    position: relative;
    div{
        margin: 35px 0 0 30px;
        cursor: pointer;
        position: relative;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            font-weight: bold;
        }
        h2{
            font-size: 14px;
            color: #4A4A4A;
            font-weight: 150;
            margin: 8px 0;
        }
        .line{
            width: 45px;
            height: 5px;
            background: #0078E2;
        }
    }
    video{
        width: 100%;
        height: 100%;
    }
    >p{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        text-align: center;
        line-height: 187px;
        background: rgba(0, 0, 0, 0.5);
        font-size: 22px;
        color: #FFFFFF;
        letter-spacing: 0.82px;
        z-index: 9;
    }
}
.li2{
    margin-right: 0;
}
</style>

