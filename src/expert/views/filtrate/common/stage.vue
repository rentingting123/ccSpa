<template>
	<div class="leading-in" >
        <!-- 晋级二次提示 -->
        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="400">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>提示</span>
            </p>
            <div style="text-align:left;padding: 20px 0;font-size:14px;">
               请先核对本竞赛待晋级的数据,然后再晋级下一赛段，提交后无法再次修改
            </div>
            <div slot="footer">
                <div class="copyPool">
                    <Checkbox v-model="copyPool">作品晋级</Checkbox>
                </div>
                <Button type="default" @click="cancel" :loading='loading'>取消</Button>
                <Button type="primary" @click="handleSubmit" :loading='loading'>确定</Button>
            </div>
        </Modal>

        <!-- 设置未完成提示 -->
        <Modal v-model="noSetShow" @on-cancel="cancel" :mask-closable="false" width="400">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>晋级赛段尚未完成作品设置或评审设置</span>
            </p>
            <div style="text-align:left;padding: 20px 0;font-size:14px;">
               作品设置或评审设置完成后，才能完成晋级。
               <!-- 请确认作品设置或评审设置需要与本赛段相同还是重新设置。 -->
            </div>
            <div slot="footer">
                <Button type="default" @click="cancel">取消晋级</Button>
                <!-- <Button type="default" @click="cancel">与本赛段相同</Button> -->
                <Button type="primary" @click="toSet">前往设置</Button>
            </div>
        </Modal>

	</div>
</template>

<script>
	export default {
        props:['id','rowId'],

		data() {
			return {
                show: false, //二次提示
                noSetShow: false, // 设置未完成提示
                copyPool: true, // 是否作品晋级，默认有
                loading: false,
			}
		},
		created() {
			this.goIssue();
		},
		methods: {
			// 晋级到下一赛段 下赛段设置时进行二次确认，下赛段未设置时前往设置，没有下赛段时报错
            async goIssue(){
                let res = await this.$api.get('/review/review/haveNextRule',{
                    rowId: this.rowId
                }).then(res=>{
                    if(res.code==0){
                        if(res.data){
                            this.show = true
                        }else{
                            this.noSetShow = true
                        }
                    }else{
                        this.$emit('exportData',{show:false})
                    }
                })

                
            },
            toSet(){
                window.open('/#/admin/list')
                this.$emit('exportData',{show:false})
            },
            cancel () {
                this.show = false;
                this.noSetShow = false
                this.$emit('exportData',{show:false})
            },
            handleSubmit(){
                var data={
                    rowId: this.rowId,
                    competitionId: this.id,
                    copyPool: this.copyPool
                }
                this.loading = true
                this.$api.get('/review/review/promotion',data).then(reset => {
                    this.loading=false
                    if (reset.code == 0) {
                        this.$Message.success("成功!")
                        this.show = false;
                        this.noSetShow = false
                        this.$emit('exportData',{show:false, reload:true})
                    }else {
                        this.$netcode.getApiCode(reset)
                        this.cancel();
                    }
                })    
            },
        }
	}
</script>

<style lang="less" scoped>
.copyPool{
    display: inline-block;
    vertical-align: middle;
    width: 109px;
    height: 30px;
    line-height: 30px;
    background: #EEF0F4;
    border-radius: 15px;
    text-align: center;
    margin-right: 20px;
}
</style>
