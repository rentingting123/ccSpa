<template>
  <div class="">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>角色管理</BreadcrumbItem>
                <BreadcrumbItem to="/role/list">角色列表</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>权限设置</h2>
            </div>
        </div>
    </div>
    <div class="getResourceAll">
       <div class="resourcelist" v-for="(item,itemindex) in itemdata" style="margin-bottom:20px">
          <div class="resourcelist-hd" style="margin-bottom:10px">
             <span @click="first(item,itemindex)"><Checkbox v-model="item.state==0?false:true" size="large"></Checkbox></span>{{item.name}}
          </div>
          <div class="resourcelist-bd">
              <div class="resourcelist" style="margin-left:20px;margin-bottom:10px" v-for="(itemrole,index) in item.childMenu">
                 <div class="resourcelist-hd" style="margin-bottom:10px" >
                  <span @click="second(itemrole,item,index)"><Checkbox v-model="itemrole.state==0?false:true" size="large"></Checkbox></span>{{itemrole.name}}
                 </div>
                 <div class="resourcelist-bd" style="margin-left:30px;margin-bottom:5px" v-if="itemrole.childMenu!=null" >
                     <div  v-for="itemrolelist in itemrole.childMenu">
                        <span @click="three(itemrolelist,index,itemindex)"><Checkbox v-model="itemrolelist.state==0?false:true" size="large"></Checkbox>{{itemrolelist.name}}</span>
                     </div>
                 </div>
              </div>
          </div>
       </div>
   </div>
   <div>
      <div class="role-margin">
          <Button type="success" size="large" @click="save()">保存</Button>
      </div>
   </div>
  </div>
</template>
<script>
export default {
    name: 'Ressource',
    created() {
        //do something after creating vue instance
        this.subfrom.roleId = this.$route.params.id
        this.list()
    },
    data () {
        return {
            subfrom:{
                roleId:""
            },
            itemdata:[],
            newitemdata:{
              roleMenus:[]
            },
            selfData:[]
        }
    },
    methods:{
        first (item,index) {
          let show =  item.state = !item.state
          item.childMenu.forEach(function (list) {
              list.state = show
              if(list.childMenu!=null){
                 list.childMenu.forEach(function (itemlist) {
                   itemlist.state = show
                 })
              }
          })
        },
        second (itemrole,item,index) {
          let show =  itemrole.state = !itemrole.state
          if(itemrole.childMenu!=null){
             itemrole.childMenu.forEach(function (itemlist) {
               itemlist.state = show
             })
          }
          //判断上一级
          let num = 0
          item.childMenu.forEach(function (itemlist) {
              if(itemlist.state){
                 num = num + 1
              }
          })
          if(num>0){
            item.state = true
          }else if(num == 0){
            item.state = false
          }
        },
        three (itemrolelist,index,itemindex) {
            let show =  itemrolelist.state = !itemrolelist.state
            let num = 0
            this.itemdata[itemindex].childMenu[index].childMenu.forEach(function (itemlist) {
                if(itemlist.state){
                     num = num + 1
                }
            })
            if(num>0){
                this.itemdata[itemindex].state = true
                this.itemdata[itemindex].childMenu[index].state = true
            }else if(num == 0){
              let strnum = 0
               this.itemdata[itemindex].childMenu[index].state = false
               this.itemdata[itemindex].childMenu.forEach(function (itemlist) {
                   if(itemlist.state){
                      strnum = strnum + 1
                   }
               })
               if(num == 0){
                 this.itemdata[itemindex].state  = false
               }
            }
        },
        list () {
          let _this=this;
          var data={
                id:this.$route.params.id
          }
          this.$api.get("/admin/api/permission/menu/list", data, reset => {
            if (reset.code === 200) {
                _this.itemdata=reset.data;
            }else {
              _this.$netcode.getApiCode(reset)
            }
          })

        },
        save () {
          let _this = this
          var data = []
          // {roleResources:[{roleId:28,resourcesId:1},{roleId:28,resourcesId:2}]}
            this.itemdata.forEach(function (itemlist) {
               if(itemlist.state){
                  // var itemdata = {
                  //     roleId:parseInt(_this.$route.params.id),
                  //     menuId:itemlist.id
                  // }
                  data.push(itemlist.id)
               }
               if(itemlist.childMenu!=null){
                 itemlist.childMenu.forEach(function (item) {
                   if(item.state){
                      // var itemdata = {
                      //     roleId:parseInt(_this.$route.params.id),
                      //     menuId:item.id
                      // }
                      data.push(item.id)
                      if(item.childMenu!=null){
                        item.childMenu.forEach(function (itemthree) {
                            if(itemthree.state){
                                // var itemdata = {
                                //     roleId:parseInt(_this.$route.params.id),
                                //     menuId:itemthree.id
                                // }
                                data.push(itemthree.id)
                            }
                       })
                      }
                    }
                 })
               }
            })
            this.newitemdata = data
            if(data.length<1){
                this.$Message.error('资源信息至少选择一个才能保存')
            }else{
                // console.log(this.newitemdata)
                this.saveemit()
            }
        },
        saveemit () {
            var _this = this
            var datas={
                id:this.$route.params.id,
                menuIds:JSON.stringify(this.newitemdata)
            }
            this.$api.post("/admin/api/permission/update", datas, reset => {
                if (reset.code === 200) {
                    _this.$Message.success("设置成功!")
                    _this.$router.push({path:"/role/list"})
                    window.location.reload();
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        }
    }
}
</script>

<style scoped>
    .getResourceAll{
    padding: 15px;
    }
    .resourcelist{
    text-align: left
    }
    .role-margin{
        text-align:center;
        margin-bottom:30px;
    }
</style>
