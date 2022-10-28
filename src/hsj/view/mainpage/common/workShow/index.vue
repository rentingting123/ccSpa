<template>
    <div>
        <ul class="yearslist">
            <li v-for="(item, index) in navs" :key="item.id" :class="index==on?'on':''" @click="on=index">
                {{item.times}}
                <p></p>
            </li>
            <li @click="toMore">更多</li>
        </ul>
        <workslist :lists='lists' />
    </div>
</template>

<script>
import workslist from '@/hsj/components/workslist'
export default {
    components:{
        workslist
    },
    data(){
        return{
            navs: [
                // {
                //     times: '2020',
                //     id: 0,
                //     lists: [
                //         {
                //             id: 1,
                //             img: '',
                //             name: '六行智能采棉机 ',
                //             company: '铁建重工新疆有限公司',
                //             time: '2019年'
                //         },
                //         {
                //             id: 2,
                //             img: '',
                //             name: '芯片制造抛光装备与成套工艺',
                //             company: '天津华海清科机电科技有限公司',
                //             time: '2019年'
                //         },
                //         {
                //             id: 3,
                //             img: '',
                //             name: '深水海上风机超大型自升自航式安装平台',
                //             company: '启东中远海运海洋工程有限公司、南通润邦重机有限公司',
                //             time: '2019年'
                //         },
                //         {
                //             id: 4,
                //             img: '',
                //             name: '“陕西北人”电子束（EB）胶印机设计',
                //             company: '陕西北人印刷机械有限责任公司',
                //             time: '2019年'
                //         }
                //     ]
                // },
                {
                    times: '2019',
                    id: 1,
                    lists: [
                       {
                            id: 1,
                            img: 'http://bj-good-design.oss-cn-beijing.aliyuncs.com/8a2135df576f69ef01576fd11f4b0002/picture_1571625305024.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '邦先生智能晾衣机 ',
                            company: '杭州邦先生科技有限公司、杭州博乐工业设计股份有限公司',
                            time: '2019年'
                        },
                        {
                            id: 2,
                            img: 'http://bj-good-design.oss-cn-beijing.aliyuncs.com/8a2135df576f69ef01576fd11f4b0002/picture_1571626534636.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '工业园区VOC废气综合净化处理装备设计',
                            company: '成都泰山环保科技有限公司、西南石油大学',
                            time: '2019年'
                        },
                        {
                            id: 3,
                            img: 'http://bj-good-design.oss-cn-beijing.aliyuncs.com/8a2135df576f69ef01576fd11f4b0002/picture_1571625421624.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '鲲鹏易飞无人机',
                            company: '昆山鲲鹏易飞无人机科技有限公司',
                            time: '2019年'
                        },
                        {
                            id: 0,
                            img: 'http://bj-good-design.oss-cn-beijing.aliyuncs.com/8a2135df576f69ef01576fd11f4b0002/picture_1571626514188.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '全景式空轨列车',
                            company: '中车南京浦镇车辆有限公司',
                            time: '2019年'
                        }
                    ]
                },
                {
                    times: '2018',
                    id: 2,
                    lists: [
                        {
                            id: 4,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/8a049826458236b20145881f237d0005/picture_1545704656282.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '大跨径柔性吊装技术 ',
                            company: '武汉武船重型装备工程有限责任公司',
                            time: '2018年'
                        },
                        {
                            id: 5,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/8a049826458236b20145881f237d0005/picture_1545703195747.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '光伏直驱变频空调系统研发及应用',
                            company: '珠海格力电器股份有限公司',
                            time: '2018年'
                        },
                        {
                            id: 6,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/8a049826458236b20145881f237d0005/picture_1545702891507.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '农业全程机械化云管理服务平台',
                            company: '中国农业机械化科学研究院',
                            time: '2018年'
                        },
                        {
                            id: 7,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/8a049826458236b20145881f237d0005/picture_1545702609324.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '500米口径射电望远镜柔性并联索驱动系统技术及装备',
                            company: '中国科学院长春光学精密机械与物理研究所',
                            time: '2018年'
                        }
                    ]
                },
                {
                    times: '2017',
                    id: 3,
                    lists: [
                        {
                            id: 8,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/8a049826458236b20145881f237d0005/picture_1512830760370.png?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '六行智能采棉机 ',
                            company: '大连华锐重工集团股份有限公司、中国科学院国家天文台',
                            time: '2017年'
                        },
                        {
                            id: 9,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/8a049826458236b20145881f237d0005/picture_1512831434187.png?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '“复兴号”中国标准动车组',
                            company: '中国铁路',
                            time: '2017年'
                        },
                        {
                            id: 10,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/e8005fbcb26c4c16b9d036b51b0fb1db/picture_1506417511659.jpg?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '储能式轨道交通绿色设计',
                            company: '中车株洲电力机车有限公司',
                            time: '2017年'
                        },
                        {
                            id: 11,
                            img: 'https://bj-good-design.oss-cn-beijing.aliyuncs.com/8a049826458236b20145881f237d0005/picture_1512831857533.png?x-oss-process=image/resize,limit_0,m_lfit,w_0,h_162/interlace,1',
                            name: '“神威太湖之光”超级计算机',
                            company: '国家并行计算机工程技术研究中心',
                            time: '2017年'
                        }
                    ]
                },
            ],
            on: '0'
        }
    },
    methods:{
        toMore(){
            window.open('http://cgd.ckcest.cn/exhibit/home')
        }
    },
    computed:{
        lists(){
            return this.navs[this.on].lists || []
        }
    }
}
</script>

<style lang="less" scoped>
.yearslist{
    width: 100%;
    height: auto;
    margin: 17px 0 19px;
    display: flex;
    justify-content: center;
    align-content: center;
    li{
        position: relative;
        font-size:16px;
        font-weight:400;
        color:rgba(74,74,74,1);
        line-height:22px;
        letter-spacing:1px;
        margin: 0 23px;
        cursor: pointer;
        p{
            display: none;
            width:0;
            height:0;
            border-right:5px solid transparent;
            border-left:5px solid transparent;
            border-bottom:5px solid rgba(159,5,33,1);
            text-align: center;
            position: absolute;
            bottom: -3px;
            left: 50%;
            transform: translateX(-50%);
        }
        &.on{
            color: #9F0521;
            p{
                display: block;
            }
        }
    }
}

</style>