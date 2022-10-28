<template>
    <div class="online">
        <!-- 轮播图 -->
        <banner :banners='banners'/>
        <h2>新商业人才培养计划</h2>
        <div class="business">
            <p v-html="businessMess" class="data"></p>
            <chart :options='option' v-if="this.option.series[0].data[0].value.length>0" style="width:468px;height: 500px"/>
        </div>
        <navs :datas='businessNavs'/>

        <div class="line"></div>

        <h2>新技术人才培养计划</h2>
        <div v-html="technologyMess" class="technologyMess"></div>
        <navs :datas='technologyNavs' style="padding-top: 26px;"/>

    </div>
</template>

<script>
import ECharts from 'vue-echarts'
import banner from '@/zjedu/components/banner'
import navs from './common/navs'
import network from '@/api'
export default {
    components:{
        banner,
        navs,
        chart: ECharts
    },
    data(){
        return{
            businessNavs:[],
            technologyNavs: [],
            technologyMess:'',
            banners:[],
            businessMess: '',
            maps: [],
            option:{
                tooltip: {},
                legend: {
                    data: ['初级', '中极', '高级'],
                    top: '0',
                    right: '0'
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: []
                },
                series: [{
                    name: '',
                    type: 'radar',
                    data: [
                        {
                            value: [],
                            name: '初级'
                        },
                        {
                            value: [],
                            name: '中极'
                        },
                        {
                            value: [],
                            name: '高级'
                        },
                    ]
                }]
            }
        }
    },
    async created(){
        let res = await network.getZjeduOnline();
        if(res=='error') return;
        this.banners = res && res.banners || []
        this.businessNavs = res && res.businessNavs || []
        this.technologyNavs = res && res.technologyNavs || []
        this.maps = res && res.maps || []
        this.businessMess = res && res.businessMess || ''
        this.technologyMess = res && res.technologyMess || ''
        this.setOption()
    },
    methods:{
        setOption(){
            let arr = [],data1 = [],data2 = [],data3 = []
            this.maps && this.maps.map(res=>{
                arr.push({
                    name: res.item,
                    max: 6
                })
                data1.push(res['初级'])
                data2.push(res['中级'])
                data3.push(res['高级'])
            })
            this.option.radar.indicator = arr;
            this.option.series[0].data[0].value = data1
            this.option.series[0].data[1].value = data2
            this.option.series[0].data[2].value = data3
        }
    }
}
</script>

<style lang='less' scoped>
.online{
    h2{
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        padding: 36px 0 16px;
    }
    .business{
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .data{
            width: 744px;
            height: auto;
            font-size: 18px;
            font-weight: 400;
            color: #303132;
            line-height: 35px;
            text-align: left;
            margin-right: 30px;
        }

    }
    .line{
        width: 100%;
        height: 11px;
        background: #F2F2F2;
    }
    .technologyMess{
        width: 1200px;
        margin: 0 auto;
        font-size: 17px;
        font-weight: 400;
        color: #303132;
        line-height: 35px;
        text-align: left;
    }
}
</style>