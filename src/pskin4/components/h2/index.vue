<template>
    <div class="h2title">
        <div>
            <h2>{{title}}</h2> 
            <i class="el-icon-bottom-right h2right"></i>

            <el-select v-if="years" v-model="year" placeholder="请选择" @change="changeYear" size="mini" style="margin-left:20px;vertical-align: middle">
                <el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
            </el-select>

            <ul v-if="open=='' || open" class="open">
                <li v-for="list in openList" :key="list.id" :class="list.type==open?'on':''" @click='setOpen1(list.type)'>
                    {{list.name}}
                    <p></p>
                </li>
            </ul>

        </div>
        <div >
            <!-- <p class="turn" v-if="more">
                <i @click="onPre" class="el-icon-arrow-left left"></i> 
                <i @click="onNext" class="el-icon-arrow-right right"></i>
            </p> -->
            <span class="more" v-if="more" @click="toMore">查看更多</span>
        </div>
    </div>
</template>

<script>
export default {
    props:[
        'title', 'more', 'pre', 'next', 'path', 'years', 'setYear', 'open', 'setOpen'
    ],
    data(){
        return{
            year: new Date().getFullYear(),
            openList:[
                {
                    name: '全部',
                    id: 4,
                    type: ''
                },
                {
                    name: '开放式',
                    id: 0,
                    type: '0'
                },
                {
                    name: '半开放式',
                    id: 1,
                    type: '1'
                },
                {
                    name: '封闭式',
                    id: 2,
                    type: '2'
                },
                {
                    name: '半封闭式',
                    id: 3,
                    type: '3'
                },
            ]
        }
    },
    methods:{
        setOpen1(val){
            this.setOpen && this.setOpen(val)
        },
        changeYear(val){
            this.setYear && this.setYear(val)
        },
        onPre(){
            this.pre && this.pre()
        },
        onNext(){
            this.next && this.next()
        },
        toMore(){
            if(!this.path) return;
            this.$router.push({path:this.path})
        }
    }
    
}
</script>

<style lang="less" scoped>
.h2title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding: 0 15px;
    color: #B0B1B2;
    display: flex;
    justify-content: space-between;
    align-content: center;
    border-bottom: 1px solid #E4E4E4;
    >div{
        display: flex;
        justify-content: flex-start;
        align-content: center;
    }
    h2{
        font-size:16px;
        font-weight:bold;
        color: #006EE6;
    }
    .h2right{
        font-size: 12px;
        margin-left: 4px;
        line-height: 40px;
    }
    .turn{
        margin-right: 10px;
        i{
            display: inline-block;
            width: 20px;
            line-height: 20px;
            background:rgba(240,240,240,1);
            border:1px solid rgba(255,255,255,1);
            text-align: center;
            cursor: pointer;
        }
    }
    .more{
        font-size:12px;
        font-weight:400;
        color:rgba(176,177,178,1);
        cursor: pointer;
    }
    .open{
        margin-left: 40px;
        li{
            width: auto;
            line-height: 40px;
            position: relative;
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            margin: 0 15px;
            color: #000000;
            p{
                width: 100%;
                height: 2px;
                background: #006EE6;
                position: absolute;
                bottom: 0;
                left: 50%;
                -webkit-transform: translateX(-50%);
                transform: translateX(-50%);
                display: none;
            }
            &.on{
                color: #006EE6;
                p{
                    display: block;
                }
            }
        }
    }

}
</style>

<style lang="less">
.h2title{
    .el-input--mini .el-input__inner {
        width: 100px;
        background: #006EE6;
        color: #ffffff;
    }
    .el-select .el-input .el-select__caret{
        color: #ffffff;
    }
}
</style>