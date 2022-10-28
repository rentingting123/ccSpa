<template>
    <div>
        <div class="register_body">
            <div class="register">
                <div class="register_title">
                    <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/home/logo3.png">
                </div>
                <div class="register_content">
                    <h3 v-if="type==2">绑定手机号</h3>
                    <p v-else class="rTab">
                        <span :class="{'Selection':regPage=='personal'?true:false}" @click="toTab('personal')" >个人注册</span>
                    </p>
                    <!-- <h3 >欢迎来到竞赛平台！请填写您的信息</h3> -->
                    <!-- 个人注册 -->
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-show="regPage==='personal'" label-width="0"  class="demo-ruleForm">
                        <el-form-item label="" prop="phone">
                            <el-input v-model="ruleForm.phone" placeholder="请输入手机号" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label="" prop="password">
                            <el-input v-model="ruleForm.password" placeholder="请输入密码" size="medium"></el-input>
                        </el-form-item>
                        <el-form-item label=""  prop="registerCode" class="code">

                            <el-input v-model="ruleForm.registerCode" style="height:40px;" placeholder="请输入图形验证码" size="medium"></el-input>
                            <a @click="changePic1">
                                <img ref="imgYzm1" src="nodeapi/code/get?for=registerCode" height="40"/>
                            </a>
                        </el-form-item>
                        <el-form-item label="" prop="code" class="code">
                            <el-input v-model="ruleForm.code" placeholder="收到的验证码" size="medium"></el-input>
                            <el-button type="primary" @click="sendSms" v-if="seconds==0">获取验证码</el-button>
                             <span class="wait_auth_code" v-else>重新发送({{seconds}})</span>
                            <!-- <countdown :time="60 * 1000" @end="handleCountdownEnd" v-else>
                                <template slot-scope="props">
                                    <span class="countDown">重新发送({{ props.totalSeconds }}s)</span>
                                </template>
                            </countdown> -->
                        </el-form-item>
                        <el-form-item label="" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入真实姓名" size="medium"></el-input>
                        </el-form-item>
                        <el-checkbox v-model="checked" style="float:left;">我已认真阅读并接受</el-checkbox>  <Disclaimer style="float:left;margin-top:-10px"/>
                        <el-button type="primary" v-if="type==2" class="tijiao" @click="submitFormPhone">绑 定</el-button>
                        <el-button type="primary" v-else class="tijiao" @click="submit('ruleForm')">提 交</el-button>
                    </el-form>
                    
                </div>
                <div class="notice" v-if="!isChrome">
                    <div class="mess mess1"></div>
                    <div class="mess mess2"></div>
                    <span><i class="iconfont">&#xe656;</i>&nbsp;&nbsp;&nbsp;为了更好的用户体验，建议使用Chrome浏览器</span>
                    <p>IE10及以上、Edge12及以上、Firefox21及以上、Chrome23及以上、Safari6.1及以上、Opera15及以上、360浏览器、UC浏览器等请使用极速模式</p>
                </div>
            </div>
            <el-dialog
                title="提示"
                :visible.sync="centerDialogVisible"
                width="500px"
                center>
                <h3>您的注册申请已提交，请耐心等待审核~</h3>
                <p>有任何问题，请在工作时间内联系我们</p>
                <p>客服电话：0571-81902943</p>
                <p>客服手机：17357146574</p>
                <p>工作时间：08:30-20:00（周一至周五）</p>
                <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="toHome">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
  import network from '@@/api/jxapi'
  import Disclaimer from '../disclaimer'
  import upload from '@@/components/fileUpload/index'


  export default {
      props:['type'],
      components:{
          Disclaimer,
          upload
      },
    data() {
      return {
        centerDialogVisible:false,
        regPage:'personal',
        isSend: false,
        isChrome:true,
        seconds:0,
        ruleForm: {
            name: '',
            code: '',
            phone: '',
            password:''
        },
        mechanism:{
            name: '',
            code: '',
            phone: '',
            password:'',
            region:'竞赛主办方',
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
                { min: 1,  message: '机构名称不能为空', trigger: 'blur' }
            ],
            region:[
                { required: true, message: '请选择机构类型', trigger: 'blur' },
                { min: 1,  message: '请选择机构类型', trigger: 'blur' }
            ],
        },
        checked:false,
        infoUrlList1:[],
        infoUrlList2:[],

        config:{
            fileType:2
        },
        mechanismType:'竞赛主办方',  // 机构类型 2 企业 3 竞赛主办方 4 学校 7 政府

        
      }
    },
    methods: {
        //跳转到首页
        toHome(){
            this.centerDialogVisible = false
            this.$router.push('/');
        },
        // 切换个人/机构
        toTab(type){
            this.regPage=type
            this.changePic()
            this.changePic1()
            this.seconds=0
        },
        changType(value){
            this.mechanismType=value
            this.infoUrlList1=[]
            this.infoUrlList2=[]
        },
        upSuccess1(res,file,fileList){
            this.infoUrlList1.push({
                name: file.name,
                url: res.location
            });
        },
        upSuccess2(res,file,fileList){
            this.infoUrlList2.push({
                name: file.name,
                url: res.location
            });
        },
        upRemove1(res,file,fileList){
            this.infoUrlList1=fileList
        },
        upRemove2(res,file,fileList){
            this.infoUrlList2=fileList
        },
        changePic1(){
            this.$refs.imgYzm1.src = 'nodeapi/code/get?for=registerCode&q='+Math.random()
        },
        changePic(){
            this.$refs.imgYzm.src = 'nodeapi/code/get?for=registerCode&q='+Math.random()
        },
        async sendSms () {
            if(this.regPage==='mechanism'){
                var phone = this.mechanism.phone
                var registerCode = this.mechanism.registerCode
                // let { phone, registerCode} = this.mechanism
            }else{
                var phone = this.ruleForm.phone
                var registerCode = this.ruleForm.registerCode
                // let { phone, registerCode} = this.ruleForm
            }
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
            if(this.type != 2){
                let registerCheck = await network.registerCheck({data:{'mobile': phone }});
                if(registerCheck=='error') return;
            }

            let sendSmsCode = await network.sendSmsCodenode({
                data:{
                    mobile: phone,
                    domain:location.hostname,
                    code: registerCode
                },
                headers: {
                    'deviceId': 0
                    //'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if(sendSmsCode=='error') return;
            this.$message.success("获取验证码成功");
            this.seconds = 119;
            let secTimer = setInterval(()=> {
                this.seconds--;
                if (this.seconds == 0) {
                    clearInterval(secTimer);
                }
            }, 1000);
                
        },
        async submit (form) {
            this.$refs[form].validate(async (valid) => {
                if(!valid) return;
                if(!this.checked) return this.$message.warning("请阅读并接受免责声明")
                if(this.regPage==='personal'){
                    const form = new FormData()
                    form.append('smsCode', this.ruleForm.code)
                    form.append('mobile', this.ruleForm.phone)
                    form.append('nickName', this.ruleForm.name)
                    form.append('password', this.ruleForm.password)

                    let res = await network.register({
                        data:form,
                        headers: {
                            'deviceId': 0
                            //'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    if(res=='error') return;

                    this.$message.success('注册成功')    
                    this.$router.push('/login');
                }else{
                    const form = new FormData()
                    if(this.infoUrlList1.length==0){
                        this.$message.info('请先上传签字协议')
                        return
                    }
                if(this.mechanismType!='竞赛主办方'){
                    if(this.infoUrlList2.length==0){
                        this.$message.info('请先上传证明材料')
                        return
                    }
                }
                    
                    
                    let type = this.mechanismType==='竞赛主办方'?'3':this.mechanismType==='政府单位'?'7':this.mechanismType==='企业'?'2':'4'
                    
                    form.append('smsCode', this.mechanism.code)
                    form.append('mobile', this.mechanism.phone)
                    form.append('groupName', this.mechanism.mechanismName)
                    form.append('password', this.mechanism.password)
                    form.append('contractUrl', this.infoUrlList1[0].url)
                    if(this.mechanismType!='竞赛主办方'){
                        form.append('licenseUrl', this.infoUrlList2[0].url)
                    }
                    
                    form.append('type', type)

                    let res = await network.groupRegister({
                        data:form,
                        headers: {
                            'deviceId': 0
                            //'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    });
                    if(res=='error') return;
                    this.$message.success('注册成功')    
                    this.centerDialogVisible = true
                }
            })
        },
        submitFormPhone(formName) {
            this.$refs['ruleForm'].validate(async valid => {
                if(!valid) return;
                if(!this.checked) return this.$message.warning("请阅读并接受免责声明")
                const form = new FormData()
                form.append('smsCode', this.ruleForm.code)
                form.append('mobile', this.ruleForm.phone)
                form.append('nickName', this.ruleForm.name)
                
                const phone = await network.weixinModifyMobile({
                    data: form,
                    headers: { deviceId: 0,Authorization:`Bearer ${localStorage.getItem('wexin')}`}
                });
                if (phone == "error") return;
                this.$message.success("绑定成功");
                localStorage.removeItem('wexin')
                this.$router.push('/login')
            });
        },
        handleCountdownEnd (data) {
            this.isSend = false
        }
    },
    created(){
        let isChrome = window.navigator.userAgent.indexOf("Chrome");
        if( isChrome == -1){
            this.isChrome = false
        }else{
            this.isChrome = true
        }
    }
  }
</script>


<style lang="less" scoped>

    .register_body{
        width: 100%;
        // height: 650px;
        padding: 50px 0;
    }
    .register{
        width: 600px;
        // height: 580px;
        margin: auto;
        background: #FFFFFF;
        border-radius: 10px;
        .register_title{
            width: 510px;
            height: 104px;
            line-height: 104px;
            border-bottom: 1px solid #DEDEDE;
            margin: auto;
            img{
                width: 210px;
                height: 62px;
                margin-top: 21px;
            }
        }
        .register_content{
            width: 400px;
            margin: auto;
            padding-bottom: 50px;
            h3{
                margin: 30px 0;
            }
            .code{
                text-align: start;
                /deep/ .el-input{
                    width: 180px;
                    float: left;
                    margin-right: 5px;
                }
                button{
                    margin-left: 3px;
                }
                .countDown{
                    margin-left: 15px;
                }
                a{
                    width: 100px;
                    height: 40px;
                    display: inline-block;
                }
            }
            .tijiao{
                width: 100%;
                margin-top: 10px;
                height: 42px;
                font-size: 16px;
            }
            /deep/ .el-form-item{
                // margin-bottom: 25px;
            }
        }
    }
    
    /deep/ .footer{
        margin-top: 0;
    }
    .rTab{
        height: 86px;
        line-height: 86px;
        font-size: 18px;
        color: #4A4A4A;
        letter-spacing: 0;
        span{
            cursor: pointer;
        }
        span:nth-child(2){
            padding: 0 36px;

        }
    }
    .Selection{
        font-size: 30px;
        color: #4A4A4A;
        letter-spacing: 0;
    }
    .notice{
        position: relative;
        width: 600px;
        height: 90px;
        background: rgba(255,255,255,0.2);
        margin-top: 31px;
        .mess{
            position: absolute;
            top: -20px;
            width: 10px;
            height: 43px;
            background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/home/Line.png) no-repeat;
            background-size: cover;  
            background-position: center;
        }
        .mess1{
            left: 78px;
        }
        .mess2{
             right: 78px;
        }
        span{
            display: block;
            width: 328px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #FFFFFF;
            background: #1D86FF;
            border-radius: 6px;
            margin: 12px auto;
        }
        p{
            font-size: 12px;
            color: #FFFFFF;
            text-align: left;
            width: 90%;
            margin: 0 auto;
        }
    }
    #Agreement1{
        text-align: left;
        h3{
            margin-bottom: 10px;
        }
    }
    .Agreement{
        text-align: left;
        margin-bottom: 20px;
        p{
            font-size: 16px;
            color: #4A4A4A;
            letter-spacing: 0;
        }
        .step1 {
            p{
                margin-bottom: 15px;
                span{
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
            p{
                span{
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
        .avatar{
            margin-top: 50px;
        }
    }
    
    

</style>

