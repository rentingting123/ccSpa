<template>
	<div class="leading-in">
        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>奖项设置</span>
            </p>
            <div style="text-align:center">
				<Form ref="formDynamic" :model="formDynamic" :label-width="80" label-position="top">
			        <FormItem label="奖项名称" class="form-awards">
			            <Row v-for="(item, index) in formDynamic.items" :key="index" style="margin-bottom:15px;">
			                <Col span="4">
			                    <Input type="text" v-model="item.awardName" placeholder="奖项名称"></Input>
			                </Col>
			                <Col span="1">
								<span> -- </span>
			                </Col>
			                <Col span="6">
			                    <Input type="text" v-model="item.start" placeholder="开始名次"></Input>
			                </Col>
			                <Col span="1">
								<span> ~ </span>
			                </Col>
			                <Col span="6">
			                    <Input type="text" v-model="item.end" placeholder="结束名次"></Input>
			                </Col>
			                <Col span="2" offset="1">
								<span @click="removeItem(index)"><Icon type="ios-remove-circle-outline" size="18" /></span>
			                </Col>
			            </Row>
						<Row>
			                <Col span="18">
			                    <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
			                </Col>
			            </Row>
			        </FormItem>
			    </Form>
            </div>
            <div slot="footer">
                <Button type="default" @click="handleReset('formValidate')">取消</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 15px">提交</Button>
            </div>
        </Modal>
	</div>
</template>

<script>
	export default {
        props:["importData","importShow",'id'],
        components:{

        },
		data() {
			return {
				formDynamic:{
					items:[
                        {
                            start: 1,
                            end: 20,
                            awardName: "一等奖"
                        }
                    ]
				}
			}
		},
		created() {
            this.show=this.importShow

		},
		methods: {
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },

            handleSubmit (name) {
                this.post()
				// console.log(this.formDynamic.items)
            },
            handleReset (name) {
                this.show=false;
                this.$emit('exportData',{show:false})
            },
            post (e) {
                var data={
                    competitionId: this.id,
					awardSettings:this.formDynamic.items
                }
                this.$api.post('/review/award/setting',data).then(reset => {
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
			removeItem(e){
				this.formDynamic.items.splice(e,1)
			},
			handleAdd(){
				var obj={
						start: '',
						end: '',
						awardName:''
					}
				this.formDynamic.items.push(obj)
			}
        }
	}
</script>

<style lang="less" scoped>

</style>
