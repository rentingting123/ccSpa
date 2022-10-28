<template>
  <div class="ContestDynamic">
    <div class="container">
      <div class="titleContent">
        <h3>{{$t(html.name)}}</h3>
        <p>{{html.englishname}}</p>
      </div>
      <div class="newsWrapper">
        <el-carousel :interval="5000" arrow="hover" indicator-position="none" height="206px">
          <el-carousel-item v-for="(item,index) in urls" :key="index">
            <div v-for="(n,j) in item" :key="n.id" class="mainWrapper" @click="show(n)">
              <video v-if="n.url.substring(n.url.length-4) == '.mp4'" :ref="'video'+j" class="img_auto" :src="n.url" />
              <img v-else class="img_auto" :src="n.url + '!w370'" alt />

              <div class="main">
                <div class="module">
                  <h3>{{n.link}}</h3>
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        
      </div>

      <div class="shadowBox" >
        <img class="img_auto" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/shadowBox.png" alt />
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" fullscreen>
      <video v-if="showurl.substring(showurl.length-4) == '.mp4'" controls class="img_auto1" :src="showurl" />
      <img v-else class="img_auto1" :src="showurl" alt />
    </el-dialog>

     <!-- 管理人员可编辑 -->
    <div v-if="$store.state.skin.adminRole" class="edit">
      <reviewEdit :list="html" :editOk='getList'></reviewEdit>
    </div>

  </div>
</template>

<script>
import jxapi from "@/api/index";
import { getUserInfo } from "@@/utils/commons";
import reviewEdit from './edit.vue'
export default {
  components:{reviewEdit},
  data() {
    return {
      html:{
        name:'skin.historyWork',
        englishname:'WORKS SHOW',
        urls: [],
      },
      urls:[],
      showurl: '',
      dialogVisible: false,
    };
  },
  computed: {
    id() {
      return this.$store.state.skin.id;
    }
  },
  async created() {
    this.getList();
  },
  methods: {
    async getList() {
      let res = await jxapi.skinGet({data:{type:14}})
      if(res == "error" | !res) return 
      this.html = res.html
      var data = res.html.urls;
      this.urls = [];
      for(var i=0;i<data.length;i+=3){
          this.urls.push(data.slice(i,i+3));
      }
    },
    show(item){
      this.showurl = item.url;
      this.dialogVisible = true;
    }
  },
  watch:{
    dialogVisible(val){
      if(!val){
        this.showurl = ''
      }
    }
  }
};
</script>

<style lang="less" scoped>
.ContestDynamic {
  width: 100%;
  position: relative;

  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .titleContent {
      width: 100%;
      text-align: center;
      margin-bottom: 46px;

      h3 {
        font-weight: bold;
        font-size: 36px;
        color: #111;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #111;
        text-align: center;
        margin: 0 0 10px;
      }
    }

    .newsWrapper {
      width: 100%;

      .mainWrapper {
        display: inline-block;
        width: 370px;
        height: 206px;
        margin-top: 20px;
        // padding: 0 15px;
        overflow: hidden;
        cursor: pointer;
        margin: 0 15px;

        video,img {
          width: 100%;
          height: 100%;
          background-color: #000;
          float: left;
        }
        .main {
          width: 100%;
          height: 100%;
          position: relative;

          .module {
            position: absolute;
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            background-image: linear-gradient(
              -180deg,
              rgba(0, 0, 0, 0) 0%,
              #000000 100%
            );

            h3 {
              color: #fff;
              font-weight: normal;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              margin-top: 20px;
              margin-bottom: 10px;
              font-size: 16px;
              color: #ffffff;
              text-align: left;
              text-indent: 20px;
              line-height: 1.5;
            }
          }
        }
      }
    }

    .shadowBox {
      margin-top: 10px;

      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
    }
  }
  .edit {
    position:absolute;
    right: 0;
    top:0;
    z-index: 999;
  }
}
.img_auto1{
  max-width: 90%;
  max-height: 90%;
  display: block;
  margin: 0 auto; 
}
</style>

<style lang="less">
.ContestDynamic{
  .el-carousel__item:nth-child(2n) {
    background-color: #ffffff;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #ffffff;
  }
}
</style>


