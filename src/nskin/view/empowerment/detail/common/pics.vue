<template>
    <div class="pics">
        <div class="picsmain">
            <el-carousel ref="carousel" height="347px" indicator-position='none' arrow='never' :autoplay='false'>
                <el-carousel-item v-for="item,i in lists" :key="i">
                    <div class="imgs">
                        <img :src="item.url" :title="item.name">
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="left button" @click="prev">
            <img src="http://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/prev.png" width="78px" >
        </div>
        <div class="right button" @click="next">
            <img src="http://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/next.png" width="78px" >
        </div>
    </div>
</template>

<script>
export default {
    props: ['obj'],
    computed:{
        lists(){
            let arr = this.obj && this.obj.photoInfo
            if(!arr) return [];
            arr = JSON.parse(arr) || []
            return arr
        },
    },
    methods:{
        prev(){
            this.$refs.carousel.prev()
        },
        next(){
            this.$refs.carousel.next()
        },
    }
}
</script>

<style lang='less' scoped>
.pics{
    position: relative;
    .picsmain{
        width: 868px;
        height: 347px;
        margin: 0 auto;
        background: #E6EBEB;
        position: relative;
        z-index: 4;
    }
    .button{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
        &.left{
            left: 11px;
        }
        &.right{
            right: 11px;
        }
    }
}
.imgs{
    width: 868px;
    height: 347px;
    background: rgba(0, 0, 0, 0);
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    img{
        max-width: 100%;
        max-height: 100%;
    }
}
</style>