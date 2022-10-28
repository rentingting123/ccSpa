<template>
    <div class="development">
        <h title="竞赛排行"></h>
        <div class="main">
            <div class="left">
                <rank type=2 />
            </div>
            <hair class="right"/>

            <div class="hover" @click="$router.push('/competition')">
                <p>
                    <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/nskin/20210517/right.png">
                    查看更多内容
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import h from '@/nskin/components/h'
import hair from './common/hair'
import rank from '../rank'
export default {
    components:{
        h,
        hair,
        rank,
    },
}
</script>

<style lang='less' scoped>
.development{
    background: #fff;
    .main{
        width: 1200px;
        height: 393px;
        background: #F2F7F7;
        padding: 33px 48px 39px;
        margin-top: 14px;
        font-size: 0;
        text-align: left;
        position: relative;
        .right{
            width: 530px;
            height: 321px;
            background: rgba(0, 0, 0, 0.05);
            display: inline-block;
            vertical-align: top;
        }
        .left{
            display: inline-block;
            vertical-align: top;
            margin-right: 70px;
        }
        .hover{
            width: 0;
            height: 393px;
            background: rgba(237, 30, 38, 0.9);
            position: absolute;
            top: 0;
            left: 0;
            cursor: pointer;
            transition: 1s width;
            overflow: hidden;
            p{
                width: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0;
                color: #000000;
                margin-top: 168px;
                img{
                    height: 0;
                    width: auto;
                    margin-right: 16px;
                }
            }
        }
        &:hover{
            .hover{
                width: 304px;
                p{
                    width: 304px;
                    font-size: 19px;
                    img{
                        height: 33px;
                    }
                }
            }
        }
    }
}
</style>