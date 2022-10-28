<template>
    <div class="components">
        <ul class="types">
          <li v-for="(item, index) in navList" 
            @click="changeTab(index)"
            :class="{'on': index == activeTab}">
            {{item.title}}
          </li>
        </ul>
        <ul class="lists">
          <li v-for="item in lists" @click="toDetail(item.id)" :key="item.id">
            <p class="dian">{{item.name}}</p>
          </li>
        </ul>
        <!-- <div class="more">展开更多</div> -->
    </div>
</template>

<script>
import network from '@/mnskin/api/index'
  
export default {
    props: [],
    data(){
        return{
          navList: [
            { title: '电子信息', type: 1 },
            { title: '人文社科', type: 2 },
            { title: '理工', type: 3 },
            { title: '综合', type: 4 }
          ],
          activeTab: 0,
          lists: []
        }
    },
    created() {
      this.getData(1)
    },
    methods: {
      changeTab(index) {
        this.activeTab = index;
        this.getData(this.navList[index].type)
      },
      
      toDetail(id) {
        this.$router.push({ path: `/empowerment/detail/${id}` })
      },
      
      async getData(type) {
        const params = { type }
        const res = await network.selectRankCompetitions({ data: { ...params } });
        this.lists = res;
      }
    }
}
</script>

<style lang='less' scoped>
.components{
    background: #ffffff;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.16);
    margin-top: 0.24rem;
    .types{
      width: 7.50rem;
      height: .56rem;
      line-height: .56rem;
      background: #252223;
      text-align: left;
      padding-left: 0.12rem;
      li{
        font-size: .28rem;
        color: #FFFFFF;
        display: inline-block;
        vertical-align: top;
        margin-left: 0.24rem;
        &.on{
          color: #ED1E26;
        }
      }
    }
    .lists{
      margin-top: 0.16rem;
      width: 100%;
      height: auto;
      li{
        width: 100%;
        height: 0.74rem;
        padding: 0 0.63rem;
        text-align: left;
        p{
            line-height: 0.74rem;
            font-size: .28rem;
            color: #131313;
            overflow: hidden;
            &::before{
                content: ' ';
                display: inline-block;
                vertical-align: middle;
                width: 0.34rem;
                height: 0.34rem;
                border-radius: 100%;
                background: #979797;
                margin-right: 0.25rem;
            }
        }
        &:nth-child(2n+1){
            background: #F8F8F8;
        }
      }
    }
    .more{
      width: 100%;
      text-align: center;
      font-size: .24rem;
      line-height: .34rem;
      color: #BBC2C2;
      padding: 0.26rem 0 0.2rem;
    }
}
</style>
