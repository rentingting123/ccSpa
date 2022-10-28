<template>
    <div>
      <Modal v-model="show" @on-cancel="cancel" :mask-closable="false" width="950">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>自动分配</span>
            </p>
            <div style="text-align:center" v-if="pattern==1">
                <!-- <p><Icon type="ios-alert" /><span>每次</span></p> -->
                <Tabs type="card" v-model="nameIndex" @on-click='getNumIndex'>
                    <TabPane :label="item.attachName" :name="item.attachId" v-for="(item,index) of patternDataList" :key="index" >
                        <div class="lists">
                            <works @setWorks="setWorks" :attachId='item.attachId' :rowId='rowId' v-if="nameIndex==item.attachId && rowId" />
                            <experts @setExperts="setExperts" :attachId='item.attachId' :rowId='rowId' v-if="nameIndex==item.attachId && rowId" />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
            <div style="text-align:center" v-else>
                <div class="lists">
                    <works @setWorks="setWorks" :rowId='rowId' v-if="rowId"/>
                    <experts @setExperts="setExperts" :rowId='rowId' v-if="rowId"/>
                </div>
            </div>
            <div slot="footer">
                <div class="avoidType">
                    <CheckboxGroup v-model="avoidType">
                        <Checkbox :label="0">同省规避</Checkbox>
                        <Checkbox :label="1">同校规避</Checkbox>
                    </CheckboxGroup>
                </div>
                <Button type="default" @click="cancel">关闭</Button>
                <Button type="primary" @click="handleSubmit" style="margin-left: 15px">提交</Button>
            </div>
            <div v-if="spinShow">
                <Spin fix>
                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    <div>正在分配...</div>
                </Spin>
            </div>
      </Modal>
    </div>
</template>
<script>
    import experts from "./experts"
    import works from './works'
    import {automatic} from '@/common/automatic'
    import network from '@@/utils/network'
    export default {
        props:["importShow", 'rowId', 'competitionId', 'pattern'],
        components:{
            experts,
            works
        },
        data () {
            return {
                nameIndex:'',
                objData:{},
                patternDataList:[],//评审附件
                idList:[],//选择专家
                worksList: [], //选择作品
                numIndex:0,
                spinShow:false,
                avoidType: [], //同校规避1 同省规避0
            }
        },
        created() {
            this.show=this.importShow
            this.avoidType = this.$store.state.common.patternData.avoidType || []
            this.patternDataList=this.$store.state.common.patternData.reviewStandardListDto.reviewStandardList
            this.nameIndex=this.patternDataList[this.numIndex].attachId
            this.scoreNum = this.$store.state.common.patternData.scoreNum
            this.getSameSchoolData();
        },
        methods: {
            async getSameSchoolData() {
                const { keyToSchool = {}, sameSchoolList = {} } = await network.node('get/school/alias');
                this.keyToSchool = keyToSchool;
                this.sameSchoolList = sameSchoolList;
            },
            cancel () {
                this.show=false;
                this.$emit('exportData',{show:false,isSure:false})
            },
            handleSubmit (name) {
                this.spinShow=true
                if(!this.worksList || this.worksList && this.worksList.length<1){
                     this.spinShow = false
                    return this.$Message.warning({
                        content: '请至少选择一个作品',
                        duration: 3
                    })
                }
                if(!this.idList || this.idList && this.idList.length<1){
                     this.spinShow= false
                    return this.$Message.warning({
                        content: '请至少选择一个专家',
                        duration: 3
                    })
                }

                this.post()
                // 20201216 不知道之前为什么至少要选择2个专家，暂时隐藏
                // if (this.pattern==1) {
                //     if (this.idList.length>1) {
                //         this.post()
                //     }else{
                //         this.$Message.warning({
                //             content:"请至少选择两个专家",
                //             duration:3
                //         })
                //     }
                // }else{
                //     this.post()
                // }
            },
           async post (e) {

                //处理分配数据
                console.log('数据处理开始：',new Date().getTime())
                let _this = this;

                // 同校规避
                function getAvoidId(item, e, _avoidType) {
                    if (_avoidType !== 1) return null;
                    if (item.school == e.school) {
                        return e.id;
                    }
                    // 对于实际属于同一个学校但是学校名字不同的数据做处理
                    if (Object.keys(_this.sameSchoolList).indexOf(item.school) >= 0) {
                        let schoolId = _this.sameSchoolList[item.school];
                        if (_this.keyToSchool[schoolId].indexOf(e.school) >= 0) {
                            return e.id;
                        }
                    }

                    return null;
                }

                console.log('workListDetail', this.workListDetail)
                console.log('expertList', this.expertList)
                let work = this.workListDetail.map(item=>{
                    let avoid=[]
                    //这里会消耗大量的时间
                    if(this.avoidType.length>0){
                        let _avoidType = this.avoidType.indexOf(0) > -1 ? 0 : 1
                        this.expertList.map(e=>{
                            //同省规避 提到外面可以减少一般计算时间
                            if(item.province == e.province&&_avoidType==0)avoid.push(e.id)

                            let avoidId = getAvoidId(item, e, _avoidType);
                            avoidId && avoid.push(avoidId);

                            // if (_avoidType == 1) {
                            //     if (item.school == e.school) {
                            //         avoid.push(e.id);
                            //     } else if (Object.keys(sameSchoolList).indexOf(item.school) >= 0) {
                            //         let schoolId = sameSchoolList[item.school];
                            //         if (keyToSchool[schoolId].indexOf(e.school) >= 0) {
                            //             avoid.push(e.id)
                            //         }
                            //     }
                            // }
                            // //同校规避
                            // if(item.school == e.school&&_avoidType==1){
                            //     avoid.push(e.id)
                            // }

                        })
                    }
                    return {name:item.title,avoid:avoid,id:item.id}
                })
                // console.log('work',this.workListDetail)

                // console.log('expert',this.expertList)

                 console.log(this.scoreNum,this.avoidType)

              let rest = await automatic(work,this.idList,this.scoreNum)
                //计算分配结果
                if(rest == 'error'){
                   this.spinShow=false
                   this.$Message.error("请增加参与专家数量或减少单个作品评审次数!")
                }

                var data={
                    distributionList: rest.map(item=>({
                        poolId:item.id,
                        specialistIds:item.expert
                    })),
                    rowId: this.rowId,
                    pattern: this.pattern,//0：按作品 1：按附件
                }

                if (this.pattern==1){
                    data.attachId=this.nameIndex
                }

                this.$api.post('review/specialist/newDistribution',data).then(reset => {
                    if (reset.code == 0) {
                        this.spinShow=false
                        this.$Message.success("分配成功!")
                        if(this.pattern==1){
                            if (this.numIndex<this.patternDataList.length-1) {
                                this.numIndex=this.numIndex+1
                                this.nameIndex=this.patternDataList[this.numIndex].attachId
                            }else{
                                this.show=false;
                                this.$emit('exportData',{show:false,isSure:true})
                            }
                        }else if(this.pattern==0){
                            this.show=false;
                            this.$emit('exportData',{show:false,isSure:true})
                        }

                    }else {
                        this.spinShow=false
                        this.$emit('exportData',{show:false,isSure:true})
                        this.$netcode.getApiCode(reset)
                    }
                })


            },
            // 选择专家
            setExperts(e){
                this.idList=e.data;
                this.expertList = e.selectObj
            },
            setWorks(e){
                this.worksList = e.data
                this.workListDetail = e.selectObj
            },
            getNumIndex(e){
                for(let i in this.patternDataList){
                    if(this.patternDataList[i].attachId==e){
                        this.numIndex = i
                    }
                }
            },
        }
    }
</script>

<style lang="less" scoped>
.lists{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.avoidType{
    display: inline-block;
    vertical-align: middle;
    margin-right: 15px;
    width: auto;
    height: 30px;
    background: #EEF0F4;
    border-radius: 15px;
    line-height: 30px;
    text-align: center;
    padding: 0 10px;
}
</style>
