<template>
  <div class="active">
    <h2 class="title">
      <p>赛事日程</p>
    </h2>
    <ul id="activeul">
        <li v-for="(list,index) in lists" :class="{'on':list.type==0,'pointer':list.url}" :key='index' @click="checkLogin(list)">
            <div>
                <p>
                    <i class='iconfont' v-if='list.id==1'>&#xe6aa;</i>
                    <i class='iconfont' v-else-if='list.id==2'>&#xe6b0;</i>
                    <i class='iconfont' v-else-if='list.id==3'>&#xe68e;</i>
                    <i class='iconfont' v-else-if='list.id==4'>&#xe67f;</i>
                    <i class='iconfont' v-else-if='list.id==5'>&#xe6ad;</i>

                    <span class="container">
                        <span class="corner"></span>
                    </span>
                </p>
                <p>{{list.time}}</p>
                <div class="years" :title="list.years">{{list.years}}</div>
            </div>
            <p class="dian" :title="list.name">{{list.name}}</p>
        </li>
    </ul>

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
export default {
    data() {
        return {
            lists: datas && datas.lists || [],
            dialogVisible: false,
            childrens: [],
            children: '',
        }
    },
    methods:{
        async checkLogin(list){
            if(!list.url) return;
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
                                localStorage.removeItem("login");
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
  margin-top: 17px;
  width: 440px;
  height: auto;
  text-align: left;
  ul{
    text-align: left;
    margin-top: 24px;
    li{
        width: 75px;
        display: inline-block;
        vertical-align: top;
        margin-right: 11px;
        >div{
            width: 75px;
            height: 100px;
            border-radius: 5px;
            line-height: 84px;
            text-align: center;
            box-shadow: 5px 6px 0 0 #DDDEDE;
            p{
                width: 100%;
                height: 42px;
                line-height: 42px;
                font-size: 15px;
                color: #4A4A4A;
                font-weight:500;
                letter-spacing: 1.45px;
                text-align: center;
                position: relative;
                .iconfont{
                    font-size: 24px;
                    color: #FFFFFF;
                }
            }
            p:nth-child(2n+1){
                background: #404040;
                border-radius: 5px 5px 0 0;
            }
            p:nth-child(2n){
                border-radius: 0 0 5px 5px;
            }
           .years{
            line-height: 5px;
           }
            .container {
                display: block;
                position:absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -10px;
                width: 6px;
            }
            .corner {
                display: block;
                width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
                height: 0px;
                border: 6px solid #404040;
                border-bottom-color: transparent;    /* 设置透明背景色 */
                border-left-color: transparent;
                border-right-color: transparent;
            }
        }
        >p{
            font-size: 14px;
            color: #4A4A4A;
            letter-spacing: 0.52px;
            margin-top: 8px;
            text-align: center;
        }
        &:last-child{
            margin-right: 0;
        }
    }
    // li:nth-child(5n){
    //     margin-right: 0;
    // }
    li.pointer{
        cursor: pointer;
    }
    li.on{
        
        >div{
            border: 1px solid #BB0294;
            p:nth-child(2n+1){
                background: #BB0294;
                color: #FFFFFF;
            }
            p:nth-child(2n){
                color: #BB0294;
            }
            .years{
              line-height: 5px;
              margin-bottom: 15px;
              color: #BB0294;
            }
            .corner{
                border: 6px solid #BB0294;
                border-bottom-color: transparent;    /* 设置透明背景色 */
                border-left-color: transparent;
                border-right-color: transparent;
            }
        }
    }
  }
  .form{
      width: 400px;
      margin: 0 auto;
  }
}
</style>