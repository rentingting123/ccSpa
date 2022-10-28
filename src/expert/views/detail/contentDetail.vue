<template>
    <div class="content-wrap">
        <div class="mb content-header">
            <span @click="backRoute" class="pointer">返回</span>
            <span style="float:right;color:#409DF0;background-color:#E5F2FF;padding:3px 10px;border-radius: 5px;">作品编号:{{objectId}}</span>
            <span style="float:right;color:#FFE3B5;background-color:#FF4D00;padding:3px 10px;margin-right:10px;border-radius: 5px;" v-if="poolGroupName">
                抽签分组: {{poolGroupName}}<span>({{poolSort}})</span>
            </span>
        </div>
        <div class="mb" v-if="objectInfo.title||objectInfo.description||objectInfo.thunbnail">
            <Card :bordered="false" class="card-wrap" style="padding:15px;">
                <div :class="{'img-wrap':objectInfo.thunbnail}">
                    <img :src="objectInfo.thunbnail" alt="" v-if="objectInfo.thunbnail">
                </div>
                <div class="text-wrap">
                    <h3 v-if="!((groupId==-1)&&competitorShow)">
                        {{objectInfo.title}}
                        <small v-if="objectInfo.titleEn"> {{objectInfo.titleEn}}</small>
                    </h3>
                    <h3 v-else>匿名</h3>
                    <p>{{objectInfo.description}}</p>
                </div>
            </Card>
        </div>
        <div class="mb" v-if="!((groupId==-1)&&competitorShow)">
            <Card :bordered="false" class="card-wrap">
                <div class="card-title">{{groupInfo.groupName}}</div>
                <!-- <div class="card-content text-wrap" v-for="(item, index) in groupHeader" :key="index">
                    <Row>
                        <div class="mb">
                            <h4><span style="color:#5FF88F"> ● </span>{{item.roleName}}</h4>
                        </div>
                        <Col :span="24" style="padding-left:30px;">
                            <div class="demo-avatar">
                                <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" />
                            </div>
                            <div class="">
                                <h4>
                                    <span v-if="(groupId==-1)&&competitorShow">匿名</span>
                                    <span v-else>{{item.name}}</span>
                                    <span> / {{item.roleName}}</span>
                                </h4>
                                <p>{{item.college}}</p>
                                <p><span>{{item.academy}}</span><span v-if="item.academy">·</span><span>{{item.major}}</span></p>
                            </div>
                        </Col>
                    </Row>
                </div> -->
                <div class="card-content text-wrap">
                    <!-- <div> -->
                        <div class="mb">
                            <h3><span style="color:#5FF88F"> ● </span>指导老师</h3>
                        </div>
                        <Row class="member-wrap">
                            <Col :span="8" class="mb" v-for="(item, index) in groupHeader" :key="index">
                                <div class="demo-avatar-team-img">
                                    <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png"/>
                                </div>
                                <div class="demo-avatar-team-txt">
                                    <h4>
                                        <span v-if="(groupId==-1)&&competitorShow">匿名</span>
                                        <span v-else>{{item.name}}</span>
                                        <span> / {{item.roleName}}</span>
                                    </h4>
                                    <p>{{item.college}}</p>
                                    <p><span>{{item.academy}}</span><span v-if="item.academy">·</span><span>{{item.major}}</span></p>
                                </div>
                            </Col>
                        </Row>
                        <template v-if="componyTeacher.length>0">
                            <div class="mb">
                                <h3><span style="color:#5FF88F"> ● </span>企业导师</h3>
                            </div>
                            <Row class="member-wrap">
                                <Col :span="8" class="mb" v-for="(item, index) in componyTeacher" :key="index">
                                    <div class="demo-avatar-team-img">
                                        <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png"/>
                                    </div>
                                    <div class="demo-avatar-team-txt">
                                        <h4>
                                            <span v-if="(groupId==-1)&&competitorShow">匿名</span>
                                            <span v-else>{{item.name}}</span>
                                            <span> / {{item.roleName}}</span>
                                        </h4>
                                        <p>{{item.college}}</p>
                                        <p><span>{{item.academy}}</span><span v-if="item.academy">·</span><span>{{item.major}}</span></p>
                                    </div>
                                </Col>
                            </Row>
                        </template>
                        <div class="mb">
                            <h3><span style="color:#5FF88F"> ● </span>队长</h3>
                        </div>
                        <Row class="member-wrap">
                            <Col :span="8" class="mb" v-for="(item, index) in groupLeader" :key="index">
                                <div class="demo-avatar-team-img">
                                    <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png"/>
                                </div>
                                <div class="demo-avatar-team-txt">
                                    <h4>
                                        <span v-if="(groupId==-1)&&competitorShow">匿名</span>
                                        <span v-else>{{item.name}}</span>
                                        <span> / {{item.roleName}}</span>
                                    </h4>
                                    <p>{{item.college}}</p>
                                    <p><span>{{item.academy}}</span><span v-if="item.academy">·</span><span>{{item.major}}</span></p>
                                </div>
                            </Col>
                        </Row>
                        <div class="mb">
                            <h3><span style="color:#5FF88F"> ● </span>团队成员</h3>
                        </div>
                        <Row class="member-wrap">
                            <Col :span="8" class="mb" v-for="(item, index) in groupMembers" :key="index">
                                <div class="demo-avatar-team-img">
                                    <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png"/>
                                </div>
                                <div class="demo-avatar-team-txt">
                                    <h4>
                                        <span v-if="(groupId==-1)&&competitorShow">匿名</span>
                                        <span v-else>{{item.name}}</span>
                                        <span> / {{item.roleName}}</span>
                                    </h4>
                                    <p>{{item.college}}</p>
                                    <p><span>{{item.academy}}</span><span v-if="item.academy">·</span><span>{{item.major}}</span></p>
                                </div>
                            </Col>
                        </Row>
                    <!-- </div> -->
                </div>
            </Card>
        </div>
        
        <!-- B站展示 -->
        <bvideo :objectInfo='objectInfo' v-if="objectInfo && objectInfo.outsideType==1" />

        <div class="mb" v-if="isTopic">
            <h2 style="font-size:18px;padding-left:15px;">赛题</h2>
            <p style="padding:16px;">{{topicName || '-'}}</p>
        </div>

        <div class="mb" v-if="objectInfo.infoObj">
            <h2 style="font-size:18px;padding-left:15px;" v-if="objectInfo.infoObj&&objectInfo.infoObj.content">介绍</h2>
            <!-- {{objectInfo.infoObj.content}} -->
            <p style="padding:16px;">{{objectInfo.infoObj&&objectInfo.infoObj.content}}</p>
            <h3 style="padding:15px;font-size:18px;" v-if="objectInfo.tagsList && objectInfo.tagsList.length>0">{{objectInfo && objectInfo.workKeyword || '作品关键词'}}</h3> 
            <div style="padding:15px;">
                <span v-for="(item,index) of objectInfo.tagsList" :key="index" class="span-button">{{item.tagname}}</span>
            </div>
        </div>
        <div class="mb">
            <h2 style="font-size:18px;padding-left:15px;padding-bottom:20px;">附件</h2>
            <div v-for="(items,index) of attachList" :key="index" v-if="(pattern==0) || (groupId!=-1)|| (attachId==items.attachId)">
                <p style="padding-left:15px;padding-bottom:16px;" v-if="items.attachName">附件名称: <span>{{items.attachName}}</span></p>
                <div style="padding-left:15px;" v-for="(item,i) of items.fileList" :key="item.name">
                
                    <a @click="loadpdf(index, i, !item.loadpdf)" v-if="item.name" :id="'pdfid'+index+i" >{{item.type==2||item.type==1?'点击展开':''}}作品附件:
                        <a>
                            <span v-if="!((groupId==-1)&&competitorShow)">{{item.name}}</span>
                            <span v-else>*****</span>
                            <Icon v-if="item.loadpdf||item.type==2||item.type==1" type="md-arrow-dropright" />
                            <Icon v-else type="md-arrow-dropdown" />
                        </a>
                        <!-- <span v-if="item.type==1" style="font-size:12px;color:red;margin:0 5px;">(无法加载时建议下载后查看)</span> -->
                        <a style="font-size:22px; display:inline-block" @click="promiseDownLoad(item.url)" href="javascript:;"  @click.stop="" v-show="item.type!=5" v-if="downPerm!=2&&item.type!=4">
                            下载
                            <Icon v-show="item.type!=5" type="ios-download-outline" />
                            <br>                            
                            <span class="loading"  v-loading="loading"></span>
                        </a>
                        <!-- 压缩包 不挂是否设置可下载都允许被下载 -->
                        <!-- <br v-if="item.type==5"> -->
                        <!-- <img style="width:240px;" v-if="item.type==5" src="https://web.moocollege.com/mooc/Group3_11:24:15_b17df24eb2bb884b01b2f7e0b7cadde2.png" alt=""> -->
                        <br v-if="item.type==5">
                        <span v-if="item.type==5" style="font-size:12px;color:red;margin:0 5px;">(有文件无法加载时建议下载后查看)</span>
                        <!-- <span style="text-align: center;width: 240px;display: inline-block;" v-if="item.type==5">该文件不支持在线浏览</span> -->
                        <br>
                        <a style="text-align: center;width: 240px;display: inline-block;font-size:18px;color:#1A99F9;" @click="promiseDownLoad(item.url)" href="javascript:;"   v-if="item.type==5" >点击下载</a>
                        
                        <a style="font-size:18px;color:#1A99F9;display: inline-block;" :href="'http://'+ item.url" target="_Blank" v-if="downPerm!=2 &&item.type==4" >{{item.url}}</a>
                    </a>

                    <img style="max-width:900px;cursor:pointer;" 
                    @click="reviewFullImg(item.url)"
                    title="点击查看原图"
                    v-if="item.type==3" :src="item.url+'!expert'"  alt="点击查看原图">
                    <!-- 文件价值插件不负责加载图片 -->
                    <FileReview v-if="item.type!=3"  v-show="item.loadpdf"  :url="item.url" :index="i" />
                </div>
                <div class="page-divider page-divider-horizontal" v-if="items.attachName"></div>
            </div>

        </div>
        <div class="mb" v-if="groupId!=-1">
            <h2>评审</h2>
            <div>
                <Row>
                    <Col :span="11" :offset="1" v-for="(item,index) of reviewData" :key="index" style="min-width:370px;margin-bottom:15px;position:relative;">
                        <Card :bordered="false" class="card-wrap" style="padding:15px;">
                            <div class="demo-avatar judge-img">
                                <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" />
                            </div>
                            <div class="text-wrap judge-text">
                                <!-- <h3 v-if="raterShow">匿名</h3> -->
                                <h3>{{item.expertName}}</h3>
                                <p>{{item.jobTitle || '学校'}}</p>
                            </div>
                            <div class="coll-bor">
                                <Collapse simple>
                                    <Panel name="1">
                                        <p style="display:inline-block;width:90%;">
                                            <span>得分</span>
                                            <span style="float:right;">{{item.total}}分 / 100分</span>
                                        </p>
                                        <div slot="content">
                                            <p style="background-color:#F9F9F9;padding:10px;" class="mb">
                                                <span>点评 : </span>
                                                <span v-if="item.comment">{{item.comment}}</span>
                                            </p>
                                            <div v-for="(cells,num) of item.reviewStandards">
                                                <h4 v-if="item.reviewStandards.length>1">{{cells.attachName}}({{cells.weight}}%)</h4>
                                                <p style="display:inline-block;width:90%;padding-left:5%;" class="mb" v-for="(cell,number) of cells.reviewScores" :key="cell.itemId">
                                                    <span>{{cell.title}}({{cell.weight}}%)</span>
                                                    <span style="float:right;">{{cell.score}}分 / 100分 </span>
                                                </p>
                                                <div class="img-cell-wrap" v-for="(its,index) of cells.pictureList" :key="index">
                                                    <div v-for="(it, ind) in its.pictureUrl" :key="ind" @click="handleView(it)">
                                                        <img :src="it" alt="图片">
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- 违规 -->
                                            <p style="background-color:#F9F9F9;padding:10px;" class="mb" v-if="item.reportInstructions">
                                                <span>违规意见 : </span>
                                                <span >{{item.reportInstructions}}</span>
                                            </p>
                                            <div class="img-cell-wrap1 " >
                                                <img @click="bigimg(its)" :src="its" alt="图片" v-for="(its,index) of item.reportInfo" :key="index">
                                            </div>

                                            <Button v-if="item.status==5" @click="backtoExpert(item)" type="primary" style="width:100%">违规撤回</Button>

                                        </div>
                                    </Panel>
                                </Collapse>
                            </div>
                        </Card>
                        <!-- <span class="statusposition" v-if="item.status==5">已违规</span> -->
                        <span class="statusposition" v-if="item.illegalStatus==1">已违规</span>
                    </Col>
                </Row>
            </div>
        </div>
        <div>
            <Modal v-if="false" title="查看图片" v-model="visible" @on-cancel="cancel">
                <div class="">
                    <img :src="viewUrl" v-if="visible" style="width: 100%">
                </div>
                <div slot="footer">

                </div>
            </Modal>
        </div>
        <el-dialog
  title=""
  :visible.sync="dialogVisible"
  width="800px">
  <img style="width: 100%;" :src="imgurl" alt="">
</el-dialog>
    </div>
</template>
<script>
    import FileReview from '@@/components/fileReview';
    import bvideo from './common/bvideo'
    export default{
        components:{
            FileReview,
            bvideo,
        },
        data(){
            return {
                dialogVisible:false,
                imgurl:'',
                objectId:"",
                objectInfo:{},
                groupInfo:{},
                groupMembers:[],//团队成员
                groupLeader:[],//领队
                groupHeader:[],//指导老师
                componyTeacher:[],//企业导师
                groupId:this.$webapi.getlocal("groupId"),
                attachList:[],//作品列表
                pattern: 0,
                reviewData:[],//评审数据
                downPerm:0,//// 0：评审人员 1任何人 2不可下载
                competitorShow:false,//参赛选手是否匿名 reviewConceal数组中存在0
                raterShow:false,//评分者是否匿名 reviewConceal数组中存在1
                scoreShow:false,//分数是否保密 reviewConceal数组中存在2
                worksShow:false,//该时间段是否公开参赛作品 reviewConceal数组中存在3,
                loading:false,
                visible:false,//图片放大
                viewUrl:'',//放大图片地址
                isTopic: false, //赛题是否显示
                topicName: '', //赛题内容
                poolGroupName: null,
                poolSort: null,
            }
        },
        computed:{
            attachId(){
                return this.$store.state.detail.attachId
            }
        },
        created(){
            this.loading=true;
            this.objectId=Base64.decode(this.$route.query.id)
            this.pattern = this.$route.query.pattern || 0
            this.list();
            this.getGroup()
            var reviewConceal=this.$store.state.common.patternData.reviewConceal
            if(reviewConceal){
                if(reviewConceal.indexOf(0)>=0){
                this.competitorShow=true
                }
                if(reviewConceal.indexOf(1)>=0){
                    this.raterShow=true
                }
                if(reviewConceal.indexOf(2)>=0){
                    this.scoreShow=true
                }
                if(reviewConceal.indexOf(3)>=0){
                    this.worksShow=true
                }
            }

        },
        mounted(){
            
            //2022-6-1黄昭要求放开对状态的配置
            // if(this.$route.query.reviewStatus==2||this.$route.query.reviewStatus==3){
                this.getReview()
            // }
            this.downPerm=this.$store.state.common.patternData.downPerm
        },
        methods:{
            bigimg(url){
                this.dialogVisible = true
                this.imgurl = url
            },
            loadpdf(i, j, flag){
                for(let m in this.attachList){
                    for(let n in this.attachList[m].fileList){
                        this.$set(this.attachList[m].fileList[n], 'loadpdf', false)
                    }
                }
                this.$set(this.attachList[i].fileList[j], 'loadpdf', flag)
                this.$nextTick(()=>{
                    location.href = "#pdfid"+i+j;
                })
            },
            backtoExpert(item){
                this.$api.get('/review/resource/delPoolReportInfo',{
                    userId: item.userId,
                    poolId: item.poolId
                }).then(res=>{
                    if(res.code == 0){
                        this.$Message.success('操作成功');
                        this.getReview()
                    }else{
                        this.$netcode.getApiCode(res)
                    }
                })
            },
            promiseDownLoad(url){
                //window.open(url)
                 let aLink = document.createElement('a');
                 aLink.href = url
                 aLink.target="_Blank"
                 aLink.click();
            },
            list () {
                let _this = this
                this.$api.get('review/resource/pool/'+this.objectId,null).then(reset => {
                    this.loading=false;
                    if (reset.code == 0) {
                        this.objectInfo=reset.data
                        let _attachList=reset.data.infoObj.attachList
                        //把所有的作品链接做一次encodeURL以免明文暴露地址泄漏信息 todo:urlencodeUtil
                        this.attachList = _attachList
                        // this.attachList = _attachList.map(item=>{
                        //     item.fileList = item.fileList.map(_f=>{
                        //         _f.url = encodeURI(_f.url)
                        //         return _f
                        //     })
                        //     return item
                        // })

                        this.isTopic = reset.data.isTopic ? true : false
                        this.topicName = reset.data.topicName || ''

                        this.poolGroupName = reset.data && reset.data.poolGroupName || null 
                        this.poolSort = reset.data && reset.data.poolSort || null 
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            reviewFullImg(url){
                window.open(url)
            },
            // 评审列表
            getReview(){
                let _this = this
                var data={
                    poolId:Base64.decode(this.$route.query.id)
                }
                this.$api.post('/review/review/expert/list',data).then(reset => {
                    if (reset.code == 0) {
                        this.reviewData=reset.data
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            getGroup () {
                let _this = this
                this.groupMembers=[]
                this.groupLeader=[]
                this.groupHeader=[]
                this.componyTeacher=[]
                this.$api.get('review/resource/pool/'+this.objectId+'/team',null).then(reset => {
                    if (reset.code == 0) {
                        this.groupInfo=reset.data
                        this.groupInfo.members.forEach((val)=>{
                            if (val.roleName=="团队成员") {
                                this.groupMembers.push(val)
                            }else if(val.roleName=="队长"){
                                this.groupLeader.push(val)
                            }else if(val.roleName=="指导老师"){
                                this.groupHeader.push(val)
                            }else if(val.roleName=='企业导师' || val.roleName=='企业老师'){
                                this.componyTeacher.push(val)
                            }
                        })
                        // this.groupMembers=this.groupInfo.members
                    }else {
                        _this.$netcode.getApiCode(reset)
                    }
                })
            },
            //返回
            backRoute(){
                let query = {}
                // if(this.$route.query.groupSort){
                //     query.groupSort = this.$route.query.groupSort
                // }
                // if(this.$route.query.searchValue){
                //     query.searchValue = this.$route.query.searchValue
                // }
                // this.$router.push({path: "/expert/judge", query: query})
                this.$router.go(-1)
            },
            // 下载作品 2021.5.1发现有加密下载方式
            loadClick(e){
                window.location.href="/web/oss/download?url="+e.url
            },
            // 放大图片
            handleView(ur){
                this.visible=true;
                this.viewUrl=ur;
            },
            cancel () {
                this.visible=false;
                this.viewUrl='';
            },
        }
    }
</script>
<style lang="less" scoped>
    @fontSize:10px;
    .content-wrap{
        min-width: 680px;
        background-color: #fff;
        padding:15px 15px 0px;
        font-size: 1.8*@fontSize;
    }
    .card-wrap{
        overflow: hidden;
        padding-bottom: 15px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        border-color: #eee;
    }
    .content-header{
        font-size: 1.6*@fontSize;
    }
    .member-wrap{
        margin-top: 15px;
    }
    .img-wrap{
        float: left;
        clear: both;
        height:180px;
        margin-right:15px;
        img{
            height: 100%;
        }
    }
    .img-cell-wrap img{
        width: 100px;
        height: 100px;
        margin-right:10px;
        margin-bottom:10px;
    }
    .img-cell-wrap1 {
        text-align: center;
        line-height: 150px;
        img{
            max-width: 150px;
            max-height: 150px;
            margin-bottom:10px;
            margin-right:10px;
        }
    }
    .card-title{
        background: url(https://web.moocollege.com/mooc/hzq/competition/user_center/team_detail.png) no-repeat 0 0;
        // width: 100%;
        height: 80px;
        line-height: 80px;
        text-indent: 50px;
        color: #fff;
        font-size: 2.4*@fontSize;
    }
    .card-content{
        padding:15px;
    }
    // 成员介绍
    .demo-avatar{
        float: left;
        clear: both;
        margin-right:15px;
        width:80px;
        height:80px;
        overflow: hidden;
        border-radius: 40px;
        img{
            height: 100%;
        }
    }
    // 成员介绍
    .demo-avatar-team-img{
        float: left;
        clear: both;
        margin-right:15px;
        width:50px;
        height:50px;
        overflow: hidden;
        border-radius: 40px;
        img{
            height: 100%;
        }
    }
    .demo-avatar-team-txt{
        margin-left:62px;
    }
    .span-button{
        padding:15px;
        background-color: #2D8CF0;
        border-radius: 30px;
        color:#fff;
        margin-right:15px;
        margin-bottom:15px;
        display: inline-block;
    }
    .judge-img{
        height: 60px;
        width:60px;
    }
    .judge-text{
        line-height: 30px;
    }

    .statusposition{
        position: absolute;
        top: -10px;
        right: -10px;
        width:117px;
        height:20px;
        background:rgba(252,55,130,1);
        color: #ffffff;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
    }

</style>
