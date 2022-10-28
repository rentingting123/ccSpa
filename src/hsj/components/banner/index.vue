<template>
    <div class="banner">
        <div class="bannerImg" @click="gotoDetail()" :style="{backgroundImage: 'url(' + hsjbanner + ')'}"></div>
        <chooseLogin v-if="choose" :close='close'/>
    </div>
</template>

<script>
import chooseLogin from '../chooselogin'
export default {
    components:{
        chooseLogin
    },
    data(){
        return{
            choose: false,
            hsjbanner: 'https://web.moocollege.com/mooc/hzq/vueskin/hsj/mainpage/banner.jpg',
        }
    },
    methods:{
        close(){
            this.choose = false
        },
        gotoDetail(item){
            this.choose = true
            // if(!item) return;
            // let url = item.indexOf('http') == -1 ? 'http://' + item : item
            // window.open(url)
        }
    }
}
</script>

<style lang="less" scoped>
.banner{
    width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;
}
.bannerImg{
    width: 1920px;
    height: 500px;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>