<template>
    <div class="historyauto">
        <h3>{{name}}</h3>
        <h4>{{smallName}}</h4>
        <div class="main">
            <i class="iconfont pre" :class="{'no':page==1}"  @click="pre">&#xe69d;</i>
            <ul id="teachershows">
                <li v-for="item,i in lists" :key="i" @click="toHref(item)">
                    <div class="teachermain">
                        <img :src="item.image + '!w278'" >
                        <h5>{{ item.name }}</h5>
                    </div>
                </li>
            </ul>
           <i class="iconfont next" :class="{'no':pages<=4 || page==pages-3}"  @click="next">&#xe69b;</i>
        </div>
        <!-- 管理人员可编辑 -->
        <div v-if="$store.state.skin.adminRole" class="edit">
            <edit :list="lists || []" :editOk="setDatas" :smallName='smallName' :name='name'></edit>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
import edit from "./edit";
export default {
    components:{
        edit
    },
    data(){
        return{
            name: '',
            smallName: '',
            page: 1,
            lists:[]
        }
    },
    computed:{
        pages(){
            let i = this.lists.length || 0
            this.$nextTick(()=>{
                document.getElementById('teachershows').style.width = i * 306 +'px'
            })
            return i
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let res = await network.skinGet({data:{type:21}})
            if(res == 'error' || !res)return
            this.name = res.html && res.html.name || ''
            this.smallName = res.html && res.html.smallName || ''
            this.lists = res.html && res.html.lists || []
        },
        setDatas(params){
            if(!params) return;
            this.name = params.name || ''
            this.smallName = params.smallName || ''
            this.lists = params.lists || []
        },
        pre(){
            if(this.page==1) return;
            this.page--;
            document.getElementById('teachershows').style.left = 0 - 306 * (this.page-1) + 'px'
        },
        next(){
            if(this.pages<4) return;
            if(this.page==this.pages-3) return;
            this.page++
            document.getElementById('teachershows').style.left = 0 - 306 * (this.page-1) + 'px'
        },
        toHref(item){
            if(!item || !item.url) return;
            let str = item.url.indexOf('http') != -1 ? item.url : 'http://'+item.url
            window.open(str)
        }
    },
}
</script>



<style lang="less" scoped>
.historyauto{
    width: 100%;
    height: auto;
    position: relative;
    h3{
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        margin-bottom: 10px;
        margin-top: 20px;
    }
    h4{
        font-size: 14px;
        color: #111;
        text-align: center;
        margin: 0 0 10px;
    }
    .main{
        width: 1200px;
        margin: 20px auto;
        overflow: hidden;
        position: relative;
        ul{
            height: 240px;
            width: 1224px;
            position: relative;
            left: 0;
            transition: 0.5s;
            li{
                display: inline-block;
                vertical-align: top;
                margin-right: 26px;
                cursor: pointer;
            }
        }
        i{
            display: inline-block;
            font-size: 44px;
            color: #ccc;
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 3;
            &.pre{
                left: 0;
            }
            &.next{
                right: 0;
            }
        }
        i:hover{
            color: #999;
        }
        i.no:hover{
            color: #ccc;
        }
    }
    .teachermain{
        width: 280px;
        height: 240px;
        position: relative;
        margin-bottom: 30px;
        border: 1px solid #eee;
        img{
            width: 100%;
            height: 182px;
        }
        h5{
            font-size: 24px;
            font-weight: 500;
            color: #303132;
            line-height: 44px;
            height: 44px;
            overflow: hidden;
            margin-bottom: 14px;
            text-align: center;
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
