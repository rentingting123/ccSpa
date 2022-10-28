<template>
  <div class="rule">
    <div class="pageHeader">
      <div class="pageBread">
        <Breadcrumb>
          <BreadcrumbItem>组织管理</BreadcrumbItem>
          <BreadcrumbItem>申请公钥</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="page-detail">
        <div class="page-detail-hd">
          <h2>公钥列表</h2>
        </div>
      </div>
    </div>
    <div class="page-component-view">
      <div class="page-component-bd">
        <!--查询条件-->
        <div class="tableListForm">
            <Form :label-width="60">
                <Row>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem label="组织名称">
                            <Input v-model="name" placeholder="组织名称"></Input>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6">
                        <FormItem>
                            <Button type="primary" @click="list">查询</Button>
                        </FormItem>
                    </Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6"> &nbsp;</Col>
                    <Col :xs="24" :sm="24" :md="6" :lg="6" style="display:flex;justify-content: flex-end;align-items: flex-start;">
                        <!-- 添加公钥 -->
                        <addkey :close="list"/>
                    </Col>
                </Row>
            </Form>
			</div>
        <!--操作按钮-->
        <div class="tableListOperator"></div>
        <Row>
          <Col :xs="24" :sm="24" :md="24" :lg="24">
            <div class>
              <Table border :columns="columnsdata" :data="objArr">
                <template slot-scope="{ row }" slot="publicKey">
                  <p v-if="row.publicKeyshow" @click="row.publicKeyshow = !row.publicKeyshow" style="color:#2d8cf0;cursor: pointer;" >显示</p>
                  <p v-else>{{row.publicKey}}</p>
                </template>
                <template slot-scope="{ row }" slot="privateKey">
                  <p v-if="row.privateKeyshow" @click="row.privateKeyshow = !row.privateKeyshow" style="color:#2d8cf0;cursor: pointer;">显示</p>
                  <p v-else>{{row.privateKey}}</p>
                </template>
                <template slot-scope="{ row }" slot="status">
                  <p v-if="row.status==1">已启用</p>
                  <p v-else>已禁用</p>
                </template>
                <template slot-scope="{ row }" slot="createTime">
                  <span>{{ $webapi.gettime("date", row.createTime) }}</span>
                </template>
                <template slot-scope="{ row }" slot="dis">
                  <Button type="error" v-if="row.status==1" @click="chooseuse(row, 0)">禁用</Button>
                  <Button type="primary" v-else @click="chooseuse(row, 1)">启用</Button>
                </template>
              </Table>
              <div class="mt20">
                <paging :pageData="pageData" @pageComponentDate="pageComponentDate" v-if="pageshow"></paging>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      
    </div>
  </div>
</template>
<script>
import paging from "@/usercenter/views/pub/page";
import addkey from './addkey'
import { mapGetters } from "vuex";
export default {
  components: {
    paging,
    addkey
  },
  data() {
    return {
      gId: "",
      pageshow: true,
      // 分页
      pageData: {
        //分页数
        arrPageSize: [5, 10, 15, 20],
        //分页大小
        pagesize: 15,
        //总分页数
        pageCount: 1,
        //当前页面
        pageCurrent: 1,
        //总数
        totalCount: 10
      },
      columnsdata: [
        {
          title: "名称",
          align: "center",
          key: "name"
        },
        {
          title: "公钥",
          align: "center",
          slot: "publicKey"
        },
        {
          title: "私钥",
          align: "center",
          slot: "privateKey"
        },
        {
          title: "状态",
          align: "center",
          slot: "status",
          width: '80',
        },
        {
          title: "创建时间",
          align: "center",
          slot: "createTime",
          width: '120',
        },
        {
          title: "操作",
          width: "120",
          slot: "dis",
          align: "center"
        }
      ],
      objArr: [],
      name: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("tabNumExpert", "0-5");
    });
  },
  created() {
    this.$store.dispatch("getAuthority");
  },
  mounted() {
    this.list();
  },
  computed: {
    ...mapGetters(["getAuthority"])
  },
  methods: {
    list() {
      let _this = this;
      let data = {
        pageNum: _this.pageData.pageCurrent,
        pageSize: _this.pageData.pagesize,
        name: this.name
      };
      this.$api.get("/usercenter/key/query", data).then(reset => {
        if (reset.code == 0) {
          if (reset.data.pages != 0) {
            _this.pageData.pageCount = reset.data.pages;
          }
          if (reset.data.pageNum != 0) {
            _this.pageData.pageCurrent = reset.data.pageNum; //当前页
          }
          if (reset.data.pageSize != 0) {
            _this.pageData.pagesize = reset.data.pageSize;
          }
          _this.pageData.totalCount = reset.data.total; //总条数
          _this.pageshow = true;
          let res = reset.data.list || [];
          _this.objArr = res.map(item=>{
            return{
              publicKeyshow: true,
              privateKeyshow: true,
              ...item,
            }
          })
        } else {
          _this.$netcode.getApiCode(reset);
        }
      });
    },
    pageComponentDate(e) {
      if (e.pageCurrent != 0) {
        this.pageData.pageCurrent = e.pageCurrent;
        this.pageData.pagesize = e.pagesize;
        this.list();
      }
    },
    chooseuse(row, status){
      let data = {
        id: row.id,
        status: status  //状态:0:禁用 1:正常
      };
      let headers = {
        'Content-Type': 'application/json'
      }
      this.$api.post("/usercenter/key/updateKey", data, headers).then(reset => {
        if (reset.code == 0) {
          this.$Message.success('修改成功');
          this.list();
        } else {
          this.$netcode.getApiCode(reset);
        }
      });
    }
  }
};
</script>
<style scoped>
.page-component-bd {
  padding: 15px;
}
</style>
<style>
.rule .ivu-upload {
  display: inline-block;
}
</style>