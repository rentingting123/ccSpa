<template>
  <div :class="['center-wrapper', location]" :style="{height: height + 'px'}">
    <div class="tree-item">
      <!-- <el-tooltip class="item" effect="dark" content="" placement="top-start"> -->
      <div class="name-wrapper" @click.stop.prevent="click(data)" @dblclick.stop.prevent="dblclick(data)">
        <div v-if="canMerge">
          <div :class="['name', color]">
            <span class="span-name">{{data.name ? data.name : ''}}</span>
            <!-- <Icon type="ios-add-circle-outline"  @click.stop.prevent="editName"/> -->
          </div>
        </div>
        <div v-else>
            <div class="name">
                <div class="name-text">
                    <span class="span-name">{{data.name ? data.name : ''}}</span>
                </div>
                 <!-- class="name-operate-three" -->
                <div class="name-operate-three" style="text-align:center;">
                    <span v-if="data.sortId!=2">
                        <Icon type="md-add-circle" color="#2E83EA" @click.stop.prevent="addSonOrg(data)"/>
                    </span>
                    <span>
                        <Icon type="ios-paper-outline" color="#2E83EA" @click.stop.prevent="editName(data)"/>
                    </span>
                    <span @click.stop.prevent="delOrg" v-if="data.sortId!=0">
                      <Icon type="ios-remove-circle" style="color:#E6303E" @click.stop.prevent="delOrg(data)"/>
                    </span>
                    <span>
                        <Icon type="md-cloud-upload" color="#2E83EA" @click.stop.prevent="expoName(data)"/>
                    </span>
                </div>
            </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
let time = null;
export default {
  data() {
    return {
        isdblclick: false,
        isClick: 0,
        color: "",
        dblclickData:{},//双击数据
        clickData:{},//单机数据
    };
  },
  props: {
    canMerge: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      default: "middle"
    },
    colorName: {
      type: String,
      default: ""
    },
    height: {
      type: String,
      default: "auto"
    },
    data: {
      type: Object,
      default: {}
    }
  },
    computed:{
        ...mapGetters({fromGroupId:'fromGroupId',toGroupId:'toGroupId'}),
    },
    watch:{
        fromGroupId:function(val){
            if(val==this.data.id){
                this.color="gray"
            }else{
                if (this.color!="blue") {
                    this.color=""
                }
            }
        },//被合并项数据
        toGroupId:function(val){
            if(val==this.data.id){
                this.color="blue"
            }else{
                if (this.color!="gray") {
                    this.color=""
                }
            }
        },//合并项后存在数据
    },
    created() {

    },
    mounted() {},
  methods: {
    editName(e) {
        this.$emit("treeItemClick", {
            type: "editName",
            data:e
        });
    },
    addSonOrg(e) {
        this.$emit("treeItemClick", {
            type: "addSonOrg",
            data:e
        });
    },
    expoName(e) {
        this.$emit("treeItemClick", {
            type: "expoName",
            data:e
        });
    },
    showMembers(e) {
        this.$emit("treeItemClick", {
            type: "showMembers",
            data:e
        });
    },
    delOrg(e) {
        // console.log(e);
        this.$emit("treeItemClick", {
            type: "delOrg",
            data:e
        });
    },
    click(e) {
        if (!this.canMerge) {
            return;
        }
        if (this.isdblclick) {
            return;
        }
        clearTimeout(time);
        time = setTimeout(() => {
            if(!this.isdblclick){
                if (this.color == "gray") {
                    // this.color=""
                    this.$store.commit("fromGroupIdSystem",'')
                }else{
                    // this.color = "gray";
                    this.$store.commit("fromGroupIdSystem",e.id)
                }
            }
        }, 300);
    },
    dblclick(e) {
        if (!this.canMerge) {
            return;
        }
        clearTimeout(time);
        time = setTimeout(() => {
            if (this.color == "blue") {
                this.isdblclick = true;
                // this.color=""
                this.$store.commit("toGroupIdSystem",'')
            }else{
                this.isdblclick = true;
                // this.color = "blue";
                this.$store.commit("toGroupIdSystem",e.id)
                // this.dblclickData=e;
                // this.$emit("clickType", {
                //     type: "dbclick",
                //     data:e
                // });
                var times = setTimeout(() => {
                    this.isdblclick = false;
                }, 350);
            }
        }, 50);


    }
  },
};
</script>

<style lang='less' scoped>
.span-name{
    font-size: 13px;
}
.name-text{
    display: block;
    text-align: center;
}
.name-operate-three{
    display: none;
    font-size: 17px;
    float: left;
    span {
      cursor: pointer;
      display: inline-block;
      margin-right: 10px;
    }
}
.center-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // margin-top:30px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 40px;
    height: 1px;
    border-top: 1px solid #e5e5e5;
  }

  .tree-item {
    height: 30px;
    padding: 30px 0;
    display: block;
    box-sizing: content-box;
    overflow: visible;

    &:hover {
        .name-operate-three {
            display: inline-block;
        }
        .name-add-next {
            display: inline-block;
        }

    }

    .name-wrapper {
      margin-left: 40px;
      display: block;
      height: 30px;
      line-height: 30px;
      // min-width: 250px;
      // padding-right: 20px;
      font-size: 0;
      position: relative;
      margin-right:30px;
      &::after {
        content: "";
        position: absolute;
        right: -30px;
        top: 50%;
        width: 30px;
        height: 1px;
        background: #e5e5e5;
        z-index: 0;
      }

      .name {
        display: inline-block;
        vertical-align: middle;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        padding: 0 20px;
        font-size: 16px;
        user-select: none;
        i {
          cursor: pointer;
        }
      }
      .name-add-next {
        font-size: 17px;
        width: 20px;
        height: 30px;
        margin-left: 5px;
        margin-right: 5px;
        visibility: hidden;
        display: none;
        vertical-align: middle;
        cursor: pointer;
        color: #409eff;
        z-index: 2;
      }
    }
  }
}

.only {
  position: relative;
}

.top {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1px;
    height: 50%;
    border-left: 1px solid #e5e5e5;
  }
}

.middle {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-left: 1px solid #e5e5e5;
  }
}

.bottom {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 50%;
    border-left: 1px solid #e5e5e5;
  }
}

.gray {
  background-color: #e5e5e5;
  color: #3c3c3c;
}

.blue {
  background-color: #409eff;
  color: #ffffff;
}
</style>
