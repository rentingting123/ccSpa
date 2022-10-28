<template>
<el-dialog
  title="图片编辑"
  :visible.sync="dialogVisible"
  width="60%">
  <vue-avatar
      :width="parseInt(width)"
      :height="parseInt(height)"
      ref="vueavatar"
      @vue-avatar-editor:image-ready="onImageReady"
      :image="image"
    ></vue-avatar>
    <br />
    <vue-avatar-scale
      ref="vueavatarscale"
      @vue-avatar-editor-scale:change-scale="onChangeScale"
      :width="250"
      :min="1"
      :max="3"
      :step="0.02"
    ></vue-avatar-scale>
    <br />
    <img src id="img-1" />
    <button v-on:click="saveClicked">裁剪</button>
</el-dialog>
</template>
<script>
import VueAvatar from "./VueAvatar.vue";
import VueAvatarScale from "./VueAvatarScale.vue";

export default {
    props:{
        width:{
            type:[Number,String],
            default: 400
        },
        height:{
            type:[Number,String],
            default: 400
        },
        image:{
            type: String,
            default: 'https://web.moocollege.com/mooc/hzq/vueskin/assets/home/logo3.png'
        },
    },
  components: {
    VueAvatar,
    VueAvatarScale
  },
  data(){
      return{
          dialogVisible: true,
      }
  },
  methods: {
    onChangeScale(scale) {
      this.$refs.vueavatar.changeScale(scale);
    },
    saveClicked() {
      var img = this.$refs.vueavatar.getImageScaled();
      console.log(img.toDataURL())
      // use img
    },
    onImageReady(scale) {
      this.$refs.vueavatarscale.setScale(scale);
    }
  }
};
</script>