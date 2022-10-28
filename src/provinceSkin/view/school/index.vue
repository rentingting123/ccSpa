<template>
    <div class="school">
        <h1><i class="iconfont">&#xe678;</i>合作院校</h1>
        <div >
            <div>
                <div class="main">
                    <div class="header clearfix " >
                        <i class="iconfont" :class="{'no':page==1}"  @click="pre">&#xe69d;</i>
                        <ul class="clearfix">
                            <li v-for="school in schools" :key="school.id" :class="{'on':id==school.id}" @click="showdetail(school.id)">
                                <img v-if="school.logo" :src="school.logo" width="100%" height="100%">
                                <img v-else src="https://web.moocollege.com/mooc/hzq/vueskin/assets/provinceSkin/schoollogo.png" width="100%" height="100%">
                                <p></p>
                            </li>
                        </ul>
                        <i class="iconfont" :class="{'no':page==pages}"  @click="next">&#xe69b;</i>
                    </div>
                    <div class="message">
                        <detail :detail="detail"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import detail from './common/detail'
import network from '@/api/index'
export default {
    components:{
        detail
    },
    data(){
        return{
            page: 1,
            pages: 1,
            size: 7,
            schools:[],
            detail:{},
            id: '',
        }
    },
    created(){
        this.init();
    },
    methods:{
        async init(){
            let res = await network.getAllSchools({data:{
                page:this.page,
                size: this.size,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
            this.schools = res.schoolList;
            this.id = this.schools[0].id;
            this.total = res.total;
            this.pages = res.pages;
            this.showdetail();
        },
        async showdetail(id){
            if(id){
                this.id = id
            }
            let res = await network.getSchoolDetail({data:{
                id: this.id,
            }});
            if(res=='error') return;
            this.detail = res;
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
    margin-top: 50px;
    h1{
        width: 1280px;
        margin: 0 auto 30px;
        padding: 0 40px;
    }
    >div{
        width: 100%;
        background: #F9FAFB;
        >div{
            width: 1280px;
            margin: 0 auto;
            padding: 0 40px;
            .main{
                padding: 35px 0;
                .header{
                    height: 85.5px;
                    line-height: 85.5px;
                    margin: 35px 0 24px 0;
                    ul{
                        width: 1000px;
                        height: 100%;
                        display: inline-block;
                        li{
                            width: 132.6px;
                            height: 85.5px;
                            margin-right: 11.4px;
                            float: left;
                            position: relative;
                            cursor: pointer;
                            p{
                                width: 24px;
                                height: 4px;
                                margin: 0 auto;
                                background: #0078E2;
                                display: none;
                                position: relative;
                                top: 20px;
                            }
                        }
                        li.on{
                            p{
                                display: block;
                            }
                        }
                        li:nth-child(7n){
                            margin-right: 0;
                        }
                    }
                    i{
                        display: inline-block;
                        position: relative;
                        top: -13px;
                        font-size: 79px;
                        color: #ccc;
                        cursor: pointer;
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
