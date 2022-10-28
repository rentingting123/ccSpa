<template>
    <div class="workslist">
        <ul>
            <li v-for="list in lists" :key="list.id">
                <img :src="list.img" />
                <div class="mess">
                    <h2 class="dian" :title="list.name">{{list.name}}</h2>
                    <p class="dian" :title="list.company">单位：{{list.company}}</p>
                    <p>时间：{{list.time}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['lists']
}
</script>

<style lang="less" scoped>
ul{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 37px;
    li{
        width: 203px;
        height: 183px;
        margin-right: 21px;
        &:last-child{
            margin-right: 0;
        }
        &:hover{
            .mess{
                background: #000;
                h2,p{
                    color: #ffffff;
                }
            }
        }
        img{
            width: 203px;
            height: 115px;
        }
        .mess{
            width:100%;
            height:68px;
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
                font-size:13px;
                font-weight:400;
                color:rgba(118,122,125,1);
                line-height:18px;
                letter-spacing:1px;
            }
        }
    }
}
</style>