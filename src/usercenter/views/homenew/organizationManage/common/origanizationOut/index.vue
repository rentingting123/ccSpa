<template>
  <div class="origanizationOutRule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">
                <div class="now-org" :class="{'no':!editName}">
                    <span v-if="editName">{{objData.groupName}} <Icon v-if="false"  @click="editName=false" type="ios-create-outline" /></span>
                    <Input v-else v-model="objData.groupName" @on-blur="editName=true" style="width: 300px" />
                </div>
                <div class="buttondiv">
                    <a href="https://web.moocollege.com/mooc/hzq/20200922/%E5%AF%BC%E5%85%A5%E4%BA%8C%E7%BA%A7%E5%AD%A6%E9%99%A2%E6%A8%A1%E6%9D%BF.xls">
                        <Button type="primary">导入二级学院模板下载</Button>
                    </a>
                    <div>
                        <Upload :action="'/api/usercenter/insertCollegeList'" ref="upload1" :before-upload="handleUpload1" :headers="header" :on-success="handleSuccess">
                            <Button type="primary" >批量导入二级学院</Button>
                        </Upload>
                    </div>
                    <Button type="primary"  @click="tomerge">合并竞赛</Button>
                    <a href="https://web.moocollege.com/edit/20191017/a90dbd3dc0c04e3b589e3d551f0c1659/rfjRdUoe_1571302196246/组织模板.xls">
                        <Button type="primary">模板下载</Button>
                    </a>
                    <div>
                        <Upload :action="'/api/usercenter/group/importRelation'" ref="upload" :before-upload="handleUpload" :headers="header" :data="datas" :on-success="handleSuccess">
                            <Button type="primary" >批量导入组织</Button>
                        </Upload>
                    </div>
                </div>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <!-- <Button type="primary"  @click="add()">新增</Button> -->
			</div>
            <Row>
                <Col span="10">
                    <Card>
                        <div slot="title">
                            <p>上级组织或竞赛</p>
                            <div style="margin:10px 0 0;">
                                <Input placeholder="搜索组织" search @on-search="getupData" style="width:200px;"></Input>
                            </div>
                        </div>
                        <div class="item-wrapper">
                            <CheckboxGroup v-model="fruit">
                                <div class="item" v-for="item in objData.groupDirectParentList" :key="item.id">
                                    <div class="name-wrapper">
                                            <p class="name">
                                                <Checkbox :label="item.id" :disabled="item.type==0"><span></span></Checkbox>
                                                <span :title="item.groupName">{{item.groupName}}</span>
                                                <span style="font-size:12px;">({{item.type==0?"组织":"竞赛"}})</span>
                                                <Icon type="md-trash" v-if="selfType!=1" @click="removeOri(item, 1)"/>
                                            </p>
                                        <p class="connection">直属</p>
                                    </div>
                                </div>
                                <div class="item" v-for="(item, index) in objData.groupReportParentList" :key="item.id">
                                    <div class="name-wrapper">
                                            <p class="name">
                                                <Checkbox :label="item.id" :disabled="item.type==0"><span></span></Checkbox>
                                                <span :title="item.groupName">{{item.groupName}}</span>
                                                <span style="font-size:12px;">({{item.type==0?"组织":"竞赛"}})</span>
                                                <Icon type="md-trash" @click="removeOri(item, 1)"/>
                                            </p>
                                        <p class="connection">汇报</p>
                                    </div>
                                </div>
                          </CheckboxGroup>
                        </div>
                        <div class="operate-wrapper">
                          <Button type="primary" size="small" :disabled="objData && objData.groupDirectParentList && objData.groupDirectParentList.length>0" @click="addDirect(1)">添加直属上级</Button>
                          <Button type="default" size="small" @click="addDirect(2)">添加汇报上级</Button>
                        </div>
                    </Card>
                </Col>
                <Col span="2" style="text-align: center;">
                    <p>&nbsp;</p>
                </Col>
                <Col span="10">
                    <Card>
                        <div slot="title" >
                            <p>下级组织或竞赛</p>
                            <div style="margin:10px 0 0;display:flex;justify-content: space-between;align-items: center;">
                                <Input placeholder="搜索组织" search @on-search="getdownData" style="width:200px;">
                                </Input><Button type="primary" v-if="selfType!=1" @click="addIndexShow=true">新增</Button>
                            </div>
                        </div>
                        <div class="item-wrapper">
                            <CheckboxGroup v-model="fruit1">
                                <div class="item" v-for="(item, index) in objData.groupDirectChildList" :key="item.id">
                                    <div class="name-wrapper">
                                        <p class="name">
                                            <Checkbox :disabled="item.type==0" :label="item.id"><span></span></Checkbox>
                                            <span :title="item.groupName">{{item.groupName}}</span>
                                            <span style="font-size:12px;">({{item.type==0?"组织":"竞赛"}})</span>
                                            <Icon type="md-trash" @click="removeOri(item, 0)"/>
                                        </p>
                                        <p class="connection">直属</p>
                                    </div>
                                </div>
                                <div class="item" v-for="(item, index) in objData.groupReportChildList" :key="index">
                                    <div class="name-wrapper">
                                        <p class="name">
                                            <Checkbox :disabled="item.type==0" :label="item.id"><span></span></Checkbox>
                                            <span :title="item.groupName">{{item.groupName}}</span>
                                            <span style="font-size:12px;">({{item.type==0?"组织":"竞赛"}})</span>
                                            <Icon type="md-trash" @click="removeOri(item, 0)"/>
                                        </p>
                                        <p class="connection">汇报</p>
                                    </div>
                                </div>
                            </CheckboxGroup>
                            
                        </div>
                        <div class="operate-wrapper">
                          <Button type="primary" size="small" :disabled="!authority.addSubordinate"  @click="addDirect(3)">添加直属下级</Button>
                          <Button type="default" size="small" :disabled="!authority.addReport " @click="addDirect(4)">添加汇报下级</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
		</div>
        
        <add-direct-index :close="close" :type="type" v-if="addDirectShow"></add-direct-index>
        <add-index v-if="addIndexShow" :close="close"/>
        <merge v-if="mergeshow" :close="close" :mergedata='fruit1' :objData="objData"/>
    </div>
</div>
</template>
<script>
import addDirectIndex from "./addDirectIndex"
import addIndex from "./addIndex"
import merge from './merge'
import {getToken} from '@@/utils/oauth'
import {cloneDeep} from 'lodash'
import { mapGetters,mapState } from 'vuex';
export default {
    components:{
        addDirectIndex,
        addIndex,
        merge
    },
    data () {
        return {
            addDirectShow:false,//添加直属上级model是否显示
            addIndexShow: false,//新增组织
            mergeshow: false, //合并弹窗
            objData: {
                groupName:'',
                id:10000
            },
            objDatacopy:{},
            editIndexData:{},
            isAdmin:false,
            editName: true,
            fruit:[],
            fruit1:[],
            type: '',
            datas:{
                groupId:this.$webapi.getlocal("groupId"),
                type: this.$webapi.getselfType()
            },
            header:{
                Authorization:'Bearer '+ getToken()
            },
            selfType: this.$webapi.getselfType(), //类型 0组织 1竞赛
        }
    },
    computed: {
        ...mapState({
            authority:store=>store.system.authorityManagement
        }),
    },
    async created(){
        await this.$store.dispatch('getAuthority')
    },
    mounted() {
        this.list()
        this.getAuthority()
    },
    methods:{
        handleUpload(){
            this.$refs.upload.clearFiles();
        },
        handleUpload1(){
            this.$refs.upload1.clearFiles();
        },
        getupData(value){
            if(!value){
                return this.objData = cloneDeep(this.objDatacopy)
            }else{
                let arr1 = [],arr2 = [];
                this.objDatacopy.groupDirectParentList.forEach((val,index)=>{
                    if(val.groupName && val.groupName.indexOf(value) != -1){
                        arr1.push(val)
                    }
                })
                this.objDatacopy.groupReportParentList.forEach((val,index)=>{
                    if(val.groupName && val.groupName.indexOf(value) != -1){
                        arr2.push(val)
                    }
                })
                this.objData.groupDirectParentList = arr1
                this.objData.groupReportParentList = arr2
            }
        },
        getdownData(value){
            if(!value){
                return this.objData = cloneDeep(this.objDatacopy)
            }else{
                let arr1 = [],arr2 = [];
                this.objDatacopy.groupDirectChildList.forEach((val,index)=>{
                    if(val.groupName && val.groupName.indexOf(value) != -1){
                        arr1.push(val)
                    }
                })
                this.objDatacopy.groupReportChildList.forEach((val,index)=>{
                    if(val.groupName && val.groupName.indexOf(value) != -1){
                        arr2.push(val)
                    }
                })
                this.objData.groupDirectChildList = arr1
                this.objData.groupReportChildList = arr2
            }
        },
        handleSuccess(res,file,filelist){
            if(res.code==0){
                this.$Message.success('导入成功！')
                this.list();
            }else{
                this.$Message.error(res.message)
            }
        },
        tomerge(){
            if(this.fruit1.length!=2){
                return this.$Message.warning('请选择2个需要合并的下级竞赛');
            }
            this.mergeshow = true
        },
        close(){
            this.addDirectShow = false;
            this.addIndexShow = false;
            this.mergeshow = false;
            this.list();
        },
        //getAuthority 获取权限
        getAuthority(){
            this.isAdmin=this.$webapi.getlocal("isAdmin")
        },
        list () {
            let _this = this
            let data={
                groupId:Number(this.$webapi.getlocal("groupId"))
            }
            this.$api.post('/usercenter/group/queryouter',data).then(reset => {
                if (reset.code == 0) {
                    if (reset.data) {
                        this.objData=reset.data;
                        this.objDatacopy = cloneDeep(this.objData)
                    }else{
                        this.objData.groupName="超级管理员"
                    }
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        addDirect(type){
            this.type = type
            this.addDirectShow=true;
        },
        // 删除
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+item.groupName+'】吗?</p>',
                onOk: () => {
                   let _this = this;
                    var data = {
                        id:item.id
                    }
                    this.$api.delete("/usercenter/group/"+item.id, null).then(reset => {
                        if (reset.code == 0) {
                            this.$Message.success("删除成功!")
                            this.formCustom.groupName=''
                            this.list()
                        }else {
                            this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });
        },
        handleSubmit (name) {
            this.pageData.pageCurrent = 1
            this.list()
        },
        // 删除上下级组织
        removeOri(e,type){
            var _this=this;
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除和【'+e.groupName+'】的关系吗?</p>',
                onOk: () => {
                    var data={
                        groupId:Number(this.$webapi.getlocal("groupId")),
                        relationGroupId:e.id,
                        type:type
                    }
                    this.$api.get("/usercenter/group/deleterelation", data).then(reset => {
                        if (reset.code == 0) {
                            this.$Message.success("删除成功!")
                            this.list()
                        }else {
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                },
                onCancel: () => {

                }
            });

        }
    }
  }
</script>
<style lang='less' scoped>
    .tableListForm{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 15px;
        margin-bottom: 20px;
        .now-org {
            width: auto;
            height: 36px;
            max-width: 50%;
            padding: 0 5px;
            line-height: 36px;
            border: 1px solid #e5e5e5;
            overflow: hidden;
            font-size: 17px;
            border-radius: 5px;
            span{
                i{
                    display: none;
                    cursor: pointer;
                }
            }
            span:hover{
                i{
                    display: inline-block;
                }
            }
        }
        .now-org.no{
            border: none;
        }
        .buttondiv{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            .ivu-btn{
                margin-right: 6px;
            }
        }
    }
    .item-wrapper::-webkit-scrollbar {
        display: none;
    }
    .item-wrapper {
        // padding: 20px 0;
        height:400px;
        overflow-y: scroll;
        .item {
        overflow: hidden;
        // padding: 10px 0;

        .name-wrapper {
            line-height: 48px;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
                width: 100%;
                height: 36px;
                line-height: 36px;
                min-width: 80px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                span{
                    display: block;
                    max-width: 70%;
                    height: 36px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                i{
                    cursor: pointer;
                }
            }

            .connection {
                width: 50px;
            }
        }

        .operation {
            float: right;
            padding: 15px;
        }
        }
    }
    .operate-wrapper {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .name{
        min-width: 80px;
    }
</style>
<style lang="less">
.origanizationOutRule{
    .ivu-card-body{
        padding: 0 16px;
    }
    .ivu-checkbox{
        top: 17px;
    }
}
</style>
