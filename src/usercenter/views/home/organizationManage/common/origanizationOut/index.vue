<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
            <div class="tableListForm">

			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <!-- <Button type="primary"  @click="add()">新增</Button> -->
			</div>
            <Row>
                <Col span="8">
                    <Card>
                        <div slot="title" style="height:32px;">
                            <p>上级</p>
                            <!-- <Input placeholder="请输入内容"></Input> -->
                        </div>
                        <div class="item-wrapper">
                          <div class="item" v-for="(item, index) in objData.groupDirectParentList" :key="item.id" v-if=" objData.groupDirectParentList">
                              <div class="name-wrapper">
                                  <p class="name">{{item.groupName}}</p>
                                  <p class="connection">直属</p>
                              </div>
                              <!-- <div class="operation">删除</div> -->
                          </div>
                          <div class="item" v-for="(item, index) in objData.groupReportParentList" :key="index" v-if=" objData.groupReportParentList">
                              <div class="name-wrapper">
                                  <p class="name">{{item.groupName}}</p>
                                  <p class="connection">汇报</p>
                              </div>
                              <!-- <div class="operation">删除</div> -->
                          </div>
                        </div>
                        <!-- <div class="operate-wrapper">
                          <Button type="primary" size="small" @click="addDirect">添加直属上级</Button>
                          <Button type="default" size="small" @click="addReport">添加汇报</Button>
                        </div> -->
                    </Card>
                </Col>
                <Col span="8" style="text-align: center;">
                    <div class="now-org">{{objData.groupName}}</div>
                </Col>
                <Col span="8">
                    <Card>
                        <div slot="title" style="height:32px;">
                            <p>下级</p>
                            <!-- <Input placeholder="请输入内容"></Input> -->
                        </div>
                        <div class="item-wrapper">
                          <div class="item" v-for="(item, index) in objData.groupDirectChildList" :key="item.id">
                              <div class="name-wrapper">
                                  <p class="name">{{item.groupName}}</p>
                                  <p class="connection">直属</p>
                              </div>
                              <div class="operation"><Button type="error" @click="removeOri(item,'3')">删除</Button></div>

                          </div>
                          <div class="item" v-for="(item, index) in objData.groupReportChildList" :key="index">
                              <div class="name-wrapper">
                                  <p class="name">{{item.groupName}}</p>
                                  <p class="connection">汇报</p>
                              </div>
                              <div class="operation"><Button type="error" @click="removeOri(item,'4')">删除</Button></div>
                                <!-- <Button type="error">删除</Button> -->
                          </div>
                        </div>
                        <div class="operate-wrapper">
                          <Button type="primary" size="small" :disabled="!authority.addSubordinate"  @click="addDirect">添加直属下级</Button>
                          <Button type="default" size="small" :disabled="!authority.addReport " @click="addReport">添加汇报</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
		</div>
        <add-direct-index :importShow="addDirectShow" :importData="objData" @exportShow="exportDirect" v-if="addDirectShow"></add-direct-index>
        <add-report-index :importShow="addReportShow" :importData="objData" @exportShow="exportReport" v-if="addReportShow"></add-report-index>
    </div>
</div>
</template>
<script>
import addDirectIndex from "./addDirectIndex"
import addReportIndex from "./addReportIndex"
import { mapGetters,mapState } from 'vuex';
export default {
    components:{
        // paging,
        addReportIndex,
        addDirectIndex,
        // expoIndex
    },
    data () {
        return {
            addDirectShow:false,//添加直属上级model是否显示
            addReportShow:false,//添加汇报上级model是否显示
            objData: {
                groupName:'',
                id:10000
            },
            isAdmin:false
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
                    }else{
                        this.objData.groupName="超级管理员"
                    }
                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        addDirect(){
            this.addDirectShow=true;
        },
        addReport(){
            this.addReportShow=true;
        },
        // 删除
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+item.groupName+'】吗?</p>',
                onOk: () => {
                   this.del(item)
                },
                onCancel: () => {

                }
            });
        },
        del (item){
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
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        handleSubmit (name) {
            this.pageData.pageCurrent = 1
            this.list()
        },
        exportDirect(e){
            this.addDirectShow=e.show
            this.list();
        },
        exportReport(e){
            this.addReportShow=e.show
            this.list();
        },
        // 删除下级组织
        removeOri(e,type){
            var _this=this;
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+e.groupName+'】吗?</p>',
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
// .outcontact-wrapper {
  // .outcontact-item {
  //   width: 350px;
  //   display: inline-block;
  //   vertical-align: middle;
  //
  //   .higher-lower-level {
  //     max-height: 500px;
  //     padding: 10px;
  //     border: 1px solid #e5e5e5;
  //     border-radius: 5px;
        .item-wrapper::-webkit-scrollbar {
            display: none;
        }
      .item-wrapper {
        padding: 20px 0;
        height:400px;
        overflow-y: scroll;
        .item {
          overflow: hidden;
          padding: 10px 0;

          .name-wrapper {
            float: left;
            position: relative;
            overflow: visible;

            .name {
              border: 1px solid #e5e5e5;
              border-radius: 5px;
              padding: 15px 10px;
            }

            .connection {
              overflow: visible;
              position: absolute;
              top: -7px;
              right: -5px;
              color: red;
              background: #dbdbdb;
              border-radius: 5px;
              padding: 3px 5px;
            }
          }

          .operation {
            float: right;
            padding: 15px;
          }
        }
      }
    // }

    .operate-wrapper {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;

      .el-button {
        margin: 0 5px;
      }
    }
  // }

  .now-org {
    margin: auto 40px;
    padding: 10px;
    border: 1px solid #e5e5e5;
    font-size: 17px;
    border-radius: 5px;
    display: inline-block;
    vertical-align: middle;
  }
// }
    .el-footer {
      text-align: right;
    }
    .name{
        min-width: 80px;
    }
</style>
