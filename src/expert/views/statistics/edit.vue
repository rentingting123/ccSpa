<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="800">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>专家替换</span>
            </p>

            <modalForm @exportData="exportName" :rowId='rowId'></modalForm>

            <div slot="footer">
                <Button type="default" @click="cancel">关闭</Button>
                <Button type="primary" @click="handleSubmit()" style="margin-left: 15px">提交</Button>
            </div>
            <div v-if="spinShow">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>正在替换...</div>
                </Spin>
            </div>
      </Modal>
    </div>
</template>
<script>
    import modalForm from "./modalForm"
    export default {
        props:['phone', 'close', 'rowId'],
        components:{
            modalForm
        },
        data () {
            return {
                idList:[],//选择专家
                spinShow:false
            }
        },
        created() {
            this.show=!!this.phone
        },
        methods: {
            cancel () {
                this.show=false;
                this.close && this.close();
            },
            handleSubmit () {
                if(this.idList.length != 1) {
                    return this.$Message.warning('请仅选择一名要替换的评审专家')
                }
                
                this.spinShow=true
                var data={
                    phone: this.phone,
                    userId: this.idList[0],
                    rowId: this.rowId,
                }
                
                this.$api.post('/review/review/replaceExpert ',data).then(reset => {
                    if (reset.code == 0) {
                        this.$Message.success("替换成功!")
                        this.close && this.close();
                    }else {
                        this.$netcode.getApiCode(reset)
                        this.spinShow = false
                    }
                })
            },
            // 选择专家
            exportName(e){
                this.idList=e.data;
            },
        }
    }
</script>
