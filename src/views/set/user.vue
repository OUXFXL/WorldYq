<<template>
  <div>
    
      <el-table :data="allData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="100"> </el-table-column>
      <el-table-column prop="name" label="角色" width="100">
      </el-table-column>
      <el-table-column prop="realname" label="权限名称" :formatter="changeName"> </el-table-column>
     
      <el-table-column prop="telephone" label="权限种类" :formatter="changetypeof"> </el-table-column>
     
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("rolse", ["allData"]),
  },
  methods: {
    ...mapActions("rolse", ["PrivilegeFindAll"]),
    //权限种类
    changetypeof(row) {
      return row.privileges.map((item) => item.type);
    },
    changeName(row) {
      return row.privileges.map((item) => item.name);
    },
  },
  created() {
    this.PrivilegeFindAll();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>