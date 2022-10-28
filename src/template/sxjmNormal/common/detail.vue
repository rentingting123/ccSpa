<template>
    <div class="skin3entry">
        <div class="li" v-for="list,i in skin" :key="i" v-if="list.checkout" :style="`background-image:url(${list.background})`">
            <div  @click="todetail(list)" >
                <h1>{{list.name}}</h1>
                <h2>查看详情></h2>
                <p class="line"/>
            </div>
        </div>

        <!-- 管理人员可编辑 -->
        <div v-if="$store.state.skin.adminRole" class="edit">
            <edit v-if="showEdit" :editOk="init" :skin="skin"></edit>
        </div>

    </div>
</template>

<script>
import edit from "./edit";
import network from "@/api/index";
export default {
    data(){
        return{
            skin: [],
            showEdit: false,
        }
    },
    components:{
        edit,
    },
    methods:{
        async init(){
            let res = await network.skinGet({data:{type:22}})
            this.showEdit = true
            if(res == "error") return;
            this.skin = res && res.html || []
        },
        todetail(item){
            if(item.name=='报名入口'){
                this.$router.push('/apply')
            }else if(item.name=='参赛指南'){
                this.$router.push('/details/entryGuide')
            }else{
                if(!item.address) return;
                let str = item.address.indexOf('http')==-1?'http://'+item.address:item.address
                window.open(str)
            }
        }
    },
    created(){
        this.init();
    }
}
</script>

<style lang="less" scoped>
.skin3entry{
    // position: relative;
    margin-top: 48px;
    .edit {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
    }
}

.li{
    width: 274px;
    height: 187px;
    margin: 0 4px 4px 0;
    display: inline-block;
    vertical-align: top;
    cursor: pointer;
    position: relative;
    div{
        margin: 35px 0 0 30px;
        cursor: pointer;
        position: relative;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            font-weight: bold;
        }
        h2{
            font-size: 14px;
            color: #4A4A4A;
            font-weight: 150;
            margin: 8px 0;
        }
        .line{
            width: 45px;
            height: 5px;
            background: #0078E2;
        }
    }
}
</style>

