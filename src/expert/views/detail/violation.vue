<template>
    <div style="display:inline-block;">
        <Button type="error" @click="dialogVisible=true" :disabled='disabled' style="margin-left: 15px;margin-top:10px;" >违规</Button>
                    
        <Modal v-model="dialogVisible" :mask-closable="false" width="600" title="违规" style="z-index:1200">
            <div class="dialogCont">
                <Form :model="formTop" label-position="top">
                    <FormItem label="违规说明" prop='reportInstructions' :rules="{required: true, message: '请填写违规说明', trigger: 'blur'}">
                        <Input v-model="formTop.reportInstructions" type="textarea" :autosize="{minRows: 3,maxRows: 8}" placeholder="请填写说明内容"/>
                    </FormItem>
                    <FormItem label="上传违规证据：">
                        <uploads
                            multiple
                            drag
                            :onSuccess="onsuccess"
                            :onError="error"
                            :onRemove="onRemove"
                            :beforeUpload="beforeAvatarUpload"
                            :config="{fileType:4}"
                            accept=".jpg, .png, .jpeg, .gif"
                            :showlist="true" >
                            <div>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div>支持扩展名：jpg,jpeg,png,gif</div>
                            </div>
                        </uploads>
                    </FormItem>
                </Form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
        </Modal>
    </div>
</template>

<script>
import uploads from '@@/components/fileUpload/index.vue'
export default {
    props:['close', 'reviewScores', 'remarkValue', 'attachId', 'disabled', 'pattern', 'rowId', 'competitionId'],
    components:{
        uploads
    },
    data(){
        return{
            dialogVisible: false,
            formTop:{
                reportInstructions: '',
                reportInfo: [],
            }
        }
    },
    methods:{
        onsuccess(res,file,fileList) {
            this.$set(this.formTop, 'reportInfo', fileList)
        },
        onRemove(res,file,fileList){
            this.$set(this.formTop, 'reportInfo', fileList)
        },
        error(error, file, fileList){
            this.$Message.error("上传失败!")
        },
        // 上传文件前执行函数
        beforeAvatarUpload(file) {
            if (!/\.(gif|jpg|png|jpeg)$/.test(file.name)) {
                this.$message.error('仅支持gif或者jpg或者png或者jpeg格式文件!');
                return false;
            }
        },
        submit(){
            if(!this.formTop.reportInstructions){
                return this.$Message.warning('请填写违规说明')
            }
            if(this.formTop.reportInfo.length<1){
                return this.$Message.warning('请上传违规证据')
            }
            let arr = []
            for(let i in this.formTop.reportInfo){
                arr.push(this.formTop.reportInfo[i].url)
            }

            for(let i in this.reviewScores){
                this.reviewScores[i].score = 0
            }

            let data = {
                poolId:Base64.decode(this.$route.query.id),
                total: 0,
                reviewScores: this.reviewScores,
                pattern: this.pattern,//0：按作品 1：按附件
                competitionId: this.competitionId,
                rowId: this.rowId,
                comment: this.remarkValue
            }
            if(this.attachId){
                data.attachId = this.attachId
            }

            let data1 = {
                poolId:Base64.decode(this.$route.query.id),
                reportInstructions: this.formTop.reportInstructions,
                reportInfo: arr,
            }
            // 提交0分
            this.$api.post('/review/review/expert/submit',data).then(reset => {
                if (reset.code == 0) {
                    // 违规
                    this.$api.post('/review/expert/submitReport',data1).then(res=>{
                        if(res.code == 0){
                            this.$Message.success('操作成功');
                            this.dialogVisible = false
                            this.close && this.close();
                        }else{
                            this.$netcode.getApiCode(res)
                        }
                    })
                }else {
                    this.$netcode.getApiCode(reset)
                }
            })

            
        }
    }
}
</script>

<style lang="less" scoped>
.dialogCont{
    padding: 10px 30px;
}
</style>