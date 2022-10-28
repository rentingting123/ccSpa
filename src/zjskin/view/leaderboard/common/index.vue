<template>
    <div class="common">
        <div class="logo" :style="`background-image:url(${bg})`" >
            <h1>{{title}}</h1>
            <p>共<span>{{num}}</span>个竞赛</p>
        </div>
        <ul >
            <li v-for="list in lists">{{list.name}}</li>
        </ul>
        <div style="text-align:center;margin-top:10px;">
            <el-pagination layout="prev, pager, next" :total="total"> </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            bg:'',
            title:'',
            num: 0,
            lists:[
                {
                    id:1,
                    name:'1111'
                },
                {
                    id:2,
                    name:'1111'
                },
                {
                    id:3,
                    name:'1111'
                },
                {
                    id:4,
                    name:'1111'
                },
                {
                    id:5,
                    name:'1111'
                },
                {
                    id:6,
                    name:'1111'
                },
            ],
            page: 1,
            total: 50
        }
    },
    props:['type'],
    created(){
        this.init();
    },
    methods:{
        init(){
            
            this.bg = `https://web.moocollege.com/mooc/hzq/vueskin/assets/zjskin/leader/bg${this.type%2}.png')`
            
            if(this.type==1){
                this.title = '纳入省A类竞赛'
            }else if(this.type==2){
                this.title = '申请省级竞赛'
            }else if(this.type==3){
                this.title = '纳入排行榜竞赛'
            }else if(this.type==4){
                this.title = '申请排行榜竞赛'
            }

        }
    }
}
</script>

<style lang='less' scoped>
.common{
    width: 566px;
    height: 469px;
    background: #F9FAFB;
    text-align: left;
    .logo{
        width: 100%;
        height: 112px;
        background-size: cover;
        
        h1{
            font-size: 37px;
            color: #FFFFFF;
            letter-spacing: 2.31px;
            padding: 20px 0 0 58px;
            margin-bottom: 0 !important;
        }
        p{
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: 1px;
            margin: 0 0 0 58px;
        }
    }
    ul{
        width: 494px;
        margin: 0 auto;
        li{
            line-height: 50px;
            font-size: 18px;
            color: #4A4A4A;
            letter-spacing: 1.12px;
            border-bottom: 1px solid #EBEBEB;
            cursor: pointer;
        }
    }

}
</style>
<style lang="less">
.el-dialog, .el-pager li{
    background: none;
}
.el-pagination .btn-next, .el-pagination .btn-prev,.el-pagination button:disabled{
    background: none;
}
</style>