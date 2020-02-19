<template>
  <div>
    <!--面包屑导航区域-->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-cpu"/> 传感器
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--卡片视图区域-->
    <div class="container">
      <!--多选可搜索区域-->
      <div class="handle-box">
        <el-input placeholder="请输入内容"
                  class="handle-input mr10"
                  clearable
                  v-model="queryInfo.query"
        />
        <el-button type="primary" icon="el-icon-search" @click="getSensorList">搜索</el-button>
      </div>
      <!--传感器列表区域-->
      <el-table
        :data="sensorList"
        style="width: 100%"
        border
        stripe>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="品牌:">
                <span>{{ props.row.brand }}</span>
              </el-form-item>
              <el-form-item label="功能类型:">
                <span>{{ props.row.func }}</span>
              </el-form-item>
              <el-form-item label="具体类型:">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="使用环境:">
                <span>{{ props.row.env }}</span>
              </el-form-item>
              <el-form-item label="级别:">
                <span>{{ props.row.lev }}</span>
              </el-form-item>
              <el-form-item label="产品描述:">
                <span>{{ props.row.descri }}</span>
              </el-form-item>
              <el-form-item label="优势:">
                <span>{{ props.row.adv }}</span>
              </el-form-item>
              <el-form-item label="产品特性ID:">
                <span>{{ props.row.sensorid }}</span>
              </el-form-item>
              <el-form-item label="应用:">
                <span>{{ props.row.app }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" align="center"/>
        <el-table-column
          label="产品ID"
          prop="id"
          align="center">
        </el-table-column>
        <el-table-column
          label="品牌"
          prop="brand"
          align="center">
        </el-table-column>
        <el-table-column
          label="功能类型"
          prop="func"
          align="center">
        </el-table-column>
        <el-table-column
          label="级别"
          prop="lev"
          align="center">
        </el-table-column>
        <el-table-column
          label="应用"
          prop="app"
          align="center"
          width="300px">
        </el-table-column>
        <el-table-column label="操作" width="80px" align="center">
          <template>
            <el-tooltip content="查询相关网关" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-share" @click="drawer = true"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="50%">
        <span>我来啦!</span>
      </el-drawer>
      <!--分页区域-->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageIndex"
          :page-sizes="[2, 5, 10, 20, 50]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="sensorList.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        // 当前页码
        pageIndex: 1,
        // 当前每页显示多少条数据
        pageSize: 5
      },
      sensorList: [],
      total: 0,
      drawer: false,
      direction: 'rtl'
    }
  },
  created () {
    this.getSensorList()
  },
  methods: {
    async getSensorList () {
      let params = {
        pageIndex: this.queryInfo.pageIndex,
        pageSize: this.queryInfo.pageSize
      }
      await this.$http.sensor.findPage(params).then((res) => {
        console.log(res)
        if (res.code !== 200) {
          return this.$message.error('获取传感器列表失败！')
        }
        this.sensorList = res.data.content
        this.total = res.total
      })
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getSensorList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.pageIndex = newPage
      this.getSensorList()
    },
    // 关闭抽屉
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
