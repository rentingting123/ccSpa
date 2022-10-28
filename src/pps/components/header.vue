<template>
    <div class="head" style="    text-align-last: left;margin-bottom:16px">
        <div style="    font-size: 20px;
    font-weight: 500;">
            <img style="width:30px;height:30px;vertical-align: text-top;    margin-top: -1px;margin-right: 15px;
" src="./logo.png" alt="">浙江师范大学个推管理系统
        </div>
        <div class="person">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <!-- <Avatar icon="ios-person" size="large" /> -->
            <p @click="out">退出</p>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        out(){
            this.delCookie()
            this.$router.push('/')
        },
         delCookie() {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie =
          name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      }
      if (cookies.length > 0) {
        for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i];
          var eqPos = cookie.indexOf("=");
          var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          var domain = location.host.substr(location.host.indexOf("."));
          document.cookie =
            name +
            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" +
            domain;
        }
      }
    }
    }
}
</script>

<style lang="less" scoped>
.head_s{
    display: inline-block;
}
.person{
    text-align-last: center;
    // text-align: left;
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 50px;
    /deep/.el-avatar{
        margin-top: 10px;
    }
    p{
        width: 100%;
        height: 50px;
        line-height: 50px;
        position:absolute;
        top:0;
        bottom:0;
        transform: translateY(64px);
        background-color:#fff;
        // background-color:#515a6e;
        display: none;
        cursor: pointer;
    }
}
.person:hover{
    p{
        display: block;
    }
}

</style>

