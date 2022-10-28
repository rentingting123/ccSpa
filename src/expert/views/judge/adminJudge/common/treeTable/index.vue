<template >
    <Row class="expand-row">
        <span v-for="(score,index) in row.reviewStandardList" :key="index">
            <Col :span="22" v-for="item in score.reviewScores" :key="item.itemId" :offset="1">
                <span class="expand-key">{{item.title}}{{' ( '+item.weight+'% ) '}}: </span>
                <span class="expand-value">{{ item.score }}</span>
            </Col>
        </span>
        <Col :span="22" :offset="1">
            <span class="expand-key">学校: </span>
            <span class="expand-value">{{ row.school }}</span>
        </Col>
        <Col :span="22" :offset="1">
            <span class="expand-key">作品提交时间: </span>
            <span class="expand-value">{{ row.createTime | timeFilters }}</span>
        </Col>
    </Row>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        row: Object
    },
    created(){
        // console.log(this.row);
    },
    filters:{
        timeFilters(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD HH:mm')
        }
    }
}
</script>

<style lang='less' scoped>
.expand-row{
    .ivu-col{
        margin-bottom: 10px;
        font-size: 16px;
        .expand-key{
            display: inline-block;
            font-weight: bold;
        }
        .expand-value{
            display: inline-block;
            margin-left: 5px;
        }
    }
}
</style>