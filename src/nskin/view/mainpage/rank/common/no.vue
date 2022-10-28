<template>
    <div class="rank">
        <h2><span class="on">高职</span>2019年教师发展指数(待发布)</h2>
        <div>
            <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/no.jpg" width="100%" height="192px">
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

.rank{
    width: 296px;
    height: 244px;
    background: #ffffff;
    position: relative;
    h2{
        text-align: left;
        font-size: 17px;
        color: #4A4A4A;
        letter-spacing: 0;
        text-indent: 10px;
        border-top: 1px solid #E8E8E8;
        position: relative;
        padding-top: 15px;
        span{
            display: inline-block;
            width: 40px;
            height: 20px;
            line-height: 20px;
            background: #0486FE;
            border-radius: 4px;
            font-size: 14px;
            color: #FFFFFF;
            letter-spacing: 0;
            text-align: center;
            text-indent: 0;
            margin-right: 8px;
        }
        span.on{
            background: #00AA91;
        }
    }
    img{
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>