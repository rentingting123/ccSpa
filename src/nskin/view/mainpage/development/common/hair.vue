<template>
    <ul>
        <li class="last">
            <div>+1教师竞赛 </div>
            <p>{{list && list.teachersCompetition || 0 }}</p>
        </li>
        <li class="add">
            <div>01 教师团队</div>
            <p>{{ list && list.teacherTeam || 0}}</p>
        </li>
        <li class="add">
            <div>02 教改项目</div>
            <p >{{list && list.educationalProject || 0}}</p>
        </li>
        <li class="add">
            <div>03 教材项目</div>
            <p >{{list && list.textbookProject || 0 }}</p>
        </li>
        <li >
            <div>04 教学论文</div>
            <p >{{list && list.teachingPaper || 0}}</p>
        </li>
        <li >
            <div>05 教学成果奖</div>
            <p >{{list && list.teachingAchievementAward || 0}}</p>
        </li>
        <li >
            <div>06 教师培训基地</div>
            <p >{{list && list.teacherTrainingBase || 0 }}</p>
        </li>
        
    </ul>
</template>

<script>
import network from '@/api/index'
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
            let res = await network.getStatisticsTeacherDevelopment({data:{
                provinceId: 1,
                type: 0,
                version: '2021本科教发6+1',
            }})
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
    padding: 23px 24px 0;
    li{
        width: 142px;
        height: 83px;
        background: #FFFFFF;
        box-shadow: 0px 0px 15px rgba(237, 30, 38, 0.4);
        opacity: 1;
        border-radius: 8px;
        display: inline-block;
        vertical-align: top;
        margin-right: 28px;
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