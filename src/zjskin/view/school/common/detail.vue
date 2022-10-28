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
    </div>
</template>

<script>
export default {
    props:['detail']
}
</script>


<style lang="less" scoped>
.detailmain{
    padding: 85px 112px;
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
}
</style>
