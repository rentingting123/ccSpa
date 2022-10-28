<template>
    <div id="footer">
        <footNav />
        <div class="footer">
            <div>
                <span>竞赛内容版权归内容提供者（机构）所有 技术支持：杭州简学科技有限公司 浙公网安备：33010602004724号 &nbsp;&nbsp; <a href="https://beian.miit.gov.cn/">浙ICP备15007838号</a></span>
            </div>
        </div>
    </div>
</template>


<script>
import footNav from './index'
export default {
    name: 'Footer',
    components:{
        footNav
    }
}
</script>


<style lang="less" scoped>
.footer{
    background: #606767;
    width:100%;
    height:36px;
    text-align:center;
    line-height: 36px;
    font-size: 12px;
    color: #C9C9C9;
    >div{
        border-top: 4px solid #757F7F;
        width: 1200px;
        margin: 0 auto;
    }
    a{
        color: #C9C9C9;
    }
}
</style>