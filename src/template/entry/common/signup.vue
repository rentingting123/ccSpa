<template>
    <div>
        <div @click="join" v-if='item==1 && skin.signup'>
            <div :style="`background-image:url(${skin.signup})`" class="ContestBanner img"></div>
            <div class="main" :class="{top:index==1}">
            <h2>{{$t('skin.signup')}}</h2>
            <a>{{$t('skin.raceIntroduceMore')}}></a>
            <div class="line"></div>
            </div>
        </div>

    </div>
</template>

<script>
// import { getUserInfo } from '@@/utils/commons'
// import { tologin } from '@@/utils/util' 
// import network from "@@/api/jxapi/index";
export default {
    data(){
        return{
            user:{},
        }
    },
    methods:{
        async join() {
                this.$router.push("/apply");  
        },
        close(type) {
            return () => {
                this[type] = false;
            };
        }
    },
    props:['skin','item','index']
}
</script>
