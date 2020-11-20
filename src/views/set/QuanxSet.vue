<template>
  <div>
    <el-button size="mini" type="primary" @click="toAdd">新增</el-button>
    <!-- 表格 -->
    <el-table :data="totalData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="分类名称" width="100">
      </el-table-column>
      <el-table-column prop="type" label="种类"> </el-table-column>
      <el-table-column prop="parentId" label="父栏目"> </el-table-column>
      <el-table-column prop="icon" label="图标"> </el-table-column>
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
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible">
      <el-form :model="form">
        <el-form-item label="序号" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父栏目id" :label-width="formLabelWidth">
          <el-input v-model="form.parentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
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
import { deleteById } from "@/api/set/rolse";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      form: {},
      title: "新增权限",
      visible: false,
      formLabelWidth: "80px",
    };
  },
  computed: {
    ...mapState("rolse", ["totalData"]),
  },
  methods: {
    ...mapActions("rolse", ["findAll", "saveOrUpdate"]),
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
    //确定
    toSave() {
      this.saveOrUpdate({
        form: this.form,
      }).then(() => {
        this.visible = false;
        this.findAll();
      });
    },
    //新增
    toAdd() {
      this.visible = true;
      this.form = {};
    },
    //修改
    handleClick(row) {
      this.form = { ...row };
      this.visible = true;
      this.title = "修改权限";
    },
  },
  created() {
    this.findAll();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>