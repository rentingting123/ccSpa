<template>
  <div class="comp-detail">
    <div>
      <h2Title title="赛项详情" />

      <div class="p-19">
        <div class="top">
          <div class="m-b-10">
            <span class="text-18">智能网汽车设计赛项</span>
            <span class="hot">火热报名</span>
          </div>

          <div class="go">&#10150; 前往竞赛</div>
        </div>

        <div class="t-a-l content m-b-10">为了全面贯彻全国教育大会精神，围绕创新驱动和制造强国战略，主动应对新一轮科技革命和产业革命浪潮，落实《关</div>

        <div class="timeline">

          <div class="m-r-8">
            <div class="unit">
              <div class="month">9月</div>
              <div class="date">13</div>
            </div>
            <div class="node-name">竞赛启动</div>
          </div>

          <div class="m-r-8">
            <div class="unit">
              <div class="month">9月</div>
              <div class="date">20</div>
            </div>
            <div class="node-name">解析会直播</div>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <h2Title title="TOP团队" />
      <div class="flex p-19">
        <span class="team-unit">
          <span class="rank">1</span>
          <span>
            <div class="t-a-l team-name">美女如云小分队</div>
            <div class="t-a-l team-school">西安交通大学</div>
          </span>
        </span>
        <span class="team-unit">
          <span class="rank">2</span>
          <span>
            <div class="t-a-l team-name">冒险小虎队</div>
            <div class="t-a-l team-school">西安交通大学</div>
          </span>
        </span>
        <span class="team-unit">
          <span class="rank">3</span>
          <span>
            <div class="t-a-l team-name">xxxx小分队</div>
            <div class="t-a-l team-school">华东理工大学</div>
          </span>

        </span>
      </div>
    </div>
  </div>
</template>

<script>
import h2Title from '@/pskin4/components/h2';
import network from '@/api/index';

export default {
  components: {
    h2Title
  },
  data() {
    return {}
  },
  created() {},
  methods: {

  }
}
</script>

<style lang="less" scoped>
.comp-detail {
  width: 550px;
  background: white;
  box-shadow: 0px 2px 8px 0px rgba(227,227,227,0.94);
  .month {
    font-size: 12px;
    color: #4a4a4a;
  }
  .rank {
    font-size: 14px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #9b9b9b;
    width: 18px;
    line-height: 20px;
  }
  .date {
    font-size: 24px;
    color: #4a4a4a;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: bold;
  }

  .node-name {
    font-size: 12px;
    color: #4a4a4a;
    line-height: 18px;
    text-align: center;
  }

  .timeline {
    display: flex;

    .unit {
      border: 1px solid #e3e3e3;
      border-top: 2px solid #118fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 80px;
      height: 66px;
    }
  }
  .m-r-8 {
    margin-right: 8px;
  }
  .flex {
    display: flex;
  }
  .text-18 {
    font-size: 18px;
    font-weight: 500;
    color: #4a4a4a;
  }
  .m-b-10 {
    margin-bottom: 10px;
  }
  .p-19 {
    padding: 19px;
  }
  .p-12 {
    padding: 12px;
  }
  .t-a-l {
    text-align: left;
  }
  .bottom {
    .team-unit {
      width: 33.1%;
      display: flex;
    }
    .team-name {
      font-size: 14px;
      color: #4a4a4a;
    }
    .team-school {
      font-size: 12px;
      color: #9b9b9b;
    }
  }
  .content {
    font-size: 14px;
    color: #9f9f9f;
    line-height: 21px;
  }
  .top {
    display: flex;
    justify-content: space-between;
    line-height: 21px;

    .hot {
      background: #ff8900;
      color: white;
    }
    .go {
      border: 1px solid #3064bb;
      color: #3064bb;
      width: 92px;
      height: 24px;
      border-radius: 1px;
    }
  }
}
</style>
