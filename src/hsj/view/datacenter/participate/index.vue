<template>
  <div class="right">
      <h3Title title="作品提交说明" id='4-1'/>
      <datashow :lists='data1' style="margin: 20px 0 0"/>
      <titleshow :lists='data1_1' style="margin: 10px 0 40px" />

      <h3Title title="时间安排" id='4-2'/>
      <datashow :lists='data2' style="margin: 20px 0 40px" :indent='true' />

      <h3Title title="素材下载" id='4-3'/>
      <a :href="data3file" target="_blank" download="片头.mp4" style="margin: 20px 0 0;">片头.mp4</a>
      <a :href="data3img" target="_blank" download="好设计Logo.png" style="margin: 20px 0 40px;">好设计Logo.png</a>

      <h3Title title="在线报名" id='4-4'/>
      <p @click="choose=true" class="tochooselogin">前往报名</p>
      <chooseLogin v-if="choose" :close='close'/>
  </div>
</template>

<script>
import h3Title from '@/hsj/components/h3'
import datashow from '../../common/datashow'
import titleshow from '../../common/titleshow'
import chooseLogin from '@/hsj/components/chooselogin'
export default {
    components:{
        h3Title,
        datashow,
        titleshow,
        chooseLogin
    },
    data(){
        return{
            choose: false,
            data1: [
              `提交作品材料包括： 作品名称（中英文）、作品介绍（300字以内）、关键词（5个关键词）、作品短视频、图/照片、技术资料。每个参评团队限报一件作品。`,
            ],
            data1_1: [
              {
                title: `1.短视频说明`,
                mess:[
                  `（1）参评作品短视频时长控制在3分钟以内；`,
                  `（2）参评短视频需要统一加上官方片头（片头.mp4）；`,
                  `（3）根据实际设计情况展现有关设计思路、外观效果、技术构成、材料工艺、原型系统、应用场景、团队介绍等，清晰完整地表达创新设计内容。视频需要在右上角打上logo，作品视频长度不超过3分钟，视频分辨率不小于1280x720（720p），大小不超过50M，格式为mp4；`,
                  `（4）提供短视频封面1张，用于在B站展出使用。 格式jpeg或png，文件大小≤5MB，建议尺寸≥1146 x 717，最低尺寸≥960 x 600。`,
                ]
              },
              {
                title: `2. 图/照片说明：`,
                mess:[
                  `（1）提供3-5张图/照片`,
                  `（2）根据实际设计情况需要提供：应用场景图/照片、产品外观效果图/照片、主要结构示意图、创新创意阐释图、其他各类设计或工程分析图等，尽可能清晰完整地表达创新设计特征。`,
                  `（3）图/照片比例：16:9  ，尺寸1600 x 900以上，分辨率200dpi以上。`,
                ]
              },
              {
                title: `3.技术资料说明`,
                mess:[
                  `包括设计作品相关研究报告、专利、论文等，pdf格式。`,
                ]
              },
              {
                title: `* 本次评选突出短视频为作品的重要展现形式，短视频网络影响力将作为评审委员会评审的重要参考纳入评审结果考评依据。`,
              },
            ],
            data2:[
                `启动：7月5号`,
                `申报截止：10月31号`,
                `初评：11月`,
                `终评：12月`,
                `颁奖：2020年底`
            ],
            data3file: 'https://web.moocollege.com/mooc/hzq/vueskin/hsj/%E7%89%87%E5%A4%B4.mp4',
            data3img: 'https://web.moocollege.com/mooc/hzq/vueskin/hsj/%E5%A5%BD%E8%AE%BE%E8%AE%A1logo.png',
        }
    },
    methods:{
      close(){
        this.choose = false
      }
    }
}
</script>

<style lang="less" scoped>
  a{
    color: -webkit-link;
    display: block;
  }
  .tochooselogin{
    margin: 20px 0 40px;
    color: rgb(0, 0, 238);
    cursor: pointer;
  }
</style>