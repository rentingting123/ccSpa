<template>
    <div class="mb">
        <h2 style="font-size:18px;padding-left:15px;">B站视频</h2>
        <div class="bzhan">
            <div class="top">
                <div class="video" v-html="iframe"></div>
                <div class="main">
                    <h3 class="ellipse">{{obj && obj.title}}</h3>
                    <p class="ellipse2">{{obj && obj.desc}}</p>
                    <div>
                        <span><i class="iconfont">&#xe6f8;</i> {{obj && obj.stat && obj.stat.like}}</span>
                        <span><i class="iconfont">&#xe6fa;</i> {{obj && obj.stat && obj.stat.coin}}</span>
                        <span><i class="iconfont">&#xe6f7;</i> {{obj && obj.stat && obj.stat.favorite}}</span>
                        <span><i class="iconfont">&#xe6f9;</i> {{obj && obj.stat && obj.stat.share}}</span>
                    </div>
                </div>
            </div>
            <div class="bottom" @click="topath">
                <i class="iconfont">&#xe6f6;</i>{{url}}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    props:['objectInfo'],
    data(){
        return{
            url: '',
            iframe: '',
            obj: {},
        }
    },
    created(){
        this.url = this.objectInfo && this.objectInfo.burl || ''
        this.iframe = this.objectInfo && this.objectInfo.embeddedCode || ''
        this.getBase();
    },
    methods:{
        getBase(){
            if(!this.iframe) return;
            let bvid = this.iframe.match(/bvid=(\S*)&cid/)[1]
            this.$api.get('b/view?bvid='+bvid).then(res=>{
                this.obj = res && res.data || {}
            })
        },
        topath(){
            if(this.url){
                window.open(this.url)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.ellipse{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.ellipse2{
    display: -webkit-box; /*作为弹性伸缩盒子模型显示*/
    -webkit-line-clamp: 2; /*显示的行数；如果要设置2行加...则设置为2*/
    overflow: hidden;
    text-overflow: ellipsis; /* 溢出用省略号*/
    /*! autoprefixer: ignore next */
    -webkit-box-orient: vertical;/*伸缩盒子的子元素排列：从上到下*/
}
.bzhan{
    width: 894px;
    margin: 0 auto;
    padding: 15px;
    .top{
        width: 100%;
        height: 190px;
        background: #FFFFFF;
        box-shadow: 0px 4px 8px 0px rgba(101, 101, 101, 0.26);
        border-radius: 5px;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .video{
            width: 300px;
            height: 150px;
            overflow: hidden;
            background: #eeeeee;
        }
        .main{
            width: 490px;
            text-align: left;
            h3{
                width: 100%;
                height: 23px;
                font-size: 18px;
                font-weight: 500;
                color: #4A4A4A;
                line-height: 23px;
            }
            p{
                width: 100%;
                height: 48px;
                font-size: 14px;
                font-weight: 400;
                color: #9F9F9F;
                line-height: 24px;
                margin: 8px 0 10px;
            }
            >div{
                text-align: right;
                height: 23px;
                color: #4A4A4A;
                line-height: 23px;
                font-size: 14px;
                font-weight: 400;
                span{
                    margin-left: 20px;
                    i{
                        font-size: 14px;
                        color: #000000;
                        margin-right: 8px;
                    }
                }
            }
        }
    }
    .bottom{
        width: 100%;
        height: 28px;
        background: #F5F5F5;
        margin-top: 16px;
        font-size: 14px;
        font-weight: 400;
        color: #4A4A4A;
        line-height: 28px;
        cursor: pointer;
        i{
            font-size: 16px;
            color: #000000;
            margin: 0 10px 0 18px;
        }
    }
}
</style>