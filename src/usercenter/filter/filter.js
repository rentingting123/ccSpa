import Vue from 'vue'

//元素的补零计算
function addZero(val){
    if(val < 10){
        return "0" +val;
    }else{
        return val;
    }
};

export function formatTime(value,type){
    type = type || 'date'
    value = value ? parseInt(value, 10) : null
    var result = ''
    var data = new Date(value);
    var year   =  data.getFullYear();  
    var month  =  addZero(data.getMonth() + 1);  
    var day    =  addZero(data.getDate()); 
    var hour   =  addZero(data.getHours());
    var minute =  addZero(data.getMinutes());
    var second =  addZero(data.getSeconds());
    result = [year, month, day].join('-')
    if (type == 'time') {
        result += ' ' + [hour, minute, second].join(':')
    }
    if (type == 'hour') {
        result += ' ' + hour+':00'
    }
    if (type == 'minute') {
        result += ' ' + [hour, minute].join(':')
    }
    // if(type == "date"){
    //     dataTime =  year + "-"+ month + "-" + day;
    // }else if(type == "time"){
    //     dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
    // }else if(type == "HMS"){
    //     dataTime = hour+":" + minute+":" + second;
    // }else if(type == "YM"){
    //     dataTime = year + "-" + month;
    // }
    return result;//将格式化后的字符串输出到前端显示
};
//
export function filterHtml(val){
    // read:function(val){//val就是以获取的msg的值
    //     console.log(val);
    //     return val.replace(/<[^>]*>/g);//去除文字的<...></...>标签
    // },
    // write:function(){
    //     return val;
    // }
    var data=val || '';
    // console.log(data.replace(/<[^>]*>/g))
    // console.log(data.replace(/((<[^>]*>)|(&nbsp;))/g,""))
    return data.replace(/&nbsp;/g,"")
};
