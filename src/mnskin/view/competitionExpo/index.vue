<template>
    <div class="competitionExpo">
        <div class="bannerbox">
            <a class="bannerItem"><img src="@/mnskin/assets/img/banner1.png" alt=""></a>
        </div>
        <div>
            <div class="headline">展会介绍</div>
            <div class="intruce">
                <p>中国高等教育博览会（HIGHER EDUCATION
                    EXPOCHINA，简称高博会）是由教育部批准，中国高等教育学会主办的国际领先的集现代教育高端装备展示、高等教育学术交流、教学改革成果推介、教师专业化发展培训、科研成果转化、科技创新企业孵化、技术服务、贸易洽谈等为一体的高品质、综合性、专业化的著名品牌活动。
                </p><br><br>
                <template v-if="showMore">
                    <p>为落实“教育这十年”相关工作安排，充分展示党的十八大以来，我国高等教育事业取得的历史性成就，经教育部批准，第58届中国高等教育博览会将于2022年12月2-4日在重庆市举办。</p><br>
                    <p>本届高博会以“校地聚合·产教融合：高质量发展”为主题，将首次设立<span
                            style="color:#f00">竞赛专区</span>，计划邀请全国150个竞赛组委会参展，集中开展线下活动。<b>展示竞赛在创新人才培养上的成果和特色，助力竞赛资源拓展、宣传推广、产教融合、成果与需求信息发布等，</b>加强沟通交流，引导竞赛工作良性开展，促进竞赛高质量发展。
                    </p>
                </template>
                <div class="moreBtn" @click="moreLook">{{showMore?'收起':'查看更多>>'}}</div>
            </div>
        </div>
        <div>
            <div class="headline">会展权益</div>
            <ul class="competitionMain">
                <div class="equityIist">
                    <li v-for="(item,i) in equityList" :key="item.key" class="equityItem">
                        <div class="mess" @click="changeTypes(i)"
                            :style="{'background-image': `url('${item.background}')`}">
                            <div :class="{'check': item.checked}" class="name" v-html="item.name"></div>
                        </div>
                    </li>
                </div>
                <div class="lists">
                    <div class="line"></div>
                    <div class="content">
                        {{content}}
                    </div>
                </div>
            </ul>
            <div class="areabox">
                <a class="area">
                    <div class="text1">
                        <img src="@/mnskin/assets/img/logo_heec.png" alt="">
                        第58届中国高等教育博览会<br>【竞赛专区】
                    </div>
                    <div class="text2">12月2日-4日 中国·重庆</div>
                    <a-popover placement="top" title="参展咨询：中国高等教育学会" width="260" trigger="hover">
                        <template #content>
                            <div>
                                <b>吴礼平</b> <br>
                                TeL：18768130141<br>
                                <b>余晓霞</b><br>
                                TeL：15381072855
                            </div>
                        </template>
                        <div class="text3"> 立即参展</div>
                    </a-popover>
                    <div class="text4">参展热线：15381072855</div>
                </a>
            </div>
        </div>
        <div>
            <div class="headline">展区介绍</div>
            <a-carousel autoplay>
                <div v-for="(item, index) in exhAreaList" :key="index" class="exhAreaItem">
                    <div class="imgbox">
                        <img :src="item.pic" alt="">
                    </div>
                    <div class="name">{{item.name}}</div>
                    <div class="line"></div>
                    <div v-for="(list,index) in item.details" :key="index" class="list">{{list}}</div>
                    <a-popover placement="top" title="参展咨询：中国高等教育学会" width="260" trigger="hover">
                        <template #content>
                            <div>
                                <b>吴礼平</b> <br>
                                TeL：18768130141<br>
                                <b>余晓霞</b><br>
                                TeL：15381072855
                            </div>
                        </template>
                        <div class="moreBtn1"> 了解更多</div>
                    </a-popover>
                </div>
            </a-carousel>
        </div>
        <div class="competitions">
            <div class="headline">参展竞赛</div>
            <div class="search">
                <a-input-search v-model="input2" placeholder="搜索竞赛" enter-button="搜索" size="large" />
            </div>
            <div class="competitionsList">
                <div class="part" v-for="(item,index) in competitions" :key="index">
                    <div class="left">{{item.tag}}</div>
                    <div class="right" v-if="item.tag2">{{item.tag2}}</div>
                    <div class="pic"><img :src="item.img" alt=""></div>
                    <div class="title">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showMore: false,
            day: 0,
            input2: '',
            current: 1,
            hoverIndex: false,
            equityList: [
                {
                    key: 1,
                    name: '品<br>牌<br>曝<br>光',
                    background: require("@/nskin/assets/img/equity4.png"),
                    checked: false,
                    content: '全媒体矩阵宣传，展厅主屏播放宣传视频，竞赛名片线上展示，优先承办相关论坛。',
                },
                {
                    key: 2,
                    name: '竞<br>赛<br>推<br>介',
                    background: require("@/nskin/assets/img/equity2.png"),
                    content: '择优参加中国高等教育学会“竞赛质量提升行动”；制作参展竞赛宣传册。',
                    checked: false,
                },
                {
                    key: 3,
                    name: '资<br>源<br>对<br>接',
                    background: require("@/nskin/assets/img/equity1.png"),
                    checked: false,
                    content: '1000余所高校，6500家企业，12万人次现场参展。',
                },
                {
                    key: 4,
                    name: '成<br>果<br>展<br>示',
                    background: require("@/nskin/assets/img/equity3.png"),
                    checked: true,
                    content: '竞赛作品展示、育人成果案例展示。',
                },
                // {
                //     key: 5,
                //     name: '信<br>息<br>发<br>布',
                //     background: require("@/nskin/assets/img/equity5.png"),
                //     checked: false,
                //     content: '高博会全媒体矩阵立体宣传（1000+所高校，6条直播线路，线上观众1500+万人次，现场观众10+万人次），现场展厅主屏播放竞赛宣传视频，择优推荐参与现场专访和会后总结宣传；',
                // },
                // {
                //     key: 6,
                //     name: '',
                //     background: require("@/nskin/assets/img/equity6.png"),
                //     checked: true,
                //     content: '相关创新成果可进入云上高博会教育现代化、高校科技创新成果、创新创业成果等项目库；针对遴选出的优质创新成果，将根据学会合作伙伴城市(园区)的发展需求，举办系列精准对接活动；',
                // },
            ],
            exhAreaList: [
                {
                    id: 1,
                    icon: require('@/nskin/assets/img/icon1.png'),
                    name: '发展历程与研究成果专区',
                    title: '展示创新教育10年发展历程以及展现“创新人才培养这十年”的成果和风采。',
                    pic: require('@/nskin/assets/img/introduce1.png'),
                    details: [
                        '创新教育（学科竞赛）10年历程概述',
                        '专家工作组研究成果',
                        '高校学生竞赛与教师发展数据平台展示'
                    ],
                },
                {
                    id: 2,
                    icon: require('@/nskin/assets/img/icon2.png'),
                    name: '高质量竞赛专区',
                    title: '展示竞赛在创新人才培养上的成果和特色，助力竞赛资源拓展、宣传推广、科技成果转化、产教深度融合、成果与需求信息发布等，促进竞赛高质量发展。',
                    pic: require('@/nskin/assets/img/introduce2.png'),
                    details: [
                        '学生竞赛',
                        '教师竞赛',
                        '省级竞赛',
                        '技能大赛'
                    ],
                },
                {
                    id: 3,
                    icon: require('@/nskin/assets/img/icon3.png'),
                    name: '交流互动区',
                    title: '参展竞赛可围绕赛事相关主题，优先合作，组织开展竞赛相关论坛、发布会、闭门会、决赛竞赛路演等会议活动。',
                    pic: require('@/nskin/assets/img/introduce3.png'),
                    details: [
                        '指数发布',
                        '竞赛发布',
                        '竞赛路演',
                        '交流对接'
                    ],
                },
            ],
            competitions: [
                {
                    id: 1,
                    tag: '教师类',
                    tag2: "国赛",
                    img: require('@/nskin/assets/img/competion1.png'),
                    name: '全国高校教师教学创新大赛',
                },
                {
                    id: 2,
                    tag: '理工类',
                    tag2: "国赛",
                    img: require('@/nskin/assets/img/competion2.png'),
                    name: '全国大学生集成电路创新创业大赛',
                },
                {
                    id: 3,
                    tag: '理工类',
                    tag2: "国赛",
                    img: require('@/nskin/assets/img/competion3.png'),
                    name: '全国大学生物理实验竞赛',
                },
                {
                    id: 4,
                    tag: '理工类',
                    tag2: "国赛",
                    img: require('@/nskin/assets/img/competion4.png'),
                    name: '全国大学生光电设计竞赛',
                },
                // {
                //     id: 5,
                //     tag: '电子信息',
                //     tag2: "国赛",
                //     img: require('@/nskin/assets/img/competion5.png'),
                //     name: '中国高校计算机大赛-移动应用创新赛',
                // },
                // {
                //     id: 6,
                //     tag: '人文社科类',
                //     tag2: "国赛",
                //     img: require('@/nskin/assets/img/competion6.png'),
                //     name: '两岸新锐设计竞赛·华灿奖',
                // },
                // {
                //     id: 7,
                //     tag: '综合类',
                //     tag2: "国赛",
                //     img: require('@/nskin/assets/img/competion7.png'),
                //     name: '中国“互联网+”大学生创新创业大赛',
                // },
                // {
                //     id: 4,
                //     tag: '电子信息',
                //     tag2: "国赛",
                //     img: require('@/nskin/assets/img/competion8.png'),
                //     name: '中国高校智能机器人创意大赛',
                // }
            ],
            content: '竞赛作品展示、育人成果案例展示。'
        }
    },
    created() {
        this.countTime()
    },
    methods: {
        moreLook() {
            this.showMore = !this.showMore
        },
        countTime() {
            //获取当前时间
            let date = new Date();
            let now = date.getTime();
            //设置截止时间
            let endDate = new Date("2022-12-2");
            let end = endDate.getTime();
            //时间差
            let leftTime = end - now;
            if (leftTime >= 0) {
                this.day = Math.floor(leftTime / 1000 / 60 / 60 / 24) + 1;
            }
        },
        changeTypes(i) {
            this.equityList.map(res => {
                res.checked = false
            })
            this.equityList[i].checked = true
            this.content = this.equityList[i].content
        },
        changeTabs(id) {
            this.current = id
        },
    }
}
</script>
<style>
.search .ant-btn-primary {
    /* width: 148px; */
    background: #333333;
    color: #fff;
    border: 1px solid #333333;
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

}

.ant-input-group .ant-input {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
}
.ant-carousel .slick-dots li button{
    background:rgb(51, 51, 51,.3)
}
.ant-carousel .slick-dots li.slick-active button{
    background:#333333
}
</style>
<style lang="less" scoped>
.competitionExpo {
    margin: 0 auto;
}

.headline {
    height: 32px;
    font-size: 22px;
    font-family: Source Han Sans CN-Medium, Source Han Sans CN;
    font-weight: 500;
    color: #333333;
    line-height: 32px;
    margin: 20px auto;
}

.competitionMain {

    // width: 336px;
    // margin: 0 auto;
    // display: flex;
    // flex-direction: row;
    .equityIist {
        width: 336px;
        margin: 0 auto;
        display: flex;
        flex-direction: row;
    }

    .equityItem {
        display: flex;
        align-items: center;

        .mess {
            width: 84px;
            height: 210px;
            background-size: cover;
            cursor: pointer;
            font-size: 22px;
            font-family: Source Han Sans CN-Medium, Source Han Sans CN;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 34px;
            transition: all 1s;
        }

        .name {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 500ms;
            background-color: rgba(0, 0, 0, .7);
        }

        .name:hover {
            background-color: rgba(64, 0, 0, .8);
        }

        .check {
            background-color: rgba(64, 0, 0, .8);
        }


    }

    .lists {
        width: 100%;

        background: rgba(249, 251, 255, .3);
        padding: 20px;
        box-sizing: border-box;
        text-align: left;

        .line {
            width: 60px;
            height: 2px;
            background: #E62129;
            margin-bottom: 10px;
        }

        .content {
            font-size: 18px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #333333;
            line-height: 32px;
        }
    }
}

.bannerbox {
    .bannerItem {
        img {
            width: 100%;
            height: 110px;
            margin: 0px auto;
            cursor: pointer;
            object-fit: contain;
        }

    }
}

.area {
    width: 100%;
    height: 220px;
    background: #FAFAFF url("../../assets/img/bg1.png") no-repeat center center;
    background-size: cover;
    margin: 40px auto;
    padding: 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .text1 {
        font-size: 18px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        line-height: 26px;
    }

    .text2 {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #666666;
        line-height: 23px;
    }

    .text3 {
        width: 260px;
        height: 40px;
        background: #E62129;
        font-size: 22px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 40px;
        margin: 0 auto;
    }

    .text4 {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #666666;
        line-height: 23px;
    }
}

.exhAreaItem {
    cursor: pointer;

    .imgbox {
        width: 335px;
        height: 270px;
        position: relative;
        transition: all 1s;
        margin: 0 auto;

        img {
            width: 335px;
            height: 270px;
            object-fit: cover;
        }
    }

    .name {
        height: 26px;
        font-size: 18px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        line-height: 26px;
        margin-top: 20px;
    }
    .line{
        width: 90px;
        border-bottom: 2px solid #E62129;
        margin: 10px auto;
    }
    .list {
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
        margin-top: 14px;
    }
}


.exhAreaList {
    height: 350px;
    margin: 42px auto 60px;
}

.exhAreaContent {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-evenly;

    .left {
        width: 385px;

        img {
            width: 100%;
        }
    }

    .right {
        width: 550px;
        text-align: left;

        .title {
            font-size: 18px;
            font-weight: 400;
            color: #333333;
            line-height: 26px;
            margin-bottom: 30px;
        }

        ul {
            li {
                font-size: 16px;
                font-weight: 400;
                color: #666666;
                line-height: 30px;
            }
        }
    }
}

.intruce {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    margin: 0 auto;

    p {
        text-align: left;
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #333333;
        line-height: 26px;
        text-indent: 36px;
    }
}

.competitions {
    background: #F9FBFF;
    width: 100%;
    overflow: hidden;

    .search {
        width: 90%;
        margin: 20px auto;
    }

    .competitionsList {
        width: 336px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-wrap: wrap;

        .part {
            width: 162px;
            position: relative;
            margin-right: 11px;
            margin-bottom: 11px;

            .left {
                position: absolute;
                left: 0;
                top: 0;
                background: #333333;
                color: #fff;
                padding: 0px 5px;
                height: 24px;
                line-height: 24px;
                border-bottom-right-radius: 5px;
                font-size: 10px;
            }

            .right {
                position: absolute;
                right: 0;
                top: 0;
                background: #f00;
                color: #fff;
                padding: 0px 5px;
                height: 24px;
                line-height: 24px;
                border-bottom-left-radius: 5px;
                font-size: 10px;

            }

            .pic img {
                width: 100%;
                height: 90px;
                object-fit: cover;
            }

            .title {
                background-color: #fff;
                font-size: 14px;
                line-height: 20px;
                text-align: left;
                padding: 10px 8px;
                height: 66px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
        }

        .part:nth-child(2n) {
            margin-right: 0px;
        }
    }
}
.moreBtn {
    width: 136px;
    height: 40px;
    background: #333333;
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 40px;
    margin: 0 auto 40px;
}

.moreBtn1 {
    width: 136px;
    height: 40px;
    background: #E62129;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 40px;
    margin: 20px auto 40px;
}
</style>


