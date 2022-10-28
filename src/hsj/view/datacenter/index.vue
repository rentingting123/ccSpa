<template>
    <div class="about">
        <left :obj='obj' :on='on' :changeNav='changeNav' :style="{'position':'relative','top':top}" />
        <router-view class="view" />
    </div>
</template>

<script>
import {navs} from '@/hsj/mock/navs'
import left from './common/left'
export default {
    components:{
        left
    },
    data(){
        return{
            obj:{ },
            on: '',
            top: 0,
        }
    },
    created(){
        window.addEventListener('scroll', this.handleScroll, true)
    },
    destroyed(){
        window.removeEventListener('scroll', this.handleScroll);
    },
    mounted(){
        this.init(this.$route.path,this.$route.query.id)
    },
    methods:{
        init(path, id){
            this.$nextTick(()=>{
                this.getObj(path)
                if(id){
                    location.href = "#"+id;
                }else{
                    location.href = "#"
                }
                this.on = id || ''
            })
        },
        handleScroll(){
            let top = document.documentElement.scrollTop || document.body.scrollTop
            if(top>300){
                this.top = top - 300 + 'px'
            }else{
                this.top = '0px'
            }
        },
        changeNav(list, l){
            this.$router.push(list.path+'?id='+l.id)
        },
        getObj(path){
            switch(path){
                case "/datacenter/about": 
                        return this.obj = navs[1]
                case "/datacenter/organizational": 
                        return this.obj = navs[2]
                case "/datacenter/choose": 
                        return this.obj = navs[3]
                case "/datacenter/participate": 
                        return this.obj = navs[4]
                case "/datacenter/award": 
                        return this.obj = navs[5]
                case "/datacenter/forum": 
                        return this.obj = navs[6]
                case "/datacenter/training": 
                        return this.obj = navs[9]
            }
        }
    },
    watch:{
        $route(to, from){
            this.init(to.path, to.query.id)
        }
    }
}
</script>

<style lang="less" scoped>
.about{
    min-height: calc(100vh - 538px - 37px);
    width: 1280px;
    margin: 0 auto;
    padding: 0 28px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 33px;
    .view{
        width: 900px;
        height: auto;
    }
}
</style>