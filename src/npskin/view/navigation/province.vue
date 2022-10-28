<template>
    <div class="national" @click="$router.push('/datacenter/divisionseries')">
      {{title||'省市分区赛'}}
    </div>
</template>

<script>
export default {
    props:["title"],
}
</script>

<style lang="less" scoped>
.national{
    width: 392px;
    height: 138px;
    background-color: #ffffff;
    border-radius: 5px;
    background-image: url('https://web.moocollege.com/mooc/hzq/vueskin/assets/npskin/province.png');
    background-size: contain;
    box-shadow: 0 0 8px 4px #eeeeee;
    text-align: center;
    font-size: 20px;
    color: #fff;
    letter-spacing: 4px;
    line-height: 210px;
    cursor: pointer;
    h2{
        margin: 28px 0 4px 25px;
        font-size: 24px;
        color: #363636;
        letter-spacing: 4px;
    }
    p{
        margin: 0 0 0 25px;
        font-size: 16px;
        color: #4A4A4A;
        letter-spacing: 2.67px;
        line-height: 25px;
    }

}
</style>