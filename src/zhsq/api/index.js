import network from "./utils";

export default {
  // 高博会接口
  // 查询学校接口
  school:params =>(network.get(`api/usercenter/search/school`,params)),
  // 注册接口
  qrCodeRegister:params =>(network.node(`java/admin/qrcode/register`,params)),
  
  skinGet:params=>(network.node('/website/getSkin',params)),
  // 查询是否为校赛
  checkSchool:params=>(network.get('api/usercenter/group/isSchoolCompetition',params)),
  // 查询校赛的院系列表
  getProfessional:params=>(network.get('api/web/academy/get',params)),

}
