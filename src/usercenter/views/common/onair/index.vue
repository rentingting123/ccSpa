<template>
  <div>
    <Button type="primary" @click="modal1 = true">{{
      name || "小组抽签"
    }}</Button>
    <Modal
    class="customerOnair"
      fullscreen
      footer-hide
      v-model="modal1"
      :title="name || '小组抽签'"
      @on-ok="ok"
      @on-cancel="modal1 = false"
    >
      <div class="all">
        <img
          class="title"
          src="https://web.moocollege.com/mooc/hzq/vueskin/usercenter/h1.png"
          width="852px"
        />

        <div v-if="finish && !loading" class="button" @click="ok">
          <img
            class="img img4"
            src="https://web.moocollege.com/mooc/hzq/vueskin/usercenter/4.png"
            width="100%"
          />
        </div>

        <div v-else class="button" @click="group">
          <img
            src="https://web.moocollege.com/mooc/hzq/vueskin/usercenter/0.png"
            width="100%"
          />
          <img
            class="img2 img"
            src="https://web.moocollege.com/mooc/hzq/vueskin/usercenter/2.png"
            width="100%"
          />
          <img
            v-if="!loading"
            class="img"
            src="https://web.moocollege.com/mooc/hzq/vueskin/usercenter/1.png"
            width="100%"
          />
          <img
            v-else
            class="img img3"
            src="https://web.moocollege.com/mooc/hzq/vueskin/usercenter/3.png"
            width="100%"
          />
        </div>

        <div style="text-align: center">
          <Button
            :disabled="loading"
            v-if="finish"
            icon="md-refresh"
            @click="groupReset"
            >重置</Button
          >
          <Checkbox
            :disabled="loading"
            v-else
            v-model="SchoolAvoid"
            size="large"
            >同校规避</Checkbox
          >
        </div>

        <!-- <h3>分组数量：{{ teamCount }}(组数等于组长数量,点专家头像选择组长)</h3>
    <Button :loading="loading" @click="group" type="primary"
      >开始分组(逐个)</Button
    >
    <Button :loading="loading" @click="Teamgroup" type="primary"
      >开始分组(组)</Button
    > -->
        <div class="teams">
          <div class="teamsList" v-for="(exp, index) in TeamPool" :key="exp.id">
             <Input @on-blur="editName(index,false)" v-if="nameEdit[index]" v-model="TeamName[index]" size="large" placeholder="请输入小组名" />
            <h2 v-else @click="editName(index,true)" class="dian">
              {{ `${TeamName[index]}(${exp.length}名)` }}
            </h2>
            <div class="teamsListmain">
              <p v-for="expert in exp" :key="expert.id">
                <Poptip
                  trigger="hover"
                  :content="`${expert.org}:${expert.name}`"
                >
                  <Badge v-if="expert.teamLeader" text="组长">
                    <p>{{ expert.name }}</p>
                  </Badge>
                  <p v-else>{{ expert.name }}</p>
                </Poptip>
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="
            !finish ||
              (finish && SchoolAvoid && schoolPool[0].length > teamCount)
          "
          class="expertpool"
        >
          <div class="expertTitle">
            {{ !finish ? "专家名单" : "未分配名单" }}
          </div>
          <div
            :class="
              `${expert.teamNum ? 'hide' : 'expertBlock'} ${
                expert.teamLeader && !expert.teamNum ? 'on' : ''
              }`
            "
            @click="checkTeamLeader(expert)"
            v-for="expert in epool"
            :key="expert.id"
          >
            <Tooltip :content="`${expert.org}:${expert.name}`">
              <Badge v-if="expert.teamLeader && !expert.teamNum" text="组长">
                <p v-if="!expert.teamNum">
                  {{ expert.name }}
                </p>
              </Badge>
              <p v-else-if="!expert.teamNum">
                {{ expert.name }}
              </p>
            </Tooltip>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
let _ = require("lodash");
export default {
  props: {
    name: String,
    list: {
      type: Array,
      default: () => []
    },
    captainSelection: String,
    groupName: String,
    cb: Function
  },
  data() {
    return {
      modal1: false, //弹窗
      nameEdit:[],
      teamCount: 0,
      finish: false,
      loading: false,
      epool: [], //初始数据
      LogicPool: [], //逻辑分组数组
      schoolPool: [], //学校关联二维数组
      TeamPool: [], //二维分组数组
      TeamName:[],//小组名称
      SchoolAvoid: true
    };
  },
  created() {
    this.createExpert(this.init);
  },
  methods: {
    editName(idx,bl){
      if(!bl&&!this.TeamName[idx]){
        this.$Notice.error({title:'小组名不能为空'})
        return this.editName(idx,true)
      }
      this.$set(this.nameEdit,idx,bl)
    },
    //生成模拟数据
    createExpert(cb) {
      this.epool = this.list.map((item,idx) => ({
        name: item.idcardName,
        teamLeader: item.isTeamLeader,
        org: item.school,
        teamNum: 0,
        id: item.id,
        index:idx,
      }));
      cb && cb(this.epool);
    },
    init(pool = this.epool) {
      let temp = {};
      // let color = {};
      let schoolPool = [];
      let LogicPool = [];
      this.teamCount = 0;
      pool = _.shuffle(_.cloneDeep(pool))
      pool.map((item, index) => {
        if (!temp[item.org]) {
          temp[item.org] = [];
        }
        if (item.teamLeader) {
          this.teamCount++;
        }
        temp[item.org].push(item);
      });
      Object.keys(temp).forEach(key => {
        //根据同校数量排序
        schoolPool.push(temp[key]);
      });
      schoolPool.sort((a, b) => {
        return b.length - a.length;
      });
      schoolPool.map(item => {
        LogicPool = LogicPool.concat(item);
      });
      //排序teamLeader到前面
      if (!this.SchoolAvoid) LogicPool = _.shuffle(LogicPool);
      LogicPool = LogicPool.sort((a, b) => b.teamLeader - a.teamLeader);
      this.schoolPool = schoolPool;
      return {
        LogicPool: LogicPool,
        schoolPool: schoolPool
      };
    },
    //重置
    groupReset() {
      this.TeamPool = [];
      this.finish = false;
      this.loading = false;
      this.epool = this.epool.map(item => {
        item.teamNum = 0;
        item.miss = [];
        return item;
      });
    },
    //选组长
    checkTeamLeader(expert) {
      if (expert.teamLeader) this.teamCount--;
      else this.teamCount++;
      expert.teamLeader = !!!expert.teamLeader;
      this.$set(this.epool, expert.index, expert);
      if (this.schoolPool[0].length > this.teamCount && this.SchoolAvoid) {
        this.$Notice.warning({
          title: "同校规避警告！",
          desc:
            "当前学校最多专家数超过组数，系统建议:增加" +
            (this.schoolPool[0].length - this.teamCount) +
            "名组长"
        });
      }
    },
    //专家，检查专家最适合进入哪个组

    checkExcept(e) {
      //分配专家少的放在最前面
      let _tpool = _.shuffle(this.TeamPool);
      _tpool.sort((a, b) => a.length - b.length);
      let _index = -1;
      //检查专家是否可以丢进最少专家组
      for (let i = 0; i < _tpool.length; i++) {
        if (_tpool[i].length < 1) {
          _index = "hasNull";
          break;
        }
        let torgs = _tpool[i].map(item => item.org);
        if (torgs.indexOf(e.org) > -1 && this.SchoolAvoid) continue;
        _index = i;
        break;
      }
      //找出分配权重一样的随机组
      for (let t = 0; t < this.TeamPool.length; t++) {
        if (this.TeamPool[t].length < 1) return t;
        if (_index == "hasNull" || _index < 0) continue;
        if (_tpool[_index][0].id == this.TeamPool[t][0].id) return t;
      }
      //全部不符合返回-1
      return -1;
    },
    //分组 专家池；组数,单个强校验分组
    group() {
      if(this.loading) return 
      if (this.epool.length > 80) return this.Teamgroup();
      let LogicPool = this.init().LogicPool,
        count = this.teamCount;
      if (count < 2) return this.$Notice.error({
        title:"请先选取至少2名专家作为队长",
      });
      this.loading = true;
      // await this.init();
      //确定组
      //this.TeamPool = new Array(count)
      for (let arr = 0; arr < count; arr++) {
        this.TeamPool[arr] = [];
        this.TeamName[arr] =  this.TeamName[arr]||`${this.groupName}第${arr + 1}小组`
      }
      // LogicPool = _.shuffle(LogicPool)
      let i = 0;
      let _this = this;
      function grouping() {
        let _selected = LogicPool[i];
        //随机把专家丢进组内
        let enable = _this.checkExcept(_selected);
        //标记专家所在组
        if (enable > -1) {
          _selected.teamNum = enable + 1;
          _this.$set(_this.epool, _selected.index, _selected);
          //把专家塞进分配完的租

          if (!_this.TeamPool[enable]) _this.TeamPool[enable] = [];
          _this.TeamPool[enable].push(_selected);
        }
        i++;
        if (i < LogicPool.length) {
          setTimeout(grouping, 1);
        } else {
          _this.loading = false;
          _this.finish = true;
        }
      }
      grouping();
      //this.loading = false
    },
    //分组，每次分一列，
    Teamgroup() {
      // await this.init();
      //确定组长排序
      let LogicPool = this.init().LogicPool,
        count = this.teamCount;
      if (count < 2) return this.$Message.error("请先选取至少2名");
      this.loading = true;
      //this.TeamPool = new Array(count)
      for (let arr = 0; arr < count; arr++) {
        this.TeamPool[arr] = [];
        this.TeamName[arr] =  this.TeamName[arr]||`${this.groupName}第${arr + 1}小组`
      }
      //生成插入顺序
      let LogicOrder = [...Array(count).keys()];
      //冲突顺序储存
      let missedOrder = [];
      let _this = this;
      function pushExpert(_selected, item) {
        _selected.teamNum = item + 1;
        _this.$set(_this.epool, _selected.index, _selected);
        _this.TeamPool[item].push(_selected);
      }
      function checkEnable(e, i) {
        let _org = e.org;
        //匹配过返回
        if (!_this.SchoolAvoid || _this.TeamPool[i].length < 1) return true;
        if (
          (e.miss && e.miss.indexOf(i) > -1) ||
          _this.TeamPool[i][0].org == _org ||
          _this.TeamPool[i].slice(-1)[0].org == _org
        )
          return false;
        return true;
      }
      function teamping() {
        //打乱插入顺序
        LogicOrder = _.shuffle(LogicOrder);
        //填补跳过的坑位
        while (missedOrder.length) {
          let _fixOrder = missedOrder.shift(),
            has = false;
          //穷举所有还未评审的专家，如果全部匹配不上 就删除移除该逻辑定位
          for (let l = 0; l < LogicPool.length; l++) {
            let _selected = LogicPool[l];
            if (checkEnable(_selected, _fixOrder)) {
              pushExpert(_selected, _fixOrder);
              LogicPool.splice(l, 1);
              has = true;
              break;
            }
            if (!LogicPool[l].miss) LogicPool[l].miss = [];
            LogicPool[l].miss.push(_fixOrder);
          }
          if (!has) LogicOrder.splice(LogicOrder.indexOf(_fixOrder), 1);
        }
        LogicOrder.map((item, index) => {
          let _selected = LogicPool.shift();
          if (_selected && checkEnable(_selected, item))
            pushExpert(_selected, item);
          else {
            if (_selected) {
              if (!_selected.miss) _selected.miss = [];
              _selected.miss.push(item);
              LogicOrder.filter(a => _selected.miss.indexOf(a) < 0).length >
                0 && LogicPool.unshift(_selected);
            }
            missedOrder.push(item);
          }
        });

        if (LogicPool.length) {
          setTimeout(teamping, 1);
        } else {
          _this.loading = false;
          _this.finish = true;
        }
      }
      teamping();
    },
    async ok() {
      if(this.TeamName.filter(a=>!a).length>0)return this.$Notice.error({title:'请先完善小组的名字！'})
       this.loading = true;
      var data = {
        selfGroupId: this.$webapi.getlocal("groupId"),
        captainSelection: this.captainSelection || 0
      };

      await Promise.all(
        this.TeamPool.map(async (item, idx) => {
          let _teamId = [],
            _userId = [],
            _groupName = this.TeamName[idx]
          item.map(it => {
            it.teamLeader && _teamId.push(it.id);
            _userId.push(it.id);
          });
          data.teamIds = _teamId;
          data.userIds = _userId;
          data.groupName = _groupName;
          //this.$Message.info("开始创建："+_groupName);
          console.log("开始创建：" + _groupName);
          await this.$api
            .post("/web/specialist/insertGroup", _.cloneDeep(data))
            .then(reset => {
              if (reset.code == 0) {
                this.$Message.success(_groupName + "添加成功!");
              } else {
                this.$netcode.getApiCode(reset);
              }
            });
          console.log("创建成功：" + _groupName);
        })
      );

      console.log("小组创建完成！");
      this.modal1 = false;
      this.groupReset();
      this.cb && this.cb();
    },
    //随机颜色
    getRandomColor() {
      return (
        "#" +
        (((Math.random() * 0xffff) << 0).toString(16) + "00000").substr(0, 6)
      );
    }
  }
};
</script>

<style lang="less" scoped>
.all {
  width: 100%;
  min-height: 100vh;
  background: rgb(15, 24, 112);
  .dian {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .title {
    padding-top: 45px;
    display: block;
    margin: 0 auto;
  }
  .button {
    width: 252px;
    height: 102px;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
    .img {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .img3 {
      z-index: 3;
    }
    .img4 {
      z-index: 4;
    }
    &:hover {
      .img2 {
        z-index: 2;
      }
    }
  }

  .expertpool {
    max-width: 1053px;
    height: auto;
    background: #1a1a53;
    border-radius: 18px;
    margin: 0 auto;
    padding: 52px 31px 40px;
    position: relative;
    margin-top: 65px;
    display: flex;
    flex-wrap: wrap;
    .expertTitle {
      width: 125px;
      height: 45px;
      background: #6283ff;
      border-radius: 4px;
      position: absolute;
      top: -23px;
      left: 16px;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      line-height: 45px;
      text-align: center;
    }

    .expertBlock {
      display: inline-block;
      cursor: pointer;
      padding: 12px;
      margin-top: 12px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
      &.on {
        color: #ffd700;
      }
      :hover {
        color: #ffd700;
      }
    }
    .hide {
      display: none;
    }
  }
  .teams {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 50px;
    .teamsList {
      width: 331px;
      height: auto;
      background: #1a1a53;
      border-radius: 18px;
      padding: 27px;
      margin-top: 65px;
      h2 {
        width: 277px;
        height: 29px;
        background: url("https://web.moocollege.com/mooc/hzq/vueskin/usercenter/title.png")
          no-repeat;
        background-size: 100%;
        text-indent: 32px;
        font-size: 22px;
        font-weight: 600;
        color: #ffffff;
        line-height: 29px;
        margin-bottom: 6px;
      }
      .teamsListmain {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        p {
          font-size: 20px;
          font-weight: 400;
          color: #ffffff;
          width: 70px;
          white-space: nowrap;
          display: inline-block;
          text-align: justify;
          text-align-last: justify;
        }
      }
    }
  }
  /deep/.ivu-checkbox-wrapper {
    color: #ffffff;
  }
}

/deep/.ivu-modal-fullscreen .ivu-modal-body {
    top:0;
    padding:0;
  }

  
</style>
