<template>
  <div class="demo">
    <div v-for="(item,i) in lists" :key="i">
      <h1 style=""><span></span>{{item.name}}</h1>
      <ul >
        <li v-for="(list,index) in item.rankList" :key="index">
          <div class="name dian" v-html="list.schoolName"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    props:['lists', 'type'],
};
</script>

<style lang="less" scoped>
h1{
  text-align: left;
  font-size: 18px;
  color: #4a4a4a;
  letter-spacing: 1.29px;
  line-height: 24px;
  padding-left: 20px;
  margin-bottom: 20px;
  span{
    width: 5px;
    height: 20px;
    display: inline-block;
    margin-right: 11px;
    background: #00b8e2;
    vertical-align: middle;
  }
}
ul {
  padding: 0 40px 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  li {
    flex: 0 0 25%;
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    .name {
      font-size: 16px;
      color: #4a4a4a;
      letter-spacing: 0;
      text-align: left;
    }
  }
  li:nth-child(4n){
        border: none;
        margin-right: 0;
  }
}
</style>