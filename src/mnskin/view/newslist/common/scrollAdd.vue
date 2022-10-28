<template>
    <div class="load">
        <p style="cursor: pointer" v-if="type=='canload'" @click="scroll">更多资讯</p>
        <p v-if="type=='nomore'">没有更多了~</p>
        <p v-if="type=='loading'">加载中...</p>
    </div>
</template>
<script>
export default {
    props: {
        type:String,
        more:{
            type:Function,
            required:true
        }
    },
    data(){
        return {
        }
    },
     mounted(){
          window.addEventListener('scroll',this.scroll)
    },
    beforeDestroy(){
            window.removeEventListener('scroll',this.scroll)
        },
        methods:{
            scroll(e){
                if((window.innerHeight+window.pageYOffset+300)>document.body.scrollHeight && this.type=='canload'){
                    this.more();
                }
            },
        }
}
</script>
<style lang="less" scoped>
    .load{
        width:100%;
        p{
            width:100%;
            height:100%;
            text-align:center;
            color:#4a4a4a;
            font-size:0.32rem;
            line-height: 2;
        }
    }
</style>
