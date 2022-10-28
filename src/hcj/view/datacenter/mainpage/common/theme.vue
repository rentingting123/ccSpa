<template>
    <div style="width: 100%">
        <h2 class="title">
            <p>定向主题</p>
        </h2>
        <ul class="workslist">
            <li v-for="list in navs" :key="list.id" @click='toPath(list)'>
                <a :href="list.link">
                    <div style="width: 45%;border: 1px solid #eee;overflow: hidden;position: relative;">
                        <img :class="{ imgs: list.id == 1869 }" :src="list.url" />
                    </div>
                    <div class="box">
                        <div class="mess">{{ list.name }}</div>
                        <div class="content">{{ list.content }}</div>
                    </div>
                </a>
                <!-- <div class="mess">{{list.name}}</div> -->
            </li>
        </ul>
    </div>
</template>

<script>
import mock from '@/hcj/mock/theme'
export default {
    data() {
        return {
            navs: [],
        }
    },
    created() {
        this.navs = mock.theme
    },
    methods: {
        toPath(list) {
            return false
            // this.$router.push('/datacenter/news/detail?id='+list.id)
        }
    }
}
</script>

<style lang="less" scoped>
.workslist {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 37px;
    text-align: left;

    li {
        width: 49%;
        margin: 20px 0 9px;
       a{
        display: flex;
        justify-content: space-between;
        cursor: pointer;
       }
        .box {
            height: 116px;
            border: 1px solid #eee;
            width: 55%;
            padding: 16px;
            // margin: 20px 11px 9px 0;
        }

        .imgs {
            position: absolute;
            // left: -59%;
            // top: -2px;
            width: 100%;
            height: 116px;
        }

        .content {
            text-align: justify;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
            color: #999999;
            font-size: 14px;
        }

        .mess {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align: left;
            width: 100%;
            height: 16px;
            line-height: 16px;
            font-weight: 400;
            color: #333333;
            margin-bottom: 8px;
            font-size: 16px;
        }
    }
}
</style>