<template>
  <div class="home" v-if="$store.state.skin.adminRole">
    <draggable  v-model="lists">
        <transition-group>
            <div v-for="(list,index) in lists" :key="list.id" class="show">
              <div class="choose">
                排序：{{index+1}}
                <el-checkbox v-model="list.choose">{{list.name}}</el-checkbox>
              </div>
              <img :src="list.img" width="100%">
            </div>
        </transition-group>
    </draggable>
    <div class="editfooter">
      <el-button type="primary" size="small" @click="save">确定</el-button>
      <el-button type="primary" size="small" @click="$router.back()">取消</el-button>
    </div>

  </div>
</template>

<script>
import network from '@/api'
import draggable from 'vuedraggable'
import {reverse,cloneDeep} from 'lodash'
const lists=[
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/footer-tem.png',
          id: 0,
          choose:false,
          name:'双语选择',
          is: 'bilingual'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/banner.png',
          id:1,
          choose:false,
          name:'轮播图',
          is: 'banner'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/banner.png',
          id:1.1,
          choose:false,
          name:'小轮播图（300）',
          is: 'smallbannerLoader'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/racenews.png',
          id:2,
          choose:false,
          name:'大赛动态-图文',
          is: 'race-news'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/racenewslist.png',
          id:2.1,
          choose:false,
          name:'大赛动态-列表',
          is: 'race-news1'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/racenewslist.png',
          id:2.2,
          choose:false,
          name:'大赛动态-列表-结构赛',
          is: 'race-news-jgs'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/race-introduce.png',
          id:3,
          choose:false,
          name:'子竞赛以及规程',
          is: 'race-introduce'
        },
        // 20210519 改版后之前的不再使用
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/race-introduces.png',
          id:3.1,
          choose:false,
          name:'大赛章程（旧：不推荐使用）',
          is: 'race-introduces'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/race-introduces.png',
          id:3.2,
          choose:false,
          name:'大赛章程(自定义)',
          is: 'raceIntroduces2021'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/joinin.png',
          id:4,
          choose:false,
          name:'报名参赛',
          is: 'join-in'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/race-review.png',
          id:5,
          choose:false,
          name:'大赛回顾-图文',
          is: 'race-review'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/race-service.png',
          id:6,
          choose:false,
          name:'大赛服务',
          is: 'race-service'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/subwork.png',
          id:8,
          choose:false,
          name:'往届作品展示',
          is: 'subwork'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/preRegistration.png',
          id:9,
          choose:false,
          name:'预报名',
          is: 'preRegistration'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/training.png',
          id:10,
          choose:false,
          name:'培训报名',
          is: 'training'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/zhsq.png',
          id:11,
          choose:false,
          name:'账号申请',
          is: 'zhsq'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/competitionList.png',
          id:12,
          choose:false,
          name:'竞赛直通车',
          is: 'competitionList'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/provincialList.jpg',
          id:12.1,
          choose:false,
          name:'结构赛-省赛直通车',
          is: 'provincialList'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/history.png',
          id:13,
          choose:false,
          name:'大赛回顾',
          is: 'history'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/sxjm.png',
          id:14,
          choose:false,
          name:'数学建模',
          is: 'sxjm'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/sxjm.png',
          id:14.1,
          choose:false,
          name:'机器人竞赛(旧：不推荐使用)',
          is: 'jqrjs'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/sxjmNormal.png',
          id:18,
          choose:false,
          name:'机器人竞赛(自定义)',
          is: 'sxjmNormal'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/footer-tem.png',
          id:7,
          choose:false,
          name:'页脚',
          is: 'footer-tem'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/race-service.png',
          id:15,
          choose:false,
          name:'组织机构',
          is: 'institution'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/race-service.png',
          id:16,
          choose:false,
          name:'友情链接',
          is: 'links'
        },
        {
          img:'https://web.moocollege.com/mooc/hzq/vueskin/assets/skin/historyauto.png',
          id:17,
          choose:false,
          name:'大赛回顾(自定义)',
          is: 'historyauto'
        },
        
      ]
export default {
  components:{
    draggable,

  },
  data() {
    return {
      lists,
    };
  },
  computed:{
    id(){
      return this.$store.state.skin.id
    }
  },
  methods:{
    async save(){
      let res = await network.skinSet({data:{html:this.lists,type:13}});
      if(res=='error') return;
      this.$message.success('保存成功！')
      this.$router.back()
    },
    async init(){
      let res = await network.skinGet({data:{
        type:13
      }});
      if(res=='error') return;
      if(!res) return;
      let  _html = []
      res.html.map((item)=>{
        delete item.img
        delete item.name
        if(item.choose) {_html.push(item);}
      })
      reverse(_html)
      let _list=cloneDeep(this.lists)
      _html.map(item=>{
        _list.map((_l,i)=>{
          if(_l.id==item.id){
            _list[i].choose = true
            _list.unshift(_list.splice(i,1)[0])
          }
        })
      })
      this.lists = _list
      // this.lists = res.html;
    }
  },
  created(){
    document.getElementById('app').style.minWidth = '0';
    this.init();
  }
};
</script>

<style lang="less">
.show{
  width: 800px;
  margin: 10px auto;
  .choose{
    margin: 10px 0;
  }
  .el-checkbox {
    margin-left: 20px;
  }
}
.editfooter{
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 50px;
  // background: rgba(0, 0, 0, .6);
  // height: 50px;
  // z-index: 999;
}
</style>
