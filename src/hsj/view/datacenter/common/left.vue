<template>
    <div class="left">
        <p class="name">{{obj.name}}</p>
        <ul v-if="obj.childs">
            <li v-for="item in obj.childs" :key="item.id" :class="on==item.id?'on':''" @click="change(obj, item)">
                <a :href="'#'+item.id">
                    {{item.name}}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['obj','on','changeNav'],
    methods:{
        change(list, l){
            this.changeNav && this.changeNav(list,l)
        }
    },
}
</script>

<style lang="less" scoped>
    .left{
        width: 230px;
        height: auto;
        background: #EEEEEE;
        text-align: left;
        .name{
            padding: 0 20px;
            line-height: 67px;
            background: #C71E23;
            font-size:20px;
            font-weight:bold;
            color:rgba(255,255,255,1);
            letter-spacing:1px;
        }
        ul{
            padding: 0 20px;
            li{
                font-size:14px;
                font-weight:400;
                line-height:39px;
                letter-spacing:1px;
                border-bottom: 1px dotted #ADABAB;
                a{
                    color:rgba(74,74,74,1);
                }
                &:last-child{
                    border-bottom: 0px dotted #ADABAB;
                }
                &.on{
                    a{
                        color: #9F0521;
                    }
                }
            }
        }
    }
</style>