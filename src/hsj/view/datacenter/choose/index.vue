<template>
  <div class="right">
      <h3Title title="评选公告" id='3-1'/>
      <a :href="data1" style="margin: 20px 0 40px;color: -webkit-link;display: block;">2020好设计评选公告.docx</a>

      <h3Title title="评选须知" id='3-2' />
      <datashow :lists='data2' style="margin: 20px 0 40px" :indent='true'/>

      <h3Title title="评选流程" id='3-3'/>
      <datashow :lists='data3' style="margin: 20px 0 0" :indent='true'/>
      <img src="https://web.moocollege.com/mooc/hzq/vueskin/hsj/choose.png" class="data3img"/>
      <titleshow :lists='data3_2' style="margin: 0 0 40px"/>

      <h3Title title="申报主体" id='3-4'/>
      <datashow :lists='data4' style="margin: 20px 0 40px"/>

      <h3Title title="申报类型" id='3-5'/>
      <datashow :lists='data5' style="margin: 20px 0 20px"/>
      <titleshow :lists='data5_1' style="margin: 0 0 40px"/>
  </div>
</template>

<script>
import h3Title from '@/hsj/components/h3'
import datashow from '../../common/datashow'
import titleshow from '../../common/titleshow'
export default {
    components:{
        h3Title,
        datashow,
        titleshow,
    },
    data(){
        return{
            data1: 'https://web.moocollege.com/mooc/hzq/vueskin/hsj/2020%E5%A5%BD%E8%AE%BE%E8%AE%A1%E8%AF%84%E9%80%89%E5%85%AC%E5%91%8A.docx',
            data2:[
                `1. 参评方应注册提交真实有效的个人信息，主办方有权在法律允许范围内，对参评方提供的信息进行调查核实；`,
                `2. 参评方应对参评作品拥有充分、完全、自主的知识产权，如因参评作品造成侵犯任何第三方的知识产权与合法权益，由参评方承担相应的法律责任；`,
                `3. 主办方和承办方享有对参评作品的展示权、印刷权和宣传权，包括但不限于宣传、媒体报道、广告展示、宣传手册、书籍刊物及其他传播媒介；`,
                `4. 参评方同意并授权主办方对参评作品及短视频进行传播分享，包括在主办方官方网站或其授权的B站官方账号、有关知识服务系统等平台进行分享传播。`
            ],
            data3:[
                `好设计·创意奖评选活动共分五个阶段：在线报名、作品提交、初评、终评及颁奖、推广服务。具体参评流程如下：`,],
            data3_2:[
              {
                title: `1.在线报名`,
                mess:[
                  `好设计·创意奖采用在线报名方式，具体请登录好设计·创意奖官方网站（http://cgd.ckcest.cn）进行报名，无需报名费。`,
                ]
              },
              {
                title:  `2.作品提交`,
                mess:[
                  `作品提交通道：请登录好设计·创意奖官方网站（http://cgd.ckcest.cn）进行作品提交。`,
                  `作品提交截止日期：2020年10月31日`,
                ]
              },
              {
                title: `3.网络宣传`,
                mess:[
                  `为积极传播创新设计理念和推广创新设计成果，作品短视频等材料将会分享到好设计·创意奖B站官方账号、有关知识服务系统等网络平台。`,
                ]
              },
              {
                title: `4.全国初评：`,
                mess:[
                  `全国七大区域（华北、华东、华南、东北、华中、西北、西南）对提交作品同步进行分组评选，从中遴选推荐优秀作品进入全国终评；`,
                  `好设计·创意奖官方合作伙伴独立推荐优秀设计作品，进入到全国终评环节。`,
                ]
              },
              {
                title: `5.全国终评：`,
                mess:[
                  `在全国初评基础上，评审委员会进一步遴选当年度好设计·创意奖作品。`
                ]
              },
              {
                title: `6.颁奖活动`,
                mess:[
                  `为获奖团队和指导老师颁发证书。`
                ]
              },
            ],
            data4:[
                `青年设计师及各类高等院校在校大学生（含研究生）均可参评。鼓励大学生以跨学科跨专业团队合作形式参与申报(团队成员5人以内，指导老师不超过2人）；每个参评团队限报一件设计作品。`
            ],
            data5: [
                `本次评选突出强调各类原理、技术、材料、工艺、模式及文化的创新性设计应用以及数字化、网络化、智能化产品创新设计，参评作品旨在为当前人类社会发展面临的各类问题提供解决方案，揭示和引领未来人们的生活和生产方式。参评主要行业与专业领域包括但不限于：`,
                `（1）信息类——现代通信、先进计算、网络设备、新型计算机、新型信息终端、智能终端等；`,
                `（2）装备类——新能源汽车、轨道交通、太阳能设备、海洋工程装备、新材料应用、机器人、无人机、特种装备、机械设备、健康工程装备、农机装备等；`,
                `（3）消费类——智能家居、可穿戴设备、VR设备、电脑、家用电器、音视频产品、游戏硬件等；`,
                `（4）创意类——文化体育用品、休闲娱乐产品、玩具及儿童产品、手表珠宝、美妆保养产品、照明产品、卫浴用品、家具、办公用品、厨房用品、产品包装等；`,
                `（5）服务设计类—— 医疗、公共服务、运输物流、金融、销售、旅游、教育等领域服务创新；`,
                `（6）疫情防控类—— 抗击及预防疫情相关的产品、设备、系统及服务等。`
            ],
            data5_1:[
              {
                title: '具体内容和有关要求可登录“好设计·创意奖”官方网站（http://cgd.ckcest.cn）查阅。'
              }
            ]
        }
    }
}
</script>

<style lang="less" scoped>
    .right{
        .data3img{
          display: block;
          width: 836px;
          height: auto;
          margin: 20px auto 40px;
        }
    }
</style>