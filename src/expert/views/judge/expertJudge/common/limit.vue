<template>
    <div class="limit">
        <div class="limiticon">
            <!-- 20210427 为 法律职业能力竞赛征文类比赛 -->
            <Button type="primary" class="red" @click="showLimit">评分限制</Button>
            <Button type="primary" class="red" @click="showpdf" v-if="$webapi.getlocal('compId')=='4885'" style="margin-left: 10px">评审须知</Button>
        </div>

        <div class="limitShow" v-if="show">
            <span class="close" @click="show=false">
               <Icon type="md-close" />
            </span>
            <i-table border maxHeight="200" v-if="limits && limits.length>0" :columns="columns1" :data="limits"></i-table>

            <div class="form">
                <p>
                    <span class="first">需评审作品</span>
                    <span class="last">{{scoreObj.allReviewNum || 0}}个</span>
                </p>
                <p>
                    <span class="first">已评审</span>
                    <span class="last">{{scoreObj.reviewedNum || 0}}个</span>
                </p>
                <p>
                    <span class="first">未评审(包含未审核)</span>
                    <span class="last">{{(scoreObj.allReviewNum - scoreObj.reviewedNum) || 0}}个</span>
                </p>
                <p>
                    <span class="first">未审核</span>
                    <span class="last">{{scoreObj.uncheckedNum || 0}}个</span>
                </p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: ['rowId'],
    data(){
        return{
            show: false,
            scoreObj: '',
            columns1: [
                {
                title: "评分限制",
                key: "rang",
                align: "center",
                },
                {
                title: "最少次数",
                key: "minNum",
                align: "center",
                },
                {
                title: "最多次数",
                key: "maxNum",
                align: "center",
                },
                {
                title: "已评次数",
                key: "num",
                className: "demo-table-info-column",
                align: "center",
                },
            ],
            limits: [],
        }
    },
    created(){
        // this.showLimit();
    },
    methods:{
        isShow(){
            this.show = true
            this.getLimit();
        },
        //获取评分限制
        getLimit() {
            var data = {
                rowId: this.rowId,
            };
            this.$api.get("review/review/expert/getScoreLimit", data).then((res) => {
                if (res.data) {
                    let arr = [];
                    if (res.data.scoreLimit) {
                        res.data.scoreLimit.forEach((ele) => {
                            arr.push({
                                rang: `${ele.minScore}(含)~${ele.maxScore}`,
                                minNum: ele.minNum,
                                maxNum: ele.maxNum,
                                num: ele.num,
                            });
                        });
                    }
                    this.scoreObj = res.data;
                    this.limits = arr;
                }
            });
        },
        showLimit(){
            if(!this.show){
                this.getLimit();
            }
            this.show = !this.show
        },
        showpdf(){
            window.open('https://web.moocollege.com/mooc/1.pdf')
        }
    },
    watch:{
        rowId(val){
            if(!val) return;
            this.isShow();
        }
    }
}
</script>

<style lang='less' scoped>
.limit{
    position: relative;
    display: inline-block;
    vertical-align: top;
    z-index: 9;
    .red{
        background: red;
    }
    .limitShow{
        width: 440px;
        height: auto;
        padding: 25px;
        background: #ffffff;
        box-shadow: 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12);
        position: absolute;
        top: 34px;
        left: 0;
        .close{
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 20px;
            cursor: pointer;
        }
        .form{
            margin-top: 10px;
            background: #F9F9F9;
            color: #000000;
            padding: 30px;
            font-size: 16px;
            p{
                margin: 10px 0;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                .first{
                    margin-right: 20px;
                }
            }
        }
        /deep/.ivu-form .ivu-form-item-label{
            text-align: left;
        }
    }
}
</style>
