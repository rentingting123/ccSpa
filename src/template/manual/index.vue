<template>
    <div>
         <h1 @click="$router.back(-1)">{{$t('skin.back')}}</h1>
         <div class='downloadPdf'>{{$t('skin.canread')}}?<a :href="url">{{$t('skin.download')}}</a></div>
         <div class="main">
             <iframe class="mainIframe" :src="url"/>
             <!-- <FileReview :url="url" :index="index"/> -->
         </div>
    </div>
</template>

<script>
import FileReview from '@@/components/fileReview';
export default {
    data(){
        return{
            url:'',
            index:1
        }
    },
    components:{
        FileReview
    },
    created(){
        this.url = decodeURIComponent(this.$route.query.url);
    }
}
</script>

<style lang="less" scoped>
    .downloadPdf{
        text-align: center
    }
    .mainIframe{
        width: 100%;
        height: 100%;
    }
    h1{
        width: 1000px;
        margin: 0 auto;
        font-size: 16px;
        color: #6666;
        /* line-height: 10px; */
        margin-top: 10px;
        cursor: pointer;
    }
    .main{
        min-width: 800px;
        height:calc(100vh - 48px)
        //margin: 0 auto;
    }
</style>