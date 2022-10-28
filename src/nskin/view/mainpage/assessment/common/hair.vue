<template>
    <ul>
        <li>
            <div>参与高校数</div>
            <p>{{list && list.school || 0}}</p>
        </li>
        <li>
            <div>举办竞赛</div>
            <p>{{list && list.competition || 0}}</p>
        </li>
        <li>
            <div>参赛人数</div>
            <p>{{list && list.person || 0}}</p>
        </li>
        <li>
            <div>提交作品</div>
            <p >{{list && list.works || 0 }}</p>
        </li>
        <li >
            <div>参赛队伍数</div>
            <p>{{list && list.teams || 0}}</p>
        </li>
        
        <li >
            <div>纳入排行榜国赛</div>
            <p>57</p>
        </li>
    </ul>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    data(){
        return{
            list:{}
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            // 20210519 要求改成cc
            let res = await network.getNumbers()
            if(res=='error') return;
            this.list = res
        }
    }
}
</script>
<style lang="less" scoped>
ul{
    width: 100%;
    font-size: 0;
    padding: 22px 28px 0;
    li{
        width: 220px;
        height: 84px;
        background: #FFFFFF;
        box-shadow: 0px 0px 15px rgba(237, 30, 38, 0.4);
        opacity: 1;
        border-radius: 8px;
        display: inline-block;
        vertical-align: top;
        margin-right: 30px;
        margin-bottom: 14px;
        text-align: center;
        div{
            height: 22px;
            font-size: 17px;
            line-height: 22px;
            color: #4A4A4A;
            margin: 10px 0 9px;
        }
        p{
            height: 31px;
            font-size: 23px;
            line-height: 31px;
            color: #D0021B;
        }
        &:nth-child(2n){
            margin-right: 0;
        }
        &.last{
            height: 278px;
            margin: 0;
            float: right;
            div{
                margin-top: 106px;
            }
        }
    }
}
</style>