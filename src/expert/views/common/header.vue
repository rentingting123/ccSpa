<template>
   <div id="J_Headernav">
        <div class="">
          <span @click="tabs" class="mune-tab">竞赛评审系统</span>
        </div>
        <div v-if="titleShow">
            <span class="cadName">{{titleName}}</span>
        </div>
        <div class="">
            <ul class='headernav'>
                <li class="headernavlist">
                 <Dropdown trigger="hover" @on-click='doMore'>
                      <a href="javascript:void(0)" class="system-header">
                          <span class="mr10">
                          </span>{{items.name}}</a>
                      <DropdownMenu slot="list">
                          <DropdownItem name='tabName'>筛选竞赛</DropdownItem>
                          <DropdownItem v-if="typeShow" name='User'>个人中心</DropdownItem>
                          <DropdownItem name='loginout'>退出</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
                </li>
            </ul>
        </div>
        <tabCompetition :importShow="tabShow" @exportData="exportTabShow" v-if="tabShow"></tabCompetition>
   </div>
</template>

<script>
import tabCompetition from "./tabCompetition"
import { logout } from "@/common/common.js";
export default {
  name: 'Header',
    components:{
        tabCompetition
    },
    inject:['reload'],
  data () {
        return {
            items:{
                name:this.$webapi.get('name')
            },
            importShow:false,
            tabShow:false,
            compData:[],
            idcardName:'',
            userShow:false,
            userShows:false,
            titleShow:true,
            typeShow:false,//专家账号个人中心显示
            userInfo:JSON.parse(localStorage.getItem('userInfo'))
        }
  },
    created(){
        let groupId=this.$webapi.getlocal("groupId")
        if(groupId==='-1'){
            this.userShow=true
        }else{
            this.userShow=false
        }
        if(this.$route.path=='/user'){
            this.titleShow=false
        }
        if(this.userInfo.type==5){
            this.typeShow=true
        }
    },
    computed:{
        titleName(){
            if(this.$webapi.getlocal('competitionName')){
                this.idcardName=this.$webapi.getlocal('competitionName')
            }else{
                this.idcardName=''
            }
            return  this.$store.state.judge.titleNamme?this.$store.state.judge.titleNamme:this.idcardName;
        }
    },
    watch: {
        // titleName: function(a, b) {
        //     this.idcardName=a
        // },
    },
  methods: {
    tabs(){
        this.$router.push("/")
    },
    doMore:function (name){
        if(name=="loginout"){
         this.loginout()
        }else if(name=="tabName"){
            this.tabShow=true
        }else if(name=="User"){
            // window.open('http://'+location.host + '/#/profile')
            this.$router.push("/expert/user")
        }
     },
    loginout:async function (){
        let _this = this
        await logout((e)=>{
        if(e)return console.log(e)
        _this.$router.push("/expert/login")
        window.location.reload()
        })
    },
    updataPassword(){
        this.importShow=true;
    },
    exportShow(e){
        this.importShow=e.show
    },
    getCompChild () {
        let _this = this
        let data={
            competitionId:this.$webapi.getlocal("compId")
        }
        return new Promise((relove,reject)=>{
            this.$api.get('web/competition/childsReviewCompetition',data).then(reset => {
                if (reset.code == 0) {
                    this.compData=reset.data
                    if (this.compData.length!=0) {
                        this.$store.commit("selComptitionJudge",this.compData[0].id)
                        this.$store.commit("compChildJudge",this.compData)
                        this.$webapi.savelocal("competitionId",this.compData[0].id)
                        this.$webapi.savelocal("rowId",this.compData[0].rowId)
                    }else{
                        this.$store.commit("selComptitionJudge",'')
                        this.$store.commit("compChildJudge",[])
                        this.$webapi.savelocal("competitionId",'')
                        this.$webapi.savelocal("rowId",'')
                    }
                    relove(this.compData)
                }else {
                    _this.pageShow=false;
                    _this.$netcode.getApiCode(reset)
                }
            })
        })
    },
    exportTabShow(e){
        this.tabShow=e.show
        if (e.data) {
                this.$webapi.savelocal('compId',e.data)
                this.getCompChild().then(()=>{
                    this.reload()
                })
        }else{
                this.$router.push("/expert/judge")
            }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  #J_Headernav{
    display: flex;
    flex-direction:row;
    width: 100%;
    flex: 1;
    // -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    // box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    justify-content:space-between;
    height: 80px;
    position: relative;
    z-index: 10
  }
  .system-header{
    line-height: 64px;
    height: 64px;
    display: block;
    padding: 0 15px;
    color: #666
  }
  // .system-header:hover{
  //   background: #f8f8f8
  // }
  .headernav{
    margin-right: 42px;
    .headernavlist{
      display: inline-block;
    }
  }
  .mune-tab{
      color:#fff;
    line-height: 90px;
    padding: 0 10px;
    cursor:pointer;
    font-size: 18px;
  }
  .pointer{
    border-bottom:1px solid #e0e0e0;
    cursor:pointer;
  }
  .cadName{
    color: #fff;
    line-height: 90px;
    padding: 0 10px;
    cursor: pointer;
    font-size: 18px;
  }
  .mr10{
    width: 50px;
    height: 50px;
    background: url(https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png) no-repeat 0 0;
    position: absolute;
    top: 24px;
    background-size: contain;
    background-repeat: no-repeat;
    cursor: pointer;
  }
</style>
