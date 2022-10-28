<template>
    <div id="department">
        <div class="pageHeader">
            <div class="pageBread">
                <Breadcrumb>
                    <!-- <BreadcrumbItem to="/">首页</BreadcrumbItem> -->
                    <BreadcrumbItem >竞赛评审</BreadcrumbItem>
                    <BreadcrumbItem>评审列表</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="page-detail">
                <div class="page-detail-hd">
                    <h2>评审列表</h2>
                </div>
            </div>
        </div>

        <div class="page-component-view">
    		<div class="page-component-bd">
    			<!-- 评委显示页面 -->
                <expertJudge v-if="!show"></expertJudge>
    			<!-- 主办方显示页面 -->
                <adminJudge v-else></adminJudge>
    		</div>
        </div>
    </div>
</template>
<script>
    import adminJudge from './adminJudge/admin.vue'
    import expertJudge from './expertJudge/expertIndex.vue'
    export default {
        components:{
            adminJudge,
            expertJudge,
        },
        props: ['show'],
        data () {
            return {

            }
        },
        created() {
            //好像下面的代码也没有起到什么作用，测试通过后删除
            // if (this.$webapi.getlocal("isAdmin")) {
            //     if (this.$webapi.getlocal("isAdmin")=="true") {
            //         this.isAdmin=true;
            //     }else{
            //         this.isAdmin=false
            //     }
            // }else{
            //     this.$Message.warning("token失效,请重新登录!")
            //     this.$router.push("/expert/login")
            // }
        },
    }
</script>
<style scoped>
    .page-component-bd{
        padding:15px;
    }
</style>
