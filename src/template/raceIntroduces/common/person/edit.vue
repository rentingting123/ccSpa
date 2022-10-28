<template>
  <div class="edit">
    <!-- 管理人员可编辑 -->
    <el-button @click="skinEdit=true" class="editbutton">自定义流程编辑</el-button>
    <el-dialog  :visible.sync="skinEdit" width="800px" :append-to-body="true">
        <div>
            大标题：<el-input v-model="title" style="width:300px"/>
        </div>
        <div style="margin-top: 10px">
            小标题：<el-input v-model="smalltitle" style="width:300px"/>
        </div>
        <ul>
            <li v-for="(item,index) in lists" :key="index"> 
                <div>
                    图片：<el-input v-model="item.image" style="width:300px"/>
                    <upload
                        accept=".jpg, .png"
                        :onSuccess="(res)=>(success(res, index))"
                    >
                    <el-button>上传</el-button>
                    </upload>
                </div>
                <div style="margin:5px 0;">标题：<el-input v-model="item.title" style="width:300px"/></div>
                <div>说明：<el-input v-model="item.mess" style="width:300px"/></div>
                <i class="el-icon-delete del"   @click="del(index)"/>
            </li>
        </ul>
        <el-button style="margin:10px" @click="add">添加</el-button>

        <div class="submit">
            <el-button type="primary" @click="submit">确 定</el-button>
        </div>
    </el-dialog>
  
  </div>
</template>

<script>
import network from "@/api/index"
import upload from "@@/components/fileUpload/index";
import {cloneDeep} from 'lodash'
export default {
  data() {
    return {
        skinEdit: false,
        lists: [],
        smalltitle: '',
        title: ''
    };
  },
  components:{
      upload
  },
  props:{
      list: Array,
      title1: String,
      title2: String,
      close: Function
  },
  methods: {
    success(res,index){
        this.$set(this.lists[index],'image',res.location);
    },
    add(){
        this.lists.push({
            image:'',
            title:'',
            mess:''
        })
    },
    del(index){
        this.lists.splice(index,1)
    },

    async submit(){
        let name = await network.skinSet({data:{
            html:this.lists,
            type:18,
            smalltitle: this.smalltitle,
            title: this.title,
        }})
        if(name=='error') return;
        this.skinEdit = false
    }
  },
  watch:{
      skinEdit(val){
        if(val){
            this.lists = cloneDeep(this.list) || []
            this.title = this.title1 || ''
            this.smalltitle = this.title2 || ''
        }else{
            this.close && this.close();
            this.lists = []
        }
      }
  }
};
</script>

<style lang="less" scoped>
.edit{
    .submit{
        text-align: center;
    }
}
ul{
    margin: 0 auto;
    li{
        margin: 20px 0;
        background: #eeeeee;
        padding: 10px;
        position: relative;
        .del{
            font-size: 20px;
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
        }
    }

}
.editbutton{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 999;
}
</style>