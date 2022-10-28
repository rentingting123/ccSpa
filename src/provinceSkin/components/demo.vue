<template>
  <div class="upload_box">
    <input type="file" name="file" id="file" accept="image/*" @change="imgChange(this);" /> 

    <el-dialog title="提示" :visible.sync="dialogVisible" :append-to-body="true" width="400">
         <canvas id="canvas" ref="canvas" width="200" height="200"></canvas>
    </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            dialogVisible: false,
        }
    },
    methods: {
        imgChange(obj) {
            this.dialogVisible = true;
            this.$nextTick(()=>{
                var canvas = document.getElementById("canvas");
                var ctx = canvas.getContext("2d");
                var imgUrl = window.URL.createObjectURL(
                    document.getElementById("file").files[0]
                );
                var img = new Image();
                img.src = imgUrl;
                img.onload = function() {
                    ctx.translate(100,100);
                    ctx.beginPath();
                    ctx.fillRect(-90,-90,180,180);
                    ctx.clip();
                    
                    ctx.drawImage(img, 0, 0,180, 180);
                };
            })
        },
    }
};
</script>

<style lang="less" scoped>
</style>