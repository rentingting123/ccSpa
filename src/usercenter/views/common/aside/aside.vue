<template>
   <div class="SideMenuComponent">
        <div class="mermber-logo"><i></i>用户中心<span @click="change"> 切换身份</span></div>
        <!-- theme="light" -->
        <Menu width="auto" ref="shop" :active-name="tabNum" :open-names="['0-0']" :theme="theme2"  @on-select="changeMenu" accordion v-if="show">
            <div class="">
                <Submenu v-for="(item,index) in dataArr" :key="item.id" :name="item.id">
                    <!-- {{index}} -->
                    <template slot="title" style="text-align: left;">
                        <Icon type="ios-navigate"></Icon>
                        <span>{{item.name}}</span>
                    </template>
                    <MenuItem :name="index+'-'+itemlistindex" v-if="itemlist.isAdmin" v-for="(itemlist,itemlistindex) in item.childMenu" style="text-align: left;" :key="itemlist.id">
                        {{itemlist.name}}
                    </MenuItem>
                </Submenu>
            </div>
        </Menu>
   </div>
</template>
<script>
import { mapGetters,mapState } from 'vuex';
import {selectGroup} from '@@/utils/commons'
export default {
  name: 'SideMenu',
    data () {
        return {
            dataArr:[
                {
                    name:"系统管理",
                    id:0,
                    childMenu:[
                        {
                            name:"账户管理",
                            path:"/system/homenew/rolesManage",
                            id:211,
                            isAdmin:true
                        },
                        {
                            name:"组织关联",
                            path:"/system/homenew/organizationManage/out",
                            id:241,
                            isAdmin:true
                        },
                        {
                            name:"申请审核",
                            path:"/system/homenew/messageCheck/unchecked",
                            id:251,
                            isAdmin:true
                        },
                        {
                            name:"角色管理",
                            path:"/system/homenew/role",
                            id:121,
                            isAdmin:false,
                            // isAdmin:this.getAuthority.manageRole
                        },
                        {
                            name:"资源权限管理",
                            path:"/system/homenew/menu",
                            id:131,
                            isAdmin:false
                            // isAdmin:this.getAuthority.managePermissionlist
                        },
                        {
                            name:"申请公钥",
                            path:"/system/homenew/publickey",
                            id:261,
                            isAdmin:false
                        },
                        {
                            name:"学院管理",
                            path:"/system/homenew/collegeManagement",
                            id:271,
                            isAdmin:true
                        },
                    ]
                },
                {
                    name:"专家库",
                    id:1,
                    childMenu:[
                        {
                            name:"专家账号",
                            path:"/system/expert/expertAccount",
                            id:211,
                            isAdmin:true
                        },
                        {
                            name:"专家库",
                            path:"/system/expert/expertDatabase",
                            id:221,
                            isAdmin:true
                        },
                        {
                            name:"临时专家",
                            path:"/system/expert/expertTemporary",
                            id:231,
                            isAdmin:true
                        },
                        {
                            name:"消息通知",
                            path:"/system/expert/message",
                            id:241,
                            isAdmin:true
                        }
                    ]
                }
            ],
            theme2:'dark',
            show:false,
            isAdmin: false
        }
    },
    //获取菜单内容，是否缓存内容存在，如果没有，就重新获取，已存在，就从缓存里面获取
    beforeCreate () {

    },
    computed: {
        ...mapGetters([
            'getAuthority'
        ]),
        tabNum:function(){
            return this.$store.state.expert.tabNum
        },
        // ...mapState({
        //     authority:store=>store.system.authorityManagement
        // })
        
    },
    
    async created () {
        // this.list();
        this.show=true
        this.isAdmin=this.$webapi.getlocal("isAdmin")

        await this.$store.dispatch('getAuthority')
        this.dataArr.forEach(ele =>{
            ele.childMenu.forEach(e =>{
                if(this.switachs(e.name)){
                    e.isAdmin=true
                }else{
                    e.isAdmin=false
                }
                
            })
        })
        this.$nextTick(()=>{
            this.$refs.shop.updateActiveName()
        })
    },
    methods: {
        change(){
            selectGroup(()=>(this.$router.go(0)));
        },
        //switach
        switachs(name){
            switch(name) {
                case '账户管理': return this.getAuthority.manageAccount
                case '角色管理': return this.getAuthority.manageRole
                case '资源权限管理': return this.getAuthority.managePermissionlist
                case '组织管理': return this.getAuthority.manageOrganization
                case '组织关联': return this.getAuthority.manageOrganization
                case '消息审核': return this.getAuthority.editAuditMessage
                case '申请审核': return this.getAuthority.editAuditMessage
                case '申请公钥': return this.getAuthority.managePermissionlist
                case '专家账号': return this.getAuthority.manageExpertAccount
                case '专家库': return this.getAuthority.manageExpertGroup
                case '临时专家': return this.getAuthority.manageTemporaryExpert
                case '消息通知': return this.getAuthority.manageMessage
                case '学院管理': return this.getAuthority.manageCollege

            }
        },
        changeMenu (e) {
            this.$store.commit("tabNumExpert",e);
            var arrIndex=e.split("-");
            if (arrIndex.length==2) {
                var muneindex = e.split("-")[0]
                var itemlistindex = e.split("-")[1]
                var path = this.dataArr[muneindex].childMenu[itemlistindex].path
                if(path=='/system/homenew/organizationManage/out' || path=='/system/homenew/organizationManage/list'){
                    if(this.isAdmin=='true'){
                        path = '/system/homenew/organizationManage/list'
                    }else{
                        path = '/system/homenew/organizationManage/out'
                    }
                }
                this.$router.push({path:path})
            }else{
                var muneindex = e.split("-")[0]
                var itemlistindex = e.split("-")[1]
                var itemindex = e.split("-")[2]
                this.$router.push({path:this.dataArr[muneindex].childMenu[itemlistindex].childMenu[itemindex].path})
            }
        },
    }
}
</script>

<style>
.SideMenuComponent{
    height: 100vh;
    overflow-y: auto;
}
.SideMenuComponent .subitemest{
  color: #fff
}
.mermber-logo{
  height: 64px;
  position: relative;
  line-height: 64px;
  /* padding-left: 24px; */
  -webkit-transition: all .3s;
  transition: all .3s;
  background: #002140;
  overflow: hidden;
  color: #fff;
  text-align: left;
  font-size: 18px;
}
.mermber-logo i{
  display: inline-block;
  /* background:url(../../assets/logo.png); */
  background-repeat: no-repeat;
  background-size: 40px;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-top:10px;
  float:left;
  margin-right: 10px;
}
.mermber-logo span{
    font-size: 12px;
    cursor: pointer;
}
.ivu-scroll-container{
    overflow-y:auto
}
.ivu-menu-dark{
   background: #001529!important
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
  background: #000c17!important;
  -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.45) inset;
  box-shadow: inset 0 2px 8px rgba(0,0,0,.45);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
  background: #001529
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background: #001529
}
.ivu-menu-submenu-title,.ivu-menu-item{
    text-align: left;
}
</style>
