<template>
  <div class="rule">
    <div class="page-component-view">
		<div class="page-component-bd" v-if="innerShow">
			<!--查询条件-->
            <div class="tableListForm">
                <div class="" v-if="!mergeShow" style="text-align:right">
                    <div class="total-members">{{innerData.groupName}}</div>
                    <Button type="primary" size="small" @click="showMerge">开始合并</Button>
                </div>
                <div class="" v-else style="text-align:right">
                    <div class="tips" style="text-align:left">
                      <i><Icon type="ios-warning" color="red" size="16"/>双击选择组织<span style="color: red;">(变为深蓝色)</span>作为合并后存在的组织，单击选择<span style="color: red;">(变为灰色)</span>需要合并的组织</i>
                    </div>
                    <Button type="default" @click="showMerge">取消合并</Button>
                    <Button type="primary" @click="sureMerge">确认合并</Button>
                </div>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">
                <!-- <Button type="primary"  @click="add()">新增</Button> -->
			</div>
                    <!-- <div style="overflow: hidden;"> -->
            <Row>
                <Col span="6">
                    <div style="float: right;">
                        <treeItem
                          v-for="(item1, index1) in treeData"
                          :key="index1"
                          :location="'only'"
                          :height="item1.height + ''"
                          @treeItemClick="operate"
                          @clickType="click"
                          :data="{name: item1.groupName, index: index1,id:item1.id,parId:0,sortId:0}"
                          :canMerge="mergeShow"
                        ></treeItem>
                    </div>
                </Col>
                <!-- <Col span="6"> -->
                    <div style="float: left;">
                        <div v-for="(item1, index1) in treeData" :key="index1">
                            <div v-for="(item2, index2) in item1.childlist" v-if="item1.childlist.length>0">
                                <treeItem
                                  v-if="item1.childlist.length == 1"
                                  :key="index2"
                                  :location="'only'"
                                  :height="item2.height + ''"
                                  @treeItemClick="operate"
                                  @clickType="click"
                                  :data="{name: item2.groupName, index: index2,id:item2.id,parId:item1.id,sortId:1}"
                                  :canMerge="mergeShow"
                                ></treeItem>
                                <treeItem
                                  v-else-if="index2 * 1 == 0"
                                  :key="index2"
                                  :location="'top'"
                                  :height="item2.height + ''"
                                  @treeItemClick="operate"
                                  @clickType="click"
                                  :data="{name: item2.groupName, index: index2,id:item2.id,parId:item1.id,sortId:1}"
                                  :canMerge="mergeShow"
                                ></treeItem>
                                <treeItem
                                  v-else-if="index2  * 1 == (item1.childlist.length - 1)"
                                  :key="index2"
                                  :location="'bottom'"
                                  :height="item2.height + ''"
                                  @treeItemClick="operate"
                                  @clickType="click"
                                  :data="{name: item2.groupName, index: index2,id:item2.id,parId:item1.id,sortId:1}"
                                  :canMerge="mergeShow"
                                ></treeItem>
                                <treeItem
                                  v-else
                                  :location="'middle'"
                                  :key="index2"
                                  :height="item2.height + ''"
                                  @treeItemClick="operate"
                                  @clickType="click"
                                  :data="{name: item2.groupName, index: index2,id:item2.id,parId:item1.id,sortId:1}"
                                  :canMerge="mergeShow"
                                ></treeItem>
                            </div>
                        </div>
                    </div>
                <!-- </Col>
                <Col span="8"> -->
                    <div style="float: left;">
                        <div v-for="(item1, index1) in treeData" :key="index1">
                          <div v-for="(item2, index2) in item1.childlist" :key="index2" :style="{'margin-top': item2.childlist ? '0px':'90px'}">
                            <div v-for="(item3, index3) in item2.childlist" :key="item3.id">
                              <treeItem
                                v-if="item2.childlist.length == 1"
                                :key="index3"
                                :location="'only'"
                                :height="item3.height + ''"
                                @treeItemClick="operate"
                                @clickType="click"
                                :data="{name: item3.groupName, index: index3,id:item3.id,parId:item2.id,sortId:2}"
                                :canMerge="mergeShow"
                              ></treeItem>
                              <treeItem
                                v-else-if="index3 * 1 == 0"
                                :key="index3"
                                :location="'top'"
                                :height="item3.height + ''"
                                @treeItemClick="operate"
                                @clickType="click"
                                :data="{name: item3.groupName, index: index3,id:item3.id,parId:item2.id,sortId:2}"
                                :canMerge="mergeShow"
                              ></treeItem>
                              <treeItem
                                v-else-if="index3  * 1 == (item2.childlist.length - 1)"
                                :key="index3"
                                :location="'bottom'"
                                :height="item3.height + ''"
                                @treeItemClick="operate"
                                @clickType="click"
                                :data="{name: item3.groupName, index: index3,id:item3.id,parId:item2.id,sortId:2}"
                                :canMerge="mergeShow"
                              ></treeItem>
                              <treeItem
                                v-else
                                :location="'middle'"
                                :key="index3"
                                :height="item3.height + ''"
                                @treeItemClick="operate"
                                @clickType="click"
                                :data="{name: item3.groupName, index: index3,id:item3.id,parId:item2.id,sortId:2}"
                                :canMerge="mergeShow"
                              ></treeItem>
                          </div>
                          </div>
                        </div>
                    </div>
                <!-- </Col> -->
            </Row>
        </div>
        <div v-else style="text-align:center;">
            暂无数据
        </div>
        <add-index :type="type" :importShow="addShow" :importData="addData" @exportData="exportAddShow" v-if="addShow"></add-index>
        <edit-index :importShow="editShow" :importData="editData" @exportData="exportEditData" v-if="editShow"></edit-index>
        <expo-index :importShow="expoShow" :importData="expoData" @exportData="exportExpoData" v-if="expoShow"></expo-index>
    </div>
</div>
</template>
<script>

import addIndex from "./addIndex"
import editIndex from "./editIndex"
import expoIndex from "./expoIndex"

import treeItem from "./common/treeItem/index";
export default {
    components:{
        addIndex,
        editIndex,
        expoIndex,
        treeItem
    },
    data () {
        return {
            addShow:false,//新增model是否显示
            addData:{},//新增model数据
            editShow:false,//修改model是否显示
            editData:{},//修改数据
            expoShow:false,//用户导入model是否显示
            expoData:'',//用户导入数据
            objData: {},
            treeData:[],
            treeDataCopy:[

            ],
            mergeShow:false,
            dblclickData:'',//双击数据
            clickData:'',//单机数据
            innerData:{},
            innerShow:true,
            type:''
        }
    },
    created(){

    },
    mounted() {
        this.list()
        // this.makeNewArr(this.treeDataCopy);
        // this.treeData=this.treeDataCopy
    },
    methods:{
        list () {
            let _this = this
            let data={
                groupId:Number(this.$webapi.getlocal("groupId"))
            }
            this.$api.post('/usercenter/group/queryinner',data).then(reset => {
                if (reset.code == 0) {
                    if(reset.data){
                        this.innerShow=true;
                        this.innerData=reset.data;
                        this.treeDataCopy=[]
                        this.treeDataCopy.push(reset.data);
                        this.makeNewArr(this.treeDataCopy);
                        this.treeData=this.treeDataCopy
                        this.type=reset.data.type
                    }else{
                        this.innerShow=false;
                    }

                }else {
                    _this.$netcode.getApiCode(reset)
                }
            })
        },
        showMerge() {
          this.mergeShow = !this.mergeShow;
          this.treeData = [];
          this.makeNewArr(this.treeDataCopy);
          this.treeData = this.treeDataCopy;
        },
        // 改造数据给每个元素加上 必要的数据 比如 高度
        makeNewArr(arr) {
          function setLastDeepHeight(arr, f, d) {
            let floor = f + 1;
            arr.forEach((element, index) => {
              if (d === floor) {
                arr[index]["height"] = 90;
              }
              if (element.childlist && element.childlist.length) {
                setLastDeepHeight(element.childlist, floor, d);
              }
            });
          }

          function setHbyTotalChildrenH(arr, f, d) {
            let floor = f + 1;

            arr.forEach((element, index) => {
              if (floor === d) {
                if (!arr[index].childlist) {
                  arr[index]["height"] = 90;
                } else {
                  let childrenTotalHeight = 0;
                  arr[index].childlist.forEach((element, index) => {
                    if (element.height) {
                      childrenTotalHeight += element.height * 1;
                    }
                  });

                  arr[index]["height"] = childrenTotalHeight
                    ? childrenTotalHeight
                    : 90;
                }
              }

              if (element.childlist && element.childlist.length) {
                setHbyTotalChildrenH(element.childlist, floor, d);
              }
            });
          }

          // 把最后一级的元素高度都设置成初始高度
          let deep = this.getDeep(arr);
          setLastDeepHeight(arr, 0, deep);
          for (let i = deep - 1; i > 0; i--) {
            setHbyTotalChildrenH(arr, 0, i);
          }
        },
        // 获取点击的节点的事件
        operate(arg) {
            if (arg.type === 'editName') {
                this.editData = arg.data;
                this.editShow = true;
            }
            if (arg.type === 'delOrg') {
                this.remove(arg.data);
            }
            if (arg.type === 'showMembers') {
                this.orgMembers = true;
            }
            if (arg.type === 'addBrotherOrg') {
                this.addNameDialog = true;
            }
            if (arg.type === 'addSonOrg') {
                this.addData = arg.data;
                this.addShow = true;
            }
            if (arg.type === 'expoName') {
                this.expoData = arg.data;
                this.expoShow = true;
            }
        },
        // 单击 双击 类型 放在arg中
        click(arg) {
            if (arg.type=="click") {
                // if (Object.keys(this.clickData).length==0) {
                //     this.clickData=arg.data//单机数据
                // }else{
                //     this.$Message.warning("只能选择一个被合并项")
                // }
                this.clickData=arg.data.id//单机数据
            }else{
                // if (Object.keys(this.clickData).length==0) {
                //     this.dblclickData=arg.data//双击数据
                // }else{
                //     this.$Message.warning("只能选择一个合并项")
                // }
                this.dblclickData=arg.data.id//合并项数据
            }
        },
        // 确认合并
        sureMerge(){
            let _this = this;
            var data = {}
            if(this.$store.state.system.toGroupId&&this.$store.state.system.fromGroupId){
                data.toGroupId=this.$store.state.system.toGroupId//存在数据
                data.fromGroupId=this.$store.state.system.fromGroupId//被合并项
                this.$api.post("/usercenter/group/combine", data).then(reset => {
                    if (reset.code == 0) {
                        this.$Message.success("合并成功!")
                        this.mergeShow=!this.mergeShow;
                        this.list()
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            }else{
                this.$Message.success("合并项或者被合并项没选择!")
            }

        },
        // 递归获取深度
        getDeep(arr) {
            let floor = 0;
            let max = floor;
            function digui(arr, f) {
                let floor = f + 1;
                if (floor > max) {
                    max = floor;
                }
                arr.forEach(element => {
                    if (element.childlist && element.childlist.length) {
                        digui(element.childlist, floor);
                    }
                });
            }
            digui(arr, floor);
            return max;
        },
        // 删除
        remove (item) {
            this.$Modal.confirm({
                title: '提示',
                content: '<p>确认要删除【'+item.name+'】吗?</p>',
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
                relationGroupId:item.id,
                groupId:item.parId,
                type:3
            }
            this.$api.get("/usercenter/group/deleteinnergroup", data).then(reset => {
                if (reset.code == 0) {
                    this.$Message.success("删除成功!")
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
        exportAddShow(e){
            this.addShow=e.show
            this.list()
        },
        exportExpoData(e){
            this.expoShow=e.show
            this.list()
        },
        exportEditData(e){
            this.editShow=e.show
            this.list()
        },

    }
  }
</script>
<style lang='less' scoped>
.total-members {
  float: left;
  font-size: 16px;
  font-weight: bold;
}
.out-wrapper {
  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }

  .el-container {
    background: #fff;

    .el-main {
      background: #fff;

      .el-header {
        overflow: hidden;
        .tips {
          background-color: #fffae4;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          font-size: 14px;
          border-radius: 4px;
          float: left;
          margin-top: 15px;
          color: #5a5850;
        }

        .el-button {
          float: right;
          margin-top: 12px;
          margin-left: 15px;
        }
      }

      .outcontact-wrapper {
        // border: 1px solid #e5e5e5;

        .outcontact-item {
          width: 350px;
          display: inline-block;
          vertical-align: middle;

          .higher-lower-level {
            max-height: 500px;
            padding: 10px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;

            .item-wrapper {
              padding: 20px 0;

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
          }

          .operate-wrapper {
            text-align: center;
            margin-top: 20px;
            margin-bottom: 20px;

            .el-button {
              margin: 0 5px;
            }
          }
        }

        .now-org {
          margin: auto 40px;
          padding: 10px;
          border: 1px solid #e5e5e5;
          font-size: 17px;
          border-radius: 5px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }

    .el-footer {
      text-align: center;
    }
  }

  .dialog-members {
    .file-select {
      padding: 0 0 20px 0;

      .input-wrapper {
        width: 60px;
        height: 30px;
        border-radius: 4px;
        line-height: 30px;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        position: relative;
        background-color: #409EFF;
        user-select: none;

        input {
          position: absolute;
          left: 0;
          top: 0;
          width: 0;
          height: 0;
          border-top: 15px solid transparent;
          border-bottom: 15px solid transparent;
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
