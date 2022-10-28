<template>
    <div class="detail">
        <div>
            <el-page-header @back="goBack" :content="content"></el-page-header>

            <video v-if="img" :src="img" controls></video>
            
            <qlediter :data='info' style="width: 100%"></qlediter>

        </div>
    </div>
</template>

<script>
import qlediter from '@@/components/editor/show'
import network from '@/operate/api';
export default {
    components:{
        qlediter,
    },
    created(){
        let id = this.$route.query.id 
        if(!id) return
        this.init(id)
    },
    data(){
        return{
            info: '',
            content: '',
            img: ''
        }
    },
    methods:{
        async init(id){
            let res = await network.getService({data:{
                id: id + ''
            }})
            if(res=='error') return;
            this.content = res && (res.title + '-' +res.title2) || ''
            this.info = res && res.info || ''
            this.img = res && res.img || ''
        },
        goBack(){
            this.$router.back();
        }
    }
}
</script>

<style lang='less' scoped>
.detail{
    width: 750px;
    margin: 0 auto;
    video{
        width: 100%;
        margin: 20px auto;
    }
} 
</style>