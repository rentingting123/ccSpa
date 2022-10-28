<template>
    <div class="details">
        <div class="line"></div>
        <div class="main">
            <!-- 面包屑 -->
            <breadcrumb title1="竞赛赋能" title2="赛事宣传" path="/empowerment" style="padding-top: 17px;" />

            <!-- 宣讲大纲 -->
            <videos :id='id' v-if="id" :obj='obj' />

            <!-- 竞赛简介 -->
            <div class="introduction">
                <h2Title title="竞赛简介" />
                <div> {{obj && obj.competitionInfo}} </div>
            </div>

            <!-- 举办单位 竞赛流程 -->
            <div class="compony">
                <div class="left">
                    <h2Title title="举办单位" />
                    <div class="types">
                        <p><span>主办单位</span> <span>{{obj && obj.sponsor}}</span></p>
                        <p><span>承办单位</span> <span>{{obj && obj.undertake}}</span></p>
                        <p><span>竞赛宣传语</span> <span>{{obj && obj.slogan | slogan}}</span></p>
                    </div>
                </div>
                <div class="right">
                    <h2Title title="竞赛流程" />
                    <div>{{obj && obj.schedule}}</div>
                </div>
            </div>

            <!-- 信息类资料 竞赛影响力 -->
            <div class="compony">
                <div class="left">
                    <h2Title title="信息类资料" />
                    <div class="types">
                        <p><span>竞赛网站</span> <span>{{obj && obj.competitionUrl}}</span></p>
                        <p><span>秘书处单位</span> <span>{{obj && obj.secretary}}</span></p>
                        <p><span>秘书处地址</span> <span>{{obj && obj.secretaryAddress}}</span></p>
                        <p><span>秘书处电话</span> <span>{{obj && obj.secretaryPhone}}</span></p>
                        <p><span>秘书处邮箱</span> <span>{{obj && obj.secretaryEmail}}</span></p>
                    </div>
                </div>
                <div class="right">
                    <h2Title title="竞赛影响力" />
                    <div>{{obj && obj.influence}}</div>
                </div>
            </div>

            <!-- 图片展示 -->
            <div class="pics">
                <pics :obj='obj' />
            </div>
        </div>
    </div>
</template>

<script>
import h2Title from './common/h2title'
import breadcrumb from '@/nskin/components/breadcrumb'
import videos from './common/videos'
import pics from './common/pics'
import network from '@/api'
export default {
    data() {
        return {
            id: '',
            obj: {}
        }
    },
    components: {
        h2Title,
        videos,
        pics,
        breadcrumb,
    },
    created() {
        this.id = this.$route.params.id || ''
        this.getDetailData()
    },
    methods: {
        async getDetailData() {
            if (!this.id) return;
            let res = await network.selectCompetitionEnergize({ data: { competitionId: this.id } })
            this.obj = res || {}
        },
    },
    filters: {
        slogan(val) {
            if (!val) return '';
            if (val.indexOf('http') != -1) {
                return ''
            } else {
                return val
            }
        }
    }
}
</script>

<style lang='less' scoped>
.details {
    background: rgba(155, 155, 155, 0.05);
    padding-top: 26px;
    padding-bottom: 35px;
  

    .line {
        width: 100%;
        height: 1px;
        background: #252223;
    }

    .main {
        width: 1200px;
        margin: 0 auto;

        .introduction {
            width: 100%;
            height: auto;
            min-height: 200px;
            background: #F2F7F7;
            text-align: left;
            margin-top: 35px;

            >div {
                padding: 18px 37px;
                text-indent: 2em;
                font-size: 18px;
                font-weight: 400;
                line-height: 30px;
                color: #707070;
            }
        }

        .compony {
            text-align: left;
            font-size: 18px;
            font-weight: 400;
            line-height: 30px;
            color: #707070;
            margin-top: 35px;
            display: -webkit-box;
            height: auto;

            .left {
                width: 324px;
                min-height: 234px;
                background: #F2F7F7;
                margin-right: 10px;

                .types {
                    padding: 18px 16px;

                    p {
                        font-size: 18px;
                        line-height: 25px;
                        color: #252223;
                        opacity: 0.8;
                        margin-bottom: 6px;

                        span {
                            display: inline-block;
                            vertical-align: top;
                            width: 165px;
                            height: auto;
                        }

                        &:last-child {
                            margin-bottom: 0;
                            word-break: break-all;
                        }

                        span:first-child {
                            width: 92px;
                            font-weight: bold;
                            margin-right: 13px;
                        }

                        &::before {
                            content: '';
                            width: 6px;
                            height: 6px;
                            background: #ED1E26;
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 9px;
                        }

                    }
                }
            }

            .right {
                width: 866px;
                min-height: 234px;
                background: #F2F7F7;

                >div {
                    padding: 18px 24px;
                }
            }
        }

        .pics {
            width: 1200px;
            height: 347px;
            background: #E6EBEB;
            margin-top: 35px;
            position: relative;
        }
    }
}
</style>