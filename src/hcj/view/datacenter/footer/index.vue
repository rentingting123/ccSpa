<template>
    <div class="footer">
        客服电话：17357146574&nbsp;&nbsp;&nbsp;
        技术支持：<a href="http://cc.moocollege.com" target="_blank">杭州简学科技有限公司</a>&nbsp;&nbsp;&nbsp;
        浙公网安备：{{recordZJ}}&nbsp;&nbsp;&nbsp;&nbsp;
        <a class="footer" href="https://beian.miit.gov.cn/" target="_blank">{{recordICP}}</a>
    </div>
</template>

<script>
import { getWebInfo } from '@/common/common.js'
export default {
    data(){
        return{
            recordZJ: '33010602004724号',
            recordICP: '浙ICP备15007838号',
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            let baseInfo = getWebInfo();
            if(baseInfo && baseInfo.recordZJ){
                this.recordZJ = baseInfo.recordZJ
            }

            if(baseInfo && baseInfo.recordICP){
                this.recordICP = baseInfo.recordICP
            }
        }
    }
}
</script>

<style lang="less" scoped>
.footer{
    width: 100%;
    background: #4A4A4A;
    text-align: center;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 1.63px;
    line-height: 38px;
    a{
        color: #FFFFFF;
        cursor: pointer;
    }
}
</style>