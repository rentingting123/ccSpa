<template>
    <ul>
        <li v-for="list in lists" :class="list.links?'point':''" :key="list.id" @click="toHref(list)">
            {{list.name}}
        </li>
    </ul>
</template>

<script>
export default {
    props:['lists'],
    methods:{
        toHref(item){
            if(!item.links) return;
            window.open(item.links)
        }
    }
}
</script>

<style lang="less" scoped>
ul{
    width: 100%;
    height: auto;
    li{
        width: 100%;
        font-size:14px;
        font-weight:400;
        color:rgba(74,74,74,1);
        line-height:21px;
        letter-spacing:1px;
        margin-top: 10px;
        
        &.point{
            &:hover{
                color: #760118;
            }
            cursor: pointer;
        }
    }
}

</style>