<template>
    <div class="appraisal">
        <div>
            <h1 class="title">学员评价</h1>
            <h3 class="title">师兄师姐引荐，与更多志同道合的校友一同前行</h3>
            <ul>
                <li v-for="(list,index) in lists"  class="clearfix" >
                    <div class="fl">
                        <img :src="list.img" alt="" srcset="">
                    </div>
                    <div class="fr" :class="{'long':index==3}">
                        <p v-html="list.message"></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {
                    img: require('../../../assets/detail/appraisal1.png'),
                    message: '在蚂蚁短暂的学习参观体验，让我学习到了真正实用的知识，虽然时间很短个人思维和认识得到了极大提高，学到了一些关键方法和技巧，学到了许多思路，收获很大，期待还有机会能够再次参加学习观摩。',
                },
                {
                    img: require('../../../assets/detail/appraisal2.png'),
                    message: '不愧是走在时代前端的大平台，本来只是抱着试一试的态度过去，没想到通过此次体验学习和观摩，瞬间感觉到自己的差距原来是这么大，当然还有全程陪同、耐心解答的老师，辛苦了。',
                },
                {
                    img: require('../../../assets/detail/appraisal3.png'),
                    message: '这次体验真的太棒了，有专业的老师全程陪同讲解，还有幸在蚂蚁内部参观，非常棒的一次体验，开拓了眼界，提升了认知，希望以后能有机会再次到这里学习。',
                },
                {
                    img: require('../../../assets/detail/appraisal4.png'),
                    message: '博学风趣的导师，整洁宽敞的大楼，都超过了我的预期。结识了新的朋友，了解了更多的知识，开阔了视野，发散了思维，在今后的学习生涯中，这将是一笔尤为宝贵的财富。有点舍不得离开。这世界太大，太丰富，总想认识更多，学到更多。这一刻，梦在蚂蚁。',
                },
            ]
        }
    }
}
</script>

<style lang="less" scoped>
.appraisal{
    background: #006EFF;
    padding: 40px 0;
    >div{
        width: 1193px;
        margin: 0 auto;
        background: #FFFFFF;
        border-radius: 30px;
        padding: 50px 0 40px;
        ul{
            width: 853px;
            margin: 0 auto;
            li{
                width: 100%;
                margin-bottom: 50px;
                .fl{
                    width: 84px;
                }
                .fr{
                    width: 750px;
                    background: url('../../../assets/detail/bg1.png') no-repeat;
                    padding: 22px 48px 28px 64px;
                    p{
                        font-size: 18px;
                        color: #4A4A4A;
                        letter-spacing: 2.44px;
                        text-align: justify;
                        line-height: 35px;
                    }
                }
                .fr.long{
                    background: url('../../../assets/detail/bg2.png') no-repeat;
                }
            }
        }
    }
    
}
</style>