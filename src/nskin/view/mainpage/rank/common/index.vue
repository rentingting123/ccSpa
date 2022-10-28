<template>
    <div class="rank" :class="{'on':num==2}">
        <h2>
            {{title}}
            <span>{{logo}}</span>
        </h2>
        <ul>
            <li v-for="list in lists" :key="list.index">
                <!-- <img class="prize" v-if="list.index==1" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/01.png"/>
                <img class="prize" v-else-if="list.index==2" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/02.png"/>
                <img class="prize" v-else-if="list.index==3" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/prize/03.png"/> -->
                <div class="num" :class="{'c1':type==2}">
                   <p>{{list.index}}</p> 
                </div>
                <div class="name dian" :class="{'weight':list.index<=3}">{{list.schoolName}}</div>
                <p class="score">
                    <span>{{list.score}} </span>
                    <img v-if="list.floatingRanking>0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/up.png" >
                    <img v-else-if="list.floatingRanking<0" src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/down.png" >
                    <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/type/line.png" >
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import network from '@/api/index'
export default {
    props:['type','num'],
    data(){
        return{
            logo: '本科',
            lists:[],
            title: '2020年教师发展指数',
            version: ''
        }
    },
    created(){
        if(this.num==1){
            this.logo = '本科';
        }else{
            this.logo = '高职';
        }
        
        if(this.type==1 && this.num==1){
            this.title = '2021年教师发展指数'
            this.version = '2021本科教发6+1'
        }else if(this.type==1 && this.num==2){
            this.title = '2021年教师发展指数'
            this.version = '2021高职教发6+1'
        }else if(this.type==2 && this.num==1){
            this.title = '2017-2021高校学生竞赛'
            this.version = '学生竞赛本科2017-2021'
        }else{
            this.title = '2017-2021高校学生竞赛'
            this.version = '学生竞赛高职2017-2021'
        }


        this.init()

    },
    methods:{
        async init(){
            let res = await network.getHomepageTeachersDevelopment({data:{
                provinceId: 1,
                page: 1,
                size: 7,
                version: this.version
            }});
            if(res=='error') return;
            this.lists = res.list;
        },
        tomore(){
            if(this.type==1){
                this.$router.push('/development?type='+this.num)
            }else{
                this.$router.push('/assessment?type='+this.num)
            }
        }
    }
}
</script>

<style lang="less" scoped>
.rank{
    width: 250px;
    height: 321px;
    padding-right: 29px;
    border-right: 1px solid #E8E8E8;
    h2{
        text-align: left;
        position: relative;
        font-size: 15px;
        line-height: 20px;
        color: #8E9191;
        span{
            border: 1px solid #AFB3B3;
            display: inline-block;
            width: 40px;
            height: 20px;
            line-height: 20px;
            font-size: 14px;
            color: #ACB0B0;
            letter-spacing: 0;
            text-align: center;
            text-indent: 0;
            float: right;
        }
    }
    ul{
        margin-top: 31px;
        li{
            width: 221px;
            height: 37px;
            line-height: 37px;
            .prize{
                width: 28px;
                height: 28px;
                margin-right: 10px;
                display: inline-block;
                vertical-align: top;
                margin-top: 6px;
            }
            .num{
                width: 28px;
                height: 28px;
                margin-right: 10px;
                display: inline-block;
                vertical-align: top;
                p{
                    margin: 9px 4px;
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 100%;
                    background: #171A25;
                    font-size: 16px;
                    color: #FFFFFF;
                    text-align: center;
                }
            }
            .name{
                width: 120px;
                font-size: 14px;
                color: #4A4A4A;
                letter-spacing: 0;
                text-align: left;
                display: inline-block;
                vertical-align: top;
            }
            .score{
                font-size: 14px;
                color: #9C9C9C;
                letter-spacing: 0.88px;
                vertical-align: middle;
                display: inline-block;
                vertical-align: top;
                span{
                    width: 42px;
                    display: inline-block;
                    text-align: left;
                }
                i{
                    font-size: 10px;

                }
                .up{
                    color: #DB4759;
                }
                .down{
                    color: #00AA91;
                }
                img{
                    width: 8px;
                }
            }
            &:nth-child(2n+1){
                background: #E6EBEB;
            }
        }
    }
    &.on{
        border: none;
        padding-left: 29px;
        padding-right: 0;
    }
}
</style>