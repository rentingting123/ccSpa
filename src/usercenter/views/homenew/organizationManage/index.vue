<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem>组织设置</BreadcrumbItem>
			<BreadcrumbItem>组织关联</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>组织关联</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">

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
import { mapGetters,mapState } from 'vuex';
export default {
    data () {
        return {
        }
    },
    watch:{
    },
    beforeRouteEnter(to, from, next){
        next((vm)=>{
            vm.$store.commit('tabNumExpert','0-1')
        })
    },
    async created(){
      await this.$store.dispatch('getAuthority')
    },
    computed: {
        ...mapState({
            authority:store=>store.system.authorityManagement
        }),
    },
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
