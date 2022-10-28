import network from "./utils";

export default {
    // label/ruledata 短信发送标签规则范围
    ruledata:params =>network.post('label/ruledata',params),
    // 预估人数 新增标签的
    estimatenum:params =>network.post('label/estimatenum',params),
    // system/dict/data/type/获取字典值
    getDicts:title =>network.get(`label/datadict`,{data:{type:title}}),
    // selectmessage:params =>network.node('sms/temp/select',params),
    // 新增分类tag
    addcif:params =>network.post('label/addcif',params),
    // 标签分类列表
    ciflist:params =>network.get('label/ciflist',params),
    // 删除标签
    dellabel:params =>network.get('label/dellabel',params),
    // 删除标签分类
    delcif:params =>network.get('label/delcif',params),
    // 编辑标签分类
    updaecif:params =>network.post('label/updaecif',params),
    // 创建标签/dev-api/label/createlabel
    createlabel:params =>network.post('label/createlabel',params),
    // 标签预估人数
    peoplesum:params =>network.get('label/peoplesum',params),
    // 标签规则选项列表
    ruleoption:params =>network.get('label/ruleoption',params),
    // 获取标签库列表
    labeldblist:params =>network.get('label/labeldblist',params),
    // 标签信息查看
    labeldetail:params =>network.get('label/labeldetail',params),
    // 获取全部标签分类
    labelciflist:params =>network.get('label/labelciflist',params),
    
}