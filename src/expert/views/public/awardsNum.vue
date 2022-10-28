<template>
	<div class="leading-in">
        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>奖项数量</span>
            </p>
            <div style="text-align:center">
                <Row>
    				<Col :span="24" v-for="(item,index) of objArr" :key="index">
                        <div class="">
                            <h4 style="margin-top:15px;margin-bottom:15px;">{{item.competitionName}}</h4>
    						<Table :columns="columnsdata" :data="item.awardsVos">
                            </Table>
    				    </div>
    				</Col>
    			</Row>

            </div>
            <div slot="footer">
                <Button type="default" @click="handleReset('formValidate')">取消</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
	export default {
        props:["importData","importShow"],
        components:{

        },
		data() {
			return {
                columnsdata: [
                    {
                        title: '奖项',
                        align: 'left',
                        key: 'awardName'
                    },
                    {
                        title: '名额',
                        align: 'left',
                        key: 'groupNum'
                    },
                    {
                        title: '单位',
                        align: 'left',
                        key: 'unit',
						render:(h,params)=>{
	                        return h('span',"人")
	                    }
                    },
                ],
                objArr: [
                    {
                        name:"网络竞赛",
                        table:[
                            {
                                name:"一等奖",
                                num:20,
                                unit:"名"
                            },
                            {
                                name:"二等奖",
                                num:20,
                                unit:"名"
                            },
                            {
                                name:"三等奖",
                                num:20,
                                unit:"名"
                            },
                        ]
                    },
                    {
                        name:"机器人竞赛",
                        table:[
                            {
                                name:"一等奖",
                                num:10,
                                unit:"名"
                            },
                            {
                                name:"二等奖",
                                num:20,
                                unit:"名"
                            },
                            {
                                name:"三等奖",
                                num:30,
                                unit:"名"
                            },
                        ]
                    }
                ],
			}
		},
		created() {
            this.show=this.importShow
			this.list();
		},
		methods: {
			list(){
                let _this = this
                let data={
                    competitionId:this.$webapi.getlocal("compId"),
                    // rowId:this.$webapi.getlocal("rowId")
                }
                return new Promise((relove,reject)=>{
                    this.$api.get('/review/review/get/awards',data).then(reset => {
                        if (reset.code == 0) {
							this.objArr=reset.data
                            // relove(this.compData)
                        }else {
                            _this.pageShow=false;
                            _this.$netcode.getApiCode(reset)
                        }
                    })
                })
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },

            handleSubmit (name) {
                // this.post()
				console.log(this.formDynamic)
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            post (e) {
                var data={
                    selfGroupId:this.$webapi.getlocal("groupId"),
                }
                if (this.formValidate.captainSelection) {
                    data.captainSelection=1
                }else{
                    data.captainSelection=0
                }
                if (this.formValidate.groupName) {
                    data.groupName=this.formValidate.groupName
                }
                if (this.idList) {
                    data.userIds=this.idList
                }
                if (this.teamIds) {
                    data.teamIds=this.teamIds
                }
                this.$api.post('/web/specialist/insertGroup',data).then(reset => {
                    if (reset.code == 0) {
                        // this.accessDialog=true;
                        this.$Message.success("添加成功!")
                        this.show=false;
                        this.$emit('exportData',{show:false})
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
            },//post

        }
	}
</script>

<style lang="less" scoped>

</style>
