<template>
  <div>
    <el-button size="mini" type="primary" @click="toAdd">新增</el-button>
    <!-- 表格 -->
    <el-table :data="listDates" style="width: 100%">
      <el-table-column prop="id" label="序号" width="50"> </el-table-column>
      <el-table-column prop="name" label="医院名称" width="100">
      </el-table-column>
      <el-table-column prop="introduce" label="医院简介"> </el-table-column>
      <el-table-column prop="address" label="医院地址"> </el-table-column>
      <el-table-column prop="flags" label="标记"> </el-table-column>
      <el-table-column prop="longitude" label="经度"> </el-table-column>
      <el-table-column prop="latitude" label="纬度"> </el-table-column>
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
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduce" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label=" 省市" :label-width="formLabelWidth">
          <v-region type="column" @values="regionChange"> </v-region>
        </el-form-item>

        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="标记" :label-width="formLabelWidth">
          <el-input v-model="form.flags" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经度" :label-width="formLabelWidth">
          <el-input v-model="form.longitude" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="纬度" :label-width="formLabelWidth">
          <el-input v-model="form.latitude" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="toSave">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模态框 -->
  </div>
</template>

<script>
import { deleteById } from "@/api/dingdian/Dd";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        page: 1,
        pageSize: 10,
      },
      form: {},
      title: "录入医院信息",
      visible: false,
      formLabelWidth: "70px",
    };
  },
  computed: {
    ...mapGetters("ddyy", ["listDates"]),
  },
  methods: {
    ...mapActions("ddyy", ["pageQuery", "saveOrUpdate", "deleteById"]),
    //省市
    regionChange(data) {
      this.queryParams.country;
      this.form.province = data.province.value;
      console.log(this.form.province);
      this.form.city = data.city.value;
      this.form.area = data.area.value;
      console.log(this.form.city);
      console.log(this.form.area);
    },
    //确定
    toSave() {
      this.saveOrUpdate({
        form: this.form,
      }).then(() => {
        this.visible = false;
        this.pageQuery(this.queryParams);
        this.form = {};
      });
    },
    //新增
    toAdd() {
      this.form = {};
      this.visible = true;
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
      this.visible = true;
      this.form = { ...row };
      this.title = "修改医院录入信息";
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