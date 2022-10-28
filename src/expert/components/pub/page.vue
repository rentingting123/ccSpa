<template>
	<div class="page">
		<Page :total="this.pagedata.totalCount" :current="this.pagedata.pageCurrent" :page-size="this.pagedata.pagesize"  @on-change="onChange" @on-page-size-change="onpagesizechange"  show-elevator show-sizer show-total :page-size-opts="pagedata.arrPageSize" v-if="show"></Page>

	</div>
</template>
<script>
    export default {
		props:['pageData'],
		mounted: function () {
			this.pagedata=this.pageData
			this.show=true;
     	},
	    data(){
	    	return{
		  	    // 分页
		       	pagedata:{
					//分页数
					arrPageSize:[30,50,80],
					//分页大小
					pagesize:{
						default:30,
            			type:Number
					},
					//总分页数
					pageCount:{
						default:1,
            			type:Number
					},
					//当前页面
					pageCurrent:{
						default:1,
            			type:Number
					},
					//总数
					totalCount:{
						default:50,
            			type:Number
					},
		        },
		   		show:false
	      	}
        },
		watch:{
			"pagedata.totalCount":function (e) {
				this.pagedata.totalCount = this.pageData.totalCount
				this.pagedata.pagesize = this.pageData.pagesize
				this.pagedata.pageCount = this.pageData.totalPage
				this.pagedata.pageCurrent = this.pageData.pageCurrent
			},
			"pagedata.pageCurrent":function (e) {
				this.pagedata.totalCount = this.pageData.totalCount
				this.pagedata.pagesize = this.pageData.pagesize
				this.pagedata.pageCount = this.pageData.totalPage
				this.pagedata.pageCurrent = this.pageData.pageCurrent
			}
		},
        methods:{
			onpagesizechange (pagesize) {
				this.pagedata.pagesize = pagesize
				this.$emit('pageComponentDate',this.pagedata);
			},
			onChange:function(curpage){
				this.pagedata.pageCurrent = curpage;
				this.$emit('pageComponentDate',this.pagedata)
			},
			goElevatorPage:function(){
				this.pagedata.pageCurrent = curpage;
				this.$emit('pageComponentDate',this.pagedata)
			}
       }
    }
</script>
<style scoped>
	.page{
		margin-top: 18px;
		margin-bottom: 18px;
	}
</style>
