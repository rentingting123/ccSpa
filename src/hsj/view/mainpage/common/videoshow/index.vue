<template>
  <div class="videoshow">
      <video :src="src" controls :poster='poster||""'></video>
      <div class="videotitle">{{title}}</div>
  </div>
</template>

<script>
export default {
    props: ['src','title','poster']
}
</script>

<style lang="less" scoped>
.videoshow{
    width: 291px;
    height: 164px;
    margin-top: 7px;
    position: relative;
    &:hover{
        .videotitle{
            display: none;
        }
    }
    video{
        width: 100%;
        height: 100%;
    }
    .videotitle{
        width: 100%;
        height: auto;
        line-height: 36px;
        background: rgba(0, 0, 0, 0.5);
        font-size: 14px;
        color: #ffffff;
        padding: 0 20px;
        position: absolute;
        bottom: 0;
        left: 0;
    }
}

</style>