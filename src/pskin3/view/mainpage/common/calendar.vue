<template>
  <div class="date">
    <div class="datetop">
        <i @click="onPre" class="el-icon-arrow-left left"></i> 
        <span>{{year}}年</span>
        <i @click="onNext" class="el-icon-arrow-right right"></i>
    </div>
    <ul>
        <li v-for="item in monthlist" :key="item.id" :class="month==item.id?'on':''" @click="monthChoose(item.id)">
            {{item.name}}
        </li>
    </ul>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    props:['setMonth'],
    data(){
        return{
            monthlist:[
                {
                    name: '一月',
                    id: '01'
                },
                {
                    name: '二月',
                    id: '02'
                },
                {
                    name: '三月',
                    id: '03'
                },
                {
                    name: '四月',
                    id: '04'
                },
                {
                    name: '五月',
                    id: '05'
                },
                {
                    name: '六月',
                    id: '06'
                },
                {
                    name: '七月',
                    id: '07'
                },
                {
                    name: '八月',
                    id: '08'
                },
                {
                    name: '九月',
                    id: '09'
                },
                {
                    name: '十月',
                    id: '10'
                },
                {
                    name: '十一月',
                    id: '11'
                },
                {
                    name: '十二月',
                    id: '12'
                },
            ],
            year: '',
            month: '',
        }
    },
    created(){
        this.year = new Date().getFullYear()
        this.month = new Date().getMonth() + 1
    },
    methods:{
        onPre(){
            this.year--
        },
        onNext(){
            this.year++
        },
        monthChoose(id){
            this.month = id
        }
    },
    computed:{
        date(){
            return this.year+'-'+this.month
        }
    },
    watch:{
        date(val){
            
            // let end = moment(val).endOf('month').format('YYYY-MM-DD');
            // let start = moment(val).startOf('month').format('YYYY-MM-DD');
            // let normal = moment(val).format('YYYY-MM');
            // let normal =  moment(val).startOf('year').format('YYYY-MM-DD');
            // console.log(normal)
            // this.setMonth && this.setMonth(JSON.stringify([start,end]))
            this.setMonth && this.setMonth(val)
        }
    }

}
</script>

<style lang="less" scoped>
.date{
    width:514px;
    height:117px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(215,215,215,1);
    margin: 0 auto;
    margin-top: 10px;
    .datetop{
        padding: 13px 60px 10px;
        display: flex;
        justify-content: space-between;
        align-content: center;
        i{
            display: inline-block;
            width: 20px;
            line-height: 20px;
            background:rgba(240,240,240,1);
            border:1px solid rgba(255,255,255,1);
            text-align: center;
            cursor: pointer;
        }
    }
    ul{
        li{
            width: 75px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            display: inline-block;
            vertical-align: top;
            margin-bottom: 5px;
            color: #767a7d;
            cursor: pointer;
            &.on{
                color: #0078E2;
            }
        }
    }
}
</style>