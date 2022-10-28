<template>
    <div class="competitions">
        <provincial />
        <div class="bottom">
            <nation />
            <calendar />
        </div>
    </div>
</template>

<script>
import provincial from "./competition-provincial";
import nation from "./competition-nation";
import calendar from "./competition-calendar";

export default {
    components:{
        provincial,
        nation,
        calendar,
    }
}
</script>

<style lang="less" scoped>
.competitions{
    width: 1100px;
    margin: 0 auto;
    .bottom{
        width: 1100px;
        margin: 0 auto;
        margin-top: 27px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
}
</style>