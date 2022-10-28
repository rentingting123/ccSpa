<template>
    <div class="poptip-con" slot="content">
        <Poptip placement="right" width="320">
            <Button @click="getScoreDetail">{{rowData.score}}</Button>
            <div class="poptip-cir" slot="content" v-if="isShow">
                <div v-if="pattern==1 && expertDetail.length>0">
                    <div v-for="(item,index) in expertDetail" :key="index">
                        <Row v-for="(it,ind) in item.detail" :key="ind">
                            <Col :span="13" class="attach-name tl">
                                {{item.attachName}}
                            </Col>
                            <Col :span="8" class="tl">
                                ({{it.name}})
                            </Col>
                            <Col :span="3" class="tl">
                                {{it.score}}
                            </Col>
                        </Row>
                    </div>
                </div>
                <div v-if="pattern==0 && expertDetail.length>0">
                    <Row>
                        <Col :span="12" v-for="(item,index) in expertDetail" :key="index" class="tl">
                            <span style="margin-right:10px;width: 80px;display: inline-block;">{{item.name}}</span>
                            <span>{{item.score}}</span>
                        </Col>
                    </Row>
                </div>
                <div v-if="expertDetail.length==0">
                    <Row>
                        <Col :span="24">
                            <p>暂无分配专家</p>
                        </Col>
                    </Row>
                </div>
            </div>
        </Poptip>
    </div>
</template>
<script>
    export default {
		props:['importData', 'competitionId', 'rowId', 'pattern'],
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
	      	}
        },
		watch:{

		},
        created() {
            this.rowData=this.importData
        },
        methods:{
            // scoreClick(){
            //     console.log(this.rowData)
            // },
            getScoreDetail () {
                if (!this.visible) {
                    this.isShow=false;
                    let _this = this
                    let data={
                        poolId: this.rowData.id,
                        competitionId: this.competitionId,
                        pattern: this.pattern,
                        rowId: this.rowId
                    }
                    return new Promise((relove,reject)=>{
                        this.$api.post('/review/review/distributionExpert',data).then(reset => {
                            if (reset.code == 0) {
                                this.visible=true;
                                if (reset.data) {
                                    this.expertDetail=reset.data
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
<style scoped lang='less'>
    .poptip-con{
        text-align: center;
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
</style>
