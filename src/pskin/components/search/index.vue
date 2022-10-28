<template>
    <div class="search">
        <h2 class="title"><span></span>搜索结果</h2>
        <ul v-if="items.length>0">
            <li v-for="list in items" :key="list.id">
                <h3 :title="list.name" @click="handleSelect(list)" class="dian">{{list.name}}</h3>
                <div class="message clearfix">
                    <competitionType :type="list.type" />
                    <p class="dian" :title="list.secretariat">{{list.secretariat}}</p>
                </div>
            </li>
        </ul>
        <div v-else>
            <img src="https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/noContent.png" alt="" srcset="">
            <p>搜索无结果</p>
        </div>

    </div>
</template>

<script>
import network from '@/api/index'
import competitionType from '@/pskin/components/competitionType'
export default {
    components:{competitionType},
    data(){
        return{
            items:[],
        }
    },
    computed:{
        name(){
           return this.$store.state.searchName
        }
    },
    created(){
        this.$store.state.searchName = this.$route.params.name;
        this.search(this.name);
    },
    methods:{
        async handleSelect(item){
            let url = item.url
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
            let res = await network.updateClickCount({data:{
                id: item.id
            }});
        },
        async search(name){
            let res = await network.searchprovinceSkin({data:{
                name:name,
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return
            this.items = res.skinCompetitionList
        },
    },
    watch:{
        name(val){
            if(!val) return;
            this.search(val)
        }
    }
}

</script>
<style lang="less" scoped>
.search{
    width: 900px;
    margin: 50px auto;
    padding: 60px 90px 120px;
    background: #FFFFFF;
    box-shadow: 0 0 5px 0 rgba(169,166,166,0.50);
    border-radius: 10px;
    position: relative;
    text-align: left;
    h2{
        position: absolute;
        top: 64px;
        left: 0;
        font-size: 22px;
        color: #4A4A4A;
        letter-spacing: 1.38px;
        display: flex;
        align-content: center;
        font-weight: 500;
        span{
            display: inline-block;
            width: 9px;
            height: 24px;
            background: #0078E2;
            margin-right: 81px;
        }
    }
    >div{
        text-align: center;
        img{
            margin-top: 69px;
        }
        p{
            opacity: 0.9;
            font-size: 18px;
            color: #4A4A4A;
            letter-spacing: 0.64px;
            text-align: center;
            line-height: 37px;
            margin-top: 23px;
        }
    }
    ul{
        margin-top: 69px;
        li{
            margin-bottom: 34px;
            cursor: pointer;
            h3{
                font-size: 20px;
                color: #4A4A4A;
                letter-spacing: 0;
            }
            h3:hover{
                color: #0078E2;
            }
            .message{
                font-size: 14px;
                color: #4C4C4C;
                letter-spacing: 0;
                line-height: 20px;
                p{
                    float: left;
                }
                .dian{
                    width: 306px;
                }
            }
        }
    }

}
</style>