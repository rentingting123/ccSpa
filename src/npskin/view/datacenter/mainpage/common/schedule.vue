<template>
    <div class="active">
        <h2 class="title">
            <p>竞赛日程</p>
            <span @click="tomore">more</span>
        </h2>
        <div>
            <ul id="activeul">
                <li v-for="list,index in lists" :class="{'on':list.type==0}" v-if="list.name">
                    <div>
                        <p>
                            {{list.startTime | date}}
                            <span class="container">
                                <span class="corner"></span>
                            </span>
                        </p>
                        <p>{{list.endTime | date}}</p>
                    </div>
                    <p class="dian" :title="list.name">{{list.name}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>


<script>
import moment from 'moment'
import network from '@/api'
export default {
    data(){
        return{
            lists:[],
            groupId: ''
        }
    },
    created(){
        this.groupId = localStorage.getItem('groupId');
        if(!this.groupId) return;
        this.getlist(this.groupId)
    },
    methods:{
        async getlist(id){
            let res = await network.npgetTimes({data:{groupId:id}});
            if(res=='error') return;
            let date = new Date().getTime();
            // 当前时间做对比
            for(let i in res){
                if(new Date(res[i].startTime).getTime()<=date && date<=new Date(res[i].endTime).getTime()){
                    res[i].on = true
                }else{
                    res[i].on = false
                }
            }
            this.lists = res;
            this.setlength();
        },
        // 设置ul长度
        setlength(){
            document.getElementById('activeul').style.width = this.lists.length * 91 + 'px';
        },
        tomore(){
            window.open('https://cc.moocollege.com/')
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('MM.DD');
        }
    }
}
</script>

<style lang="less" scoped>
.active{
    width: 440px;
    height: 172px;
    // overflow: hidden;
    >div{
        width: 100%;
        // height: 100%;
        overflow-x: auto;
    }
    ul{
        text-align: left;
        margin-top: 24px;
        li{
            width: 75px;
            display: inline-block;
            vertical-align: top;
            margin-right: 16px;
            >div{
                width: 70px;
                height: 84px;
                border-radius: 5px;
                line-height: 84px;
                text-align: center;
                box-shadow: 5px 6px 0 0 #DDDEDE;
                p{
                    width: 100%;
                    height: 42px;
                    line-height: 42px;
                    font-size: 16px;
                    color: #4A4A4A;
                    letter-spacing: 1.45px;
                    text-align: center;
                    position: relative;
                }
                p:nth-child(2n+1){
                    background: #EAEAEA;
                    border-radius: 5px 5px 0 0;
                }
                p:nth-child(2n){
                    border-radius: 0 0 5px 5px;
                }
                .container {
                    display: block;
                    position:absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: -10px;
                    width: 6px;
                }
                .corner {
                    display: block;
                    width: 0px;                 /*  宽高设置为0，很重要，否则达不到效果 */
                    height: 0px;
                    border: 6px solid #EAEAEA;
                    border-bottom-color: transparent;    /* 设置透明背景色 */
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
            }
            >p{
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0.52px;
                margin-top: 8px;
                text-align: center;
            }
        }
        // li:nth-child(5n){
        //     margin-right: 0;
        // }
        li.on{
            
            >div{
                border: 1px solid #0041AB;
                p:nth-child(2n+1){
                    background: #0041AB;
                    color: #FFFFFF;
                }
                .corner{
                    border: 6px solid #0041AB;
                    border-bottom-color: transparent;    /* 设置透明背景色 */
                    border-left-color: transparent;
                    border-right-color: transparent;
                }
            }
        }
    }

}
</style>