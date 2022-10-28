<template>
    <div class="newsdetails">
        
        <div class="detailsmain">
            <el-breadcrumb class="navs" separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/datacenter/half/excellenceworks' }">历届作品</el-breadcrumb-item>
                <el-breadcrumb-item>作品详情</el-breadcrumb-item>
            </el-breadcrumb>
            <h3>{{ news.title }}</h3>
            <div class="title">
                <div class="top">
                    <div class="left">
                        <p>参赛年份：{{ news.competitionYear }}</p>
                        <p>参赛类别：{{ news.competitionName }}</p>
                    </div>
                    <div class="right">
                        <div class="level">{{ news.awardName }}</div>
                    </div>
                </div>
                <div class="bottom">
                    <div>作者：{{ news.idCardName }}</div>
                    <div>单位：{{ news.school }}</div>
                </div>
            </div>
            <div class="middle">
                <div class="content" v-for="obj in arr" :key="obj.attachId">
                    
                    <div v-if="obj.fileList.length > 0">
                        <div class="tt">{{obj.attachName}}</div>
                            <div class="img">
                                <div v-for="(item,index) in obj.fileList" style="text-align: center;" :key="index">
                                    <el-button class="upload" v-if="openDownloadStatus == 1" @click="uploadFile(item.url,item.name)">下载附件</el-button>
                                    <FileReview :url="item.url" index='pdfInfo' class="logpng"/>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="next">
                    <el-button class="left"  @click="toPrevious('up')">上一篇：{{prevTitle}}</el-button>
                    <el-button  class="right"  @click="toPrevious('next')">下一篇：{{nextTitle}}</el-button>
                </div>
                <div class="form">
                    <div class="header">
                        <div class="left">发表留言</div>
                        <div class="right">
                            理性抒发己见，带“
                            <span>*</span>”必填
                        </div>
                    </div>
                    <el-form class="formData" :model="ruleForm" :rules="rules" ref="ruleForm">
                        <div class="item">留言暂不公开展示</div>
                        <el-form-item class="textarea" label="留言内容" prop="content">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 10 }"
                                v-model="ruleForm.content"
                            ></el-input>
                        </el-form-item>
                        <el-row :gutter="20">
                                <div class="name"> 
                                  <div>
                                        <el-form-item label="姓名" prop="name">
                                    <el-input v-model="ruleForm.name" style="width:89%;"></el-input>
                                </el-form-item>
                                  </div>
                               <div>
                                    <el-form-item label="邮箱" prop="email">
                                    <el-input v-model="ruleForm.email" style="width:89%;"></el-input>
                                </el-form-item>
                               </div>
                                </div>
                        </el-row>
                        <el-form-item class="btns">
                            <el-button class="btn" v-loading="loading" @click="sumbEvent">发表评论</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import moment from 'moment'
import qlediter from '@@/components/editor/show'
import FileReview from "@@/components/fileReview"
import {setItem, getItem } from "@/common/common.js";
export default {
    components: {
        qlediter,
        FileReview,
    },
    data() {
        const checkEmail=(rule, value, callback) => {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        setTimeout(() => {
            if(value && !reg.test(value)){
                callback(new Error('请输入正确的邮箱'));
            }else{
                callback()
            }
        }, 1000);
    }
        return {
            openDownloadStatus:0,
            loading:false,
            id: '',
            news: {},
            arr: [],
            competitionIds:'',
            ruleForm: {
                name: '',
                email: '',
                content: ''
            },
            obj:{},
            rules: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                ],
                email: [
                    { required: true,validator: checkEmail, message: '邮箱不能为空', trigger: 'blur' },
                    { validator: checkEmail, message: '邮箱格式有误' },
                ],
                content: [
                    { required: true, message: '留言不能为空', trigger: 'blur' }
                ]
            },
            nextId:null,
            prevId:null,
            nextTitle:null,
            prevTitle:null
        }
    },
    
watch: {
	"$route" (to, from) {
     this.$router.go(0);
	}
},
    created() {
        this.obj = getItem('form')
        this.id = this.$route.query.id
        this.getTop()
        this.init()
    },
    methods: {
        async init() {
            let res = await network.getPreviousYearsResourcePoolDetail({
                data: {
                    id: this.id
                }
            });
            if (res == 'error') return;
            this.news = res
            this.openDownloadStatus = res.openDownloadStatus
            console.log(res.openDownloadStatus);
            this.competitionIds = res.competitionId
            this.arr = res.attachList
        },
        uploadFile(url,name){
            window.open(url)
        },
        async getTop(){
             this.obj.nowId = this.$route.query.id
                let res = await network.getResourcePoolForNextAndPrev({
                     data: this.obj
                 });
            if (res == 'error') return;
            if(res.prevId){
                this.prevId = res.prevId
                this.prevTitle = res.prevTitle
            }
            if(res.nextId){
                this.nextId = res.nextId
                this.nextTitle = res.nextTitle
            }
        },
        // 上一篇 
       async toPrevious(type) {
            if(type == 'up'){
                if(this.prevId){
                    this.$router.push(`/datacenter/preworkDatails?id=${this.prevId}`)
                }else{
                    this.$message('当前为第一篇')
                }
            }else{
                if(this.nextId){
                    console.log(this.nextId);
                    this.$router.push(`/datacenter/preworkDatails?id=${this.nextId}`)
                }else{
                    this.$message('当前为最后一篇')
                }
            }
        },

        // 提交表单
         sumbEvent() {
              let params = {
                    content:this.ruleForm.content,
                    email:this.ruleForm.email,
                    name:this.ruleForm.name,
                    poolId:this.$route.query.id,
                    competitionId:this.competitionIds
                }
             this.loading = true
            this.$refs.ruleForm.validate((valid) => {
                if(!valid) return
                  network.addMessage({
                     urlData: params
                 }).then(res => {
                     this.loading = false
                     if(res){
                         this.$refs.ruleForm.resetFields()
                         this.$message.success(res)
                     }else{
                         this.$message.error('留言失败')
                     }
                 })
            });
        }
    },
    filters: {
        date(val) {
            if (!val) return;
            return moment(parseInt(val)).format('YYYY');
        }
    }
}
</script>

<style>
.logpng{
    width: 100%;
}
.formData .el-input__inner:focus {
    outline: none;
}
.formData .el-form-item__label {
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    padding-top: 4px;
    padding-bottom: 4px;
}
.formData .textarea .el-textarea__inner{
    resize: none;  /*这个是去掉 textarea 下面拉伸的那个标志*/
}
</style>

<style lang="less" scoped>
.el-breadcrumb {
    display: inline-block;
    vertical-align: middle;
}
.newsdetails {
    width: 1200px;
    margin: 0 auto;
    height: auto;
    text-align: left;
    .detailsmain {
        ::v-deep .el-breadcrumb__inner.is-link{
            color: #666666 !important;
            font-weight: 800 !important;
        }
        ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner{
                font-weight: 800 !important;
                color: #BB0294 !important;
        }
        ::v-deep .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover{
            color: #666666 !important;
        }
        ::v-deep  .el-breadcrumb__separator{
            font-weight: 800 !important;
            margin: 0 2px !important;
        }
        ::v-deep .el-breadcrumb__item:first-child{
            border-bottom: 1px solid #666666;
        }
        ::v-deep .el-breadcrumb__item:last-child{
            border-bottom: 1px solid #BB0294;
        }
        ::v-deep .el-breadcrumb__item {
            padding-bottom: 4px;
        }
        ::v-deep .el-breadcrumb__separator{
            color: #666666;
        }
        .navs{
            font-size: 15px;
            margin: 16px 0;
            color: #666666;
        }
        h3 {
            font-size: 22px;
            color: #000000;
            letter-spacing: 2px;
            
    margin: 0px 0 20px 0;

            text-align: center;
        }
        .title {
            width: 100%;
            border-bottom: 1px solid #e5e5e5;
            .top {
                display: flex;
                justify-content: space-between;
                font-size: 14px;
                .right {
                    .level {
                        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                        font-weight: bold;
                        color: #bb0294;
                        line-height: 21px;
                        letter-spacing: 1px;
                    }
                }
                p {
                    display: inline-block;
                    vertical-align: top;
                    color: #666;
                    margin-right: 48px;
                    letter-spacing: 1px;
                }
            }
            .bottom {
                margin: 16px 0;
                display: flex;
                justify-content: space-between;
                div {
                    font-size: 14px;
                    color: #666;
                    letter-spacing: 1px;
                }
            }
        }
        .content {
           >div{
                display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            .tt {
                margin-top: 16px;
                font-size: 24px;
                    margin-bottom: 10px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: #333333;
                line-height: 36px;
                letter-spacing: 2px;
            }
            .upload {
                width: 115px;
                // height: 38px;
                margin-bottom: 30px;
                background: #000000;
                color: #fff;
                font-size: 16px;
                text-align: center;
                font-weight: 500;
            }
            .img {
                // width: 650px;
                // height: 919px;
                width: 100%;
                // margin-top: 16px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
           }
        }
        .footer {
            .next {
                margin-top: 32px;
                margin-bottom: 48px;
                display: flex;
                justify-content: space-between;
                .left,
                .right {
                    width: 560px;
                    height: 38px;
                    line-height: 13px;
                    // border: 1px solid #000000;
                    text-align: center;
                    font-size: 16px;
                    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
                    font-weight: 500;
                    color: #000000;
                    letter-spacing: 1px;
                }
            }
            .form {
                .header {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #dedede;
                    padding-bottom: 15px;
                    .left {
                        font-size: 16px;
                        font-family: SourceHanSansCN-Bold, SourceHanSansCN;
                        font-weight: bold;
                        color: #333333;
                        line-height: 24px;
                        letter-spacing: 1px;
                    }
                    .right {
                        font-size: 14px;
                        font-family: SourceHanSansCN-Normal, SourceHanSansCN;
                        font-weight: 400;
                        color: #666666;
                        line-height: 21px;
                        letter-spacing: 1px;
                        span {
                            color: #d0021b;
                        }
                    }
                }

                .formData {
                    position: relative;
                    .name{
                        display: flex;
                        justify-content: space-between;
                        >div{
                            width: 50%;
                        }
                    }
                    .item {
                        position: absolute;
                        right: 0;
                        top: 12px;
                        font-size: 14px;
                        color: #666;
                    }
                }
                .btns {
                    text-align: center;
                    .btn {
                        width: 200px;
                        height: 38px;
                        background: #000000;
                        color: #fff;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>