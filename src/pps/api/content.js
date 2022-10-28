import network from "./utils";

export default {
   
    // 获取list
    getconlist:params =>network.get('contentdata/getconlist',params),
    // 导入
    importdata:params =>(network.post(`contentdata/importdata`,params)),
}