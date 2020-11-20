<template>
  <div>
    <v-region type="column" @values="regionChange"> </v-region>
    <div>
      <el-form label-width="80px" :model="form">
        <el-form-item label="确诊">
          <el-input v-model="form.confirmed"></el-input>
        </el-form-item>
        <el-form-item label="疑似">
          <el-input v-model="form.suspected"></el-input>
        </el-form-item>
        <el-form-item label="死亡">
          <el-input v-model="form.dead"></el-input>
        </el-form-item>
        <el-form-item label="治愈">
          <el-input v-model="form.cure"></el-input>
        </el-form-item>
        <el-form-item label="重症">
          <el-input v-model="form.severe"></el-input>
        </el-form-item>
        <el-form-item label="境外输入">
          <el-input v-model="form.outside"></el-input>
        </el-form-item>
      </el-form>
      <el-button size="mini" type="primary" @click="toAdd">提交</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      queryParams: {
        country: "中国",
        province: "",
        city: "",
        area: "",
        // confirmed: "",
        // suspected: "",
        // dead: "",
        // cure: "",
        // severe: "",
        // outside: "",
      },
      form: {
        country: "中国",
        province: "",
        city: "",
        area: "",
      },
    };
  },
  computed: {},
  methods: {
    ...mapActions("shlist", ["saveOrUpdate", "pageQuery"]),
    //获取地址参数
    regionChange(data) {
      console.log(data, "========");
      this.queryParams.country;
      this.form.province = data.province.value;
      console.log(this.form.province);
      this.form.city = data.city.value;
      this.form.area = data.area.value;
      console.log(this.form.city);
      console.log(this.form.area);
    },
    //提交
    toAdd() {
      this.saveOrUpdate({
        form: this.form,
      });
    },
  },
  created() {
    // this.saveOrUpdate(this.queryParams);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>