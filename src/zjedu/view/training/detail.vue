<template>
    <div class="trainingdetail">
        <div class="top">
            <img :src="banner" alt="">
            <div>
                <h2>{{title}}</h2>
                <p v-html="message"></p>
                <el-button type="primary" size="small">{{status==1?'立即报名':'已报名'}}</el-button>
            </div>
        </div>
        <ul class="navs">
            <li v-for="item in types" :key="item.value" :class="{'on':item.value==type}" @click="changeType(item)">
                {{item.name}}
            </li>
        </ul>
        <div class="bottom">
            <div class="left">
                <backgroundComponent v-if="type==1" :datas='background'/>
                <expertComponent v-else-if="type==2" :datas='expert'/>
                <themeComponent v-else-if="type==3" :datas='theme'/>
                <sentenceComponent v-else-if="type==4" :datas='sentence'/>
                <componyComponent v-else-if="type==5" :datas='compony'/>
            </div>
            <div class="right">
                <h3>精彩回顾</h3>
                <video :src="video" controls></video>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import backgroundComponent from './common/background'
import expertComponent from './common/expert'
import themeComponent from './common/theme'
import sentenceComponent from './common/sentence'
import componyComponent from './common/compony'
export default {
    components:{
        backgroundComponent,
        expertComponent,
        themeComponent,
        sentenceComponent,
        componyComponent,
    },
    data(){
        return{
            type: 1,
            types: [
                {
                    value: 1,
                    name: '项目背景',
                },
                {
                    value: 2,
                    name: '专家简介',
                },
                {
                    value: 3,
                    name: '主题讲授',
                },
                // {
                //     value: 4,
                //     name: '专家金句',
                // },
                {
                    value: 5,
                    name: '合作单位',
                }
            ],
            banner: '',
            title: '',
            message: '',
            status: '',
            background: '',
            expert: [],
            theme: '',
            sentence: [],
            compony: '',
            video: '',
            id: 1
        }
    },
    created(){
        this.id = this.$route.params.id || 1
        this.getData();
    },
    methods:{
        async getData(){
            let res = await network.getZjeduCourseById({data:{
                id: this.id,
            }})
            if(res=='error') return;

            this.banner = res && res.banner || ''
            this.title = res && res.title || ''
            this.message = res && res.message || ''
            this.status = res && res.status || ''
            this.background = res && res.background || ''
            this.expert = res && res.expert || []
            this.theme = res && res.theme || ''
            this.sentence = res && res.sentence || []
            this.compony = res && res.compony || ''
            this.video = res && res.video || ''

            this.sentence.length > 0 && this.types.splice(3, 0, {value: 4, name: '专家金句'});

        },
        changeType(item){
            // console.log(item);
            // this.$router.push('/training/'+this.id+'?type='+item.value)
            this.type = item.value
        }
    }
}
</script>

<style lang='less' scoped>
.trainingdetail{
    padding-top: 30px;
    margin: 0 auto;
    background: #F8F8FB;
    .top{
        width: 1200px;
        margin: 0 auto;
        background: #ffffff;
        padding: 36px 30px 30px;
        border-bottom: 1px solid #EBEBEB;
        img{
            width: 472px;
            height: 266px;
            vertical-align: top;
        }
        >div{
            width: 640px;
            height: auto;
            margin-left: 20px;
            display: inline-block;
            vertical-align: top;
            text-align: left;
            h2{
                font-size: 30px;
                font-weight: 400;
                color: #303132;
                line-height: 42px;
                margin: 12px 0 21px;
            }
            p{
                height: 150px;
                font-size: 14px;
                font-weight: 400;
                color: #303132;
                line-height: 20px;
            }
        }
    }
    .navs{
        width: 1200px;
        margin: 0 auto;
        height: 60px;
        background: #fff;
        text-align: left;
        li{
            width: 104px;
            line-height: 60px;
            margin: 0 30px;
            display: inline-block;
            vertical-align: top;
            position: relative;
            border-bottom: 2px solid #fff;
            text-align: center;
            font-size: 14px;
            color: #4A4A4A;
            font-weight: bold;
            cursor: pointer;
            &.on{
                color: #1DBD76;
                border-bottom: 2px solid #1DBD76;
            }
        }
    }
    .bottom{
        width: 1200px;
        margin: 20px auto;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        .left{
            width: 864px;
            height: auto;
            background: #fff;
        }
        .right{
            width: 320px;
            height: 234px;
            background: #fff;
            border-radius: 2px;
            h3{
                font-size: 18px;
                font-weight: 500;
                color: #4A4A4A;
                line-height: 52px;
                margin-left: 22px;
                text-align: left;
            }
            video{
                width: 100%;
                height: 182px;
                overflow: hidden;
                background: #000;
            }
        }
    }
}
</style>
