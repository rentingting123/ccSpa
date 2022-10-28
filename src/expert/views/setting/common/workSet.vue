<template>
    <div class="rules">
        <Row>
            <Col span="12">评分标准:</Col>
            <Col span="12">分值</Col>
        </Row>
        <div v-for="(items,index) in form.reviewStandardListDto.reviewStandardList" :key="index">
            <div v-for="(item,i) in items.reviewScores" :key="i" style="margin-top:30px;">
                <Row  style="margin-bottom:10px;">
                    <Col span="11">
                        <el-input placeholder="请输入评分项，如创意分、技术分" v-model="item.title"></el-input>
                    </Col>
                    <Col span="1">&nbsp;</Col>
                    <Col span="4">
                        <el-input placeholder="请输入分值" v-model="item.weight"  @blur="checkSorce(index,i)"></el-input>
                    </Col>
                    <Col span="1" style="line-height: 40px;margin-left:5px;">
                        %
                    </Col>
                    <Col span="2" style="line-height: 40px;text-align:center;">
                        <img src="https://web.moocollege.com/mooc/hzq/competition/competition/删除.svg" class="delreview" @click="delReview(index,i)" />
                    </Col>
                    <Col span="4">&nbsp;</Col>
                </Row>
                <Row>
                    <Col span="19">
                        <el-input placeholder="请输入评分标准说明" :autosize="{ minRows: 2 }" type="textarea" v-model="item.info"/>
                    </Col>
                </Row>
                
                
                <div class="score" >
                    <div class="scoreDetail" v-for="(option,j) in item.options" :key="j">
                        <Row>
                            <Col span="11" class="flex">
                                <span class="num" style="">{{j+1}}.&nbsp;</span>
                                <el-input placeholder="请输入等级:如ABC,优良及" v-model="option.lever"></el-input>
                            </Col>
                            <Col span="1">&nbsp;</Col>
                            <Col span="4">
                                <el-input placeholder="请输入分数" v-model="option.score"></el-input>
                            </Col>
                            <Col span="1" style="line-height: 40px;margin-left:5px;">
                                分
                            </Col>
                            <Col span="2" style="line-height: 40px;text-align:center;">
                                <i class="el-icon-delete" @click="delNorm(index,i,j)"></i>
                            </Col>
                            <Col span="4">&nbsp;</Col>
                        </Row>
                        
                    </div>
                    <div class="add_button" @click="addNorm(index,i)">
                        <i class="iconfont">&#xe62d;</i>
                        <span>增加快捷评分模板</span>
                    </div>
                </div>                  
            </div>

            <div class="add_button review" @click="addReview(index)">
                <i class="iconfont">&#xe62d;</i>
                <span>增加1项评分标准</span>
            </div>
            
            <div class="temp" >
                <p class="totalscore">总分 <span style="margin-left:10px;">{{allsorce}}</span> / 100分</p>
                <div class="tempDateil" v-for="(item,i) in items.reviewComments" :key="i" >
                    <p><span>＊</span>分数区间: </p>
                    <Row>
                        <Col span="4">
                            <el-input placeholder="请输入起始分" v-model="item.minScore"></el-input>
                        </Col>
                        <Col span="1" style="text-align:center;line-height: 40px">~</Col>
                        <Col span="4">
                            <el-input placeholder="请输入截止分" v-model="item.maxScore"></el-input>
                        </Col>
                        <Col span="1" style="line-height: 40px">
                            <el-tooltip class="question" content="当总分在该区间分数时，供评分人选择的预设点评。如填写[0,60]代表大于等于0，小于等于60，显示该分段的评语模板。" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </Col>
                        <Col span="2" style="text-align:center;line-height: 40px;font-size:18px;">
                            <i class="el-icon-delete" @click="delTag(index,i)"></i>
                        </Col>
                    </Row>
                    
                    <p><span>＊</span>点评模板: </p>
                    <div v-for="(mess,j) in item.comments" :key="j">
                        <Row style="margin-bottom: 10px;">
                            <Col span="10">
                                <el-input placeholder="请输入点评" v-model="mess.context"></el-input>
                            </Col>
                            <Col span="2" style="text-align:center;line-height: 40px;font-size:18px;">
                                <i class="el-icon-delete" @click="delComment(index,i,j)"></i>
                            </Col>
                        </Row>
                    </div>
                    <div class="add_button" @click="addComment(index,i)">
                        <i class="iconfont" >&#xe62d;</i>
                        <span>增加1个点评</span>
                    </div>
                </div>

                <div class="add_button" @click="addTag(index)">
                    <i class="iconfont">&#xe62d;</i>
                    <span>新增点评模板</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import util from '@@/utils/util'
export default {
    props: ['form'],
    data(){
        return{
            allsorce:0,  //评审设置的总分值
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.getAllScore()
        })
    },
    methods:{
        getAllScore(){
            var tem = this.form.reviewStandardListDto.reviewStandardList[0].reviewScores
            var arr = 0;
            for(var m=0; m<tem.length; m++){
                arr += parseInt(tem[m].weight)?parseInt(tem[m].weight):0;
            }
            this.allsorce = arr
        },
        /**
         * 判断总百分比分数是否超过一百分
         */
        checkSorce(index,i){
            var tem = this.form.reviewStandardListDto.reviewStandardList[index].reviewScores;
            var arr = 0;
            for(var m=0; m<tem.length; m++){
                arr += parseInt(tem[m].weight)?parseInt(tem[m].weight):0;
            }
            if(arr > 100){
                this.$message({
                    message: '分值百分比总和不能超过100%！',
                    type: 'error'
                });
                tem[i].weight = 0;
                return;
            } 
            if(this.form.pattern==0){
                this.allsorce = arr
            }
        },
        delReview(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores.splice(i,1)
        },
        delNorm(index,i,j){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores[i].options.splice(j,1)
        },
        addNorm(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores[i].options.push({
                lever:'',
                score:''
            })
        },
        addReview(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewScores.push({
                itemId:util.randomChar(12),
                title:'',
                weight:'',
                info:'',
                score:'',
                options:[
                    {
                        lever:'',
                        score:''
                    }
                ]
            })
        },
        delTag(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments.splice(i,1)
        },
        addTag(index){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments.push({
                minScore: null,
                maxScore: null,
                comments: [
                    {
                        context:''
                    }
                ]
            })
        },
        delComment(index,i,j){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments[i].comments.splice(j,1)
        },
        addComment(index,i){
            this.form.reviewStandardListDto.reviewStandardList[index].reviewComments[i].comments.push({
                name:''
            })
        },
    }
}
</script>

<style lang='less' scoped>
.rules{
    min-width: 440px;
    margin: 0 auto;
    padding: 16px 20px 16px 20px;
    background: #fafafa;
    margin-left: 20px;
    
    .delreview{
        cursor: pointer;
    }
    .add_button{
        font-size: 12px;
        color: #1D86FF;
        padding-left: 5px;
        margin: 5px 0;
        cursor: pointer;
    }
    .score{
        background: #ECEAEA;
        margin: 10px 0;
        padding: 8px;
        line-height: 40px;
        .scoreDetail{
            margin-top: 8px;
            .flex{
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            .num{
                margin: 0 5px;
            }
            i{
                font-size: 18px;
                cursor: pointer;
            }
        }
    }
    .review{
        border-bottom: 1px solid #ccc;
        padding: 14px 0;
    }
    .temp{
        padding: 0 5px 14px;
        .totalscore{
            text-align: right;
            line-height: 37px;
        }
        .tempDateil{
            background: #ECEAEA;
            padding: 10px;
            p{
                font-size: 14px;
                color: #4A4A4A;
                margin: 5px 0;
                span{
                    color: red;
                }
            }
            
            .question{
                margin: 0 81px 0 5px;
                font-size: 20px;
            }
        }
    }
    .mintop{
        p{
            line-height: 40px;
            display: inline-block;
        }
        :first-child{
            margin-right: 215px;
        }
    }
}
</style>