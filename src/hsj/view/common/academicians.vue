<template>
    <ul>
        <li v-for="(list,index) in academicianlist" :key="list.id" :style="{'margin-right': (index+1)%5==0?'0':height?'30px':'37px'}">
            <img :src="list.logo" />
            <div class="mess">
                <div>
                    <h2>{{list.name}}</h2>
                    <p>
                        <span v-for="(item,index) in list.jobs" :key="item"><span v-if="index!=0">，</span>{{item}}</span>
                    </p>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
import {academician, academician1} from '@/hsj/mock/academician'
export default {
    props: ['height'],
    computed:{
        academicianlist(){
            if(this.height){
                return academician1
            }
            return academician
        }
    }
}
</script>

<style lang="less" scoped>
ul{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    align-content:flex-start;
    margin-top: 16px;
    li{
        width: 150px;
        height: 274px;
        overflow: hidden;
        margin-right: 37px;
        margin-bottom: 20px;
        background:rgba(245,245,245,1); 
        position: relative;
        &:hover{
            
            .mess{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 2;
                >div{
                    width: 100%;
                    padding: 0 10px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
                h2,p,span{
                    color: #ffffff;
                }
                h2{
                    text-align: center;
                    font-size: 18px;
                    margin-bottom: 20px;
                }
                p{
                    font-size: 14px;
                }
            }
        }
        img{
            width: 150px;
            height: 210px;
            position: relative;
            z-index: 1;
        }
        .mess{
            width:150px;
            height:auto;
            padding: 5px 8px;
            h2{
                font-size:14px;
                font-weight:500;
                color:rgba(74,74,74,1);
                line-height:20px;
                letter-spacing:1px; 
            }
            p{
                text-align: justify;
                text-justify: newspaper;
                word-break: break-all;
                // display: inline-block;
                // text-align-last:justify;
                // text-align:justify;
                // text-justify:distribute-all-lines; // 这行bai必加，兼容ie浏览器
                span{
                    font-size:13px;
                    font-weight:400;
                    color:rgba(118,122,125,1);
                    line-height:18px;
                }
            }
        }
        &:nth-child(5n){
            margin-right: 0;
        }
        &:last-child{
            margin-right: 0;
        }
    }
}
</style>