<template>
  <div class="header">
      <el-button class="icon-wrapper" v-if="getAsideShow" @click="changeShowStatus" size="mini" type="text">
        侧边栏展开<i class="el-icon-d-arrow-right"></i>
      </el-button>
      <el-button class="icon-wrapper" v-else @click="changeShowStatus" size="mini" type="text">
        <i class="el-icon-d-arrow-left"></i>侧边栏折叠
      </el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  components: {},
  computed: {
    ...mapGetters([
      'getAsideShow'
    ])
  },
  data () {
    return {

    };
  },
  methods: {
    changeShowStatus () {
      let newStatus = !this.$store.state.system.asideShow;
      this.$store.commit('asideShow', newStatus);
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
  .header {
    width: 100%;
    height: 100%;
    text-align: left;

    .icon-wrapper {
      font-size: 15px;
    }
  }
</style>
