<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handler"
    ></a-input>
    <a-button type="primary" @click="addTodo">添加事项</a-button>
    <a-list bordered :dataSource="filterList" class="my_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-checkbox
          :checked="item.done"
          @change="changeStatus(item.id, $event)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="delTodo(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{ count }}条剩余</span>
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey === 'undone' ? 'primary' : 'default'"
            @click="changeList('undone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey === 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <a @click="delAll">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["list", "inputValue", "viewKey"]),
    ...mapGetters(["count", "filterList"]),
  },
  methods: {
    handler(e) {
      this.$store.commit("changeInputValue", e.target.value);
    },
    addTodo() {
      if (this.inputValue.trim().length == 0)
        return this.$message.warning("不能输入空内容！！！");
      this.$store.commit("addList", this.inputValue);
    },
    delTodo(idx) {
      this.$store.commit("deleteList", idx);
    },
    changeStatus(idx, e) {
      this.$store.commit("changeStatus", {
        status: e.target.checked,
        id: idx,
      });
    },
    delAll() {
      this.$store.commit("delAll");
    },
    changeList(status) {
      this.$store.commit("changeKey", status);
    },
  },
};
</script>

<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.my_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>