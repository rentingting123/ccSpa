<template>
  <div class="active">
    <!--  -->
    <el-button @click="checkLogin" :loading='loading' >提交作品</el-button>

    <el-dialog title="作品提交" :visible.sync="dialogVisible"  width="600px">
        <el-form class="form" label-width="100px">
            <el-form-item label="选择团队" v-if="childrens.length>0">
                <el-select v-model="children" placeholder="请选择团队" >
                    <el-option
                        v-for="item in childrens"
                        :key="item.competitionId"
                        :label="item.competitionName"
                        :value="item.competitionId">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="toCC">确 定</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import network from '@@/api/jxapi'
import { isLogin } from "@/common/common.js";
import { tologin } from '@@/utils/util' 
import datas from '@/hcj/mock/passage.js'
import {removeToken} from "@@/utils/oauth"
export default {
    data() {
        return {
            dialogVisible: false,
            childrens: [],
            children: '',
            loading: false
        }
    },
    methods:{
        async checkLogin(){
            this.loading = true
            if(!isLogin()){
                return tologin()
            }else{
                //这里需要检查登录是否有效所以直接请求个人信息接口 无效自动清理用户信息
                let user = await network.getUserInfo()
                if(user=='error') return tologin()
                if(user.type){
                    return  this.$alert(this.$t('skin.loginMess'),'',{
                        confirmButtonText: this.$t('skin.toCC'),
                        callback: async action => {
                            if(action=='confirm'){
                                location.href='https://cc.moocollege.com/#/details?id='+localStorage.getItem('competitionId') + '&autoLogin=true';
                            }else{
                                let res = await network.setLoginOut();
                                if (res == "error") return;
                                //登录信息
                                removeToken()
                                //用户信息
                                localStorage.removeItem("userInfo");
                                this.$router.push("/");
                            }
                        }
                    })
                }else{
                    this.getTeams() 
                }
            }
        },
        async getTeams(){
            this.childrens = []
            let res = await network.getpersonCompetition({data:{isFinish: 1}});
            if(res == 'error') return;
            if(!res || res.length<1){
                return this.$message.warning('请先报名，再进行作品提交')
            }else if(res.length==1){
                this.children = res[0].competitionId
                this.toCC()
            }else{
                this.dialogVisible = true
                this.childrens = res
            }
            this.loading = false
        },
        toCC(){
            if(!this.children) return this.$message.warning('请先选择团队');
            let url = location.href.indexOf('dev.net')!=-1 || location.href.indexOf('mycloudedu.net')!=-1 ? 'http://cc.mycloudedu.net' : 'http://cc.moocollege.com'
            window.open(url + '/#/details?id='+this.children + '&autoLogin=true')
            this.dialogVisible = false
        }
    },
    watch: {
        dialogVisible(val){
            if(!val){
                this.childrens = []
                this.children = ''
            }
        }
    }
};
</script>

<style lang="less" scoped>
.active {
  margin-top: 12px;
  text-align: center;
  display: inline-block;
  
  .form{
      width: 400px;
      margin: 0 auto;
  }
}
</style>