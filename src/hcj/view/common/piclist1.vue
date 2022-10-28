<template>
    <ul>
        <!-- <div  v-for="item in lists"
            :key="item.id">
            {{item}}
        </div> -->
        <!-- <li v-for="list in lists" :key="list.is" @click="$router.push('/datacenter/preworkDatails?id='+list.id)"> -->
        <li
            v-for="(item,index) in lists"
            :key="index"
            @click="$router.push(`/datacenter/preworkDatails?id=${item.id}`)"
        >
            <div class="span">
                <span v-if="item.awardName">{{item.awardName.split('+')[0]}}</span>
            </div>
            <div style="height:150px;width:100%;overflow:hidden">
                <img style="width:100%;height:auto;" :src="item.url" alt />
            </div>
            <p class="dian" :title="item.title">{{ item.title || ''}}</p>
            <p :title="item.competitionName">参赛类别：{{ item.competitionName }}</p>
            <p :title="item.idCardName">作者：{{item.idCardName}}</p>
            <p :title="item.school">单位：{{item.school}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['lists'],
    created(){
       this.changeimg()
    },
    methods:{
        changeimg(){
             this.lists.forEach((item) => {
            let arr = undefined
            item.attachList.forEach((obj,index) => {
                if(obj.attachType.includes(3)){
                    if(obj.fileList.length>0){
                        arr = obj.fileList[0].url
                         return
                    }
                }
            })
            item.url = arr
        })
        }
    },
     watch:{
        lists(val){
           this.changeimg()
        }
    }
}
</script>

<style lang="less" scoped>
ul {
    width: 852px;
    margin: 0 auto;
    text-align: left;
    li {
        position: relative;
        overflow: hidden;
        display: inline-block;
        vertical-align: top;
        width: 262px;
        // height: 246px;
        height: 280px;
        margin-bottom: 20px;
        margin-right: 33px;
        padding-bottom: 8px;
        cursor: pointer;
        border: 1px solid #e8e7e7;
        .span {
                position: absolute;
    top: 0;
    right: 0;
    /* width: 100px; */
    padding: 0 10px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    background-color: rgba(0, 0, 0, 0.49);
            span {
                color: #fff;
            }
        }
        img {
            width: 100%;
            height: 150px;
        }
        p {
            white-space:nowrap;

overflow:hidden;

text-overflow:ellipsis;
            font-size: 14px;
            font-weight: 400;
            color: #666;
            line-height: 21px;
            margin-left: 8px;
            margin-top: 8px;
            letter-spacing: 1px;
        }
        .dian {
            width: 100%;
            color: #333;
            font-weight: bold;
        }
    }
    li:nth-child(3n) {
        margin-right: 0;
    }
}
</style>