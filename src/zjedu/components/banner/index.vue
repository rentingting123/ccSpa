<template>
    <div class="banner">
        <el-carousel height="429px" ref="banner" class="main" arrow="never">
            <el-carousel-item v-for="(item, index) in banners" :key="'banner_' + index">
                <div class="bannerImg" @click="gotoDetail(item.bannerLink)" :style="{backgroundImage: 'url(' + item.url + ')'}"></div>
            </el-carousel-item>
        </el-carousel>
          
        <i class="iconfont prev arrow" @click="prev">&#xe69d;</i>
        <i class="iconfont next arrow" @click="next">&#xe69b;</i>
    </div>
</template>

<script>
export default {
    props:{
        banners:{
            type: Array,
            default: []
        }
    },
    data(){
        return{
        }
    },
    methods:{
        gotoDetail(item){
            if(!item) return;
            let url = item.indexOf('http') == -1 ? 'http://' + item : item
            window.open(url)
        },
        prev(){
            this.$refs.banner.prev()
        },
        next(){
            this.$refs.banner.next()
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    width: 100%;
    height: 429px;
    position: relative;
    overflow: hidden;
}
.banner:hover{
    .arrow{
        display: block;
    }
}
.arrow{
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 48px;
    color: #ffffff;
    cursor: pointer;
}
.prev{
   left: 30px;
}
.next{
    right: 30px;
}

.bannerImg{
    height: 429px;
    vertical-align: middle;
    width: 100%;
    cursor: pointer;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
.main{
    width: 1920px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>
<style lang='less'>
.banner{
    .el-carousel__item--card{
        max-width: 1024px;
    }
}
</style>