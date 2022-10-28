<template>
    <div class="school">
        <div >
            <h1 class="title title2">合作院校
                <ul class="type">
                    <li :class="{'on':type==1}" @click="typechange(1)">本科院校<p class="line"></p></li>
                    <li :class="{'on':type==0}" @click="typechange(0)">高职院校<p class="line"></p></li>
                </ul>
                <p>&nbsp;</p>
            </h1>
            <div>
                <div class="main">
                    <div class="header clearfix " >
                        <i class="iconfont pre" :class="{'no':page==1}"  @click="pre">&#xe69d;</i>
                        <ul class="clearfix">
                            <li v-for="school in schools" :key="school.id" :title="school.name" @click="$router.push('/schooldetail/'+school.id)">
                                <img v-if="school.logo" :src="school.logo">
                                <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/schoollogo.png">
                            </li>
                        </ul>
                        <i class="iconfont next" :class="{'no':page==pages}"  @click="next">&#xe69b;</i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import network from '@/api/index'
export default {
    data(){
        return{
            page: 1,
            pages: 1,
            size: 14,
            schools:[],
            type: 1,
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let res = await network.getAllSchools({data:{
                type: this.type,
                page:this.page,
                size: this.size,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.schools = res.schoolList;
            this.total = res.total;
            this.pages = res.pages;
        },
        typechange(type){
            this.type = type;
            this.page = 1;
            this.init();
        },
        pre(){
            if(this.page>1){
                this.page--;
                this.init();
            }
        },
        next(){
            if(this.page<this.pages){
                this.page++;
                this.init();
            }
        }
    }
}
</script>


<style lang="less" scoped>
.school{
    width: 100%;
    margin-top: 30px;
    background: #FFFFFF;
    >div{
        width: 1171px;
        margin: 0 auto;
        >div{
            position: relative;
            width: 100%;
            .main{
                padding: 35px 0 0;
                .header{
                    ul{
                        width: 1146.5px;
                        min-height: 236.56px;
                        display: inline-block;
                        li{
                            width: 136.1px;
                            height: 89.1px;
                            margin-right: 32.3px;
                            float: left;
                            position: relative;
                            margin-bottom: 29.2px;
                            cursor: pointer;
                            img{
                                max-width: 100%;
                                max-height: 100%;
                            }
                        }
                        li:nth-child(7n){
                            margin-right: 0;
                        }
                    }
                    i{
                        display: inline-block;
                        font-size: 44px;
                        color: #ccc;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        cursor: pointer;
                    }
                    .pre{
                        left: -20px;
                    }
                    .next{
                        right: -20px;
                    }
                    i:hover{
                        color: #999;
                    }
                    i.no:hover{
                        color: #ccc;
                    }
                }
            }
            .message{
                background: #FFFFFF;
                box-shadow: 0 2px 12px 0 rgba(220,220,220,0.50);
                border-radius: 10px;
                width: 1130px;
                min-height: 200px;
                margin: 0 auto;
            }
        }
    }
}

</style>
