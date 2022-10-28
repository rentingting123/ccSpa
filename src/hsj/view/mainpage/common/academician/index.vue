<template>
    <ul>
        <li v-for="list in academicianlist" :key="list.id">
            <img :src="list.logo" />
            <div>
                <h2>{{list.name}}</h2>
                <p>
                    <span v-for="(item,index) in list.jobs" :key="item"><span v-if="index!=0">,</span>{{item}}</span>
                </p>
            </div>
        </li>
    </ul>
</template>

<script>
import {mainpageacademician} from '@/hsj/mock/academician'
export default {
    props:['length'],
    computed:{
        academicianlist(){
            if(this.length){
                mainpageacademician.length = this.length
            }
            return mainpageacademician
        }
    }
}
</script>

<style lang="less" scoped>
ul{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 16px;
    li{
        width: 203px;
        height: 241px;
        margin-right: 20px;
        img{
            width: 203px;
            height: 115px;
        }
        >div{
            width:204px;
            height:126px;
            background:rgba(245,245,245,1); 
            padding: 5px 8px;
            h2{
                font-size:14px;
                font-weight:500;
                color:rgba(74,74,74,1);
                line-height:20px;
                letter-spacing:1px; 
            }
            p{
                span{
                    font-size:13px;
                    font-weight:400;
                    color:rgba(118,122,125,1);
                    line-height:18px;
                }
            }
        }
        &:last-child{
            margin-right: 0;
        }
    }
}
</style>