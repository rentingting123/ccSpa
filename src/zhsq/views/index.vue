<template>
  <div class="mainPage">
    <header :style="`background-image:url(${bg})`"></header>
    <div class="school">
      <Form ref="schoolform" :model="schoolform" :rules="ruleSchool" label-position="top">
          <FormItem label="学校" prop="name">
              <Select
                  v-model="schoolform.name"
                  filterable
                  placeholder="请输入学校名称"
                  remote
                  @on-change='nameChange'
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <Option v-for="(option, index) in schoolList" :value="option.value" :key="index">{{option.label}}</Option>
              </Select>
          </FormItem>
      </Form>
    </div>

    <div class="person">
      <h1>申请人信息</h1>
      <Form ref="person" :model="person" label-position="top" class="form" :rules="rulePerson">
        <!-- <Col :xs="24" :sm="24" :md="24" :lg="12"> -->
          <FormItem label="姓名" prop="name">
              <Input v-model="person.name" placeholder="请输入姓名"></Input>
          </FormItem>
          <FormItem label="手机号" prop="tel">
              <Input v-model="person.tel" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="部门（教务处、二级学院、校团委等）" prop="depart">
              <Input v-model="person.depart" placeholder="请输入部门"></Input>
          </FormItem>
          <FormItem label="职务" prop="position">
              <Input v-model="person.position" placeholder="请输入职务"></Input>
          </FormItem>
          <FormItem label="邮箱" prop="email">
              <Input v-model="person.email" placeholder="请输入邮箱"></Input>
          </FormItem>
          <FormItem label="图形验证码" prop="code">
              <Row style="width:100%;">
                <Col span="10">
                  <Input v-model="person.code" ></Input>
                </Col>
                <Col span="2">&nbsp;</Col>
                <Col span="12">
                  <a rel="external nofollow" @click="changePic">
                    <img ref="imgYzm" src="nodeapi/code/get?for=admin" height="40"/>
                  </a>
                </Col>
              </Row>
          </FormItem>
      </Form>
    </div>
    <Button type="primary" @click="submit('schoolform','person')" :loading="submitLoading" class="submit">提交</Button>

  </div>
</template>

<script>
import network from '@/zhsq/api/index'
export default {
  data(){
    const validatePhone = (rule, value, callback) => {
        if (!value) {
            return callback(new Error('手机号不能为空'));
        } else if (!/^1[3456789]\d{9}$/.test(value)) {
            callback('手机号格式不正确');
        } else {
            callback();
        }   
    }
    return{
      bg:require('../assets/bg_750.jpg'),
      schoolform:{
        name:'',
      },
      ruleSchool:{
        name:[
          { required: true, message: '请填写学校', trigger: 'blur' }
        ],
      },
      person:{
        name:'',
        tel:'',
        depart:'',
        position:'',
        email:'',
        code:'',
      },
      rulePerson:{
        name:[
          { required: true, message: '请填写姓名', trigger: 'blur' }
        ],
        tel:[
          {required: true,validator:validatePhone, trigger:'blur'}
        ],
        depart:[
          { required: true, message: '请填写部门', trigger: 'blur' }
        ],
        position:[
          { required: true, message: '请填写职位', trigger: 'blur' }
        ],
        code:[
          { required: true, message: '请填写验证码', trigger: 'blur' }
        ],
        email:[
          { required: false, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '请填写邮箱', trigger: 'blur' }
        ],
      },
      loading: false,
      schoolList: [],
      submitLoading: false, // 提交loading
      schoolcolCodeID: '',
    }
  },
  mounted(){
    document.getElementById("app").style.minWidth = 0;
  },
  beforeDestroy(){
    document.getElementById("app").style.minWidth = "1200px";
  },
  methods:{
    nameChange(val){
      for(let i in this.schoolList){
        if(val == this.schoolList[i].value){
          return this.schoolcolCodeID = this.schoolList[i].schoolcolCodeID
        }
      }
    },
    changePic(){
      this.$refs.imgYzm.src = 'nodeapi/code/get?for=admin&q='+Math.random()
    },
    async querySchool(param) {
      this.loading = false;
      param.limit = 6;

      const data = await network.school({ data: param });
      if (data == "error") return;
      if (!data) {
        this.schoolList = [];
        return;
      }
      this.schoolList = data.map(r => {
        return { value: r.schoolcolName, label: r.schoolcolName, schoolcolCodeID:r.schoolcolCodeID };
      });
    },
    async remoteMethod (q) {
      if (q !== "") {
        this.loading = true;
        this.querySchool({ q });
      } else {
        this.schoolList = [];
      }
    },
    submit(name,person){
      this.$refs[name].validate((valid) => {
          if(!valid) return window.scrollTo(0,0);
          this.$refs[person].validate(async (valid) => {
            if(!valid) return;

            let param = {
              username:this.person.name,
              mobile:this.person.tel,
              email:this.person.email,
              school:this.schoolform.name,
              schoolcolCode:this.schoolcolCodeID,
              academy:this.person.depart,
              business:this.person.position,
              code:this.person.code,
            }
            
            this.submitLoading = true
            let result = await network.qrCodeRegister({data:param});
            this.submitLoading = false
            if(result=='error') return scrollTo(0,0);
            this.$router.push("/submit");
          })

      })
      
    }
  }
}
</script>

<style lang="less" scoped>
.mainPage{
  width: 7.5rem;
  height: auto;
  margin: 0 auto;
  header{
    width: 100%;
    height: 3rem;
    background: url(../assets/bg_750.jpg) no-repeat;
    background-size: 7.5rem 3rem;
    background-position: center;
  }
  .school{
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(52,57,92,0.30);
    border-radius: 10px;
    width: 6.88rem;
    margin: 0 auto;
    padding: 0.2rem 0.24rem 0.27rem;
    position: relative;
    z-index: 3;
    top: -0.78rem;
  }
  .person{
    background: #FFFFFF;
    box-shadow: 0 4px 4px 0 rgba(52,57,92,0.30);
    border-radius: 10px;
    width: 6.88rem;
    margin: 0 auto;
    padding: 0.2rem 0.24rem 0.27rem;
    position: relative;
    z-index: 2;
    top: -0.5rem;
    h1{
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      color: #0078E2;
      text-align: center;
      background: #EEF7FF;
      border-radius: 5px;
      margin: 0.16rem 0;
    }
    .form{
      margin-top: 0.32rem;
    }
  }
  .submit{
    display: block;
    width: 6.88rem;
    height: 40px;
    margin: 0.16rem auto 0.36rem;
  }
  .add{
    width: 1.54rem;
    height: 1.54rem;
    line-height: 1.54rem;
    font-size: 30px;
    text-align: center;
    color: #768696;
    background:rgba(242,242,242,1);
    border-radius:8px;
  }

}

</style>


<style lang="less" >
.el-message{
  min-width: 3.8rem !important;
}
</style>
