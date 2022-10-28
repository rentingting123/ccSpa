<template>
  <div class="right">
      
      <h3Title title="大家•谈" id='6-1'/>
      <news :lists='data1' style="margin: 20px 0 40px"/>
      <h3Title title="专家•话" id='6-2'/>
      <picshow :lists='data2' style="margin: 20px 0 40px"/>
      <h3Title title="大学生•说" id='6-3'/>
      <datashow :lists='data3' style="margin: 20px 0 40px"/>
      <!-- <img src="http://web.moocollege.com/mooc/hzq/vueskin/hsj/%E6%95%AC%E8%AF%B7%E6%9C%9F%E5%BE%85.png" /> -->
  </div>
</template>

<script>
import h3Title from '@/hsj/components/h3'
import picshow from '../../common/picshow'
import datashow from '../../common/datashow'
import news from '@/hsj/components/newslist'
export default {
    components:{
        h3Title,
        picshow,
        datashow,
        news
    },
    data(){
        return{
            data1:[
              {
                title: '创新设计的科学',
                newsTime: '2020-05-25 17:36',
                links: 'http://cgd.ckcest.cn/archive/article/detail/356256d57c64426cadd57d5238589b93',
                id: 1,
              },
              {
                title: '徐志磊：为创新设计而呼吁',
                newsTime: '2020-05-25 17:19',
                links: 'http://cgd.ckcest.cn/archive/article/detail/b9f5290416ce4d3688a615635921afb9',
                id: 2,
              },
              {
                title: '中国的设计教育及政策措施',
                newsTime: '2020-05-25 17:26',
                links: 'http://cgd.ckcest.cn/archive/article/detail/0bd99ad33c354a7883ac76186a178d2b',
                id: 3,
              },
              {
                title: '路甬祥：好设计创造更美好的未来',
                newsTime: '2017-12-14 17:07',
                links: 'http://cgd.ckcest.cn/archive/article/detail/fc32454e7fdc4a829b84db665b15d949',
                id: 4,
              },
              {
                title: '关于设计进化的再思考',
                newsTime: '2017-07-21 17:32',
                links: 'http://cgd.ckcest.cn/archive/article/detail/d95dc28507c44d41b3699dfe8ea5f3a4',
                id: 5,
              },
              {
                title: '徐志磊：让中国制造插上创新设计的翅膀',
                newsTime: '2017-07-15 17:34',
                links: 'http://cgd.ckcest.cn/archive/article/detail/eb2a72ed14374b4d9c44b9e34412438a',
                id: 6,
              },
              {
                title: '创新设计的科学',
                newsTime: '2017-06-05 18:34',
                links: 'http://cgd.ckcest.cn/archive/article/detail/c3aff29ef2a249c3a938d3cfcdbd3f3e',
                id: 7,
              },
            ],
            data2:[
              {
                id: 1,
                name: '为创新设计而呼吁！',
                img: 'http://web.moocollege.com/mooc/hzq/vueskin/hsj/forum1.png',
                path: 'http://cgd.ckcest.cn/edu/trainCourse/detail/a121ba777b744f808e5dfa8f639adc33'
              },
              {
                id: 2,
                name: '技术推动创新设计',
                img: 'http://web.moocollege.com/mooc/hzq/vueskin/hsj/forum2.png',
                path: 'http://cgd.ckcest.cn/edu/trainCourse/detail/75b26a15ca2445dca58a20a83b5e6a17'
              },
              {
                id: 3,
                name: '企业创新设计路径案例研究',
                img: 'http://web.moocollege.com/mooc/hzq/vueskin/hsj/forum3.png',
                path: 'http://cgd.ckcest.cn/edu/trainCourse/detail/55f6bf73219a47b3ba367a65936478a0'
              },
            ],
            data3:[
              '敬请期待'
            ],
            
        }
    }
}
</script>

<style lang="less" scoped>
  .right{
      img{
        display: block;
        margin: 0 0 40px 122px;
        width: 250px;
      }
  }
  a{
    color: -webkit-link;
    display: block;
    margin: 20px 0 40px;
  }
</style>