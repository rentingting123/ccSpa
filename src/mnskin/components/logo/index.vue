<template>
  <div>
    <div class="logo">
      <img :src="logo" class="logo fl" @click="$router.push('/')" />
    </div>
    <ul v-if="hideNav">
      <li
        v-for="list in navs"
        @click="$router.push(list.path)"
        :class="{ on: path == list.path }"
      >
        <div>{{ list.name }}</div>
        <p></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["path", "hideNav"],
  data() {
    return {
      logo:
        "https://web.moocollege.com/mooc/hzq/vueskin/assets/mainpage/header/logo20210512.png",
      navs: [
        {
          name: "首页",
          path: "/",
          id: 1,
        },
        {
          name: "竞赛博览会",
          path: "/competitionExpo",
          id: 8,
        },
        {
          name: "竞赛赋能",
          path: "/empowerment",
          id: 5,
        },
        {
          name: "竞赛排行",
          path: "/assessment",
          id: 3,
        },
        {
          name: "教发指数",
          path: "/development",
          id: 2,
        },
        // {
        //     name: '学生竞赛',
        //     path: '/assessment',
        //     id: 3
        // },
        // {
        //   name: "新闻资讯",
        //   path: "/newslist",
        //   id: 4,
        // },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  height: 0.83rem;

  img {
    margin-left: 0.17rem;
    width: 5.62rem;
    height: auto;
    padding: 0.1rem 0 0.07rem;
  }
}

ul {
  width: 100%;
  height: 0.7rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 0.01rem solid #e7e7e7;

  li {
    cursor: pointer;
    position: relative;

    div {
      text-align: center;
      font-size: 0.32rem;
      color: #4a4a4a;
      letter-spacing: 0;
      line-height: 0.7rem;
      width: 100%;
    }

    p {
      display: none;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0.67rem;
      height: 0.06rem;
      background: #eb1e26;
    }
  }

  li.on {
    div {
      font-weight: bold;
      color: #eb1e26;
    }

    p {
      display: block;
    }
  }
}
</style>
