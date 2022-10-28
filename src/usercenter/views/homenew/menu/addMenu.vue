<template>

<div id="resource" style="width:100%">
    <div class="pageHeader">
        <div class="pageBread">
            <Breadcrumb>
                <BreadcrumbItem to="/">首页</BreadcrumbItem>
                <BreadcrumbItem>菜单管理</BreadcrumbItem>
                <BreadcrumbItem>添加详情</BreadcrumbItem>
            </Breadcrumb>
        </div>
        <div class="page-detail">
            <div class="page-detail-hd">
                <h2>添加详情</h2>
            </div>
        </div>
    </div>
    <div class="page-component-view">
        <div class="page-component-bd">
            <Row>
                <Col span="8">
                    <div class="menu">
                        <div class="res-name">
                            <span>一级菜单</span>
                            <Button type="primary" @click="addmenuone()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objArr" :ref="'one'+item.id" :class="[indexIdOne==item.id?'bgColor':'']">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.name}}</span>
                                    <p class="icon">
                                        <span @click="remove(item,index)"><Icon type="md-remove-circle" color="#DD4E4E" /></span>
                                        <span @click="handleOne(item,index)"><Icon type="md-menu" color="#1AAB8D" /></span>
                                        <span @click="switchone(item,index)"><Icon type="md-add-circle" color="#1AAB8D" /></span>
                                    </p>

                                </div>
                            </li>
                        </ul>
                    </div>

                </Col>
                <Col span="8">
                    <div class="menu" v-if="showtwo">
                        <div class="res-name">
                            <span>二级菜单</span>
                            <Button type="primary" @click="addmenutwo()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objtwo" :class="[indexIdTwo==item.id?'bgColor':'']">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.name}}</span>
                                    <p class="icon">
                                        <span @click="remove(item,index)"><Icon type="md-remove-circle" color="#DD4E4E"/></span>
                                        <span @click="handleTwo(item,index)"><Icon type="md-menu" color="#1AAB8D" /></span>
                                        <span @click="switchtwo(item,index)"><Icon type="md-add-circle" color="#1AAB8D" /></span>
                                    </p>

                                </div>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col span="8">
                    <div class="menu" v-if="showthree">
                        <div class="res-name">
                            <span>三级菜单</span>
                            <Button type="primary" @click="addmenuthree()">新增菜单</Button>
                        </div>
                        <ul class="res-title">
                            <li v-for="(item,index) in objthree">
                                <div class="res-title-name res-title-div icon-div">
                                    <span>{{item.name}}</span>
                                    <p class="icon">
                                        <span @click="remove(item,index)"><Icon type="md-remove-circle" color="#DD4E4E" /></span>
                                        <span @click="handleThree(item,index)"><Icon type="md-menu" color="#1AAB8D"></Icon></span>
                                    </p>

                                </div>

                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <add-menu-component :importData="add" :importShow="addShow" @exportAddShow="exportAddShow" v-if="addShow"></add-menu-component>
            <edit-menu-component :importData="editData" :importShow="editShow" @exportShow="exportEditShow" v-if="editShow"></edit-menu-component>
        </div>
    </div>
</div>

</template>

<script>
import addMenuComponent from './addMenuComponent.vue'
import editMenuComponent from './editMenuComponent.vue'
export default {
    components: {
        addMenuComponent: addMenuComponent,
        editMenuComponent
    },
    data() {
        return {
            addShow:false,
            editShow:false,
            showtwo: false,
            showthree: false,
            addmodal: false,
            editresourcedata: {},
            addone:0,
            addtwo:0,
            add:{
                pidData:0,
                addtitle: '',
                sortLevel:0,
            },
            editresourceshow: false,
            objArr: [],
            objtwo: [],
            objthree: [],
            indexOne:0,
            indexTwo:0,
            indexIdOne:0,//选中一级菜单的样式
            indexIdTwo:0,//选中二级菜单的样式
            isRemove:false,
        }
    },
    created() {

    },
    mounted() {
        this.list();
    },
    methods: {
        cancel () {
            this.addmodal = false
        },
        addmenuone() {
            this.add.addtitle = "新增一级菜单";
            this.add.sortLevel=1
            this.add.pidData=0;
            this.addShow=true;
        },
        addmenutwo() {
            this.add.addtitle = "新增二级菜单";
            this.add.pidData=this.addone;
            this.add.sortLevel=2;
            this.addShow=true;
        },
        addmenuthree() {
            this.add.addtitle = "新增三级菜单";
            this.add.pidData=this.addtwo;
            this.add.sortLevel=3;
            this.addShow=true;
        },
        handleOne(e,index) {
            this.editData=e;
            // this.indexIdOne=e.id;
            this.indexOne=index;
            this.editShow=true;
        },
        handleTwo(e,index) {
            this.editData=e;
            this.add.sortLevel=2
            // this.indexIdTwo=e.id;
            this.indexTwo=index;
            this.editShow=true;
        },
        handleThree(e,index) {
            this.editData=e;
            this.add.sortLevel=3
            // this.indexIdThree=e.id;
            this.indexThree=index;
            this.editShow=true;
        },
        editresourcecomponentdata(e) {
            this.editresourceshow = e.editresourceshow;
            if (e.start!=null) {
                this.list(e.start.parentId,e.start.menuStatus);
            }

        },
        switchone(e,index) {
            this.addone=e.id;
            this.indexIdOne=e.id;
            this.objthree=[];
            this.indexOne=index;
            // console.log(this.$refs[str][0]);
            // console.log(e.childMenu);
            // this.$refs[str][0].style.backgroundColor="#F1F3F4"
            if(e.childMenu){
                this.objtwo=e.childMenu;
            }else{
                this.objtwo=[]
            }
            this.showtwo=true;
            this.showthree=false;
        },
        switchtwo(e,index) {
            this.addtwo=e.id;
            this.indexIdTwo=e.id;
            this.indexTwo=index;
            if(e.childMenu){
                this.objthree=e.childMenu;
            }else{
                this.objthree=[]
            }
            this.showthree=true;
        },
        list() {
            let _this = this
            this.$api.get('/admin/api/menu/list', null, reset => {
                if (reset.code === 200) {
                    let data = reset.data
                    _this.objArr = data
                    // if(this.add.sortLevel!=0){
                    if(this.add.sortLevel==1){
                        if (_this.isRemove) {
                            _this.showtwo=false;
                            _this.showthree=false;
                        }
                    }
                    if(this.add.sortLevel==2){
                        if (data[this.indexOne].childMenu) {
                            this.objtwo=data[this.indexOne].childMenu
                        }
                        if (_this.isRemove) {
                            _this.showthree=false;
                        }
                    }
                    if(this.add.sortLevel==3){
                        if (data[this.indexTwo].childMenu) {
                            this.objthree=data[this.indexOne].childMenu[this.indexTwo].childMenu
                        }
                    }
                    _this.isRemove=false;
                    // }
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        remove(e,index) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认删除' + e.name + '吗?</p>',
                onOk: () => {
                    let _this = this;
                    var data = {
                        id:e.id
                    }
                    this.$api.post("/admin/api/menu/delete", data, reset => {
                        if (reset.code === 200) {
                            _this.add.sortLevel=e.menuLevelId;
                            if (_this.add.sortLevel==1||_this.add.sortLevel==2) {
                                _this.isRemove=true;
                            }
                            _this.$Message.info('删除成功');
                            _this.list();
                        } else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });

        },
        exportAddShow(e){
            this.addShow=e.show;
            if(e.refresh){
                this.list();
            }
        },
        exportEditShow(e){
            this.editShow=e.show;
            if(e.refresh){
                this.list();
            }
        },
    },
}
</script>
<style scoped>
.bgColor{
    background-color:#F1F3F4;
}
.res-name {
    padding: 10px 16px;
    text-align: right;
    border-bottom: 1px solid #ccc;
}

.res-name span {
    float: left;
    line-height: 32px;
    font-size: 20px;
}

ul {
    margin: 0;
    padding: 0px;
    list-style: none;
}

li {
    text-align: left;
    padding-left: 16px;
}

.res-title-name {
    padding-top: 6px;
    padding-bottom: 0px;
    position: relative;
    z-index: 1;
    transition: all .2s ease-in-out;
}

.res-title-div {
    font-size: 18px;
}

.res-title-div p {
    text-align: center;
}

.res-title-name-div {
    font-size: 16px;
}

.res-title-name-ul {
    margin: 0;
    outline: 0;
    list-style: none;
    color: #495060;
    font-size: 14px;
    position: relative;
    z-index: 900;
}

.icon {
    display: inline-block;
}

.icon-div {
    text-align: right;
    padding-right:10px;
}

.icon-div span {
    float: left;
}

.icon span {
    display: inline-block;
    margin-left: 15px;
}

.menu {
    border-right: 1px solid #ccc;
}

</style>
