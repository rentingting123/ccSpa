<template>
    <div class="detailmain">
       <div class="clearfix">
           <div class="fl">
               <p>院校</p>
               <p>university</p>
               <p class="line"></p>
               <p class="schoolname">{{detail.name}}</p>
           </div>
           <div class="fr">
               <img :src="detail.logo" height="100%">
           </div>
       </div>
       <div class="detailmessage" v-html="detail.introduction"></div>
       <div v-if="detail.url" style="text-align:right;">
            <a @click="toschool(detail.url)">前往院校</a>
       </div>
       
    </div>
</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            detail:{}
        }
    },
    created(){
        let id = this.$route.params.id;
        this.showdetail(id);
    },
    methods:{
        toschool(url){
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
        },
        async showdetail(id){
            if(id){
                this.id = id
            }
            let res = await network.getSchoolDetail({data:{
                id: this.id,
            }});
            if(res=='error') return;
            this.detail = res;
        },
    }
}
</script>


<style lang="less" scoped>
.detailmain{
    width: 1162px;
    margin: 50px auto;
    padding: 85px 112px;
    background: #ffffff;
    box-shadow: 0 4px 8px 0 #d5dde5;
    border-radius: 10px;
    .fl{
        font-size: 28px;
        color: #C4C4C4;
        text-align: left;
        .line{
            width: 58px;
            height: 2px;
            background: #C4C4C4;
            margin: 10px 0;
        }
        .schoolname{
            font-size: 36px;
            color: #4A4A4A;
            cursor: pointer;
        }
    }
    .fr{
        height: 134px;
    }
    .detailmessage{
        margin-top: 40px;
        opacity: 0.9;
        font-size: 14px;
        color: #4A4A4A;
        line-height: 37px;
        text-indent: 2em;
        text-align: left;
    }
    a{
        display: inline-block;
        border-radius: 10px;
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        opacity: 0.9;
        font-size: 14px;
        color: #0078e2;
        letter-spacing: 0;
        text-indent: 10px;
        background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/跳转copy.svg) no-repeat;
        background-position: 10px 12px;
        background-color: #e8f4ff;
        cursor: pointer;
        margin-top: 16px;
    }
}
</style>
