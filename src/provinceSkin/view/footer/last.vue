<template>
    <div class="footer">
        竞赛内容版权归内容提供者（机构）所有 
        技术支持：<a href="http://cc.moocollege.com" target="_blank">杭州简学科技有限公司</a> 
        浙公网安备：{{recordZJ || '33010602004724号'}}&nbsp;&nbsp;&nbsp;
        <a href="https://beian.miit.gov.cn/" target="_blank"> 浙ICP备{{recordICP || '15007838号'}}</a>
    </div>
</template>

<script>
import { getBaseInfo } from '@/common/common.js'
export default {
    data(){
        return{
            recordZJ: '',
            recordICP: '',
        }
    },
    mounted(){
        let baseInfo = getBaseInfo()
        this.recordZJ = baseInfo &&  baseInfo.recordZJ || ''
        this.recordICP = baseInfo && baseInfo.recordICP || ''
    }
}
</script>


<style  lang="less">
.footer{
    width: 100%;
    height: 36px;
    line-height: 36px;
    font-size: 12px;
    color: #C9C9C9;
    text-align: center;
    background: #151515;
    a{
        color: #ffffff;
        cursor: pointer;
    }
}
</style>

