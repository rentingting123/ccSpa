<template>
    <div class="bilingual">
        <div>
            <el-select v-model="value" placeholder="请选择" size="mini" @change="switchLanguage">
                <el-option v-for="item in langs" 
                    :key="item.id"
                    :label="item.name"
                    :value="item.value">
                    <span style="float: left;">
                        <i class="iconfont">&#xe6f3;</i>
                    </span> 
                    <span style="float: left; margin-left: 15px;">{{ item.name }}</span> 
                </el-option>
            </el-select>
        </div>
        <div v-if="$store.state.skin.adminRole" class="edit">
            <edit :language='value' :close='close'></edit>
        </div>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { setCookie, getCookie } from "@@/utils/commons";
import edit from './edit'
import jxapi from "@/api/index"
export default {
    components:{
        edit,
    },
    data(){
        return{
            value: 'zh',
            langs:[
                {
                    name: '简体中文',
                    value: 'zh',
                    id: 0
                },
                {
                    name: 'ENGLISH',
                    value: 'en',
                    id: 1
                },

            ]
        }
    },
    created(){
        this.getHtml()
    },
    methods:{
        async getHtml(){
            let res = await jxapi.skinGet({data:{type:20}})
            if(res == 'error' || !res) return;
            this.value = getCookie("lang")||res.html || 'zh'
            this.switchLanguage(this.value);
        },
        ...mapMutations({
            swi_lang: "swi_lang",
        }),
        async close(e){
            this.value = e;
            this.switchLanguage(e);
            let name = await jxapi.skinSet({data:{html:e,type:20}})
            if(name == 'error') return 
        },
        switchLanguage(val) {
            let domain = window.location.hostname.split(".");
            domain = domain.splice(domain.length - 2, 2);
            domain = domain.join(".");

            this.$i18n.locale = val;
            setCookie("lang", val, 365, domain);
            this.swi_lang(val);
        },
    }
}
</script>

<style lang="less" scoped>
.bilingual{
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #4A4A4A;
    >div{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        /deep/.el-input--mini .el-input__inner{
            background:rgba(74,74,74,1);
            border:1px solid rgba(151,151,151,1);
            color: #ffffff;
        }
    }
}
</style>