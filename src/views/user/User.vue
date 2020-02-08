<template>
  <div>
    <!--面包屑导航区域-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"/> 用户管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--卡片视图区域-->
    <div class="container">
      <!--搜索和添加区域-->
      <div class="handle-box">
        <el-button
          type="primary"
          icon="el-icon-delete"
          class="handle-del mr10"
        >批量删除</el-button>
        <el-input placeholder="用户名" class="handle-input mr10"/>
        <el-button type="primary" icon="el-icon-search" >搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" >添加用户</el-button>
      </div>
<!--      <el-table-->
<!--        :data="tableData"-->
<!--        border-->
<!--        class="table"-->
<!--        ref="multipleTable"-->
<!--        header-cell-class-name="table-header"-->
<!--        @selection-change="handleSelectionChange"-->
<!--      >-->
<!--        <el-table-column type="selection" width="55" align="center"/>-->
<!--        <el-table-column prop="id" label="ID" width="55" align="center"/>-->
<!--        <el-table-column prop="username" label="用户名"/>-->
<!--        <el-table-column prop="password" label="密码"/>-->
<!--        <el-table-column prop="email" label="邮箱"/>-->
<!--        <el-table-column label="状态" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-tag-->
<!--              :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"-->
<!--            >{{scope.row.state}}</el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->

<!--        <el-table-column prop="date" label="注册时间"/>-->
<!--        <el-table-column label="操作" width="180" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              type="text"-->
<!--              icon="el-icon-edit"-->
<!--              @click="handleEdit(scope.$index, scope.row)"-->
<!--            >编辑</el-button>-->
<!--            <el-button-->
<!--              type="text"-->
<!--              icon="el-icon-delete"-->
<!--              class="red"-->
<!--              @click="handleDelete(scope.$index, scope.row)"-->
<!--            >删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--      </el-table>-->
<!--      <div class="pagination">-->
<!--        <el-pagination-->
<!--          background-->
<!--          layout="total, prev, pager, next"-->
<!--          :current-page="query.pageIndex"-->
<!--          :page-size="query.pageSize"-->
<!--          :total="pageTotal"-->
<!--          @current-change="handlePageChange"-->
<!--        />-->
<!--      </div>-->
    </div>

<!--    &lt;!&ndash; 编辑弹出框 &ndash;&gt;-->
<!--    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">-->
<!--      <el-form ref="form" :model="form" label-width="70px">-->
<!--        <el-form-item label="用户名">-->
<!--          <el-input v-model="form.name"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="地址">-->
<!--          <el-input v-model="form.address"/>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      <span slot="footer" class="dialog-footer">-->
<!--                <el-button @click="editVisible = false">取 消</el-button>-->
<!--                <el-button type="primary" @click="saveEdit">确 定</el-button>-->
<!--            </span>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取mock的模拟数据
    // async getUserList () {
    //   const { data: res } = await this.$http.user.getUserList('users', {
    //     params: this.queryInfo
    //   })
    //   console.log(res)
    // }
    // // 触发搜索按钮
    // handleSearch () {
    //   this.$set(this.query, 'pageIndex', 1)
    //   this.getUserList()
    // },
    // // 删除操作
    // handleDelete (index, row) {
    //   // 二次确认删除
    //   this.$confirm('确定要删除吗？', '提示', {
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.$message.success('删除成功')
    //       this.tableData.splice(index, 1)
    //     })
    //     .catch(() => {})
    // },
    // // 多选操作
    // handleSelectionChange (val) {
    //   this.multipleSelection = val
    // },
    // delAllSelection () {
    //   const length = this.multipleSelection.length
    //   let str = ''
    //   this.delList = this.delList.concat(this.multipleSelection)
    //   for (let i = 0; i < length; i++) {
    //     str += this.multipleSelection[i].name + ' '
    //   }
    //   this.$message.error(`删除了${str}`)
    //   this.multipleSelection = []
    // },
    // // 编辑操作
    // handleEdit (index, row) {
    //   this.idx = index
    //   this.form = row
    //   this.editVisible = true
    // },
    // // 保存编辑
    // saveEdit () {
    //   this.editVisible = false
    //   this.$message.success(`修改第 ${this.idx + 1} 行成功`)
    //   this.$set(this.tableData, this.idx, this.form)
    // },
    // // 分页导航
    // handlePageChange (val) {
    //   this.$set(this.query, 'pageIndex', val)
    //   this.getUserList()
    // }
  }
}
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
