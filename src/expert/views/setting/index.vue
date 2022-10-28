<template>
    <div class="setting">
        <div class="header">
            <chooseId :rowId='rowId' :cId='competitionId' :rowIdChange='rowIdChange' :cIdChange='cIdChange' />
        </div>
            <!-- <setting  :rowId='rowId' :cId='competitionId'></setting> -->
        <el-menu mode="horizontal"  theme="light" default-active="1" @select="chooseTitle">
            <el-menu-item index="1">评分设置</el-menu-item>
            <el-menu-item index="2">评审限制</el-menu-item>
        </el-menu>

        <el-form ref="form" :model="form" label-width="120px" class="elForm">
            <el-form-item label="评分方式: " prop="pattern"
                :rules="{required: true, message: '请选择评分方式', trigger: 'change'}"
                v-if="name==1">
                <el-radio-group v-model="form.pattern" @change="patternChange">
                    <el-radio :label="0" >按作品评审</el-radio>
                    <el-radio :label="1" >按附件评审</el-radio>
                </el-radio-group>
            </el-form-item>

            <div v-if="name==1 && form.pattern==0">
                <workSet :form='form'/>
            </div>
            
            <el-form-item v-if="name==1 && form.pattern==1" label="参与评分附件: " style="background: #FAFAFA;" prop="attach" :rules="{require:true, message:'请选择评分附件'}">
                <el-checkbox-group v-model="attach">
                    <el-checkbox style="max-width:318px;overflow: hidden;" v-for="att in fromAttach"  :key="att.attachId" :label="att.attachId" :title="att.attachName" >{{att.attachName}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <div  v-if="name==1 && form.pattern==1" >
                <patternSet :form='form' :attach='attach' />
            </div>

            <el-form-item  label="评审次数: " prop="scoreNum" v-if="name==1"
                :rules="{ required: true, message: '请选择评审次数', trigger: 'change'}" >
                <div>
                    <span>每个作品被评次数<el-input v-model="form.scoreNum" size="small" style="width:63px;margin:0 5px;" />次</span>
                    <el-tooltip content="系统默认次数为参赛作品/评审人员数" placement="top">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-form-item>

            <!-- 20201217文威说暂时不需要显示，默认1000 -->
            <!-- <el-form-item  label="评审次数: " prop="reviewCount" v-if="name==1"
                :rules="{ required: true, message: '请选择评审次数', trigger: 'change'}">
                <div>
                    <span>专家评审次数上限<el-input v-model="form.reviewCount" size="small" style="width:63px;margin:0 5px;"></el-input>次</span>
                    <el-tooltip content="无限制则填写1000" placement="top">
                        <i class="el-icon-question"></i>
                    </el-tooltip>
                </div>
            </el-form-item> -->
            
            <el-form-item label="分数计算: " prop="countType" v-if="name==1"
                :rules="{required: true, message: '请选择分数计算方式', trigger: 'change'}">
                <el-radio-group v-model="form.countType" class="countType">
                    <el-radio :label="1" >全部均值</el-radio>
                    <el-radio :label="0" >去掉最高分和最低分的均值</el-radio>
                    <el-radio :label="2" >去掉最低分</el-radio>
                    <el-radio :label="3" >离散算法</el-radio>
                    <el-radio :label="4" >排名加权</el-radio>
                </el-radio-group>
                <div v-if="form.countType==3" class="inputNum">
                    <span>偏离值：
                        <el-input-number style="width:100px" v-model="form.deviation" controls-position="right" :step="0.01" size="mini"></el-input-number>
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>默认均值：
                        <el-input-number style="width:80px" v-model="form.means" controls-position="right" :step="1" size="mini"></el-input-number> 分
                    </span>
                </div>
            </el-form-item>
            
            <el-form-item label="总分评分限制【下限-上限）" 
                style="margin-bottom:10px;" 
                prop="reviewCount" 
                label-width="200px"
                :rules="{required: false, message: '请填写评审次数', trigger: 'blur'}"
                v-if="name==2"
                >
                <el-tooltip content="设置每位专家能在规定分数段评分的次数" placement="top">
                    <i class="el-icon-question"></i>
                </el-tooltip>
            </el-form-item>
            
            <div v-if="name==2">
                <limitSet :scoreLimit='scoreLimit'/>
            </div>
              <el-form-item label="评语是否必填" prop="remarkMustFillIn">
                         <el-radio-group v-model="form.remarkMustFillIn">
                            <el-radio :label="1" >必填</el-radio>
                            <el-radio :label="0" >选填</el-radio>
                        </el-radio-group>
                        
                    </el-form-item>
                    <el-form-item v-if="form.remarkMustFillIn == 1" 
                    label="评语字数最少需输入"
                      :rules='form.remarkMustFillIn == 1 ?[{ required: true, message: "请输入评语字数", trigger: "blur" }]:[ {required: false,}]'
                     prop="remark">
                        <el-input v-model="form.remark"  placeholder="请输入字数，最大999" maxlength="3"  onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')" >
                            <template slot="append">字</template>
                        </el-input>
                    </el-form-item>
            <el-form-item label="评审回避: " prop="avoidType" v-if="name==1">
                <el-checkbox-group v-model="form.avoidType">
                    <el-checkbox :label="0" >同省回避</el-checkbox>
                    <el-checkbox :label="1" >同校回避</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="评审隐私: " v-if="name==1">
                <el-checkbox-group v-model="form.reviewConceal">
                    <el-checkbox :label="0" >参赛作品匿名</el-checkbox>
                    <el-checkbox :label="1" >点评展示</el-checkbox>
                    <el-checkbox :label="2" >得分展示</el-checkbox>
                    <!-- <el-checkbox :label="2" class="block">分数保密</el-checkbox>
                    <el-checkbox :label="3" class="block">该时间段不公开参赛作品</el-checkbox> -->
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="历史评分显示: " v-if="name==1">
                <el-radio-group v-model="form.allowHistory">
                    <el-radio :label="1" >是</el-radio>
                    <el-radio :label="0" >否</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="作品下载: " v-if="name==1">
                <el-radio-group v-model="form.downPerm">
                    <el-radio :label="1" >可下载</el-radio>
                    <el-radio :label="2" >不可下载</el-radio>
                </el-radio-group>
            </el-form-item>

        </el-form>

        <div>
            <el-button size='mini' type="primary" class="submit" @click="submitsetPS('form')">保存</el-button>
        </div>

    </div>
</template>

<script>
// import setting from '@@/views/admin/list/scheduleSet/review/dialog'
import chooseId from '@/expert/components/chooseId'
import network from '@@/api/jxapi/index'
import util from '@@/utils/util'
import {cloneDeep} from 'lodash'
import workSet from './common/workSet'
import patternSet from './common/patternSet'
import limitSet from './common/limitSet'

export default {
    components:{
        // setting,
        chooseId,
        workSet,
        patternSet,
        limitSet,
    },
    data(){
        return{
            rowId: '',
            competitionId: undefined,
            name: 1,
            form:{reviewConceal:[],avoidType:[],remarkMustFillIn:0},
            fromAttach:[],
            attach:[],
            temp_:[],
            scoreLimit:[]

        }
    },
    methods:{
        rowIdChange(e){
            this.rowId = e.rowId
            this.getpings()
        },
        cIdChange(e){
            this.competitionId = e.id
            this.rowId = e.rowId
            this.getpings()
        },
        chooseTitle(name){
            this.name = name
        },
        initFrom(){
            this.scoreLimit = [];
            this.fromAttach = []
            this.attach = []
            this.temp_ =[]

            this.form = {
                "competitionId": this.competitionId,
                "rowId": this.rowId,
                "deviation": 0.05,
                "means": 80,
                "remarkMustFillIn":0,
                "remark":"",
                "reviewStandardListDto": {
                    "reviewStandardList": [
                    {
                        "attachId": "",
                        "attachName":'',
                        "sort": '',
                        "total": 100,
                        "weight": 100,
                        "reviewScores": [
                        {
                            "itemId": util.randomChar(12),
                            "title": "",
                            "weight": '',
                            "info": "",
                            "score": '',
                            "options": []
                        }
                        ],
                        "reviewComments": [
                        
                        ]
                    }
                    ]
                },
                "pattern": 0,
                "scoreType": 0,
                "scoreNum": 10,
                "countType": 0,
                "allowType": null,
                "reviewUserDto": {
                    "reviewType": 1,
                    "reviewUserIds": []
                },
                "reviewConceal": [],
                "downPerm": '',
                "avoidUserDto": {
                    "avoidReviewType": 0,
                    "avoidUserIds": [  ]
                },
                "avoidType": [],
                "reviewCount": 1000,
                "userId": null
            }
        },
        patternChange(type){
            if(type==0 && this.temp_.length<1){
                this.temp_ = [{
                    "attachId": '',
                    "sort": '',
                    "attachName": '',
                    "total": 100,
                    "weight": '',
                    "reviewScores": [
                    {
                        "itemId": util.randomChar(12),
                        "title": "",
                        "weight": '',
                        "info": "",
                        "score": '',
                        "options": [ ]
                    }
                    ],
                    "reviewComments": [ ]
                }]
            }
            let arr = cloneDeep(this.form.reviewStandardListDto.reviewStandardList)
            this.form.reviewStandardListDto.reviewStandardList = this.temp_?cloneDeep(this.temp_):[]
            this.temp_ = cloneDeep(arr)
            // if(this.temp_)this.form.reviewStandardListDto.reviewStandardList = deepClone(this.temp_)
        },
        setreviewStandardList(){
            if(this.form.pattern==0) return;
            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                let flag = true;
                for(let j in this.fromAttach){
                    if(this.form.reviewStandardListDto.reviewStandardList[i].attachId == this.fromAttach[j].attachId){
                        flag = false
                    }
                }
                if(flag){
                    this.form.reviewStandardListDto.reviewStandardList.splice(i,1)
                }
            }

            let arr = []
            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                if(this.form.reviewStandardListDto.reviewStandardList[i].attachId){
                    arr.push(this.form.reviewStandardListDto.reviewStandardList[i].attachId)
                }
            }
            this.attach = arr

        },
        async getpings(){
            const res = await network.getReviewRuleCopy({data:{competitionId:this.competitionId,rowId:this.rowId}});
            if(res=='error') return;
            this.show = true
            this.initFrom();
            if(res){
                // 设置默认值
                if(!res.means&&res.means!=0) res.means = 80
                if(!res.deviation&&res.deviation!=0) res.deviation = 0.05
                if(!res.remarkMustFillIn){
                    res.remarkMustFillIn = 0
                }
                this.form = res
                this.scoreLimit = res.scoreLimits||this.scoreLimit
            }

            const attach = await network.getPoolGetPool({data:{competitionId:this.competitionId,rowId:this.rowId}});
            if(attach=='error') return;
            this.fromAttach = attach;
            
            this.setreviewStandardList();
            
        },
        /**
       * 评审设置确定提交
       */
        async submitsetPS(formname) {
            this.$refs[formname].validate(async (valid)=>{
                if(!valid) return;

                if(this.attach.length<1 && this.form.pattern==1){
                    return this.$message.warning('请选择参与评分附件')
                }

                if(
                    this.form.countType==3 && 
                    (
                        (this.form.deviation!=0 && !this.form.deviation) || 
                        (this.form.means!=0 && !this.form.means)
                    ) 
                  ){
                    return this.$message.warning('离散算法计算时，请填写偏离值和默认均值')
                }

                let arr = this.form.reviewStandardListDto.reviewStandardList
                for(let i in arr){

                    let score = 0;
                    for(let j in arr[i].reviewScores){
                        if(!arr[i].reviewScores[j].title ||!arr[i].reviewScores[j].weight ||!arr[i].reviewScores[j].info ){
                             this.$message.warning("请填写评分标准")
                             return;
                        }
                        score += parseInt(arr[i].reviewScores[j].weight)
                        arr[i].reviewScores[j].score = 100
                    }

                    if(score!=100){
                        return this.$message.warning('各权重总分必须为100')
                    }
                    arr[i].total = 100
                }
                let maxNums = 0
                let scoreArr = []
                let count = 0
                console.log('测试正常线上有问题调试：',this.scoreLimit)
                for(let i = 0;i<this.scoreLimit.length;i++){
                    if(String(this.scoreLimit[i].maxNum).split('.').length>1||Number(this.scoreLimit[i].maxNum) <0){
                        this.$message.info('评分比例必须为正整数')
                        count++
                        return
                    }
                    if(String(this.scoreLimit[i].minNum).split('.').length>1||Number(this.scoreLimit[i].minNum) <0){
                        count++
                        this.$message.info('评分比例必须为正整数')
                        return
                    }
                    // 要求区间上下包含整数，实际区间下包涵上不包含可以达到连续，所以打开小数点使 区间在整数段实现上下包含2022-5-31
                    // if(String(this.scoreLimit[i].minScore).split('.').length>1||Number(this.scoreLimit[i].minScore) <0){
                    //     count++
                    //     this.$message.info('评分必须为正整数')
                    //     return
                    // }
                    // if(String(this.scoreLimit[i].maxScore).split('.').length>1||Number(this.scoreLimit[i].maxScore) <0){
                    //     count++
                    //     this.$message.info('评分必须为正整数')
                    //     return
                    // }
                    if(this.scoreLimit[i].maxScore>=0&&this.scoreLimit[i].minScore>=0){
                        if(this.scoreLimit[i].minNum>=0||this.scoreLimit[i].maxNum>=0){
                            
                        }else{
                            count++
                            this.$message.info('最小比例/最大比例必须填写一个')
                            return
                        }
                     }else{
                        count++
                        this.$message.info('评分上限/评分下限必填')
                        return

                    }


                    maxNums += Number(this.scoreLimit[i].maxNum)
                    scoreArr.push([
                        this.scoreLimit[i].minScore,
                        this.scoreLimit[i].maxScore
                    ])
                }
                
                if(count>0){
                    return
                }
                if(maxNums>this.form.reviewCount){
                    this.$message.info('专家评审次数大于专家评审次数上限')
                    return
                }

                // 而为数组，通过比对前后数据判断评分限制，只写了从大到小，从小到大两种，乱序的没有处理
                let flag1=true,flag2=true
                for(let i in scoreArr){
                    if(parseInt(scoreArr[i][0]) > parseInt(scoreArr[i][1])){
                        return this.$message.info('评分限制填写错误')
                    }
                    if(i>0){
                        // 从大到小
                        if(parseInt(scoreArr[i-1][0]) < parseInt(scoreArr[i][1])){
                            flag1 = false
                        }
                        // 从小到大
                        if(parseInt(scoreArr[i-1][1]) > parseInt(scoreArr[i][0])){
                            flag2 = false
                        }
                    }
                }
                if(!(flag1||flag2)){
                    return this.$message.info('评分限制填写错误')
                }
                this.form.scoreLimits = this.scoreLimit
                this.form.remark = this.form.remark*1
                let save = await network.saveReviewRuleCopy( {data: this.form} )
                if(save=='error') return;
                this.$message.success('保存成功')
                return this.show = false
            })

        },
        
        addId(id){
            let flag = true
           
            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                if(this.form.reviewStandardListDto.reviewStandardList[i].attachId==id){
                    flag = false
                }
            }
            if(!flag) return;

            let name = ""
            for(let i in this.fromAttach){
                if(this.fromAttach[i].attachId==id){
                    name = this.fromAttach[i].attachName
                }
            }
            this.form.reviewStandardListDto.reviewStandardList.push({
                "attachId": id,
                "sort": '',
                "attachName": name,
                "total": 100,
                "weight": '',
                "reviewScores": [
                {
                    "itemId":util.randomChar(12),
                    "title": "",
                    "weight": '',
                    "info": "",
                    "score": '',
                    "options": [ ]
                }
                ],
                "reviewComments": [ ]
            })
            
        },
        delId(id){
            let index = '';
            for(let i in this.form.reviewStandardListDto.reviewStandardList){
                if(this.form.reviewStandardListDto.reviewStandardList[i].attachId==id){
                    index = i;
                }
            }
            if(!index) return;
            this.form.reviewStandardListDto.reviewStandardList.splice(index,1);
        } 
    },
    watch:{
        attach(val,oldval){
            if(this.form.pattern==0) return;
            let attId = '';
            // console.log(val.length-oldval.length)
            if(val.length-oldval.length==1){
                attId = val[val.length-1];
                this.addId(attId)
            }else if(val.length-oldval.length==-1){
                
                for(let i in oldval){
                    if(!val.includes(oldval[i])){
                        attId = oldval[i];
                    }
                }
                this.delId(attId)
            }else{

            }
        }
    }
}
</script>

<style lang='less' scoped>
.setting{
    max-width: 800px;
    position: relative;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0 40px;
    }
    /deep/.el-menu.el-menu--horizontal{
        border-bottom: none;
    }
    .elForm{
        min-width: 600px;
        margin-top: 40px;
        max-width: 800px;
    }
    .block{
        display: block;
    }
    
    .inputNum{
        /deep/.el-input-number.is-controls-right .el-input__inner{
            padding-left: 10px;
            padding-right: 40px;
        }
    }
    .submit{
        display: block;
        margin: 20px auto;
    }
}
</style>