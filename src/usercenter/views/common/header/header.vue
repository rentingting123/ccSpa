<template>
   <div id="J_Headernav">
        <div class="">
          <span @click="tabs" class="mune-tab"><Icon type="android-menu"></Icon></span>
        </div>
        <!-- <div class="">
            <a href="https://cc.moocollege.com/#/competition" class="a-wrap">返回主页</a>
        </div> -->
        <!-- <div class="">
            <ul class='headernav'>
                <li class="headernavlist">
                 <Dropdown trigger="hover" @on-click='doMore'>
                      <a href="javascript:void(0)" class="system-header"><span class="mr10"><Avatar icon="person" /></span>{{items.name}}</a>
                      <DropdownMenu slot="list">
                          <DropdownItem name='loginout'>退出</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
                </li>
            </ul>
        </div> -->
   </div>
</template>

<script>
export default {
  name: 'Header',
    components:{

    },
  data () {
        return {
            items:{
                name:this.$webapi.get('name')
            },
            importShow:false
        }
  },
  methods: {
    tabs(){
        this.$emit('headerdata')
    },
    doMore:function (name){
        if(name=="loginout"){
          this.loginout()
        }
     },
    loginout:function (){
        let _this = this
        this.$api.post('/admin/api/user/logout', null, reset => {
            if (reset.code === 200) {
                _this.$webapi.save('id',"")
                _this.$webapi.save('account',"")
                _this.$webapi.save('name',"")
               location.href = `#`
            }else if (reset.code ===-1 ) {
                _this.$webapi.save('token',"")
                _this.$webapi.save('companyId',"")
                _this.$webapi.save('companyName',"")
               location.href = `#`
            }
            else {
                _this.$netcode.getApiCode(reset)
            }
        })
    },
    updataPassword(){
        this.importShow=true;
    },
    exportShow(e){
        console.log(e);
        this.importShow=e.show
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
    -webkit-box-shadow: 0 1px 4px rgba(0,21,41,.08);
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    position: relative;
    background: #fff;
    justify-content:space-between;
    height: 64px;
    position: relative;
    z-index: 10;
    display: none;
  }
  .system-header{
    line-height: 64px;
    height: 64px;
    display: block;
    padding: 0 15px;
    color: #666
  }
  .system-header:hover{
    background: #f8f8f8
  }
  .headernav{
    margin-right: 42px;
    .headernavlist{
      display: inline-block;
    }
  }
  .mune-tab{
    line-height: 60px;
    padding: 0 10px;
    cursor:pointer;
    font-size: 18px;
  }
  .pointer{
    border-bottom:1px solid #e0e0e0;
    cursor:pointer;
  }
</style>
