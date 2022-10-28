<template>
    <div>
        <div class="title">宣讲直播回放</div>
        <!-- <swiper ref="mySwiper" :options="swiperOptions" class="ul">
            <swiper-slide v-for="item in datas" :key="item.id" >
                <li :class="{'on':item.id==id}" >
                    <div class="mess">
                        <p class="dian">{{item.activityTitle}}</p>
                        <time class="dian">{{item.startTime | times}}~{{item.endTime | times}}</time>
                    </div>
                </li>
            </swiper-slide>
        </swiper> -->
        <ul class="ul">
            <li v-for="item in datas" :key="item.id" :class="{'on':item.id==id}" @click="choose(item)">
                <div class="mess">
                    <p class="dian">{{item.activityTitle}}</p>
                    <time class="dian">{{item.startTime | times}}~{{item.endTime | times}}</time>
                </div>
            </li>
        </ul>
        <div class="navs">
            <p  @click="next" :class="{'disabled': nextPage==0}">
                <i class="el-icon-arrow-down"></i>
            </p>
            <p @click="prev" :class="{'disabled': page <= 1}">
                <i class="el-icon-arrow-up"></i>
            </p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['datas', 'page', 'close', 'changePage', 'id', 'nextPage'],
    data(){
        let this_ = this
        return{
            swiperOptions: {
                loop: false,
                direction: 'vertical',
                preventClicks : false,//用于防止触摸时触发链接跳转
                slideToClickedSlide: true,
                slidesPerView: 6,
                autoplay: {
                    disableOnInteraction: true,
                    delay: 3000
                },
                on:{
                    click:function(e){
                        if(e.clickedIndex==0 || e.clickedIndex){
                            this_.choose(this_.datas[e.clickedIndex])
                        }
                    }
                }

            }
        }
    },
    methods:{
        prev(){
            if(this.page <= 1) return;
            this.changePage && this.changePage(this.page-1)
        },
        next(){
            if(this.nextPage == 0) return;
             this.changePage && this.changePage(this.page+1)
        },
        choose(item){
            this.close && this.close(item)
        }
    },
    filters:{
        times(val){
            if(!val) return;
            return moment(val).format('YYYY/MM/DD HH:mm')
        }
    }
}
</script>

<style lang='less' scoped>
.title{
    width: 100%;
    height: 60px;
    background: #E6EBEB;
    line-height: 60px;
    font-size: 30px;
    color: #D60D16;
    text-align: center;
    letter-spacing: 10px;
    font-weight: bold;
    border-bottom: 1px solid #F6F6F6;
}
.navs{
    text-align: left;
    font-size: 0;
    p{
        display: inline-block;
        vertical-align: top;
        width: 50%;
        height: 40px;
        font-size: 19px;
        font-weight: 400;
        color: #ffffff;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        background: #515151;
        font-weight: bold;
        &:hover{
            background: #D60D16;
        }
        &.disabled{
            cursor: no-drop;
        }
    }
}
.ul{
    width: auto;
    height: 360px;
    overflow: hidden;
    background: #E6EBEB;
    li{
        width: 352px;
        height: 60px;
        background: none;
        overflow: hidden;
        cursor: pointer;
        padding: 0 17px 0 0;
        &::before{
            content: '';
            width: 9px;
            height: 60px;
            background: #E6EBEB;
            float: left;
            margin-right: 16px;
        }
        .mess{
            width: calc(100% - 25px);
            text-align: left;
            display: inline-block;
            vertical-align: top;
            p{
                width: 100%;
                font-size: 18px;
                line-height: 24px;
                color: #4A4A4A;
                margin: 9px 0 3px;
            }
            time{
                display: block;
                width: 100%;
                height: 19px;
                font-size: 14px;
                line-height: 19px;
                color: #B8B8B8;
                text-align: left;
            }
        }
        &.on{
            background: #F6F6F6;
            &::before{
                background: red;
            }
            .mess{
                p{
                    color: #D60D16;
                }
            }
        }
    }
}

</style>