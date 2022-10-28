<template>
  <div class="demo">
    <div v-for="(item,i) in lists">
      <h1 style=""><span></span>{{item.name}}</h1>
      <ul >
        <li v-for="list,index in item.rankList" >
          <div class="name dian" v-html="list.schoolName"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    props:['lists'],
};
</script>

<style lang="less" scoped>
.demo{
  padding-top: .3rem;
}
h1{
  text-align: left;
  font-size: .36rem;
  color: #4a4a4a;
  line-height: .48rem;
  margin-bottom: .40rem;
  span{
    width: .1rem;
    height: .40rem;
    display: inline-block;
    margin-right: .22rem;
    background: #00b8e2;
    vertical-align: middle;
  }
}
ul {
  padding: 0 0 1.2rem;
  li {
    display: inline-block;
    padding-bottom: .20rem;
    min-width: 50%;
    .name {
      font-size: .32rem;
      color: #4a4a4a;
      letter-spacing: 0;
      text-align: left;
      display: inline-block;
    }
  }
}
</style>