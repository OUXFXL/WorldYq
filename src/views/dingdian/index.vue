<template>
  <div>
    <div id="top">
      <div>上海市</div>
      <br />
      <div>医疗救治定点医院和发热门诊</div>
    </div>
    <div id="put">
      <el-input v-model="queryParams.name" placeholder="请输入内容"></el-input>
      <el-button size="mini" type="primary" @click="tosearch">搜索</el-button>
    </div>
    <!-- 后台数据 -->
    <div>
      <div
        id="content"
        v-for="(item, index) in listDates"
        :key="index"
        @click="toMap(item)"
      >
        <span class="id">{{ item.id }}</span>
        <span>{{ item.name }}</span>
        <div class="content_id">{{ item.flags }}</div>
        <div>{{ item.province }} {{ item.city }} {{ item.address }}</div>
        <div class="address">
          <img
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3361215192,523359070&fm=26&gp=0.jpg"
            alt=""
          />
          <div>2113.5Km</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
        name: "",
        longitude: "",
        latitude: "",
      },

      input: "",
    };
  },
  computed: {
    ...mapState("ddyy", ["AllDatas"]),
    ...mapGetters("ddyy", ["total", "listDates"]),
  },
  methods: {
    ...mapActions("ddyy", ["pageQuery"]),
    //Map 详情
    toMap(item) {
      this.$router.push({ path: "/toDetail/details", query: item });

      console.log(item.longitude, "=========");
    },
    //input模糊查询
    tosearch() {
      this.pageQuery(this.queryParams);
    },
  },
  created() {
    this.pageQuery(this.queryParams);
  },
  mounted() {},
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
#top {
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;

  /* background-color: aqua; */
}
#put {
  margin-top: 20px;
  display: flex;
  margin-right: 30px;
  width: 190px;
}
#put el-button {
  margin-left: 20px;
}
#content {
  margin-top: 20px;
}
.content_id {
  text-align: center;
  line-height: 30px;
  width: 60px;
  height: 30px;
  background-color: burlywood;
}
.id {
  border-radius: 100%;
  background-color: #ccc;
}
.address {
  margin-top: -50px;
  float: right;
}
.address img {
  margin-top: -30px;
  width: 40px;
  height: 40px;
}
</style>