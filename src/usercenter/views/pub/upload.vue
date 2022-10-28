<template>
    <div class="">
        <div class="">
            <Upload
                ref="upload"
                :data="datas"
                :action="commonurl"
                :on-success="onsuccess"
                :on-error="error"
                :Accept="Accept"
                :headers="header"
                :disabled='loading'
                :before-upload='beforeUpload'
                name="file"
                :format="format"
                :on-format-error="formatError">
                <Button icon="ios-cloud-upload-outline" :loading='loading'>导入</Button>
            </Upload>
        </div>
    </div>
</template>

<script>
import{getToken} from '@@/utils/oauth'
export default {
    props:["importData"],
    data() {
        return {
            uploadnum:0,
            modelstyle:1,
            datas:{
                groupId:this.$webapi.getlocal("groupId")
            },
            items:[],
            commonurl: "/api/web/specialist/import",
            accept:"appliction/json",
            header: {
                // 'Content-Type': 'multipart/form-data'
            },
            format: ['xls','xlsx'],
            Accept: "application/json",
            loading: false,
        }
    },
    created(){
        this.header.Authorization ='Bearer '+ getToken()
        // console.log(this.importData);
    },
    mounted() {
        if(this.importData){
            this.items.push(this.importData);
        }
    },
    methods: {
        beforeUpload(){
            this.loading = true
        },
        handleRemove (index) {
            this.items.splice(index,1)
            this.$emit('exportData',this.items)
        },
        onsuccess(response, file, fileList) {
            this.loading = false
            if (response.code == 0) {
                this.$Message.success("上传成功!")
                this.$emit('exportData',true)
                // this.formValidate.apkUrl=response.data.img
            }else{
                this.$Message.error(response && response.message || '导入失败！')
                this.$netcode.getApiCode(response)
            }
        },
        error(error, file, fileList){
            this.loading = false
            this.$Message.error("上传失败!")
        },
        formatError(file,fileList){
            this.$Message.error("上传格式错误,请选择xls或者xlsx格式!")
        }
    }
}
</script>
<style>
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
     width: 60px;
     height: 60px;
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
 .demo-upload-list img{
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
</style>
