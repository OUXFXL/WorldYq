<template>
  <div>
    <!-- 表格 -->
    <el-table :data="listDatas" style="width: 100%">
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="100">
      </el-table-column>
      <el-table-column prop="realname" label="姓名"> </el-table-column>
      <el-table-column prop="gender" label="性别" :formatter="formatSex">
      </el-table-column>
      <el-table-column prop="telephone" label="手机号"> </el-table-column>
      <el-table-column prop="birth" label="出生日期" :formatter="formatDate">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >修改</el-button
          >
          <el-button type="text" size="small" @click="toDelete(scope.row)"
            >删除</el-button
          >
        </template>
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
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.realname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="form.gender" label="male">男</el-radio>
          <el-radio v-model="form.gender" label="female">女</el-radio>
        </el-form-item>

        <el-form-item label="出生日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.birth"
            value-format="timestamp"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { deleteById } from "@/api/set/user2";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
      },
      form: {},
      title: "用户",
      visible: false,
      formLabelWidth: "80px",
    };
  },
  computed: {
    ...mapGetters("user2", ["listDatas", "total"]),
  },
  methods: {
    ...mapActions("user2", ["pageQuery", "saveOrUpdate", "deleteById"]),
    //删除
    toDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        //发请求删除
        deleteById({ id: row.id })
          .then((res) => {
            if (res.status === 200) {
              //提示删除成功，并且刷新数据
              this.$notify({
                title: "成功",
                message: "删除成功",
                type: "success",
              });
              this.findAll();
            } else {
              this.$notify({
                title: "失败",
                message: "删除失败",
                type: "error",
              });
            }
          })
          .catch((err) => {
            this.$notify({
              title: "失败",
              message: "删除失败",
              type: "error",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
    //修改
    handleClick(row) {
      this.form = { ...row };
      this.title = "修改用户信息";
      this.visible = true;
    },
    //性别转换
    formatSex(row, column) {
      return row.gender == "male "
        ? "男"
        : row.gender == "female"
        ? "女"
        : "男 ";
    },
    //保存
    toSave() {
      this.saveOrUpdate({
        form: this.form,
      }).then(() => {
        this.visible = false;
        this.pageQuery(this.queryParams);
      });
    },
    //添加
    toAdd() {
      this.visible = true;
      this.form = {};
      this.title = "新增用户信息";
    },
    //时间戳转正常日期格式
    formatDate(row, column) {
      let date = new Date(parseInt(row.birth));
      let Y = date.getFullYear() + "-";
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1) + "-"
          : date.getMonth() + 1 + "-";
      let D =
        date.getDate() < 10 ? "0" + date.getDate() + " " : date.getDate() + " ";
      return Y + M + D;
    },
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
  },
  created() {
    this.pageQuery(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>