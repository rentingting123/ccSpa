
import network from "./utils";

export default {
    // 获取首页数据
    getHomeData:params=>(network.node(`zjedu/home`,params)),
    // 获取一流课程
    getZjeduCourse: params=>(network.node(`zjedu/getCourse`,params)),
    // 获取course详情
    getZjeduCourseById: params=>(network.node(`zjedu/getCourseById`,params)),
    // 获取课程列表数据
    getZjeduCourseData: params=>(network.node(`zjedu/getCourseData`,params)),
    // 获取教发培训
    getZjeduTraining: params=>(network.node(`zjedu/getTraining`,params)),
    // 获取在线实训
    getZjeduOnline: params=>(network.node(`zjedu/getOnline`,params)),
    // 获取高校列表
    getZjeduSchool: params=>(network.node(`zjedu/getSchool`,params)),

    getZjeduNews: params=>(network.node(`zjedu/getNews`,params)),

    //课程tag
    getCourseType:params=>(network.node('zjedu/courseTags',params))
}