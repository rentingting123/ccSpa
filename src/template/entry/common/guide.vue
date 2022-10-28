<template>
    <div @click="$router.push('/details/entryGuide')" v-if='item==2 && skin.guide'>
        <div :style="`background-image:url(${skin.guide})`" class="ContestBanner img"></div>
        <div class="main" :class="{top:index==1}">
        <h2>{{$t('skin.guide')}}</h2>
        <a>{{$t('skin.raceIntroduceMore')}}></a>
        <div class="line"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['skin','item','index']
}
</script>

