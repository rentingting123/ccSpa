import network from "./utils";

export default {
    // 获取邮件的参数
    emaildata:params =>network.get('template/emaildata',params),
    // 发送邮件
    sendmail:params =>network.node('mail/send',params),
    // tempalte/noterecord 给后端发送短信推送记录
    noterecord:params =>network.get('template/noterecord',params),
    // 新增场景推送 短信
    addnote:params =>network.post('template/addnote',params),
    // 手动推送
    addmanual:params =>network.post('template/addmanual',params),
    // tempalte/pushdetail 查看详细记录
    pushdetail:params =>network.get('template/pushdetail',params),
    // scenedetail获取场景模板详情
    scenedetail:params =>network.get('template/scenedetail',params),
    // 删除  场景模板列表
    delscene:params =>network.get('template/delscene',params),
    // 修改 场景模板列表
    updatescene:params =>network.post('template/updatescene',params),
    // 预估人数  新增场景模板
    estimatebyid:params =>network.get('label/estimatebyid',params),
    // 预估人数 大众
    estimatesnum:params =>network.post('label/estimatesnum',params),
    // 场景模板发送 sendmessage
    sendmessagemoban:params =>network.get('template/sendmessage',params),
    // 审核场景模板
    newsreview:params =>network.post('template/newsreview',params),
    //添加短信模板
    addmessage:params =>network.node('sms/temp/add',params),
    // 短信模板列表/sms/temp/list
    messagelist:params =>network.node('sms/temp/list',params),
    // 修改短信模板/sms/temp/modify
    updatamessage:params =>network.node('sms/temp/modify',params),
    // 删除
    delmessage:params =>network.node('sms/temp/del',params),
    // /sms/temp/select 筛选
    selectmessage:params =>network.node('sms/temp/select',params),
    // 发送短信
    sendmessage:params =>network.node('sms/send',params),
    // /dev-api/label/addcif
    // 新增场景模板
    addscene:params =>network.post('template/addscene',params),
    // 新增内容模板
    addcontent:params =>network.post('template/addcontent',params),
    // 内容模板消息列表
    contentlist:params =>network.get('template/contentlist',params),
    // 根据id查找消息模板详情template/contemdetail
    contemdetail:params =>network.get('template/contemdetail',params),
    // 修改内容消息
    updatecontent:params =>network.post('template/updatecontent',params),
    // 删除内容消息template/delcontent
    delcontent:params =>network.get('template/delcontent',params),
    // 列表 
    scenetemlist:params =>network.get('template/scenetemlist',params),
}