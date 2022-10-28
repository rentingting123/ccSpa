<template>
    <div class="poptip-cons" slot="content">

            <Button :loading="loading" size="small" @click="getScoreDetail">历史评分</Button>
            <el-dialog
                :append-to-body='true'
                :before-close='closeDig'
                :visible.sync="isShow"
                width="60%"
                >
                <div  v-if="isShow">
                    <div class="hisList">
                        <div class="histItem" v-for="(item,index) in expertDetail">
                            <p class="hisTitle">{{item.rowName}}</p>
                            <div class="hisTotal">
                                <span>作品总分</span><span>{{item.total}}</span><span>分</span>
                            </div>
                            <div class="hisTable">
                                <i-table border  :columns="item.hisTable" :data="item.arrAll"></i-table>
                            </div>
                        </div>
                        
                    </div>
                    <div v-if="expertDetail.length==0">
                        <Row>
                            <Col :span="24">
                                <p style="text-align: center;">暂无历史评分数据</p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </el-dialog>
    </div>
</template>
<script>
    export default {
		props:['importData'],
		mounted: function () {
			this.pagedata=this.pageData
			this.show=true;
     	},
	    data(){
	    	return{
                rowData:{},
                isShow:false,
                expertDetail:[],
                visible:false,
                hisTable: [
                    
                ],
                limits: [
                    
                ],
                loading:false
	      	}
        },
		watch:{

		},
        created() {
            this.rowData=this.importData
        },
        methods:{
            closeDig(){
                this.isShow=false;
                this.visible = false
            },
            // scoreClick(){
            //     console.log(this.rowData)
            // },
            getScoreDetail () {
                if (!this.visible) {
                    this.isShow=false;
                    let _this = this
                    let data={
                        poolId:this.rowData.id,
                        
                    }
                    this.loading = true
                    return new Promise((relove,reject)=>{
                        this.$api.get('review/review/historyScore',data).then(reset => {
                            this.loading = false
                            if (reset.code == 0) {
                                this.visible=true;
                                if (reset.data) {
                                    let limits = {}
                                    let reviews = []
                                    
                                    
                                    for(let i = 0;i<reset.data.length;i++){
                                        if(reset.data[i].list==null){
                                            this.expertDetail=[]
                                            this.isShow=true;
                                            return
                                        }
                                        let arrAll = []
                                        let hisArrs = [{
                                            title: '专家姓名',
                                            key: 'expertName',
                                            align:'center'
                                        }]
                                        
                                        reset.data[i].list[0].reviewStandards[0].reviewScores.forEach(ele =>{
                                            hisArrs.push({
                                                title: `${ele.title}(${ele.weight}%)`,
                                                key: ele.itemId,
                                                align:'center'
                                            })
                                        })
                                        hisArrs.push({
                                            title:'总分',
                                            key: 'tolsc',
                                            align:'center'
                                        })
                                        for(let j = 0; j<reset.data[i].list.length;j++){
                                            limits.expertName=reset.data[i].list[j].expertName
                                            for(let k=0;k<reset.data[i].list[j].reviewStandards[0].reviewScores.length;k++){
                                                limits[reset.data[i].list[j].reviewStandards[0].reviewScores[k].itemId] = reset.data[i].list[j].reviewStandards[0].reviewScores[k].score
                                            }
                                            limits.tolsc=reset.data[i].list[j].total
                                            arrAll.push(JSON.parse(JSON.stringify(limits)))
                                        }
                                        reviews.push({
                                            rowName:reset.data[i].rowName,
                                            total:reset.data[i].total,
                                            arrAll:arrAll,
                                            hisTable:hisArrs
                                        })
                                        
                                    }
                                    
                                    
                                    this.expertDetail=reviews

                                    this.isShow=true;
                                }else{
                                    this.expertDetail=[]
                                    this.isShow=true;
                                }

                            }else {
                                _this.$netcode.getApiCode(reset)
                            }
                        })
                    })
                }else{
                    this.visible=false;
                }

            },
       }
    }
</script>
<style scoped lang="less">

    .poptip-cons{
        text-align: center;
        // position: relative;
    }
    .tl{
        line-height: 30px;
    }
    .attach-name{
        display: inline-block;
        overflow: hidden;/*超出部分隐藏*/
        text-overflow:ellipsis;/* 超出部分显示省略号 */
        white-space: nowrap;/*规定段落中的文本不进行换行 */
    }
    .hisList{
        background: #fff;
        padding-bottom: 20px;
    }
    .histItem{
        margin-bottom: 20px;
        .hisTitle{
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid #dedede;
            color: #000;
            padding-left: 12px;
            font-size: 16px;
            font-weight: 600;
            text-align: left;
        }
        .hisTotal{
            color: #000;
            width: 90%;
            height: 70px;
            background: #F9F9F9;
            line-height: 70px;
            padding-left: 160px;
            margin: 0 auto;
            margin-top: 20px;
            span{
                &:nth-child(1){
                    font-size: 14px;
                    color: #4a4a4a;
                    font-weight: 600;
                }
                &:nth-child(2){
                    font-size: 36px;
                    font-weight: 600;
                    color: #0078E2 ;
                    margin-left: 50%;

                }
                &:nth-child(3){}
            }
        }
        .hisTable{
            width: 90%;
            margin: 0 auto;
            margin-top: 20px;
        }

    }
</style>
<style scoped>
.hisTable >>> .ivu-table-cell{
    padding-left: 0;
    padding-right: 0
}
.poptip-cons >>> .ivu-poptip-inner{
    max-height: 800px;
}
.poptip-cons{
    /* position: relative; */
}
.poptip-cons >>> .ivu-table-column-center{
    /* top: 10px !important; */
    font-size: 14px;
}
</style>