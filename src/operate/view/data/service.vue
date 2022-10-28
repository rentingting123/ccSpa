<template>
    <div class="openSkin">
        <h1>高校数据服务开通</h1>
        <div class="search" style="text-align:left;">
            <Input placeholder="搜索" suffix="ios-search" @keyup.enter.native="init" v-model="search"
                style="margin:10px 0;width:200px;" />
        </div>
        <Table border :columns="columns1" :data="tableData">
          <template slot-scope="{ row }" slot="info">
                <div v-for="(item,index) in row.info" :key="index" class="">
                    <Button style="color:#409eff;" type="text" @click="show(item.info)">{{item.name}}</Button>
                </div>
                <upload class="avatar-uploader" accept=".jpg, .png, .gif" name="attach" :showlist="false"
                    :onSuccess="handleAvatarSuccess">
                    <Button @click="beforeUpload(row.contractId)"><i
                            class="el-icon-plus avatar-uploader-icon"></i>上传协议</Button>
                </upload>
            </template>
            <template slot-scope="{ row }" slot="schoolNames">
                <el-tag v-for="(item,index) in row.schoolNames" :key="index">{{item}}</el-tag>
                <el-button type="primary" @click="addScBtn(row)" size="mini" icon="el-icon-plus"> </el-button>
            </template>
            <template slot-scope="{ row }" slot="startTime">
                {{ row.startTime | date}}
            </template>
            <template slot-scope="{ row }" slot="status">
             
                <el-checkbox v-model="row.status" :true-label="1" :false-label="0" @change="serviceOpen(row)">数据服务开通
                </el-checkbox>
                <el-button type="text"  @click="clickExport(row)" size="mini" >分析报告生成 </el-button>
            </template>
            <!-- （0，禁用；1，启用） -->
        </Table>
        <el-dialog
        title="对标高校选择（最多可选8个）"
        :visible.sync="dialogVisible"
        :modal="false"
        :append-to-body="true"
        width="400px"
      >
        <div>
          <div class="chooseschool">
            <!-- <el-tag type="info" v-for="(item, index) in selSchoolList" :key="item">
              {{ item }}
            </el-tag> -->
            <el-tag
              v-for="(item, index) in tabs"
              :key="item"
              closable
              :disable-transitions="false"
              @close="handleClose(index)"
              type="info"
            >
              {{ item }}
            </el-tag>
          </div>
          <div>
            <el-select
              v-model="selectvalue"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in options"
                :key="item.schoolCode"
                :label="item.schoolName"
                :value="item.schoolName"
              >
              </el-option>
            </el-select>
            <el-button @click="addschool">确定</el-button>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="checkschoollist">确 定</el-button>
        </span>
      </el-dialog>
        <Page class="page" :page-size='pageSize' :total="total" @on-change="changePage" />
        <Modal v-model="bmodal" draggable width="100%" fullscreen scrollable title="信息展示">
            <h2 slot="header" style="text-align:center">
                <span>信息展示</span>
            </h2>
            <iframe :src="modalvalue" width="100%" style="padding:0 80px;" height="100%" scrolling="yes"
                frameborder="0"></iframe>
        </Modal>

    </div>
</template>

<script>
import network from '@/operate/api/index'
import upload from "@@/components/fileUpload/index";
import moment from 'moment'

export default {
    data() {
        return {
          dialogVisible:false,
            page: 1,
            pageSize: 10,
            total: 0,
            search: '',
            tabs: [],
      reltabs: [],
      selectvalue: "",
      schoolcolname: "",
            columns1: [
                {
                    title: '用户名',
                    key: 'userName'
                },
                {
                    title: '机构名',
                    key: 'groupName'
                },
                {
                    title: '联系方式',
                    key: 'mobile',
                },
                {
                    title: '机构id',
                    key: 'groupId'
                },
                {
                    title: '对标高校',
                    slot: 'schoolNames'
                },
                {
                    title: '上传协议',
                    slot: 'info'
                },
                {
                    title: '时间',
                    slot: 'startTime'
                },
                {
                    title: '操作',
                    slot: 'status'
                }
            ],
            tableData: [],
            bmodal: false,
            modalvalue: '',
            contractId: '',
            loading:false,
            options:[],
            // selSchoolList:[],
            contractStatus:''
        }
    },
    components: {
        upload,
    },
    created() {
        this.init();
        this.getschoolName()
        // this.getListName()
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.init()
        },
        checkschoollist() {
      this.reltabs = this.tabs
      this.dialogVisible = false
     this.comSchool()
      
    },
    clickExport(rows){
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      
      
      network.getExportList({data:{
        schoolName:rows.groupName,//this.schoolcolCodeID,
        schoolNames:rows.schoolNames.join(',') || rows.groupName
      }}).then(res=>{
        
        if(res.url !=''){   
          window.open(res.url, '_self')
        }
        
        loading.close()
      }).catch(res =>{
        loading.close()
      })
    },
    addScBtn(row){
      // this.selSchoolList =[]
      // this.tabs=[]
      this.tabs = [...row.schoolNames]
      this.contractId = row.contractId
      this.contractStatus = row.status
      this.dialogVisible = true
    },
    handleClose(tag) {
      this.tabs.splice(tag, 1);
    },
    remoteMethod(query) {
      if (query !== "") {
        this.selectvalue = query;
        this.loading = true;
        this.getschoolName();
      } else {
        this.options = [];
      }
    },
    async getListName() {
      let res = await network.getUserContract(
       );
      if (res == "error") return;
     
      this.selSchoolList = res.data;
    },
    async getschoolName() {
      let res = await network.selectSchoolName({
        data: {
          pageNum: 1,
          pageSize: 10,
          schoolName: this.selectvalue,
        },
      });
      if (res == "error") return;
      this.loading = false;
      this.options = res.data;
    },
    async comSchool(){
    //  let arr =[... this.selSchoolList.concat(this.tabs)]
      let data = await network.dataServiceStatus({
            data: {
              contractId: this.contractId,
              schoolList: this.tabs.join('|'),
              status: this.contractStatus
            }
        })
        if (data == 'error') return;
        this.init()
    },
    async serviceOpen(row) {
        let res = await network.dataServiceStatus({
            data: {
                contractId: row.contractId,
                status: row.status
            }
        })
        if (res == 'error') return;
        this.init();
    },
    addschool() {
      if(this.selectvalue == ''){
        this.$message.warning("请选择学校");
        return false
      }
      if (this.tabs.length == 7) {
        this.$message.warning("最多选择8所学校");
      } else {
        let ispush = true;
        this.tabs.forEach((item) => {
          if (item == this.selectvalue) {
            this.$message.error("已选择过该学校");
            ispush = false;
          }
        });
        if (ispush) {
          this.tabs.push(this.selectvalue);
        } else {
          ispush = true;
        }
      }
      this.selectvalue = "";
    },
        async init() {
            let data = await network.dataServiceList({
                data: {
                    search: this.search,
                    pageNum: this.page,
                    pageSize: this.pageSize
                }
            })
            if (data == 'error') return;
            this.tableData = data.list;
            this.total = data.total;
        },
    
        show(file) {
            let flag = ['.jpg', '.png', '.pdf', '.gif', 'jpeg'];
            let str = file.substring(file.lastIndexOf(".")).toLowerCase();
            if (flag.includes(str)) {
                this.modalvalue = file
                this.bmodal = true
            } else {
                this.$Message.warning('下载中');
                location.href = file
            }
        },
        handleAvatarSuccess(res,file,list) {
            console.log(file.name, res.location);
            if (res) {
                let dataRes = network.dataServiceFile({
                    data: {
                        contractId: this.contractId,
                        file: JSON.stringify([{
                            info: res.location,
                            name: file.name
                        }])
                    }
                })
                if (dataRes == 'error') return;
                this.init();
            } else {
                console.log("上传失败");
            }
        },
        beforeUpload(contractId) {
            this.contractId = contractId
        },
    },
    filters: {
        date(val) {
            if (!val) return '-'
            return moment(val).format('YYYY.MM.DD');
        }
    }
}
</script>

<style lang="less" scoped>
h1 {
    margin: 20px 0;
}
.chooseschool {
  display: flex;
  flex-wrap: wrap;
}

.chooseschool > .el-tag {
  margin-right: 15px;
  margin-bottom: 10px;
}
.page {
    margin: 20px 0;
}
</style>
