<template>
    <div class="user">
        <user ref="profile" isSkin v-if="already"/>
    </div>
</template>

<script>
import user from '@@/views/personalCenter/profile/user/index.vue'
import network from "@/api/index";
export default {
    data(){
        return{
            already:true
        }
    },
    components:{
        user
    },
    async created(){
        // let already = await network.getUserAlready();
        // if (already == "error") {
        //     this.already = false
        //     return this.$router.push("/");
        // }

        // this.already = already
        // if (already) {
        //     this.$router.push("/apply/signup");
        // }
    }
}
</script>
<style lang="less" scoped>
.user{
    text-align: left;
}
</style>

