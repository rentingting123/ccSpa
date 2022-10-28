
let competitionType = (value) => {
    if(value==2){
        return '火热报名'
    }else if(value==1){
        return '进行中'
    }else{
        return '已结束'
    }
};


export { competitionType }