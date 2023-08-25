<template>
  <div>
    <el-table
      v-loading="loading"
      class="drag"
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column type="" label="Date">
        <span class="move">icon</span>
      </el-table-column>
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>
<script lang="ts" setup>
import Sortable from 'sortablejs';
ElMessage.success('sss');
interface User {
  id: number;
  date: string;
  name: string;
  address: string;
  hasChildren?: boolean;
  children?: User[];
}
const tableData: User[] = ref([]);
const loading = ref(false);
const tableData1: User[] = [
  {
    id: 1,
    date: '2016-05-02',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-04',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-01',
    name: 'wangxiaohu',
    hasChildren: true,
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-03',
    name: 'wangxiaohu',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

function treeToTile(treeData, childKey = 'children') {
  const arr = [];
  const expanded = (data) => {
    if (data && data.length > 0) {
      data
        .filter((d) => d)
        .forEach((e) => {
          arr.push(e);
          expanded(e[childKey] || []);
        });
    }
  };
  expanded(treeData);
  return arr;
}

let activeRows = [];
onMounted(() => {
  const el = document.querySelector('.drag .el-table__body-wrapper tbody');
  Sortable.create(el, {
    handle: '.move',
    onStart: function () {
      activeRows = treeToTile(tableData.value);
      console.log(activeRows);
    },

    onEnd: (evt) => {
      // 监听拖动结束事件
      console.log(evt);
      const oldRow = activeRows[evt.oldIndex]; // 移动的那个元素
      const newRow = activeRows[evt.newIndex]; // 新的元素
      //首页地图一级不允许拖拽
      // if (this.type == 1) {
      //   //这里我们的需求是不允许某种数据的一级拖拽，可以根据自己的需要控制
      //   if (oldRow.pid == 0 && newRow.pid == 0) {
      //     this.$message({
      //       message: '首页地图不允许拖拽',
      //       type: 'warning',
      //     });
      //     this.dataList = [];
      //     this.getList();
      //     return false;
      //   }
      // }
      // 不允许跨层级拖拽
      console.log(oldRow.pid, newRow.pid);
      if (oldRow.pid !== newRow.pid) {
        ElMessage.warning('不允许跨层级拖拽');
        tableData.value = [];
        loading.value = true;
        setTimeout(getList, 1000);

        return false;
      }
    },
  });
});

function getList() {
  loading.value = false;
  tableData.value = [
    {
      id: 1,
      pid: 0,
      date: '2016-05-02',
      name: '1',
      address: 'No. 189, Grove St, Los Angeles',
      children: [],
    },
    {
      id: 2,
      pid: 0,
      date: '2016-05-04',
      name: '2',
      address: 'No. 189, Grove St, Los Angeles',
      children: [],
    },
    {
      id: 3,
      pid: 0,
      date: '2016-05-01',
      name: 'wangxiaohu',
      address: 'No. 189, Grove St, Los Angeles',
      children: [
        {
          id: 31,
          pid: 3,
          date: '2016-05-01',
          name: '1',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          id: 32,
          pid: 3,
          date: '2016-05-01',
          name: '2',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    },
    {
      id: 4,
      pid: 0,
      date: '2016-05-03',
      name: '12',
      address: 'No. 189, Grove St, Los Angeles',
      children: [],
    },
  ];
}

getList();
</script>
