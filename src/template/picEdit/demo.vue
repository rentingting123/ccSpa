<template>
    <div>
         <input type="file" @change="change" accept=".gif,.jpg,.jpeg,.png"/>
        <imgedit v-if="imgshow" width=400 height=100 :image='image'/>
    </div>
</template>
<script>
import imgedit from '@/template/picEdit'

export default {
    components:{
        imgedit,
    },
    data(){
        return{
            imgshow: false,
            image: ''
        }
    },
    methods:{
        change(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (e) => {
                this.image = e.target.result
                this.imgshow = true
            };
        }
    }
}
</script>
