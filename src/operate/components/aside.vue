<template>
    <div>
        <Menu :active-name="name" theme="dark" width="auto" @on-select="route" :open-names="openNames">
            <Submenu v-for="nav in lists" :key="nav.id" :name="nav.path">
                <template slot="title">
                    <Icon type="ios-navigate"></Icon>
                    {{nav.name}}
                </template>
                <MenuItem v-for="child in nav.childrens" :key="child.id" :name="child.path">{{child.name}}</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navs: [
                {
                    name: '皮肤管理',
                    id: '1',
                    path: '/tool/skin',
                    childrens: [
                        {
                            name: '竞赛皮肤',
                            id: '1-1',
                            path: '/tool/skin'
                        },
                        {
                            name: '省数据中心',
                            id: '1-2',
                            path: '/tool/pskin'
                        },
                        {
                            name: '校数据中心',
                            id: '1-3',
                            path: '/tool/eskin'
                        },
                        {
                            name: '国省系列赛',
                            id: '1-4',
                            path: '/tool/seriesskin'
                        },
                        {
                            name: '特殊皮肤',
                            id: '1-5',
                            path: '/tool/customizeskin'
                        }
                    ]
                },
                {
                    name: '审核管理',
                    id: '2',
                    path: '/manage/manage',
                    childrens: [
                        {
                            name: '管理员认证',
                            id: '2-1',
                            path: '/manage/manage'
                        },
                        {
                            name: '机构注册',
                            id: '2-2',
                            path: '/manage/resource'
                        },
                        {
                            name: '高校入驻',
                            id: '2-3',
                            path: '/manage/universitieSettled'
                        },
                        {
                            name: '申请试用',
                            id: '2-4',
                            path: '/manage/apply'
                        },
                        {
                            name: '高校数据服务开通',
                            id: '2-5',
                            path: '/data/service',
                        },
                        {
                            name: '竞赛征集',
                            id: '2-6',
                            path: '/manage/competition',
                        }
                    ]
                },
                {
                    name: '证书管理',
                    id: 5,
                    path: '/cert',
                    childrens: [
                        {
                            name: '证书审核',
                            id: 5.1,
                            path: '/cert/manage',
                        }
                    ]
                },
                {
                    name: '高校数据统计',
                    id: '3',
                    path: '/data',
                    childrens: [
                        {
                            name: '累计登录',
                            id: '3-1',
                            path: '/data'
                        },
                        {
                            name: '省份覆盖',
                            id: '3-2',
                            path: '/data/provincialCoverage'
                        },
                        {
                            name: '重点高校覆盖',
                            id: '3-3',
                            path: '/data/schoolCoverage'
                        },
                        {
                            name: '高校清单',
                            id: '3-4',
                            path: '/data/schoolList'
                        },
                       
                    ]
                },
                {
                    name: '学校管理',
                    id: 6,
                    path: '/school',
                    childrens: [
                        {
                            name: '专业管理',
                            id: 6.1,
                            path: '/school',
                        }
                    ]
                },
                {
                    name: '客服中心管理',
                    id: 4,
                    path: '/service',
                    childrens: [
                        {
                            name: '类别管理',
                            id: 4.1,
                            path: '/service/type',
                        },
                        {
                            name: '视频教程',
                            id: 4.2,
                            path: '/service/lists',
                        },
                        {
                            name: '下载管理',
                            id: 4.3,
                            path: '/service/download',
                        }
                    ]
                },
                {
                    name: '客服操作',
                    id: 7,
                    path: '/operate',
                    childrens: [
                        {
                            name: '客服操作',
                            id: 7.1,
                            path: '/operate',
                        }
                    ]
                },
                {
                    name: '特殊新闻',
                    id: 8,
                    path: '/news',
                    childrens: [
                        {
                            name: '新闻列表',
                            id: 8.1,
                            path: '/news',
                        },
                        {
                            name: '新闻发布',
                            id: 8.2,
                            path: '/news/issue',
                        },
                        {
                            name: '类型管理',
                            id: 8.3,
                            path: '/news/types',
                        }
                    ]
                },
                {
                    name: '权限管理',
                    id: 9,
                    path: '/roles',
                    childrens: [
                        {
                            name: '用户管理',
                            id: 9.1,
                            path: '/roles',
                        },
                        {
                            name: '角色管理',
                            id: 9.2,
                            path: '/roles/role',
                        },
                        {
                            name: '路由管理',
                            id: 9.3,
                            path: '/roles/persission',
                        }
                    ]
                },
            ],
            lists: [],
            name: '',
            openNames: []
        }
    },
    mounted() {
        this.name = location.pathname;
        this.openNames = new Array(location.pathname);
        this.setNavs()
    },
    methods: {
        setNavs() {
            let white_url = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).white_url || []
            console.log(white_url, 'white_url');
            let arr = []
            this.navs.forEach((res) => {
                res.childrens = res.childrens.filter(child => {
                    console.log(child.path);
                    return white_url.includes(child.path)
                })
                if (res.childrens.length > 0) {
                    arr.push(res)
                }
            })

            this.lists = arr;
            // 登录近来页面，需要判断路由
            if (this.$route.path == '/home') {
                let path = this.lists.length > 0 && this.lists[0].childrens[0].path || ''
                if (path) {
                    this.$router.push(path)
                }
            }
        },
        route(name) {
            this.$router.push(name)
        }
    },
};
</script>

