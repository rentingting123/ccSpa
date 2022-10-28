<template>
  <div class="home">
    <div style="  height:100%;  width: 220px;max-width:220px">
           <el-menu :default-openeds="openeds" :active-name="name" width="auto" style="height:100%;text-align: left; width: 220px;max-width:220px" @select="route" :open-names="openNames">
                <el-submenu v-for="nav in navs" :key="nav.id" :index="nav.path">
                <template slot="title">
                    {{nav.name}}
                </template>
                <el-menu-item  v-for="child in nav.childrens" 
                 :key="child.id" 
                 :index="child.path">{{child.name}}</el-menu-item>
            </el-submenu>
          </el-menu>
    </div>
    <div style="    padding: 20px;     flex: 1;">
        <component :is="comName" type="student"></component>
    </div>
  </div>
</template>

<script>
import home from './common/home'
import innovate from './common/innovate'
import scientificResearch from './common/scientificResearch'
import dateInnovate from './common/dateInnovate'
import weChat from './common/weChat'
export default {
  components:{
    home,
    innovate,
    scientificResearch,
    dateInnovate,
    weChat
  },
data(){
    return{
         openNames:[],
         openeds: ['/contents/index','/contents/scientificResearch'],
       navs:[
          {
                name:'信息类',
                id:'3',
                path:'/contents/index',
                childrens:[
                    {
                        name:'教务处网站',
                        id:'3-1',
                        path:'home'
                    },
                    {
                        name:'创新成果系统',
                        id:'3-2',
                        path:'innovate'
                    }
                ]
          },
           {
                name:'数据类',
                id:'4',
                path:'/contents/scientificResearch',
                childrens:[
                     {
                        name:'科研训练系统',
                        id:'4-1',
                        path:'scientificResearch'
                    },
                    {
                         name:'创新成果系统',
                        id:'4-2',
                        path:'dateInnovate'
                    },{
                         name:'微信公众号未关注名单',
                        id:'4-3',
                        path:'weChat'
                    }
                ]
          },
       ],
       name:'',
       comName:'home'
    }
},
mounted(){
    this.name = location.pathname;
        this.openNames = new Array(location.pathname);
},
methods:{
  route(name){
    this.comName = name
        },
}
}
</script>

<style scoped>
.home{
    display: flex;
    /* justify-content: space-between; */
    height: 100%;
    background-color: #fff;
    min-width: 1000px;
}
</style>




