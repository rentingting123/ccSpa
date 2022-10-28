<template>
    <div class="limiTable" >
        <Row>
            <Col span="4">下限 (分)</Col>
            <Col span="2">&nbsp;</Col>
            <Col span="4">上限 (分)</Col>
            <Col span="2">&nbsp;</Col>
            <Col span="4">最小比例 (%)</Col>
            <Col span="2">&nbsp;</Col>
            <Col span="4">最大比例 (%)</Col>
            <Col span="2">&nbsp;</Col>
        </Row>
        <p>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </p>
        <li v-for="(item,index) in scoreLimit"  :key="index">
            <Row>
                <Col span="4">
                    <el-input class="limitInput" size="small" type="number" v-model="item.minScore" ></el-input>
                </Col>
                <Col span="2" class="center">&nbsp;~&nbsp;</Col>
                <Col span="4">
                    <el-input class="limitInput" size="small" type="number" v-model="item.maxScore" ></el-input>
                </Col>
                <Col span="2">&nbsp;&nbsp;&nbsp;</Col>
                <Col span="4">
                    <el-input class="limitInput" size="small" type="number" v-model="item.minNum" ></el-input>
                </Col>
                <Col span="2" class='center'>&nbsp;~&nbsp;</Col>
                <Col span="4">
                    <el-input class="limitInput" size="small" type="number" v-model="item.maxNum" ></el-input>
                </Col>
                <Col span="2" class="center">
                    <i class="iconfont" style="cursor: pointer;" @click="delLimit(index)">&#xe61e;</i>
                </Col>
            </Row>
        </li>
        <div class="add_button" @click="addLimit">
            <i class="iconfont">&#xe62d;</i>
            <span>增加评分限制</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['scoreLimit'],
    data(){
        return{
            
        }
    },
    methods:{
        delLimit(index){
            this.scoreLimit.splice(index,1)
        },
        addLimit(){
            this.scoreLimit.push({
                "minScore":'',
                "maxScore":'',
                "minNum":'',
                "maxNum":''
            })
        },

    }
}
</script>

<style lang='less' scoped>
.limiTable{
    margin-left: 54px;
    background: #FAFAFA;
    padding: 20px 18px;
    p{
        font-family: PingFang-SC-Bold;
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
        margin-bottom: 10px;
        span{
            &:nth-child(1){
                margin-left: 8px;
            }
            &:nth-child(2){
                margin-left: 65px;
            }
            &:nth-child(3){
                margin-left: 54px;
            }
            &:nth-child(4){
                margin-left: 38px;
            }
        }
    }
    li{
        list-style: none;
        margin-top: 10px;
        span{
            &:nth-child(1){}
            &:nth-child(2){
                // margin-left: 10px;
            }
            &:nth-child(3){
                margin-left: 16px;
            }
            &:nth-child(4){
                margin-left: 10px;
            }
        }
        .center{
            text-align: center;
            line-height: 32px;
        }
        .limitInput{
            // width: 60px;
            // margin-right: 5px;
            /deep/.el-input__inner{
                padding: 0 0 0 15px
            }
        }
        
    }
    .add_button{
        font-size: 12px;
        color: #1D86FF;
        padding-left: 5px;
        margin: 5px 0;
        cursor: pointer;
        background: #ECEAEA;
        padding: 8px 0;
        padding-left: 8px;
        margin-top: 10px;
    }
}
</style>