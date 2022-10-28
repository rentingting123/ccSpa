<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem>组织管理</BreadcrumbItem>
			<BreadcrumbItem>申请审核</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>审核列表</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Menu mode="horizontal" ref="menu" theme="light" :active-name="tabName" @on-select="changeName">
                    <MenuItem name="name1">
                        未审核
                    </MenuItem>
                    <MenuItem name="name2">
                        已审核
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
            tabName:'name1'
        }
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.$store.commit('tabNumExpert','0-2')
            if (to.name=='newunchecked') {
                vm.tabName="name1"
            }
            if (to.name=='newchecked') {
                vm.tabName="name2"
            }
        });

    },
    methods:{
        tabIndexChange (index) {
          this.tabIndex = index
        },
        changeName(val){
            if (val=="name1") {
                // this.$router.push({name:}"/home/messageCheck/unchecked")
                this.$router.push({name:'newunchecked'})
            }
            if (val=="name2") {
                // this.$router.push("/home/messageCheck/checked")
                this.$router.push({name:'newchecked'})
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
