<template>
   <div class="SideMenuComponent">
        <Scroll :height='muneheight'>
            <Menu width="auto" ref="menus" :active-name="tabName" :open-names="['0']" theme="dark"  @on-select="changeMenu" accordion>
                <MenuItem :name="item.path" v-for="item in dataArr" :key="item.id" >
                    {{item.name}}
                </MenuItem>
           </Menu>
       </Scroll>
   </div>
</template>
<script>
export default {
    props: ['show'],
    name: 'SideMenu',
    data () {
        return {
            muneheight:"",
        }
    },
    computed:{
        tabName(){
            return this.$store.state.common.tabName
        },
        dataArr(){
            this.$nextTick(()=>{
                this.$refs.menus.updateActiveName();
            })
            if(!this.show){
                return [
                    {
                        name:"竞赛评审",
                        path:"/expert/judge",
                        id:1,
                        isAdmin:1
                    },
                ]
            }else{
                return [
                    //2022.6.23 vv发现两边设置已经开始出现不一样，保持设置唯一性先移除设置，去执行平台统一设置
                    // {
                    //     name: "评审设置",
                    //     path: "/expert/setting",
                    //     id: 5,
                    //     isAdmin: 1
                    // },
                    {
                        name: "评审专家",
                        path: "expertDatabase",
                        id: 6,
                        isAdmin: 1
                    },
                    {
                        name:"分配作品",
                        path:"/expert/works",
                        id: 7,
                        isAdmin: 1
                    },
                    {
                        name:"竞赛评审",
                        path:"/expert/judge",
                        id:1,
                        isAdmin:1
                    },
                    {
                        name:"晋级淘汰",
                        path:"/expert/filtrate",
                        id:2,
                        isAdmin:1
                    },
                    {
                        name:"结果查看",
                        path:"/expert/result",
                        id:3,
                        isAdmin:1
                    },
                    {
                        name:"颁奖发布",
                        path:"/expert/public",
                        id:4,
                        isAdmin:1
                    },
                ]
            }
        }
    },
    mounted() {
        this.$nextTick(()=>{
            this.muneheight = window.innerHeight-64;
        })
    },
    methods: {
        changeMenu (e) {
            if(e=='expertDatabase'){
                window.open('/system/expert/expertDatabase')
            }else{
                this.$router.push(e);
            }
        },
    },
}
</script>

<style>
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
  background-repeat: no-repeat;
  background-size: 40px;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-top:10px;
  float:left;
  margin-right: 10px;
}
.ivu-scroll-container{
    overflow-y:auto
}
.ivu-menu-dark{
   background: #4A4A4A!important
}
/* .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened{
  background: #000c17!important;
  -webkit-box-shadow: 0 2px 8px rgba(0,0,0,.45) inset;
  box-shadow: inset 0 2px 8px rgba(0,0,0,.45);
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{
  background: #001529
} */
/* .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover{
    background: #001529
} */
.ivu-menu-submenu-title,.ivu-menu-item{
    text-align: left;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover{
    background:#3F91FB !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    background:#3F91FB !important;
    color:#fff !important;
}
</style>
