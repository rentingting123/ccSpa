<template>
    <div>
        <el-button class="edit" @click="reviewEdit=true">编辑</el-button>
         <el-dialog :visible.sync="reviewEdit">
             <div>
                 选择默认语言：
                <RadioGroup v-model="langular">
                    <Radio label="zh"><span>中文</span></Radio>
                    <Radio label="en"><span>ENGLISH</span></Radio>
                </RadioGroup>
             </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
         </el-dialog>
    </div>
</template>

<script>
export default {
    props:['language', 'close'],
    data(){
        return{
            reviewEdit: false,
            langularcopy: ''
        }
    },
    computed:{
        langular:{
            get(){
                return this.language || 'zh'
            },
            set(val){
                this.langularcopy = val
            }
        }
    },
    methods:{
        submit(){
            this.reviewEdit = false
            this.close && this.close(this.langularcopy || this.langular)
        }
    }
}
</script>

<style lang='less' scoped>
.edit{
  position: absolute;
  top: 0;
  right: 0;
}
</style>