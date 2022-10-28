<template>
  <div class="rule">
    <div class="pageHeader">
		<div class="pageBread">
			<Breadcrumb>
			<BreadcrumbItem>系统管理</BreadcrumbItem>
			<BreadcrumbItem>组织审核</BreadcrumbItem>
			</Breadcrumb>
		</div>
		<div class="page-detail">
			<div class="page-detail-hd">
			 	<h2>组织管理</h2>
			</div>
		</div>
    </div>
    <div class="page-component-view">
		<div class="page-component-bd">
			<!--查询条件-->
			<div class="tableListForm">
                <Menu mode="horizontal" theme="light" :active-name="tabName" @on-select="changeName">
                    <MenuItem name="name1" v-if="authority.addOrganization">
                        组织列表
                    </MenuItem>
                    <MenuItem name="name2">
                        组织外部关联
                    </MenuItem>
                    <MenuItem name="name3">
                        组织内部管理
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
import orgList from './common/origanizationList/index'
import orgOut from './common/origanizationOut/index'
import orgInner from './common/origanizationInner/index'
import { mapGetters,mapState } from 'vuex';
export default {
    components:{
        orgList,
        orgOut,
        orgInner
    },
    data () {
        return {
            tabIndex: 1,
            tabName:'name1',
            isAdmin:''
        }
    },
    watch:{
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.$store.commit('tabNumExpert','0-3')
            if (to.name=='rolesManageList') {
                vm.tabName="name1"
            }
            if (to.name=='rolesManageOut') {
                vm.tabName="name2"
            }
            if (to.name=='rolesManageInner') {
                vm.tabName="name3"
            }
        });
    },
    async created(){
      await this.$store.dispatch('getAuthority')

        this.isAdmin=this.$webapi.getlocal("isAdmin")
        if (!this.authority.addOrganization) {
            this.tabName="name2"
        }
        
    },
    computed: {
        ...mapState({
            authority:store=>store.system.authorityManagement
        }),
    },
    mounted() {

    },
    methods:{
        tabIndexChange (index) {
          this.tabIndex = index
        },
        changeName(val){
            if (val=="name1") {
                // this.$router.push("/home/organizationManage/list")
                this.$router.push({name:'rolesManageList'})
            }
            if (val=="name2") {
                // this.$router.push("/home/organizationManage/out")
                this.$router.push({name:'rolesManageOut'})
            }
            if (val=="name3") {
                // this.$router.push("/home/organizationManage/inner")
                this.$router.push({name:'rolesManageInner'})
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
