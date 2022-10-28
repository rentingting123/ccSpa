<template>
	<div class="leading-in">
        <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="400">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>签字评分表上传</span>
				<i style="color:red;">注意:一旦上传就不能修改分数</i>
            </p>
			<div class="demo-upload-list" v-for="(item,index) in items" v-if="items.length>0">
	            <!-- <img :src="item"> -->
				<embed :src="item" width="400" height="160"></embed>
	            <div class="demo-upload-list-cover">
	                <Icon type="ios-trash-outline" @click.native="handleRemove(index)"></Icon>
	            </div>
	        </div>
            <div style="text-align:center">
                <uploads
                    :multiple='false'
					drag
				    :onSuccess="onsuccess"
                    accept='.pdf,.xls,.png,.jpeg,.jpg,.xlsx,.zip'
				    :onError="error"
				    
					:config="{fileType:4}"
				    :showlist="false"  v-if="items.length<=0">
                    <div>
                        <!-- <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>点击或将文件拖拽到这里上传</p> -->
						<i class="el-icon-upload"></i>
  						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__text red">多文件请打包上传</div>
                    </div>
                </uploads>
                <div class="el-upload__text" style="margin: 10px auto">仅支持pdf、xls、xlsx、jpg、png、jpeg、zip格式文件!</div>
            </div>
            <div v-if="isUpload">
				<Progress :percent="100">
			        <Icon type="checkmark-circled"></Icon>
			        <span>已上传</span>
			    </Progress>
            </div>
            <div style="text-align:center" v-if="isUpload">
				<p class="upload-style" @click="uploadTable">查看专家签名评分表</p>
            </div>
            <div slot="footer">
                <!-- <Button type="default" @click="handleReset('formValidate')">取消</Button>
                <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 15px">提交</Button> -->
            </div>
        </Modal>
	</div>
</template>

<script>
	import uploads from '@@/components/fileUpload/index.vue'
	export default {
        props:["importData","importShow", 'competitionId', 'rowId'],
        components:{
			uploads
        },
		data() {
			return {
                accept:"appliction/json",
                header: {
                    // 'Content-Type': 'multipart/form-data'
                },
                format: ['xls','xlsx'],
                Accept: "application/json",
				items:[],
				isUpload:false,
				uploadUrl:'',//评分表下载地址
			}
		},
		created() {
            this.show=this.importShow
			this.list();
		},
		methods: {
			// 上传回显
			list (e) {
                var data={
                    competitionId: this.competitionId,
                    rowId: this.rowId,
                }
                this.$api.get('review/resource/pool/getiSignName',data).then(reset => {
                    if (reset.code == 0) {
						if(reset.data){
							this.isUpload=true;
							this.uploadUrl=reset.data;
						}
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
                })
            },//list
			// 导出导出专家签名评分表
            uploadTable(){
                // window.localtion.href=this.uploadUrl
				window.open(this.uploadUrl)
            },
			// 重新上传
			handleRemove (index) {
	            this.items.splice(index,1)
	        },
			// 上传文件前执行函数
			// beforeAvatarUpload(file) {
			//     if (!/\.(pdf|PDF|xls|xlsx|jpg|png|jpeg)$/.test(file.name)) {
			//         this.$message.error('仅支持pdf、xls、xlsx、jpg、png、jpeg、zip格式文件!');
			//         return false;
			//     }
			//     // this.fullscreenLoading = true;
			//     // this.loadingText = '文件正在上传...';
            // },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false})
            },

            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.post()
                        // console.log(this.formValidate.captainSelection);
                    } else {
                        this.$refs.focusBool.focus();
                    }
                })
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
            onsuccess(res,file,fileList) {
				// if (res.status==200) {
				// 	if (res.code == 0) {
				//
				// 		console.log(res.data);
	            //         // this.$emit('exportData',true)
	            //         // this.formValidate.apkUrl=response.data.img
	            //     }else{
	            //         this.$netcode.getApiCode(res)
	            //     }
				// }
				this.items=[];
				// this.items.push(res.location)
				var data={
					competitionId: this.competitionId,
					rowId: this.rowId,
					url:res.location,
				}
				this.$api.post("review/resource/pool/signNameExpertExcel",data).then((reset)=>{
					if (reset.code == 0) {
                        // this.accessDialog=true;
                        this.$Message.success("上传成功!")
                        this.show=false;
                        this.$emit('exportData',{show:false})
                    }else {
                        this.$netcode.getApiCode(reset)
                    }
				})
            },
            error(error, file, fileList){
                this.$Message.error("上传失败!")
            },
            formatError(file,fileList){
                this.$Message.error("上传格式错误,请选择'xls'格式!")
            }
        }
	}
</script>

<style lang="less" scoped>
.upfile{
  display: inline-block;
  width:60px;
  height: 60px;
  text-align: center;
  border: 1px #999 dashed;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
  margin-right: 10px;
}
.demo-upload-list{
     display: inline-block;
     width: 360px;
     height: 160px;
     text-align: center;
     line-height: 60px;
     border: 1px solid transparent;
     border-radius: 4px;
     overflow: hidden;
     background: #fff;
     position: relative;
     box-shadow: 0 1px 1px rgba(0,0,0,.2);
     margin-right: 4px;
 }
 .demo-upload-list embed{
     width: 100%;
     height: 100%;
 }
 .demo-upload-list-cover{
     display: none;
     position: absolute;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
     background: rgba(0,0,0,.6);
 }
 .demo-upload-list:hover .demo-upload-list-cover{
     display: block;
 }
 .demo-upload-list-cover i{
     color: #fff;
     font-size: 20px;
     cursor: pointer;
     margin: 0 2px;
 }
	.upload-style{
		display:inline-block;
		margin-bottom:15px;
		margin-left:15px;
		cursor:pointer;
		color:#2089E5;
    }
    .red{
        color: red;
        font-weight: bold;
        font-size: 18px;
    }
</style>
