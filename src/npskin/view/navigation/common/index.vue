<template>
    <div class="banners" :id="id1" @mouseover="clearinter" @mouseleave="start">
        <ul :id="id2">
            <li v-for="list in newlists" @click="$router.push('/datacenter/newsdetail?id='+list.id)">
                <img :src="list.newsIcon" alt="" srcset="">
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['lists', 'id1', 'id2'],
    data(){
        return{
            newlists: [],
            setinter: ''
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.newlists = this.lists
            this.start()
        })
    },
    beforeDestroy(){
        this.clearinter();
    },
    methods:{
        start(){
            this.newlists = this.newlists.concat(this.newlists)
            clearInterval(this.setinter);
            let lengths = this.newlists.length * 164
            document.getElementById(this.id2).style.width = lengths + 'px';
            let showlengths = document.getElementById(this.id1).offsetWidth
            this.setinter = setInterval(() => {
                let left = document.getElementById(this.id2).offsetLeft;
                if(lengths - showlengths <= Math.abs(left)){
                    this.start()
                }else{
                    document.getElementById(this.id2).style.left = left - 1 +'px'
                }
            }, 50);
        },
        clearinter(){
            clearInterval(this.setinter);
        }
    }
}
</script>

<style lang="less" scoped>
.banners{
        width: 100%;
        height: 81px;
        overflow: hidden;
        position: relative;
    }
    ul{
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        li{
            display: inline-block;
            vertical-align: top;
            width: 152px;
            height: 81px;
            margin-right: 12px;
            cursor: pointer;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>