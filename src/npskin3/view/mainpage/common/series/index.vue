<template>
    <div class="series">
        <titles t1='系列' t2='赛事' t3='SERIES' t4='COMPETITION' />
        <div class="lists" ref="lists" :class="{'all':showall}">
            <ul class="compslist" ref="ulref">
                <li v-for="list in lists"
                    :key="list.competitionId"
                    @click="chooseId(list)"
                    :title="list.province"
                    :class="{'on':id==list.competitionId}">
                    {{list.province }}
                </li>
            </ul>
        </div>

        <div class="more" v-if="more" @click="showall=true,more=false">
            查看全部
        </div>
        <div class="more" v-if="!more && long" @click="showall=false,more=true">
            收起
        </div>

        <div>
            <detail v-if="id" :id='id' :gid='gid'/>
        </div>
    </div>
</template>

<script>
import network from '@/api'
import titles from '@/npskin3/components/title'
import detail from './common/detail'
export default {
    components:{
        titles,
        detail,
    },
    created(){
        this.init()
    },
    data(){
        return{
            id: '',
            gid: '',
            lists: [],
            more: false,
            showall: false,
            long: false,
        }
    },
    methods:{
        async init(){
            let res = await network.npqueryContest({data:{
                groupId: localStorage.getItem('groupId')
            }})
            if(res=='error') return;
            this.lists = res || [];
            if(this.lists.length>0){
                this.id = this.lists[0].competitionId
                this.gid = this.lists[0].groupId
            }
            this.$nextTick(()=>{
                if(this.$refs.ulref.offsetHeight > this.$refs.lists.offsetHeight){
                    this.more = true
                    this.long = true
                }else{
                    this.long = false
                }
            })
        },
        chooseId(item){
            this.id = item.competitionId;
            this.gid = item.groupId
        }
    }
}
</script>

<style lang='less' scoped>

.series{
    width: 1106px;
    margin: 30px auto 0;
    .compslist{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .lists{
        max-height: 160px;
        overflow: hidden;
        ul{  
            overflow: auto;
            li{
                width: 360px;
                display: block;
                text-align: center;
                background: #FFFFFF;
                border: 1px solid #6283FF;
                border-radius: 4px;
                font-size: 14px;
                color: #6283FF;
                margin-top: 11px;
                cursor: pointer;
                text-align: center;
                line-height: 40px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                padding: 0px 3px;
                margin-right: 13px;
                &.on{
                    color: #ffffff;
                    background: linear-gradient(267deg, #559CFE 0%, #526AFE 100%);
                }
            }
        }
        li:nth-child(3n){
          margin-right: 0px;
        }
        &.all{
            max-height: 100000px;
        }
    }
    .more{
        width: 110px;
        height: 38px;
        background: #6383FF;
        border-radius: 8px;
        text-align: center;
        margin-top: 24px;
        font-size: 16px;
        line-height: 38px;
        color: #fff;
        margin-left: auto;
        margin-right: auto;
        cursor: pointer;

    }
}
</style>