<template>
    <div class="person">
        <div class="center_main">
            <div class="tag_list">
                <ul>
                    <router-link :to="{path:'/person'}" tag="li">
                        <i class="iconfont">&#xe618;</i>
                        <span>我的培训</span>
                    </router-link>
                    <router-link :to="{path:'/person/credential'}" tag="li" >
                        <i class="iconfont">&#xe61a;</i>
                        <span>荣誉资质</span>
                    </router-link>
                    <router-link :to="{path:'/person/profile'}" tag="li">
                        <i class="iconfont">&#xe61b;</i>
                        <span>个人设置</span>
                    </router-link>
                </ul>
            </div>
            <div class="center_content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed:{
        islogin(){
            return this.$store.state.islogin
        }
    },
    created(){
        if(!localStorage.getItem('login')){
            this.$message.warning('未登录，暂不支持该操作');
            this.$router.push('/');
        }
    },
    watch:{
        islogin(val){
            if(!val){
                this.$message.warning('未登录，暂不支持');
                this.$router.push('/');
            }
        }
    }
}
</script>

<style lang="less" scoped>
.person{
    background: #EEF2F7;
    padding: 20px 20px 50px;
}
// 主体
  .center_main {
    width: 1280px;
    min-height: calc(100vh - 140px - 230px - 36px - 70px);
    margin: 0 auto;
    padding: 20px 0 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // 导航栏列表
    .tag_list {
      text-align: left;

      ul {
        // padding-left:1rem;
        margin-right: 22px;
        li {
          &.router-link-exact-active {
            background: #1d86ff;
            color: #fff;
          }
          &:hover {
            color: #1d86ff;
          }
          &.router-link-exact-active:hover {
            color: #fff;
          }
          border-radius: 0.25rem;
          width: 158px;
          height: 2.75rem;
          line-height: 2.75rem;
          font-size: 0.9rem;
          color: #787d81;
          padding-left: 1.2rem;
          cursor: pointer;
          margin-bottom: 0.3rem;
          i {
            margin-right: 0.7rem;
          }
        }
      }
    }
    .center_content {
      flex: 1;
      text-align: left;
      background-color: #fff
    }
  }
</style>