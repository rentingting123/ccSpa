<template>
    <div :style="{color: '#fff'}">
        <h1>运营工具</h1>
        <div class="person">
            <el-avatar icon="el-icon-user-solid"></el-avatar>
            <!-- <Avatar icon="ios-person" size="large" /> -->
            <p @click="out">退出</p>
        </div>
    </div>
</template>

<script>
export default {
    methods:{
        out(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="less" scoped>
.person{
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 50px;
    /deep/.el-avatar{
        margin-top: 10px;
    }
    p{
        width: 100%;
        height: 50px;
        line-height: 50px;
        position:absolute;
        top:0;
        bottom:0;
        transform: translateY(64px);
        background-color:#515a6e;
        display: none;
        cursor: pointer;
    }
}
.person:hover{
    p{
        display: block;
    }
}

</style>

