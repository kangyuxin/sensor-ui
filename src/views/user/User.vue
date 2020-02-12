<template>
  <div>
    <!--面包屑导航区域-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-add-location"/> 用户管理
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
          @click="delAllSelection"
        >批量删除</el-button>
        <el-input placeholder="请输入内容"
                  class="handle-input mr10"
                  v-model="queryInfo.query"
                  clearable
        />
        <el-button type="primary" icon="el-icon-search" @click="getUserList">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="editVisible = true">添加用户</el-button>
      </div>
      <!--用户列表区域-->
      <el-table :data="userList"
                border
                class="table"
                ref="multipleTable"
                stripe
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column type="index" label="#" align="center"/>
        <el-table-column prop="username" label="用户名" align="center"/>
        <el-table-column prop="password" label="密码" align="center"/>
        <el-table-column prop="email" label="邮箱" align="center"/>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state"
                       active-color="#13ce66"
                       inactive-color="#ff4949"
                       @change="userStateChanged(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center"/>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row.id)"/>
            </el-tooltip>
            <el-tooltip content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--分页区域-->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageIndex"
          :page-sizes="[2, 5, 10, 20, 50]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userList.length">
        </el-pagination>
      </div>
      <!-- 添加用户弹出框 -->
      <el-dialog title="添加用户" :visible.sync="editVisible" width="30%" @close="addDialogClosed">
        <el-form ref="addFormRef"
                 :model="addForm"
                 label-width="70px"
                 :rules="addFormRules"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑用户的对话框 -->
      <el-dialog
        title="编辑用户信息"
        :visible.sync="editDialogVisible"
        width="50%">
        <el-form ref="editFormRef"
                 :model="editForm"
                 label-width="70px"
                 :rules="editFormRules"
                 @close="editDialogClosed"
        >
          <el-form-item label="用户名">
            <el-input v-model="editForm.username"/>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="editForm.password"/>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    // // 验证手机号
    // var checkMobile = (rule, value, cb) => {
    //   const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
    //   if (regMobile.test(value)) {
    //     return cb()
    //   }
    //   cb(new Error('请输入合法手机号'))
    // }
    return {
      queryInfo: {
        query: '',
        // 当前页码
        pageIndex: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      userList: [], // 用户表单
      multipleSelection: [], // 批量选取
      delList: [], // 批量删除
      editVisible: false, // 控制添加用户对话框的显示和隐藏
      pageTotal: 0, // 总页数
      addForm: {
        username: '',
        password: '',
        email: ''
      }, // 添加用户的表单数据
      addFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 3, max: 15, message: '用户名长度在3-15字符之间' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 15, message: '密码长度在6-15字符之间' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }]
      }, // 添加用户表单验证
      idx: -1,
      id: -1,
      editDialogVisible: false, // 控制编辑用户对话框的显示和隐藏
      editForm: {}, // 查询到的用户信息对象
      editFormRules: {
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, max: 15, message: '密码长度在6-15字符之间' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 获取mock的模拟数据
    async getUserList () {
      let params = {
        pageIndex: this.queryInfo.pageIndex,
        pageSize: this.queryInfo.pageSize
      }
      await this.$http.user.findPage(params).then((res) => {
        // console.log(res)
        if (res.code !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.userList = res.data.content
        this.pageTotal = res.data.content.length / this.queryInfo.pageSize
      })
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getUserList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getUserList()
    },
    // 多选操作
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 批量删除
    delAllSelection () {
      const length = this.multipleSelection.length
      let str = ''
      this.delList = this.delList.concat(this.multipleSelection)
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' '
      }
      this.$message.error(`删除了${str}`)
      this.multipleSelection = []
    },
    // // 触发搜索按钮
    // handleSearch () {
    //   this.$set(this.queryInfo, 'pageIndex', 1)
    //   this.getUserList()
    // },
    // 监听switch开关状态的改变
    async userStateChanged (userInfo) {
      // console.log(userInfo)
      await this.$http.user.banUserById(userInfo).then((res) => {
        if (res.code !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error('更新用户状态失败')
        }
        this.$message.success('更新用户状态成功')
      })
    },
    // 监听添加用户对话框的关闭事件,使每次点开都是空白表单
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 添加新用户
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        // console.log(valid)
        // eslint-disable-next-line no-useless-return
        if (!valid) return
        await this.$http.user.addUser(this.addForm).then((res) => {
          if (res.code !== 201) {
            return this.$message.error('添加用户失败')
          }
          this.$message.success('添加用户成功')
          this.editVisible = false
          this.getUserList()
        })
      })
    },
    // 展示编辑用户对话框
    async handleEdit (id) {
      this.editDialogVisible = true
      // console.log(id)
      await this.$axios.get('users/' + id).then((res) => {
        if (res.status !== 200) {
          return this.$message.error('查询用户信息失败')
        }
        this.editForm = res.data
      })
    },
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo () {
      this.$refs.editFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        await this.$axios.put('users/' + this.editForm.id, {
          password: this.editForm.password,
          email: this.editForm.email
        }).then((res) => {
          console.log(res)
          if (res.status !== 200) {
            return this.$message.error('更新用户信息失败')
          }
          this.editDialogVisible = false
          this.getUserList()
          this.$message.success('更新用户信息成功')
        })
      })
    },
    // 根据id值删除对应的用户信息
    handleDelete (id) {
      // console.log(id)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete('users/' + id).then((res) => {
          if (res.status !== 200) {
            return this.$message.error('删除用户失败')
          }
          this.$message({ type: 'success', message: '删除成功!' })
          this.getUserList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
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
