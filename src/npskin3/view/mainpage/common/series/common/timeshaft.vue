<template>
  <div class="time_shaft">
    <div class="back_line">
      <div class="current_line" :style="{width: timePercent/validPlanCount*100+'%'}"></div>
    </div>
    <div class="dot_line flexRowBetween">
      <div
        class="plan"
        v-for="(plan,index) in plans"
        :key="index"
        :style="{left:index/validPlanCount*100+'%'}"
      >
        <div v-if="plan.isNeed && plan.display">
            <p class="name dian">{{plan.name}}</p>
            <p :class="`dot ${getDotClass(plan)}`"></p>
            <p class="time">{{formatSchedule(plan.startTime)}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import network from "@/api";
import moment from "moment";

export default {
  data() {
    return {
      validPlanCount: 5,
      timePercent: 0,
      plans: [] // 竞赛计划
    };
  },
  props: {
    id: [Number, String],
    flag: Boolean
  },
//   async created() {
//     this.init();
//   },
  methods: {
    async init() {
      this.plans = [];
      let times = await network.npgetTimes({
        data: { groupId: this.id }
      });
      if (times == "error") return;
      times.map(item => {
        if (item.isNeed && item.display) {
          this.plans.push(item);
        }
      });
    //   this.plans = times

      this.getTimePercent();
    },
    getTimePercent() {

      let current = new Date();
  
      if (this.plans.length < 1) return;
      let start = new Date(this.plans[0].startTime);
      let index = 0;
      for (let i = this.plans.length - 1; i > 0; i--) {
        if (this.plans[i].isNeed && this.plans[i].display) {
          this.validPlanCount = i;
          this.timePercent = i;
          break;
        }
      }
      for (let i = this.plans.length - 1; i > -1; i--) {
        let startTime = new Date(this.plans[i].startTime);
        
        if (current <= startTime||this.formatSchedule(current)==this.formatSchedule(startTime)) {
          this.timePercent = i;
          //当检查到当天就跳出循环以免有多个赛段在当天开始
          if(this.formatSchedule(current)==this.formatSchedule(startTime))break;
        }
      }
    },
    getDotClass(plan){
      if(this.formatSchedule(new Date())==this.formatSchedule(plan.startTime)){
        return 'now'
      }else if(plan.startTime && new Date()>new Date(plan.startTime)){
        return 'active'
      }else{
        return ''
      }
    },
    formatSchedule(time) {
      if (!time) return "";
      return moment(time).format("MM.DD");
    },
  },
  watch: {
    id: {
        immediate: true,
        handler(val){
            this.timePercent = 0;
            this.init()
        }
    },
    flag(val) {
      if (!val) {
        this.init();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.time_shaft {
  margin-top: 32px;
  height: 64px;
  position: relative;
  margin-left: 48px;
  margin-right: 40px;
  width: 960px;
  .back_line {
    position: absolute;
    top: 50%;
    margin-top: -10px;
    z-index: 1;
    width: 960px;
    height: 4px;
    background: #dedede;
    border-radius: 2px;
    .current_line {
      background: #1d86ff;
      height: 4px;
      border-radius: 2px;
    }
  }
  .dot_line {
    position: absolute;
    top: 0;
    left: 0;
    width: 960px;
    z-index: 1;
    height: 64px;
    font-size: 12px;
    color: #4a4a4a;
    letter-spacing: 0.2px;
    .plan {
      position: absolute;
      top: 50%;
      transform: translateY(-65%) translateX(-50%);
      text-align: center;
      min-width: 68.9px;
      font-size: 14px;
      z-index: 1;
      cursor: pointer;
      .time {
        height: 15.2px;
        color: #4A4A4A;
      }
      .name {
          font-weight: bold;
      }
      .dot {
        width: 16px;
        height: 16px;
        margin: 5px 0;
        display: inline-block;
        background: url('http://web.moocollege.com/mooc/hzq/vueskin/npskin3/dot.png') no-repeat;
        background-size: 100%;
        background-position: center;
      }
      .dot.active {
        background: url('http://web.moocollege.com/mooc/hzq/vueskin/npskin3/dot_active.png') no-repeat;
        background-size: 100%;
        background-position: center;
      }
      .dot.now {
        background: url('http://web.moocollege.com/mooc/hzq/vueskin/npskin3/dot_active.png') no-repeat;
        background-size: 100%;
        background-position: center;
        animation: blink 1s infinite;
      }
      &:first-child {
        transform: translateX(-50%) translateY(-65%);
        .name,
        .time {
          position: relative;
          left: 27.2px;
          text-align: left;
        }
      }
      &:last-child {
        transform: translateX(-50%) translateY(-65%);
        .name,
        .time {
          position: relative;
          right: 27.2px;
          text-align: right;
        }
      }
      &:hover {
        .time {
          height: 15.2px;
          visibility: visible;
        }
        .name {
          visibility: visible;
        }
      }
    }
    
    @keyframes blink {
      50% {
        transform: scale(1.2);
      }
    }
  }
}
</style>
