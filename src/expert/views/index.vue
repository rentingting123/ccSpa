<template>
    <div class="layout">
        <Layout>
            <Header>
                <HeaderComponent></HeaderComponent>
            </Header>
            <Layout v-if='loading'>
                <Sider hide-trigger :style="{background: '#4A4A4A'}">
                    <SideComponent :show='show'></SideComponent>
                </Sider>
                <Layout :style="{padding: '0px 15px'}">
                    <router-view :show='show'></router-view>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import HeaderComponent from "./common/header.vue"
import SideComponent from "./common/aside.vue"
import network from "@/api/utils";
export default {
    components:{
        HeaderComponent,
        SideComponent,
    },
    data () {
        return {
            show: false, 
            loading: false, //获取权限时不显示
        }
    },
    created(){
      // 管理员权限 普通用户和专家均只能访问该页面
      let data = {
        codes: ['manageCompetitionList']
      }
        network.post('api/usercenter/user/authority', {data}).then(res=>{
        this.loading = true
          this.show = res && res[0]&& res[0].allow || false
          if(!this.show && this.$route.path!='/expert/judge'){
            this.$router.push('/expert/judge')
          }
      })
    },
    watch:{

    },
    methods:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    body{
        //background: #495060;
    }
    .ivu-layout-header{
        background-color: #252C36 !important;
        height: 90px !important;
        line-height: 90px !important;
    }
    .layout{
        background: #f5f7f9;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .web-shell{
        width: 100%;
        height: 100vh;
        display: flex;
        flex: 1;
        flex-direction: column;
    }
    .web-shell-hd{
        width: 100%;
        height: 60;
    }
    .web-shell-bd{
        flex:1;
        overflow-y:scroll;
    }
    .fold-enter-active {
      animation-name: fold-in !important;
      animation-duration: .5s;
    }
    .fold-leave-active {
      animation-name: fold-out !important;
      animation-duration: .5s;
    }
    @keyframes fold-in {
      0% {
        transform: translate3d(0, 100%, 0);
      }
      50% {
        transform: translate3d(0, 50%, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
    @keyframes fold-out {
      0% {
        transform: translate3d(0, 0, 0);
      }
      50% {
        transform: translate3d(0, 0, 0);
      }
      100% {
        transform: translate3d(0, 0, 0);
      }
    }
    div.ivu-layout-header{
        height: 80px;
        line-height: 80px;
        position: relative;
        z-index: 1000;
    }
</style>
