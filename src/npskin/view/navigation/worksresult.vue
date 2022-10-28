<template>
  <div class="national" >
    <div class="list">
      <div @click="$router.push('/datacenter/half/filesystem/32')" class="btn">创新成果集</div>
      <div @click="$router.push('/datacenter/half/filesystem/33')" class="btn">竞赛通讯</div>
      <div @click="$router.push('/datacenter/half/filesystem/34')" class="btn">竞赛成果奖</div>
    </div>
  </div>
</template>

<script>

export default {};
</script>

<style lang="less" scoped>
.national {
  width: 392px;
  height: 138px;
  position: relative;
  background-color: #ffffff;
  border-radius: 5px;
  background-image: url("https://web.moocollege.com/mooc/hzq/vueskin/assets/npskin/worksresult.png");
  background-size: contain;
  background-repeat:no-repeat;
  text-align: left;
  box-shadow: 0 0 8px 4px #eeeeee;
     &::after{
    content: " ";
    display: block;
    position: absolute;
    right: 128px;
    top: 100px;
    border: 6px solid;
    border-color: transparent transparent transparent #fff;
  }
  &:hover {
    .list {
      display: block;
    }
  }
  .list {
    left: 50%;
    margin-left: -75px;
    top: 50%;
    text-align: center;
    background-color: #D93D51;
    margin-top: 50px;
    width: 140px;
    position: absolute;
    z-index: 10;
    display: none;
    &::after{
    content: " ";
    display: block;
    position: absolute;
    right: 0;
    background-color: #D93D51;
    z-index: 9;
    top: -19px;
    border: 6px solid;
    border-color: #fff transparent transparent transparent;
  }
    &:hover{
          display: block;
    }
  }
  .btn {
    color: #fff;
    font-size: 14px;
    letter-spacing: 1.27px;
    opacity: 0.7;
     cursor: pointer;
    padding: 5px;
    &:hover {
      opacity: 1;
    }
  }
}
</style>