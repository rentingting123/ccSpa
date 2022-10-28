<template>
    <div>
        <div class="register_body">
            <div class="register">

                <div class="register_content">
                    <!-- 机构注册 -->
                    <el-form :model="mechanism" :rules="rules" ref="mechanism" v-show="regPage==='mechanism'"
                        label-width="0" class="demo-ruleForm">
                        <el-form-item label="" prop="phone">
                            <el-input v-model="mechanism.phone" placeholder="请输入手机号" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input v-model="mechanism.password" placeholder="请输入密码" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="registerCode" class="code">

                            <el-input v-model="mechanism.registerCode" placeholder="请输入图形验证码" size="medium"></el-input>
                            <a @click="changePic">
                                <img ref="imgYzm" src="nodeapi/code/get?for=registerCode" height="40" />
                            </a>
                        </el-form-item>
                        <el-form-item label="" prop="code" class="code">
                            <el-input v-model="mechanism.code" placeholder="收到的验证码" size="medium"></el-input>
                            <el-button type="primary" @click="sendSms" v-if="seconds==0">获取验证码</el-button>
                            <span class="wait_auth_code" v-else>重新发送({{seconds}})</span>
                        </el-form-item>
                        <el-form-item label="" prop="mechanismName">
                            <el-input v-model="mechanism.mechanismName" placeholder="请输入机构名称" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="email">
                            <el-input v-model="mechanism.email" placeholder="请输入邮箱" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="" size="medium" prop="region">
                            <el-select v-model="mechanism.region" placeholder="请选择机构类型" size="medium"
                                style="width:400px;" @change="changType">
                                <el-option label="竞赛主办方" value="竞赛主办方"></el-option>
                            </el-select>
                        </el-form-item>


                        <div class="Agreement">
                            <div class="step1">
                                <p><span>1</span> 请先下载并填写相关协议及信息表</p>
                                <a href="https://web.moocollege.com/edit/2019711/de410ff39287ec28fc31fc9f131db0a0/AG8YGxh5_1562808137311/摩课云竞赛平台使用协议-单方盖章生效协议5.31.docx"
                                    class="tag_content_txt" style="color: #4a90e2;">
                                    <i class="iconfont" style="font-size: 12px;margin-right: 5px">&#xe610;</i>
                                    摩课云竞赛服务平台使用协议模板.doc（点我下载）
                                </a>
                                <br>
                                <br>
                                <a href="https://web.moocollege.com/mooc/rankadmin/public/%E5%85%A8%E5%9B%BD%E9%AB%98%E6%A0%A1%E6%95%99%E5%B8%88%E6%95%99%E5%AD%A6%E7%AB%9E%E8%B5%9B%E9%A1%B9%E7%9B%AE%E5%BE%81%E9%9B%86%E4%BF%A1%E6%81%AF%E8%A1%A8.doc"
                                    target="_blank" class="tag_content_txt" style="color: #4a90e2;">
                                    <i class="iconfont" style="font-size: 12px;margin-right: 5px">&#xe610;</i>
                                    高校教师教学竞赛项目征集信息表模板(点击下载)
                                </a>
                                <br>
                                <br>
                                <a href="https://web.moocollege.com/mooc/rankadmin/public/%E7%AB%9E%E8%B5%9B%E9%A1%B9%E7%9B%AE%E9%81%B4%E9%80%89%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B.pdf"
                                    target="_blank" class="tag_content_txt" style="color: #4a90e2;">
                                    <i class="iconfont" style="font-size: 12px;margin-right: 5px">&#xe610;</i>
                                    竞赛项目遴选工作流程(点击下载)
                                </a>
                            </div>
                            <div class="step2">
                                <p><span>2</span> 将填好的协议签字盖章后上传</p>

                                <upload class="avatar-uploader" accept=".jpg, .png" :showlist="true" :drag='true'
                                    :onSuccess="upSuccess1" :onRemove="upRemove1" :fileList="infoUrlList1"
                                    :config="config" :limit='10' listType="picture">
                                    <div class="avatar">
                                        <i class="iconfont" style="font-size:48px;color:#1D86FF;">&#xe614;</i>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </upload>
                            </div>
                            <div class="step2">
                                <p><span>3</span> 高校教师教学竞赛项目征集信息表</p>
                                <upload class="avatar-uploader" :showlist="true" :drag='true' :onSuccess="upSuccess2"
                                    :onRemove="upRemove2" :fileList="infoUrlList2" :config="config" :limit='10'>
                                    <div class="avatar">
                                        <i class="iconfont" style="font-size:48px;color:#1D86FF;">&#xe614;</i>
                                        <p>点击或将文件拖拽到这里上传</p>
                                    </div>
                                </upload>
                            </div>

                        </div>

                        <el-checkbox v-model="checked" style="float:left;">我已认真阅读并接受</el-checkbox>
                        <Disclaimer style="float:left;margin-top:-10px;" />

                        <el-button type="primary" class="tijiao" @click="submit('mechanism')">提 交</el-button>
                        <div id="Agreement1">
                            <h3>扩容申请过程中如有疑问请扫码联系我们</h3>
                            <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/IMG_6657.JPG" width="200px">
                            <!-- <p>QQ群： 788956637</p> -->
                        </div>
                    </el-form>

                </div>
                <div class="notice" v-if="!isChrome">
                    <div class="mess mess1"></div>
                    <div class="mess mess2"></div>
                    <span><i class="iconfont">&#xe656;</i>&nbsp;&nbsp;&nbsp;为了更好的用户体验，建议使用Chrome浏览器</span>
                    <!-- <p>IE10及以上、Edge12及以上、Firefox21及以上、Chrome23及以上、Safari6.1及以上、Opera15及以上、360浏览器、UC浏览器等请使用极速模式</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Disclaimer from './disclaimer'
import upload from '@@/components/fileUpload/index'
import network from '@/api/index'

export default {
    props: ['type', 'close'],
    components: {
        Disclaimer,
        upload
    },
    data() {
        return {
            regPage: 'mechanism',
            isSend: false,
            isChrome: true,
            seconds: 0,
            mechanism: {
                name: '',
                code: '',
                phone: '',
                password: '',
                region: '竞赛主办方',
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '手机号码格式错误', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '密码为6-20位数字或字符', trigger: 'blur' }
                ],
                registerCode: [
                    { required: true, message: '请输入图形验证码', trigger: 'blur' },
                    { min: 4, max: 4, message: '图形验证码为四位字符', trigger: 'blur' }
                ],
                code: [
                    { required: true, message: '请输入手机验证码', trigger: 'onChange' },
                    { min: 6, max: 6, message: '验证码错误', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                    { min: 1, max: 10, message: '请输入真实姓名', trigger: 'blur' }
                ],
                mechanismName: [
                    { required: true, message: '机构名称不能为空', trigger: 'blur' },
                    { min: 1, message: '机构名称不能为空', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' },
                    { min: 1, message: '邮箱不能为空', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择机构类型', trigger: 'blur' },
                    { min: 1, message: '请选择机构类型', trigger: 'blur' }
                ],
            },
            checked: false,
            infoUrlList1: [],
            infoUrlList2: [],

            config: {
                fileType: 2
            },
            mechanismType: '竞赛主办方',  // 机构类型 2 企业 3 竞赛主办方 4 学校 7 政府


        }
    },
    methods: {
        changType(value) {
            this.mechanismType = value
            this.infoUrlList1 = []
            this.infoUrlList2 = []
        },
        upSuccess1(res, file, fileList) {
            this.infoUrlList1.push({
                name: file.name,
                url: res.location
            });
        },
        upSuccess2(res, file, fileList) {
            this.infoUrlList2.push({
                name: file.name,
                url: res.location
            });
        },
        upRemove1(res, file, fileList) {
            this.infoUrlList1 = fileList
        },
        upRemove2(res, file, fileList) {
            this.infoUrlList2 = fileList
        },
        changePic() {
            this.$refs.imgYzm.src = 'nodeapi/code/get?for=registerCode&q=' + Math.random()
        },
        async sendSms() {
            var phone = this.mechanism.phone
            var registerCode = this.mechanism.registerCode

            if (!phone) {
                this.$message.warning('请输入手机号码')
                return
            }
            if (!registerCode) {
                this.$message.warning('请输入图形验证码')
                return
            }
            if (phone.length !== 11) {
                this.$message.warning('请输入正确的手机号码')
                return
            }
            if (this.type != 2) {
                let registerCheck = await network.registerCheck({ data: { 'mobile': phone } });
                if (registerCheck == 'error') return;
            }

            let sendSmsCode = await network.sendSmsCodenode({
                data: {
                    mobile: phone,
                    domain: location.hostname,
                    code: registerCode
                },
                headers: {
                    'deviceId': 0
                    //'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (sendSmsCode == 'error') return;
            this.$message.success("获取验证码成功");
            this.seconds = 119;
            let secTimer = setInterval(() => {
                this.seconds--;
                if (this.seconds == 0) {
                    clearInterval(secTimer);
                }
            }, 1000);

        },
        async submit(form) {
            this.$refs[form].validate(async (valid) => {
                if (!valid) return;
                if (!this.checked) return this.$message.warning("请阅读并接受免责声明")

                const form = new FormData()
                if (this.infoUrlList1.length == 0) {
                    this.$message.info('请先上传签字协议')
                    return
                }
                if (this.infoUrlList2.length == 0) {
                    this.$message.info('请先上传高校教师教学竞赛项目征集信息表')
                    return
                }

                let type = 3

                form.append('smsCode', this.mechanism.code)
                form.append('mobile', this.mechanism.phone)
                form.append('groupName', this.mechanism.mechanismName)
                form.append('email', this.mechanism.email)
                form.append('password', this.mechanism.password)
                form.append('contractUrl', this.infoUrlList1[0].url)

                form.append('licenseUrl', this.infoUrlList2[0].url)


                form.append('type', type)

                let res = await network.capacityApply({
                    data: form,
                    headers: {
                        'deviceId': 0
                        //'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
                if (res == 'error') return;
                this.$message.success('扩容申请成功')
                this.close && this.close();

            })
        },
        handleCountdownEnd(data) {
            this.isSend = false
        }
    },
    mounted() {
        this.changePic()
    },
    created() {
        this.regPage = this.$route.query.type || 'mechanism';
        let isChrome = window.navigator.userAgent.indexOf("Chrome");
        if (isChrome == -1) {
            this.isChrome = false
        } else {
            this.isChrome = true
        }
    }
}
</script>


<style lang="less" scoped>
.register_body {
    width: 100%;
    // height: 650px;
    padding: 0 0 50px 0;
}

.register {
    width: 600px;
    // height: 580px;
    margin: auto;
    background: #FFFFFF;
    border-radius: 10px;

    .register_title {
        width: 510px;
        height: 104px;
        line-height: 104px;
        border-bottom: 1px solid #DEDEDE;
        margin: auto;

        img {
            width: 210px;
            height: 62px;
            margin-top: 21px;
        }
    }

    .register_content {
        width: 400px;
        margin: auto;
        padding-bottom: 50px;

        h3 {
            margin: 30px 0;
        }

        .code {
            text-align: start;

            /deep/ .el-input {
                width: 180px;
                float: left;
                margin-right: 5px;
            }

            button {
                margin-left: 3px;
            }

            .countDown {
                margin-left: 15px;
            }

            a {
                width: 100px;
                height: 40px;
                display: inline-block;
            }
        }

        .tijiao {
            width: 100%;
            margin-top: 10px;
            height: 42px;
            font-size: 16px;
        }

        /deep/ .el-form-item {
            // margin-bottom: 25px;
        }
    }
}

/deep/ .footer {
    margin-top: 0;
}

.rTab {
    height: 86px;
    line-height: 86px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    color: #4A4A4A;
    letter-spacing: 0;

    span {
        cursor: pointer;
    }

    span:nth-child(2) {
        padding: 0 36px;

    }
}

.Selection {
    font-family: PingFang-SC-Bold;
    font-size: 30px;
    color: #4A4A4A;
    letter-spacing: 0;
}

.notice {
    position: relative;
    width: 600px;
    height: 90px;
    background: rgba(255, 255, 255, 0.2);
    margin-top: 31px;

    .mess {
        position: absolute;
        top: -20px;
        width: 10px;
        height: 43px;
        background-size: cover;
        background-position: center;
    }

    .mess1 {
        left: 78px;
    }

    .mess2 {
        right: 78px;
    }

    span {
        display: block;
        text-align: center;
        width: 328px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #000000;
        background: #eeeeee;
        border-radius: 6px;
        margin: 12px auto;
    }

    p {
        font-size: 12px;
        color: #FFFFFF;
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }
}

#Agreement1 {
    text-align: left;

    h3 {
        margin-bottom: 10px;
    }
}

.Agreement {
    text-align: left;
    margin-bottom: 20px;

    p {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 0;
    }

    .step1 {
        p {
            margin-bottom: 15px;

            span {
                display: inline-block;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: #1D86FF;
                line-height: 22px;
                text-align: center;
                color: #fff;
            }
        }
    }

    .step2 {
        margin-top: 40px;

        p {
            span {
                display: inline-block;
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background: #1D86FF;
                line-height: 22px;
                text-align: center;
                color: #fff;
            }
        }
    }

    .avatar {
        margin-top: 50px;
    }
}
</style>

