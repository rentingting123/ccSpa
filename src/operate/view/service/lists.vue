<template>
    <div class="serviceList">
        <h1>内容管理</h1>
        
        <div class="search" style="text-align:left;margin: 20px 0;">
            <el-select v-model="type" style="width:200px" placeholder="请选择类型" @change="search">
                <el-option value="" label="全部"></el-option>
                <el-option value="1" label="高校管理员"></el-option>
                <el-option value="2" label="参赛者"></el-option>
                <el-option value="3" label="主办方"></el-option>
                <el-option value="4" label="评审专家"></el-option>
                <el-option value="5" label="报名管理员"></el-option>
            </el-select>
            <!-- <el-button type="primary" @click="search">查询</el-button> -->

            <div style="display:inline-block; float:right;margin:10px 0">
                <el-button type="primary" @click="add">新增</el-button>
            </div>
        </div>

        <el-table border :data="tableData">
            <el-table-column prop="title" label="大标题" >
                <template slot-scope="{ row }">
                    <a @click="todetail(row)"> {{row.title}}</a>
                </template>
            </el-table-column>
            <el-table-column prop="title2" label="小标题" ></el-table-column>
            <el-table-column prop="url" label="封面图" >
                <template slot-scope="{ row }">
                    <img :src="row.url" height="30px">
                </template>
            </el-table-column>
            <el-table-column prop="img" label="视频地址" ></el-table-column>
            <el-table-column prop="type" label="类型" width="100px">
                <template slot-scope="{ row }">
                    <span v-if="row.type==1">高校管理员</span>
                    <span v-else-if="row.type==2">参赛者</span>
                    <span v-else-if="row.type==3">主办方</span>
                    <span v-else-if="row.type==4">评审专家</span>
                    <span v-else-if="row.type==5">报名管理员</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="350px">
                <template slot-scope="{ row, $index }">
                    <el-button v-if="row.type!=99" type="primary" @click="update(row, $index)">修改</el-button>
                    <el-button type="error" @click="del(row, $index)">删除</el-button>
                    <el-button :disabled="$index==0" @click="up(row, $index)">上升</el-button>
                    <el-button :disabled="$index==tableData.length-1" @click="down(row, $index)">下降</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog :visible.sync="show" :title="showtitle" width='800px' :close-on-click-modal='false'>
            <el-form ref="obj" label-position="top" :model="obj" :rules="rules" class="serviceListform">
                <el-form-item label="大标题" prop="title">
                    <el-input v-model="obj.title" />
                </el-form-item>
                <el-form-item label="小标题" prop="title2">
                    <el-input v-model="obj.title2" />
                </el-form-item>
                <el-form-item label="封面图" prop="url">
                    <upload
                        class="avatar-uploader"
                        accept=".jpg, .png, .gif"
                        name="attach"
                        :showlist="false"
                        :onSuccess="handleAvatarSuccess"
                        :beforeUpload="beforeAvatarUpload"
                    >
                        <img v-if="obj.url" :src="obj.url" class="avatar" />
                        <i v-if="!obj.url" class="el-icon-plus avatar-uploader-icon"></i>
                        <span v-if="!obj.url" class="layout">
                            200kb以下
                            <br />jpg/png/gif格式文件
                        </span>
                    </upload>
                </el-form-item>
                <el-form-item label="视频" prop="img">
                    <upload
                        class="avatar-uploader"
                        accept=".mp4"
                        name="attach"
                        :showlist="false"
                        :onSuccess="handleAvatarSuccessimg"
                        :beforeUpload="beforeAvatarUpload"
                    >
                        <video v-if="obj.img" :src="obj.img" class="avatar" />
                        <i v-if="!obj.img" class="el-icon-plus avatar-uploader-icon"></i>
                        <span v-if="!obj.img" class="layout">
                            mp4格式文件
                        </span>
                    </upload>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-radio-group v-model="obj.type" >
                        <el-radio label="1">高校管理员</el-radio>
                        <el-radio label="2">参赛者</el-radio>
                        <el-radio label="3">主办方</el-radio>
                        <el-radio label="4">评审专家</el-radio>
                        <el-radio label="5">报名管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="内容" prop="info">
                    <el-input v-model="obj.info"  style="display:none"/>
                    <editor :setDate="setDaterule" :stateData="obj.info" />
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="show=false">取消</el-button>
                    <el-button @click="submit('obj')" style="margin-left: 8px">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </div>
</template>

<script>
import editor from '@@/components/editor'
import upload from "@@/components/fileUpload/index";
import network from '@/operate/api';
export default {
    data(){
        return{
            tableData:[],
            type: '1',
            show: false,
            showtitle: '新增',
            obj: {},
            rules: {
                title: [
                    { required: true, message: '请输入大标题', trigger: 'change' }
                ],
                title2: [
                    { required: true, message: '请输入小标题', trigger: 'change' }
                ],
                url: [
                    { required: true, message: '请上传封面图', trigger: 'change' }
                ],
                img: [
                    { required: true, message: '请上传视频', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                info: [
                    { required: true, message: '请输入内容', trigger: 'change' }
                ]
            },
        }
    },
    components:{
        editor,
        upload,
    },
    created(){
        this.search();
    },
    methods:{
        up(row, index){
            let arr = [this.tableData[index-1], row]
            this.getSort(arr)
        },
        down(row, index){
            let arr = [row, this.tableData[index+1]]
            this.getSort(arr)
        },
        async getSort(arr){
            let res = await network.sortService({data:{
                app: 'operate',
                data: arr
            }})
            if(res=='error') return;
            this.search();
        },
        add(){
            this.showtitle = '新增'
            this.obj = {}
            this.show = true
        },
        async search(){
            let res = await network.getServiceList({data:{
                type: this.type, 
                app: 'operate'
            }});
            if(res=='error') return;
            this.tableData = res && res.list || []
        },
        update(row, index){
            this.showtitle = '修改'
            this.obj = {...row}
            this.show = true
        },
        async del(row, index){
            this.tableData.splice(index,1)
            let res = await network.delService({data:{
                id: row.id+'',
                app: 'operate'
            }});
            if(res=='error') return;
            this.$message.warning('删除成功')
            this.search();
        },
        setDaterule(val){
            this.$set(this.obj, 'info', val)
        },
        async submit(name){
            this.$refs[name].validate(async (valid) => {
                if(!valid) return;
                let params = {
                    ...this.obj,
                    app: 'operate',
                }
                let res
                if(this.showtitle=='新增'){
                    res = await network.addService({data:params});
                }else{
                    res = await network.setService({data:params});
                }
                if(res=='error') return;
                this.search();
                this.show = false
            })
        },
        handleAvatarSuccess(res) {
            this.$set(this.obj, 'url', res.location)
        },
        handleAvatarSuccessimg(res) {
            this.$set(this.obj, 'img', res.location)
        },
        beforeAvatarUpload() {},
        async todetail(row){
            this.$router.push('/service/detail?id='+row.id)
        }
    }
}
</script>

<style lang='less' scoped>
h1{
    margin: 20px 0;
}
.serviceListform{
    width: 90%;
    margin: 0 auto;
    text-align: left;

    /deep/.el-form-item__content{
        width: 90%;
        margin: 0 auto;
    }
    /deep/.el-form--label-top .el-form-item__label{
        padding: 0;
    }
    .avatar-uploader .el-upload {
      border-radius: 5px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 120px;
      line-height: 120px;
      text-align: center;
      background: #f0f2f4;
      border-radius: 5px;
      float: left;
    }
    .avatar {
      width: 178px;
      height: 120px;
      display: inline-block;
      float: left;
    }
    .layout {
      font-size: 12px;
      color: #9b9b9b;
      text-align: start;
      float: left;
      margin-top: 56px;
      margin-left: 10px;
    }
    /deep/.ql-editor{
        min-height: 300px;
    }
}
</style>