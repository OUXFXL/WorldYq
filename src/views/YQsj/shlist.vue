<template>
  <div>
    <el-button size="mini" type="primary" @click="toAdd">上报</el-button>
    <el-table :data="listData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="country" label="国" width="50"> </el-table-column>
      <el-table-column prop="province" label="省" width="80"> </el-table-column>
      <el-table-column prop="city" label="市"> </el-table-column>
      <el-table-column prop="area" label="区"> </el-table-column>
      <el-table-column prop="confirmed" label="新增确诊"> </el-table-column>
      <el-table-column prop="suspected" label="疑似"> </el-table-column>
      <el-table-column prop="cure" label="治愈"> </el-table-column>
      <el-table-column prop="dead" label="重症"> </el-table-column>
      <el-table-column prop="outside" label="境外输入"> </el-table-column>
      <el-table-column
        prop="inputTime"
        label="上报时间"
        :formatter="formatDate"
      >
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryParams.page"
      :page-sizes="[1, 5, 10, 15, 20]"
      :page-size="queryParams.pageSize"
      layout="sizes, prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    ...mapGetters("shlist", ["listData", "total"]),
  },
  methods: {
    ...mapActions("shlist", ["pageQuery"]),
    //处理分页
    //处理页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.queryParams.page = 1;
      //发起请求
      this.pageQuery(this.queryParams);
    },
    //处理当前页
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.pageQuery(this.queryParams);
    },

    //上报
    toAdd() {
      this.$router.push({ path: "/YQsj/sjsb" });
    },
    //时间戳转正常日期
    formatDate(row, column) {
      let date = new Date(parseInt(row.inputTime));
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      return Y + M + D;
    },
  },
  created() {
    this.pageQuery(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>