<template>
  <div>
    <el-button size="mini" type="primary" @click="toAdd">新增</el-button>
    <!-- 表格 -->
    <el-table :data="listData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="title" label="新闻标题" width="350">
      </el-table-column>
      <el-table-column
        prop="category"
        label="新闻分类"
        width="80"
        :formatter="changeName"
      >
      </el-table-column>
      <el-table-column
        prop="publishTime"
        label="发布时间"
        :formatter="formatDate"
      >
      </el-table-column>
      <el-table-column prop="readTimes" label="阅读次数"> </el-table-column>
      <el-table-column prop="status" label="状态"> </el-table-column>
      <el-table-column prop="thumpUp" label="点赞次数"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
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
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- {{ totalDatas }} -->
        <el-form-item label="所属分类" :label-width="formLabelWidth">
          <el-select v-model="form.categoryId" placeholder="select">
            <el-option
              v-for="item in totalDatas"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <div class="editor">
          <quill-editor
            ref="myTextEditor"
            label="资讯"
            v-model="form.content"
            :config="editorOption"
          ></quill-editor>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteById } from "@/api/YQgl/zixu";
import { quillEditor } from "vue-quill-editor"; // 导入quillEditor组件
import "quill/dist/quill.js";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
      },

      form: {},
      title: "发布新闻资讯",
      visible: false,
      formLabelWidth: "100px",
      // content: "this is a simple demo", // 编辑器的内容
      editorOption: {
        // 编辑器的配置
        // something config
        theme: "bubble",
      },
    };
  },
  components: {
    quillEditor,
  },
  computed: {
    ...mapState("zizu", ["totalDatas"]),
    ...mapGetters("zizu", ["listData", "total"]),
  },
  methods: {
    ...mapActions("zizu", [
      "pageQuery",
      "saveOrUpdate",
      "findAll",
      "deleteById",
    ]),
    //处理分页
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      (this.queryParams.page = 1), this.pageQuery(this.queryParams);
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.pageQuery(this.queryParams);
    },
    //确定
    //保存
    toSave() {
      this.saveOrUpdate({
        form: this.form,
      }).then(() => {
        this.visible = false;
        this.pageQuery(this.queryParams);
      });
    },
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
              this.pageQuery(this.queryParams);
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
      this.title = "修改发布资讯";
      this.visible = true;
    },
    //新增
    toAdd() {
      (this.visible = true), (this.form = {});
    },
    //拿对象数据
    changeName(row, column) {
      return row.category.name;
    },
    //转时间
    formatDate(row, column) {
      let date = new Date(parseInt(row.publishTime));
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
    this.findAll();
    this.pageQuery(this.queryParams);
  },
  mounted() {},
};
</script>
<style>
</style>