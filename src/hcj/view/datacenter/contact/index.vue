<template>
  <div class="news">
    <ul class="main">
      <li class="mainLi" v-for="list in lists" :key="list.id" v-if="list.show" :class="{'on':path.indexOf(list.path)>-1}">
        <div  @click="$router.push(list.childs?list.childs[0].path:list.path)">{{list.name}}</div>
        <ul class="sub" v-if="list.childs">
          <li
            v-for="l in list.childs"
            :key="l.id"
            :class="{'onsub':path==l.path}"
            @click="$router.push(l.path)"
          >{{l.name}}</li>
        </ul>
      </li>
    </ul>
    <div class="newsDetail" >
        <ul>
            <li v-for="item in contacts" :key="item.id" :style="{'background-image':`url(${item.backgroupd})`}">
                <h3 v-if="item.name">{{item.name}}</h3>
                <p v-if="item.address">地址：{{item.address}}</p>
                <p v-if="item.compony">牵头单位：{{item.compony}}</p>
                <p v-if="item.contact">联系人：{{item.contact}}</p>
                <p v-if="item.email">邮箱：{{item.email}}</p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import datas from '@/hcj/mock/contacts.js'
export default {
  data() {
    return {
        lists: [
            {
            name: "联系我们",
            id: 24,
            show: true,
            path: "/datacenter/contact"
            },
        ],
        contacts: datas || [],
    };
  },
  methods: {
  },
  created() {
      this.path = this.$route.path;
  },
};
</script>

<style lang="less" scoped>
.news {
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  padding: 20px 67px 20px 118px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .main {
    .mainLi {
      text-align: center;
      width: 190px;
      height: 41px;
      line-height: 41px;
      font-size: 16px;
      color: #4a4a4a;
      letter-spacing: 1.45px;
      border-bottom: 1px dashed #e1e1e1;
      cursor: pointer;
      &:hover {
        background: #BB0294;
        color: #ffffff;
        border-bottom: 0px dashed #e1e1e1;
        height: auto;
      }
    }
    li.on {
      background: #BB0294;
      color: #ffffff;
      border-bottom: 0px dashed #e1e1e1;
      height: auto;
    }
  }
  .sub {
    display: none;
  }
  .on {
    .sub {
      display: block;
      background-color: #d8d8d8;
      color:#000;
    &>li{
        &:hover{
             color: #000000;
        }
    }
      .onsub {
        color: #000000;
      }
    }
  }
  .newsDetail {
    min-width: 852px;
    height: 100%;
    ul{
        text-align: left;
        li{
            width: 100%;
            height: auto;
            background: #FFFFFF;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.04), 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
            border-radius: 1px;
            padding: 21px;
            margin-bottom: 22px;
            background-position: right center;
            background-repeat: no-repeat;
            background-size: auto 100%;
            h3{
                font-size: 20px;
                font-weight: bold;
                color: #4A4A4A;
                line-height: 30px;
                margin-bottom: 8px;
            }
            p{
                font-size: 14px;
                font-weight: 400;
                color: #4A4A4A;
                line-height: 24px;
            }
        }
    }
  }
  
}
</style>