<template>
    <div@click="$router.push({name:'manual',query:{url:encodeURIComponent(skin.pdf)}})" v-if='item==3 && skin.manual'>
        <div :style="`background-image:url(${skin.manual})`" class="ContestBanner img"></div>
        <div class="main" :class="{top:index==1}">
        <h2>{{$t('skin.manual')}}</h2>
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

