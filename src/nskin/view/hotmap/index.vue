<template>
    <div class="hotmap">
		<div>
			<!-- 面包屑 -->
			<breadcrumb title1="竞赛排行" title2="省级赛事热力图" path="/competition" border='true' />

			<div class="content">
				<chart :options="mapOption" @click="clickMap" style=" width:100%; height: 100%;"/>
			</div>
		</div>
    </div>
</template>

<script>
import network from '@/api/index'
import ECharts from 'vue-echarts';
import chinaMap from './china.json';
ECharts.registerMap('china', chinaMap);
import breadcrumb from '@/nskin/components/breadcrumb'

export default {
	components: {
		chart: ECharts,
		breadcrumb
	},
    data(){
        return {
			data1:[],
			mapOption: {
	                // backgroundColor: '#04113E',  
	                title: {  
						show:false,
	                    text: '参赛院校分布',  
	                    x:'left',
	                    textStyle: {
							fontSize: 20,
							color:'#62A4FF'
				        },
	                },  
	                legend: {
	                    orient: 'vertical',
						left: 'center',
						show:false
	                },
	                tooltip : {  
						trigger: 'item',
						formatter: function (params) {
							let data=params.data
							return `
							<p style="background: rgba(237, 30, 38, 0.9);text-align:center;padding:10px;">${data.name}</p>
							<p style="text-align:center;padding:10px;">
								<span style="display:inline-block;width:50px;">国赛&nbsp;&nbsp;&nbsp;</span>
								<span style="display:inline-block;width:50px;">${data.nCompetitionNum}</span>
								<br/>
								<span style="display:inline-block;width:50px;">省赛&nbsp;&nbsp;&nbsp;</span>
								<span style="display:inline-block;width:50px;">${data.pCompetitionNum}</span>
								<br/>
								<span style="display:inline-block;width:50px;">校赛&nbsp;&nbsp;&nbsp;</span>
								<span style="display:inline-block;width:50px;">${data.sCompetitionNum}</span>
							</p>`
						},
						padding: 0,
						// backgroundColor:'none',
						borderColor :'',
						enterable:true,
						hideDelay:500,
						textStyle:{
							fontWeight: 'bold',
							
						}
						
						// formatter: '{b}<br/>{c} (p / km2)'
					}, 
					toolbox: {
						show: false,
						orient: 'vertical',
						left: 'right',
						top: 'center',
						feature: {
							dataView: {readOnly: false},
							restore: {},
							saveAsImage: {}
						}
					},
					grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                        width:"auto", //图例宽度
                        height:"90%", //图例高度
                    },
	                
	                geo: {
	                    map: 'china',
	                    // roam: true,
	                    label: {
	                        normal: {
	                            show: false,  
	                        }
	                    },
	                    itemStyle: {
	                        normal:{
								// label:{show:true},
								borderWidth:1,
								borderColor:'#C2D4F2',
								// areaStyle:{color:'#002052'},
								color:'#fff'
	                        },
							// 鼠标悬浮背景色
	                        emphasis:{
								color:'#ED1E26',
								label:{show:false},
								
	                        }
						},
						// 鼠标悬浮文字颜色
						emphasis:{
                            label:{
                                color:'#ffffff'
                            }
                        }
	                },

	                //左侧小导航图标
	                visualMap: {  
	                    show : true,  
	                    x: '100',  
	                    y: '100',  
	                    precision: 0,
	                    splitList: [   
	                        {start: 101, end: 500}, 
	                        {start: 51, end: 100}, 
	                        {start: 21, end: 50}, 
	                        {start: 6, end: 20},  
	                        {start: 1, end: 5}, 
	                    ],  
						color: ['#0062F6', '#52A2FF','#97C7FF', '#C9E2FF', '#EAF3FF']  ,
						textStyle: {
							color:'#62A4FF'
				        },
	                }, 

	                series : [
	     
	                    {
							name:'赛项',
	                        type: 'map',
	                        geoIndex: 0,
							tooltip: {show: true},
							textStyle:{
								color:'#fff'
							},
							
	                        data:[
	                            
							],

	                    }
	                ] 
	            },
               
        }
	},
	created(){
		this.getData()
	},
	methods:{
		clickMap(event){
			if(!event.data.provinceUrl){
				this.$message.info('该省暂未开通省平台')
				return;
			} 
            let url = event.data.provinceUrl
            url = event.data.provinceUrl.indexOf('http') == -1 ? 'http://' + event.data.provinceUrl.trim() : url
			window.open(url)
			

			// if(!!event.data.provinceUrl){
			// 	let flag = event.data.provinceUrl.split('.')[0].length
			// 	if(flag<3){

			// 		window.open( `http://${event.data.provinceUrl}` ,"_blank")
			// 	}else{
			// 		this.$message.info('该省暂未开通省平台')
			// 	}
				
			// }else{
			// 	this.$message.info('该省暂未开通省平台')
			// }
		},
		async getData(){
            let res = await network.getMapData({data:{
                
                provinceId: localStorage.getItem('competitionId')
            }});
            if(res=='error') return;
			let pro = []
			for(let key in res.cityList){
                        city.unshift({
                            name:key,
                            value:res.cityList[key]
                        })
					}
					
			res.forEach(ele =>{

				pro.push({
					name:ele.province.replace(/省|市/, ''),
					value:Number(ele.competitionNumCount) ,
					nCompetitionNum:ele.naCompetitionNum,
					pCompetitionNum:ele.prCompetitionNum,
					sCompetitionNum:ele.scCompetitionNum,
					provinceUrl:ele.provinceUrl?ele.provinceUrl:''
				})
			})
			this.mapOption.series[0].data=pro
        }
	},
}
</script>

<style lang="less" scoped>
.hotmap{
	padding: 0 40px 30px;
	min-height: calc(100vh - 346px);
	background: #F2F2F2;
	>div{
		width: 1200px;
		margin: 0 auto;
	}
}
.content{
	height: 800px;
	background: #fff;
}
</style>