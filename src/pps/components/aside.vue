<template>
  <div>
        <el-menu :active-name="name" width="auto" style="text-align: left;" @select="route" :open-names="openNames">
            <el-submenu v-for="nav in navs" :key="nav.id" :index="nav.path">
                <template slot="title">
                    {{nav.name}}
                </template>
                <el-menu-item  v-for="child in nav.childrens"
                 v-show="child.id !== '2-4' && child.id !== '2-5' && child.id !== '1-7' && child.id !== '1-8' && child.id !== '2-6' && child.id !== '2-7'"  
                 :key="child.id" 
                 :index="child.path">{{child.name}}</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="/contents/index">
                内容库
            </el-menu-item> -->
            <el-menu-item index="/onepush">
                个推空间（h5）
            </el-menu-item>
        </el-menu>
  </div>
</template>

<script>
export default {
    data(){
        return{
            navs:[
                {
                    name:'推送系统',
                    id:'1',
                    path:'/pps',
                    childrens:[
                        {
                            name:'手动推送消息',
                            id:'1-1',
                            path:'/pps'
                        },
                         {
                            name:'场景模板推送',
                            id:'1-2',
                            path:'/pps/scenetemplate'
                        },
                        {
                            name:'内容模板设置',
                            id:'1-3',
                            path:'/pps/contenttmplate'
                        },
                        {
                            name:'消息推送审核',
                            id:'1-4',
                            path:'/pps/messagepush'
                        },
                        // {
                        //     name:'消息模拟推送',
                        //     id:'1-5',
                        //     path:'/pps/messagesimulation'
                        // },
                        {
                            name:'消息推送统计',
                            id:'1-6',
                            path:'/pps/messagestatistics'
                        },
                        {
                            name:'创建场景模板',
                            id:'1-7',
                            path:'/pps/createconttemplate'
                        },
                        {
                            name:'新增内容模板',
                            id:'1-8',
                            path:'/pps/addnewtemplate'
                        },
                        
                    ]
                },
                {
                    name:'标签库',
                    id:'2',
                    path:'/tab',
                    childrens:[
                        {
                            name:'用户标签库',
                            id:'2-1',
                            path:'/tab/index'
                        },
                         {
                            name:'内容标签库',
                            id:'2-2',
                            path:'/tab/contenttab'
                        },
                        {
                            name:'数据标签库',
                            id:'2-3',
                            path:'/tab/datatab'
                        },
                         {
                            name:'设置分类',
                            id:'2-4',
                            path:'/tab/setclass'
                        },
                        {
                            name:'创建标签',
                            id:'2-5',
                            path:'/tab/addtab'
                        },
                        {
                            name:'创建内容标签',
                            id:'2-6',
                            path:'/tab/contentaddtab'
                        },
                        {
                            name:'创建数据标签',
                            id:'2-7',
                            path:'/tab/dataaddtab'
                        },
                    ]
                },
                {
                name:'内容库',
                id:'3',
                path:'/contents/index',
                childrens:[
                    {
                        name:'内容索引',
                        id:'3-1',
                        path:'/contents/index'
                    },
                    // {
                    //     name:'创新成果系统',
                    //     id:'3-2',
                    //     path:'/contents/innovate'
                    // },
                    //  {
                    //     name:'科研训练系统',
                    //     id:'3-3',
                    //     path:'/contents/scientificResearch'
                    // },
                    // {
                    //      name:'创新成果系统',
                    //     id:'3-4',
                    //     path:'/contents/dateInnovate'
                    // }
                ]
                },
            ],
            lists: [],
            name:'',
            openNames:[]
        }
    },
    mounted(){
        this.name = location.pathname;
        this.openNames = new Array(location.pathname);
        // this.setNavs()
    },
    methods:{
        //  setNavs(){
        //     let white_url = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).white_url || []
        //     let arr = []
        //     this.navs.forEach((res)=>{
        //         res.childrens =  res.childrens.filter(child=>{
        //             return white_url.includes(child.path)
        //         })
        //         if(res.childrens.length > 0){
        //             arr.push(res)
        //         }
        //     })

        //     this.lists = arr;
        //     // 登录近来页面，需要判断路由
        //     if(this.$route.path=='/home'){
        //         let path = this.lists.length > 0 && this.lists[0].childrens[0].path || ''
        //         if(path){
        //             this.$router.push(path)
        //         }
        //     }
        // },
        route(name){
            this.$router.push(name)
        }
    },
};
</script>



