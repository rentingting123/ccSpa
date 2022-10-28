<template>
  <div class="warpbox">
      <div class="loginbox" >
         <div class="loginbox-hd">
           开发环境登陆界面
         </div>
         <div class="loginbox-bd">
            <div class="login-item">
              <Input v-model="account" placeholder="用户名" size="large" style="margin-bottom:10px"></Input>
            </div>
            <div class="login-item">
                <div class="" v-if="passwordshow">
                    <Input type="password" v-model="password" placeholder="请输入密码"  size="large" icon="eye-disabled"  @on-click="password01()"></Input>
                </div>
                <div class="" v-else>
                    <Input v-model="password" placeholder="请输入密码" icon="eye"  size="large" @on-click="password01()"></Input>
                </div>
            </div>
            <div class="" @click="login()">
                <Button type="primary" size="large" long>登录</Button>
            </div>
         </div>
      </div>
      <div class='showbikeinfo'>
     </div>
  </div>
</template>

<script>
let axios= require('axios');
let qs=require('qs');
import webapi from '../api/webapi'
import {setToken,getToken} from '@@/utils/oauth'
import { mapGetters,mapState } from 'vuex';
// import md5 from 'js-md5'
export default {
  name: 'login',
  data () {
    return {
      passwordshow:true,
      account: "",
      password: "",
      // datas:{
      //   IP:1
      // }

    }
  },
  computed: {
        ...mapState({
            authority:store=>store.system.authorityManagement
        }),
    },
  mounted(){
    
    
    axios.defaults.headers.common['Authorization'] = "Basic bGFudGluLXdlYjpsYW50aW4td2ViLXNlY3VyaXR5";
    // this.$webapi.save('usertype',1)
    // axios.defaults.headers.common['Authorization'] = "Bearer "+webapi.getlocal("login")
  },
  methods: {
    password01 () {
      this.passwordshow = !this.passwordshow
    },
    login () {
     
        let data={
            username: this.account,
            // password: md5(this.password)
            password: this.password
        }
        let _this = this
        if(data.username&&data.password){
            axios({
                method:"POST",
                url:"/api/usercenter/authentication/form",
                // data:method === 'POST' || method === 'PUT' ? qs.stringify(params):null,
                data: qs.stringify(data),
            })
            .then(async function(reset){
         
                if (reset.status==200) {
                    if (reset.data.code === 0) {
                       setToken(reset.data.data.access_token)
                        axios.defaults.headers.common['Authorization'] = "Bearer "+getToken()
                          await _this.$store.dispatch('getAuthority')
                           
                        _this.$api.get("/usercenter/user",{}).then(res=>{
                         
                            if (res.code === 0) {
                                _this.$webapi.savelocal('isAdmin',res.data.isAdmin)
                                _this.$webapi.savelocal('groupId',res.data.groupId)
                                _this.$webapi.savelocal('userInfo',JSON.stringify(res.data))
                                if(_this.authority.manageAccount){
                                  _this.$router.push("/system/homenew/rolesManage")
                                }else if(_this.authority.manageOrganization){
                                  _this.$router.push("/system/homenew/organizationManage/list")
                                }else{
                                  _this.$Message.error('用户无权限')
                                }
                                
                            }else {
                                _this.$netcode.getApiCode(res)
                            }
                            return res
                        })
                    }else {
                        _this.$netcode.getApiCode(reset.data)
                    }
                }else {
                    _this.$netcode.getApiCode(reset.message)
                }
                return reset
            })
            // this.$api.post("/usercenter/authentication/form", data).then(reset => {
            //     if (reset.code === 0) {
            //         // _this.$webapi.save('token',reset.data.token)
            //         _this.$webapi.savelocal('login',reset.data.access_token)
            //         axios.defaults.headers.common['Authorization'] = "Bearer "+webapi.getlocal("login")
            //         this.$api.get("/usercenter/user",null).then(res=>{
            //             if (res.code === 0) {
            //                 _this.$webapi.savelocal('isAdmin',res.data.isAdmin)
            //                 _this.$webapi.savelocal('groupId',res.data.groupId)
            //                 _this.$router.push("/system/home/rolesManage")
            //             }
            //         })
            //
            //     }else {
            //         _this.$netcode.getApiCode(reset)
            //     }
            // })
        }else{
            _this.$Message.error("账号或者密码没填!")
        }
    },
    change(e){
      this.$webapi.save('usertype',e)
      this.$api.userType();

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .warpbox{
      width: 100%;
      height: 100vh;
      background: url("../assets/bg.jpg") center center;
      background-size: 100% 100%;
      display: flex;
      flex: 1;
      justify-content:center;
      align-items: center;
    }
    .loginbox{
       border-radius:2px;
       width: 300px;
      .loginbox-hd{
        padding: 10px;
        text-align: left;
        h2{
          font-size: 20px;
          font-weight: normal;
        }
      }
      .loginbox-bd{
        padding: 10px;
        .login-item{
          margin-bottom: 20px;
        }
      }
    }
</style>
