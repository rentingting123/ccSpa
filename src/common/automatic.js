let _ = require("lodash")

export function automatic(workshow,expert,count){

//判断是否可以被完全分配
let _workshow = workshow.sort((a,b)=>(b.avoid.length-a.avoid.length))
,unableMax = _workshow[0].avoid.length
,able = expert.length
,canMatic = able-unableMax>=count
if(!canMatic)return 'error'
//创建专家列表
function createExpert(n){
    let arr=[]
    for(let i=0;i<n;i++)
    {arr.push(i)}
    return arr;
}
//创建作品 数量 前缀 屏蔽数量 
function createShow(n,m,l){
    let arr =[]
    let _l = l||0
    for(let i=0;i<n;i++)
    {
        let _avoid = []
        if(_l){
            for(let j=0;j<_l;j++){
                _avoid.push(Math.floor(Math.random()*80))
            }
        }
        arr.push({
        name:m+i,
        avoid:_avoid
    })}
    return arr;
}
//初始化数据
let w=workshow//||createShow(10,'C').concat(createShow(290,'H',3)).concat(createShow(200,'K',9))//作品列表 avoid 是回避专家
,   _u=expert//||createExpert(80)
,   doneW=[] //最终分配结果


//c 每个作品需要评审数量
function init(c){
   
    let T1 = new Date().getTime()
    console.log('作品预设列表',w)
    console.log('预设专家列表',_u.toString())
    console.log('开始分配',T1)
     //计算专家需要陪审的总次数
    let allE = w.length*c;
    //初始化专家组
    let u = [];
    while(u.length<allE){
        u = u.concat(_u)
    }
    console.log("系统所需评审作品数量：",w.length)
    console.log("预设专家总分配次数：",u.length)
    console.log("系统所需陪审次数：",c*w.length)
    u.length = allE
    //打乱专家顺序
    u = _.shuffle(u)
    let basew = findDemand(w,u,c)
    let RetE={}
    while(u.length>0&&basew.length>0){
       // console.log(u,basew)
       // 打开多分配实际消耗专家大于系统预设值！增加一轮预设值
       if(basew[0].allE < basew[0].need){
        console.log(basew,u)
        console.log("实际消耗专家大于系统预设值！增加一轮预设值")
        u=u.concat(_u)
       }
       else{
        let _need = basew[0].need
        // avg（<=_need）越大分配速度越快，均值差也越大
        let avg=2
        for(let k=0;k<_need;k++){
        //  let arrE = basew[0].arrE[0]
         //if(k==avg) break;
          let arrE = basew[0].arrE[k]
         basew[0].expert.push(arrE)
         if(!RetE[arrE])RetE[arrE]=[]
         RetE[arrE].push(basew[0].school)
         u.splice(u.indexOf(arrE),1)
         }
       }
       basew = findDemand(basew,u,c)
    }
    let T2 = new Date().getTime()
    console.log('结束分配',T2)
    console.log('用时',T2-T1)
    console.log('剩余专家次数',u.length)
   // console.log('作品纬度查看分配情况',doneW.sort((a,b)=>(a.name.charCodeAt(0)-b.name.charCodeAt(0))).map(item=>{delete item.arrE;return item}))
   // console.log('专家纬度查看分配情况',RetE)
    return doneW
}
//计算最需要被分配的作品提++取分配完成或无法分配的作品
function findDemand(w,_u,c){
    let baseW =[]
    const res = new Map();
    let u = _u.filter((a) => !res.has(a) && res.set(a, 1))
    for(let i=0;i<w.length;i++){
        let item =w[i]
        if(!item.expert)item.expert=[]
        let _countE = countE(u,item)
        item.need =parseInt(c) - item.expert.length
        item.allE = _countE.count
        item.arrE = _countE.arrE
        item.demand = item.allE - (item.need*2)
        //allE 是可被分配的专家数，如果不判断那么就会无法分配均匀
        //if(item.allE == 0||item.need == 0){
        if(parseInt(item.need) < 1){
            doneW.push(item)
        }else{
            baseW.push(item)
        }
    }
    return baseW.sort((a,b)=>(a.demand-b.demand))
}
//计算出可以被分配的专家
function countE(u,item){
    // let _ret=0
    // let _c=[]
    let arrE=[]
    //打乱专家组
    //u = _.shuffle(u)
    for(let i=0;i<u.length;i++){
        //这行代码已经无效，前面已经过滤
        // if(_c.indexOf(u[i])>-1)continue
        // _c.push(u[i])
        if(item.avoid.indexOf(u[i])<0&&item.expert.indexOf(u[i])<0){
            // _ret++;
            arrE.push(u[i])
        }
    }
    return {
        count:arrE.length,//_ret,
        arrE:arrE
    }
}
return init(count)
}