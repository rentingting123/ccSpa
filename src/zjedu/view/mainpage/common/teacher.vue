<template>
    <div class="teacher">
        <h2>名师空间</h2>
        <div class="teachershows">
            <i class="iconfont pre" :class="{'no':page==1}"  @click="pre">&#xe69d;</i>
            <ul id="teachershows">
                <li v-for="item,i in datas" :key="i">
                    <div class="teachermain">
                        <img :src="item.avatar" wid="50px" height="50px">
                        <h3>{{ item.name }}</h3>
                        <p v-for="job,j in item.jobs" :key="j">
                            {{job}}
                        </p>
                    </div>
                </li>
            </ul>
            <i class="iconfont next" :class="{'no':page==pages-3}"  @click="next">&#xe69b;</i>
        </div>
    </div>
</template>

<script>
export default {
    props: ['datas'],
    data(){
        return{
            page: 1,

        }
    },
    methods:{
        pre(){
            if(this.page==1) return;
            this.page--;
            document.getElementById('teachershows').style.left = 0 - 306 * (this.page-1) + 'px'
        },
        next(){
            if(this.page==this.pages-3) return;
            this.page++
            document.getElementById('teachershows').style.left = 0 - 306 * (this.page-1) + 'px'
        }
    },
    computed:{
        pages(){
            let i = this.datas.length
            this.$nextTick(()=>{
                document.getElementById('teachershows').style.width = i * 306 +'px'
            })
            return i
        }
    }
}
</script>

<style lang='less' scoped>
.teacher{
    width: 1200px;
    margin: 0 auto;
    h2{
        font-size: 26px;
        font-weight: 500;
        color: #303132;
        line-height: 37px;
        text-align: left;
        margin: 20px 0;
    }
    .teachershows{
        width: 1200px;
        overflow: hidden;
        position: relative;
        ul{
            height: 301px;
            width: 1224px;
            position: relative;
            left: 0;
            transition: 0.5s;
            li{
                display: inline-block;
                vertical-align: top;
                margin-right: 26px;
            }
        }
        i{
            display: inline-block;
            font-size: 44px;
            color: #ccc;
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 3;
            &.pre{
                left: 0;
            }
            &.next{
                right: 0;
            }
        }
        i:hover{
            color: #999;
        }
        i.no:hover{
            color: #ccc;
        }
    }
    .teachermain{
        width: 280px;
        height: 301px;
        background: #FFFFFF;
        border: 1px solid #E6E6E6;
        img{
            width: 80px;
            height: 80px;
            border-radius: 100%;
            margin: 27px auto 15px;
        }
        h3{
            font-size: 16px;
            font-weight: 500;
            color: #303132;
            line-height: 22px;
            margin-bottom: 14px;
        }
        p{
            font-size: 12px;
            font-weight: 400;
            color: #9B9B9B;
            line-height: 20px;
        }
    }
}
</style>