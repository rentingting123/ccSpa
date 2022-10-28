<template>
    <div class="provincial">
        <h2Title title='全部竞赛' more='true' path='/competition?tags=4'/>
        <ul>
            <li v-for="item in lists" :key="item.id">
                <div class="competition-card">
                    <div class="img-wrapper">
                        <img :src="item.bannerOne" />
                    </div>
                    <div class="competition-intro">
                        <span class="hot">火热报名</span>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import h2Title from '@/pskin4/components/h2'
import competition from '@/pskin4/components/competition'
import network from '@/api/index'

export default {
    components:{
        h2Title,
        competition,
    },
    data(){
        return{
            page: 1,
            size: 6,
            tags: '4',
            lists: [],
            year: new Date().getFullYear(),
            years: [],
            open: '',
        }
    },
    created(){
        this.getYears()
        this.init()
    },
    methods:{
        setOpen(val){
            this.open = val
            this.init()
        },
        setYear(val){
            this.year = val
            this.init(val)
        },
        async getYears(){
            let res = await network.getProbinceYearList({data:{
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error' || !res || res==[]) return this.years.push(this.year);
            this.years = res;
        },

        async init(year=this.year){
            let res = await network.getCompetitionA({data:{
                provinceId: localStorage.getItem('competitionId'),
                year: year,
                open: this.open
            }});
            if(res=='error' || res=={} || !res) return;

            let arr1 = res.competitionList1 || []
            arr1 = arr1.map(item=>{
            return {
                'sort': 0, // 省A
                ...item
            }
            })
            let arr2 = res.competitionList2 || []
            arr2 = arr2.map(item=>{
            return {
                'sort': 1, //省其他
                ...item
            }
            })
            this.lists =  arr1.concat(arr2);
            this.lists = [{ name: 'aaaa', bannerOne: 'https://oss.moocollege.com/5544/webFile/嘉兴赛区_jA6MHmJs_1618242978738.jpg' },
            { name: '智能网汽车设计赛项', bannerOne: 'https://oss.moocollege.com/5544/webFile/嘉兴赛区_jA6MHmJs_1618242978738.jpg' },
            { name: '飞行器设计仿真赛项', bannerOne: 'https://oss.moocollege.com/5544/webFile/嘉兴赛区_jA6MHmJs_1618242978738.jpg' },
            { name: '智能网汽车设计赛项', bannerOne: 'https://oss.moocollege.com/5544/webFile/嘉兴赛区_jA6MHmJs_1618242978738.jpg' },
            { name: '飞行器设计仿真赛项', bannerOne: 'https://oss.moocollege.com/5544/webFile/嘉兴赛区_jA6MHmJs_1618242978738.jpg' },
            { name: '医学技术虚拟仿真数字建模。。。。', bannerOne: 'https://oss.moocollege.com/5544/webFile/嘉兴赛区_jA6MHmJs_1618242978738.jpg' }]

            if(this.lists.length>8){
                this.lists.length = 8
            }
        }
    }
}
</script>

<style lang="less" scoped>
.provincial{
    width: 1100px;
    margin: 0 auto;
    margin-top: 27px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(227,227,227,0.94);
    .competition-card {
        border: 1px solid #e4e4e4;
        .competition-intro {
            padding: 12px 16px;
        }
        .hot {
            background-color: #ffa41c;
            border-radius: 10px 10px 10px 0;
            color: white;
            margin-right: 4px;
            padding: 1px 4px;
        }
    }
    .competition-intro {}
    ul{
        padding: 17px;
        text-align: left;
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li{
            width: 32%;
            display: inline-block;
            vertical-align: top;
            margin-right: 18px;
            margin-bottom: 16px;
            .img-wrapper {
                overflow: hidden;
            }
            img {
                width: 100%;
                &:hover {
                    transform: scale(1.1);;
                }
            }
            &:nth-child(3n){
                margin-right: 0;
            }

        }
    }
}
</style>
