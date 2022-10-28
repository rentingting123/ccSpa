<template>
    <p class="type" 
        :class="{'type0':type==0,'type1':type==1,'type2':type==2,'type3':type==3,'type4':!type&&type!=0}">
        {{type  | competitionType}}
    </p>
</template>

<script>
export default {
    props:['type'],
    filters:{
        competitionType(value){
            if(value==2){
                return '火热报名'
            }else if(value==1){
                return '进行中'
            }else if(value==0){
                return '已结束'
            }else if(value==3){
                return '筹备中'
            }else{
                return "筹备中"
            }
        }
    }
}
</script>

<style lang="less" scoped>
.type{
    width: 60px;
    height: 16px;
    line-height: 16px;
    background: #F5A623;
    border-radius: 2px;
    margin: 1px 4px 1px 0;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0.38px;
    text-align: center;
}
.type0{
    background: #9B9B9B !important;
}
.type1{
    background: #0078E2 !important;
}
.type2{
    background: #F5A623 !important;
}
.type3{
    background:chocolate !important;
}
.type4{
    background: chocolate !important;
}

</style>