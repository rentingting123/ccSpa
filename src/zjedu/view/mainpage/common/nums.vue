<template>
    <ul >
        <li v-for="item in datas" :key="item.id">
            <div>
                <p class="num">{{item.num}}</p>
                <p class="count">
                    <span>+</span>
                    <span>{{item.count}}</span>
                </p>
            </div>
            <p>{{item.title}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['datas'],
}
</script>

<style lang='less' scoped>
ul{
    width: 1200px;
    margin: 0  auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li{
        text-align: center;
        &:nth-child(1){
            text-align: left;
            >p{
                text-align: center;
            }
        }
        &:nth-child(4){
            text-align: right;
        }
        >div{
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            
            .num{
                font-size: 70px;
                font-weight: 500;
                color: #096AF2;
                line-height: 108px;  
                margin-right: 13px;
            }
            .count{
                span:first-child{
                    font-size: 44px;
                    font-weight: 400;
                    color: #096AF2;
                    line-height: 68px;
                    display: block;
                }
                span:last-child{
                    font-size: 18px;
                    font-weight: 400;
                    color: #4A4A4A;
                    line-height: 25px;
                    letter-spacing: 2px;
                    position: relative;
                    top: -8px;
                }
            }

        }
        >p{
            font-size: 18px;
            font-weight: 500;
            color: #4A4A4A;
            line-height: 25px;
            letter-spacing: 2px;
        }
    }
}
</style>