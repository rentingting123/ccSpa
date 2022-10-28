import network from "./utils";

export default {
    // 个推空间列表
    onpushlist:data =>network.get(`space/list`,data),
    // 查看详情
    message:data =>network.get(`space/message`,data),
    // space/removeunread 一键清除
    removeunread:data =>network.get(`space/removeunread`,data),
}
