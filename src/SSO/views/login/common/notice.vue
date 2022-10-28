<template>
    <div class="notice" >
        <div class="mess mess1"></div>
        <div class="mess mess2"></div>
        <span>
            <i class="iconfont">&#xe656;</i
            >&nbsp;&nbsp;&nbsp;为了更好的用户体验，建议使用Chrome浏览器
        </span>
        <p>
        Edge12及以上、Firefox21及以上、Chrome23及以上、Safari6.1及以上、Opera15及以上、360浏览器、UC浏览器等请使用极速模式。(不支持IE)
        </p>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
.notice {
    position: absolute;
    bottom: -110px;
    left: 0;
    width: 100%;
    height: 90px;
    background: rgba(255, 255, 255, 0.2);
    .mess {
        position: absolute;
        top: -20px;
        width: 10px;
        height: 43px;
        background: url(https://web.moocollege.com/mooc/hzq/vueskin/assets/home/Line.png)
            no-repeat;
        background-size: cover;
        background-position: center;
    }
    .mess1 {
        left: 78px;
    }
    .mess2 {
        right: 78px;
    }
    span {
        display: block;
        width: 328px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #ffffff;
        background: #1d86ff;
        border-radius: 6px;
        margin: 12px auto;
    }
    p {
        font-size: 12px;
        color: #ffffff;
        text-align: left;
        width: 90%;
        margin: 0 auto;
    }
}
</style>