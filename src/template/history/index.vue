<template>
    <div class="history">
        <div class="titleContent">
            <h3>{{$t('skin.history')}}</h3>
            <p>HISTORY</p>
        </div>

        <div class="main">
            <el-button class="pre " :disabled="pageNum<=1"  @click="pre" type="text"><<<</el-button>
            <el-button class="pre next" :disabled="pageNum>=this.pages" @click="next" type="text">>>></el-button>
            <ul class="lists">
                <li class="list" v-for="(list,index) in lists" :key="index" @click="linkto(list)">
                    <time>{{list.year}}</time>
                    <div class="line"><p></p></div>
                    <div class="line1"></div>
                    <div class="detail">
                        <h1>{{list.hostCity | city}}</h1>
                        <div >
                            <h4>{{$t('skin.sponsor')}}</h4>
                            <p>{{list.sponsor}}</p>
                            <h4>{{$t('skin.organization')}}</h4>
                            <p>{{list.organization}}</p>
                            <h4>{{$t('skin.secretariat')}}</h4>
                            <p>{{list.secretariat}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            pageNum:1,
            pageSize:5,
            pages:0,
            lists:[]
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let param = {
                page:this.pageNum,
                size:this.pageSize,
                competitionId: this.$store.state.skin.id
            }
            let result =  await network.getOverTheYears({data:param});
            if(result=='error') return;
            this.pages = result.pages
            this.lists = result.list

        },
        async linkto(item){
            if(!item.competitionId) return;
            let res = await network.checkSkinEnableById({data:{
                id: item.competitionId
            }})
            if(res=='error') return;
            if(res && res.url){
                window.open('http://'+res.url)
            }
        },
        pre(){
            this.pageNum = this.pageNum - 1
        },
        next(){
            this.pageNum = this.pageNum + 1
        }
    },
    watch:{
        pageNum(val){
            this.init();
        }
    },
    filters:{
        city(val){
            if(!val) return '';
            let str = val.replace(/[null|undefined| |,]/g, '')
            if(!str) return ''
            return str

        }
    }
}
</script>



<style lang="less" scoped>
.history{
    width: 100%;
    height: 540px;
    min-width: 1300px;
    background: url("https://web.moocollege.com/mooc/hzq/vueskin/assets/historybg.png") no-repeat;
    .titleContent {
      width: 100%;
      text-align: center;
      padding-top: 55px;
      margin-bottom: 46px;

      h3 {
        font-weight: bold;
        font-size: 36px;
        color: #ffffff;
        text-align: center;
        margin-bottom: 10px;
      }

      p {
        font-size: 14px;
        color: #ffffff;
        text-align: center;
        margin: 0 0 10px;
      }
    }
    .main{
        max-width: 1300px;
        margin: 0 auto;
        text-align: center;
        .lists{
            display: inline-block;
            max-width: 1155px;
            margin: 0 auto;
            .list{
                display: inline-block;
                width: 231px;
                height: 300px;
                text-align: center;
                cursor: pointer;
                time{
                    font-size: 30px;
                    color: #FFFFFF;
                    line-height: 45px;
                }
                .line{
                    width: 100%;
                    border: 2px solid #FFFFFF;
                    position: relative;
                    z-index: 1;
                    p{
                        position:absolute;
                        width: 14px;
                        height: 14px;
                        border-radius: 100%;
                        left: 50%;
                        top: 50%;
                        background: #FFFFFF;
                        transform: translateX(-50%) translateY(-50%);
                        z-index: 2;
                    }
                }
                .line1{
                    border: 1px dashed #FFFFFF;
                    height: 38px;
                    width: 0px;
                    margin: 0 auto;
                }
                .detail{
                    width: 180px;
                    height: 200px;
                    background: #FFFFFF;
                    border-radius: 10px;
                    overflow: hidden;
                    margin: 0 auto;
                    h1{
                        background: #000000;
                        line-height: 54px;
                        min-height: 54px;
                        overflow: hidden;
                        font-size: 20px;
                        color: #FFFFFF;
                    }
                    >div{
                        font-size: 14px;
                        color: #000000;
                        padding: 10px 0;
                        h4{
                            font-size: 12px;
                            color: #000000;
                            letter-spacing: 0.52px;
                            text-align: center;
                            margin-top: 5px;
                        }
                        p{
                            padding: 0 5px;
                            font-size: 12px;
                            color: #000000;
                            letter-spacing: 0.52px;
                            text-align: center;
                            height: 21px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
        }
        .pre{
            float: left;
            color: #ffffff;
            font-size: 22px;
            margin-top: 20px;
            // cursor: pointer;
        }
        .next{
            float: right;
        }

    }
}
</style>
