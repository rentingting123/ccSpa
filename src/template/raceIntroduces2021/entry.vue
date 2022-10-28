<template>
    <div class="entry">
        <div class="titleContent">
            <h3>{{title || ''}}</h3>
            <p>{{smallTitle || ''}}</p>
        </div>

        <ul :class="{'one': type==1, 'two': type==2, 'three': type!=1&&type!=2 }">
            <li v-for="item,i in choose" 
                :key="i" 
                :style="{'background-image': `url('${item.bg}')`}"
                :class="getClass(i)"
            >
                <mess :data='item' :bottom='getBottom(i)'/>
            </li>
        </ul>

        <!-- 管理人员可编辑 -->
        <div v-if="$store.state.skin.adminRole" class="edit">
            <edit :close="init"></edit>
        </div>
    </div>
</template>


<script>
import jxapi from "@/api/index";
import edit from "./edit";
import mess from './mess'
export default {
    // 父组件 raceIntroduces,
    // setbg 设置背景， setModel 设置模板
    props:['setbg','setModel'],
    async created(){
        this.init();
    },
    components:{
        edit,
        mess,
    },
    data(){
        return{
            smallTitle: '',
            title: '',
            choose: [],
            type: 3
        }
    },
    methods:{
        async init() {
            let res = await jxapi.skinGet({ data: { type: 23 } });
            if (res == "error") return;
            this.title = res && res.title || ''
            this.smallTitle = res && res.smallTitle || ''
            let arr = res && res.tableData || []
            this.choose = arr.filter(res=>{
                return res.checkout
            })
            this.type = this.choose.length || 3
            this.setbg && this.setbg(res && res.background || null)
            this.setModel && this.setModel(res && res.model || "0")
        },
        getBottom(i){
            if(this.type==3){
                if(i==0 || i==2){
                    return true
                }
            }else if(this.type==4){
                if(i==3){
                    return true
                }
            }else if(this.type==5){
                if(i==4){
                    return true
                }
            }
            return false
        },
        getClass(i){
            if(this.type==4){
                if(i==0 || i==1){
                    return 'small'
                }
            }else if(this.type==5){
                if(i==0 || i==1 || i==2 || i==3){
                    return 'small'
                }
            }else if(this.type==6){
                return 'small'
            }
            return ''
        }
    },
    
}
</script>

<style lang="less" scoped>
.entry{
    .titleContent {
        width: 100%;
        text-align: center;
        margin-bottom: 46px;
        h3 {
            font-weight: bold;
            font-size: 36px;
            color: #111;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        p {
            font-size: 14px;
            color: #111;
            text-align: center;
            margin: 0 0 10px;
        }
    }
    ul{
        width: 1200px;
        height: 298px;
        margin: 0 auto;
        font-size: 0;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        li{
            width: 50%;
            height: 100%;
            background-size: cover;
        }
        &.one{
            li{
                width: 100%;
                height: 100%;
            }
        }
        &.two{
            li{
                width: 50%;
                height: 100%;
            }
        }
        &.three{
            li{
                width: 400px;
                height: 100%;
                &.small{
                    height: 50%;
                }
            }
        }
    }
    .edit {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 999;
    }
}
</style>
