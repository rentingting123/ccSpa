<template>
    <div class="updateScoreRule">
        <Button type="primary" style="margin-left:10px;" :disabled='disabled' @click="count">分数计算</Button>
        <Modal v-model="show" :mask-closable="false" width="400" style="z-index:1200">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>离散算法时的参数提交</span>
            </p>
            <div class='calculations'>
                <p>
                    <span>偏离值：</span>
                    <InputNumber :step="0.01" v-model="deviation"></InputNumber>
                </p>
                <p>
                    <span>默认均值：</span>
                    <InputNumber :step="1" v-model="means" ></InputNumber>
                </p>
            </div>
            <div slot="footer">
                <Button type="primary" @click="submit" style="margin-left: 15px">确定</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
export default {
    props: ['datas','close','countType', 'disabled'],
    data(){
        return{
            show: false,
            deviation: 0.05,
            means: 80,
        }
    },
    created(){
        
    },
    methods:{
        count(){
            this.deviation = this.datas.deviation || 0.05
            this.means = this.datas.means || 80
            //下面的代码逻辑上是不可能会执行的，应该是某次重构没有删除的，测试通过后删除2022.6.24
            // if(this.datas && this.datas.scoreStatus==1){
            //     // this.close && this.close(this.countType);
            //     return this.$Message.warning('后台正在计算分数，请稍后再试')
            // }else 
            if(this.countType==3){
                //countType=3离散算法
                this.show = true
            }else{
                this.updateScoreRule()
            }
        },
        submit(){
            if(this.deviation!=0 && !this.deviation){
                return this.$Message.warning('请输入偏离值')
            }
            if(this.means!=0 && !this.means){
                return this.$Message.warning('请输入默认均值')
            }
            this.updateScoreRule()
        },
        updateScoreRule(){
            this.loading=true
            this.$api.post('review/resource/updateScoreRule',{
                compwtitionId: this.datas.competitionId,
                rowId: this.datas.rowId,
                countType: this.countType,
                deviation: this.deviation,
                means: this.means
            }).then(res=>{
                this.show = false
                this.close && this.close(this.countType);
                if(res.code==0){
                    this.$Message.success('提交成功，后台正在计算分数，请稍后刷新查看')
                }else{
                    this.$netcode.getApiCode(res)
                }
            })
        },

    }
}
</script>

<style lang="less" scoped>
.updateScoreRule{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    margin-top: 7px;
    
}
.calculations{
    width: 200px;
    margin: 20px auto;
    height: 100px;
    p{
        line-height: 50px;
        span{
            width: 80px;
            display: inline-block;
            vertical-align: middle;
        }
    }
}
</style>