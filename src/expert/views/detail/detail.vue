<template>
    <div class="layout">
        <Layout>
            <Header>
                <HeaderComponent></HeaderComponent>
            </Header>
            <Layout >
                <div class="ivu-right-review">
                    <Layout :style="{padding: '0px 15px',minWidth:'960px',maxWidth:'960px',margin:'0px auto'}">
                        <contentDetail v-if="show"></contentDetail>
                    </Layout>
                </div>
                <Sider hide-trigger :style="{background: '#fff',flex:'0 0 358px',minWidth:'358px',maxWidth:'none'}" v-if="groupId==-1 && leaderShow">
                    <asideMark v-if="show" :remarkMustFillIn="remarkMustFillIn" :importData="permAttach" :importData2="isList" :patternData='patternData'></asideMark>
                </Sider>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import HeaderComponent from "../common/header.vue"
import asideMark from "./asideMark.vue"
import contentDetail from "./contentDetail.vue"
let Base64 = require('js-base64').Base64
export default {
    components:{
        HeaderComponent,
        asideMark,
        contentDetail
    },
    data () {
        return {
            remarkMustFillIn:undefined,
            show:false,
            permAttach:[],//允许评审的附件
            groupId: this.$webapi.getlocal("groupId"),
            isList:false,
            leaderShow: true,
            rowId: '',
            competitionId: '',
            patternData: []

        }
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            if (from.name=='Judge'||from.name=='Result') {
                // this.list();
                vm.isList=true
            }
        })
    },
    created() {
        // 当为1时，强制不显示右边
        let show = this.$route.query.show
        this.rowId = this.$route.query.rowId
        this.competitionId = this.$route.query.competitionId
        this.pattern = this.$route.query.pattern
        
        if(show==1){
            this.leaderShow = false
        }
        // 只有屏幕和用户互动过后，用户离开页面（关闭、刷新、跳转其他页面）才会触发
        window.addEventListener('beforeunload', () => {
            if(this.$webapi.getlocal("pattern")){
                localStorage.removeItem('pattern');
            }
        });
        this.$store.dispatch("getPattern",{
            competitionId: this.competitionId,
            rowId: this.rowId
        }).then((res)=>{
            this.remarkMustFillIn = res.remarkMustFillIn
            console.log(res.remarkMustFillIn,'res');
            this.patternData = res && res.reviewStandardListDto && res.reviewStandardListDto.reviewStandardList || []
            if(this.groupId==-1 && this.pattern==1){
                this.getPermission().then(()=>{
                    this.show=true;
                })
            }else{
                this.show=true;
            }
        })
    },
    methods:{
        // 专家评审的附件列表
        getPermission(){
            let _this = this
            var user=JSON.parse(this.$webapi.getlocal("userInfo"))
            var data={
                id:Base64.decode(this.$route.query.id),
                specialistId:user.id
            }
            return new Promise((relove,reject)=>{
                this.$api.get('/review/review/permission',data).then(reset => {
                    if (reset.code == 0) {
                        this.permAttach=reset.data;
                        relove(reset.data)
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.ivu-layout-header{
    background-color: #252C36 !important;
    height: 90px !important;
    line-height: 90px !important;
}
.ivu-right-review{
margin:0 auto;
height: calc(100vh - 90px);
overflow: scroll;
}

.ivu-layout{
    // display: block;
}
</style>
