<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem>专家库</BreadcrumbItem>
			<BreadcrumbItem>专家管理</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>专家管理</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Menu mode="horizontal" theme="light" :active-name="tabName" @on-select="changeName">
                    <MenuItem name="name1">
                        专家账号
                    </MenuItem>
                    <MenuItem name="name2">
                        专家库
                    </MenuItem>
                    <MenuItem name="name3">
                        临时专家
                    </MenuItem>
                </Menu>
			</div>
			<!--操作按钮-->
			<div class="tableListOperator">

			</div>
			<Row>
				<Col :xs="24" :sm="24" :md="24" :lg="24">
                    <router-view></router-view>
				</Col>
			</Row>
		</div>
    </div>
</div>
</template>
<script>

export default {
    components:{

    },
    data () {
        return {
            tabIndex: 1,
            // tabName:'name1',
        }
    },
    computed:{
        tabName:{
            get(){
                return this.$store.state.expert.tabName
            },
            set(val){

            }
        },
    },
    watch:{
    },
    created(){

    },
    mounted() {

    },
    methods:{
        tabIndexChange (index) {
          this.tabIndex = index
        },
        changeName(val){
            if (val=="name1") {
                this.$router.push({name:'expertAccount'})
            }
            if (val=="name2") {
                this.$router.push({name:'expertDatabase'})
            }
            if (val=="name3") {
                this.$router.push({name:'expertTemporary'})
            }
        }
    }
  }
</script>
<style lang="less" scoped>
.origanization-wrapper {

  .el-breadcrumb {
    height: 60px;
    line-height: 60px;
  }

  .tab-wrapper {
    background: #ffffff;

    .tab-header {
      font-size: 0;
      background: #ffffff;
      padding: 0 20px;

      .header-item {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        padding: 10px 20px;
        cursor: pointer;
      }

      .item-on {
        border-bottom: 2px solid #409EFF;
      }
    }
  }
}
</style>
