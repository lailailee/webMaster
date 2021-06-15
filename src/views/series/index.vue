<template>
  <div class="series-manage">
    <el-card class="box-card container">
      <div class="top">
        <el-button
          class="add-series"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addSeries"
        >
          新增系列
        </el-button>
        <el-input
          v-model="search"
          style="width:20%;"
          placeholder="系列搜索"
          @change="searchHandle"
        />
      </div>
      <el-table
        border
        fit
        stripe
        :data="seriesList"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="系列名"
        />
        <el-table-column
          prop="articleCount"
          label="文章数"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
        >
          <template slot-scope="scope">
            {{ scope.row.createdAt }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="limit"
          @current-change="currentChangeHandle"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import Api from '@/api/index.js'
export default {
  data() {
    return {
      search: '',
      isEditShow: false,
      seriesList: [],
      page: 1,
      limit: 8,
      total: 0
    }
  },
  created() {
    this.getSeriesList()
  },
  mounted() { },
  methods: {
    getSeriesList() {
      const params = {
        limit: this.limit,
        page: this.page,
        search: this.search
      }
      Api.getSeriesList(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.total = res.data.count
          this.seriesList = res.data.list
        }
      }).catch(err => {
        console.error(err)
      })
    },
    // 新增系列
    addSeries() {
      this.$prompt('新增系列名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        Api.addSeries({ name: value }).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success('新增系列成功!')
            this.getSeriesList()
          } else {
            this.$message.warn('新增系列失败!')
          }
        }).catch(err => {
          console.error(err)
          this.$message.error('新增系列失败!')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    searchHandle(value) {
      // this.search = value
      this.getSeriesList()
    },
    currentChangeHandle(page) {
      this.page = page
      this.getSeriesList()
    },
    handleEdit(index, item) {
      const seriesId = item.id
      this.$prompt(`修改系列名称*${item.name}*为:`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: item.name
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        if (item.name === value) {
          return
        }
        Api.editSeries(seriesId, { name: value }).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success(`修改系列名称*${item.name}*为*${value}*成功`)
            this.getSeriesList()
          } else {
            this.$message.warn('修改系列名称失败!')
          }
        }).catch(err => {
          console.error(err)
          this.$message.error('修改系列名称失败!')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该系列, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const seriesId = item.id
        Api.deleteSeries(seriesId).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success('删除成功!')
            this.getSeriesList()
          } else {
            this.$message.warn('删除失败!')
          }
        }).catch(err => {
          console.error(err)
          this.$message.error('删除失败!')
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

<style lang="scss" scoped>
.series-manage {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 56px;
  .container {
    width: 95%;
    margin-top: 40px;
    padding: 10px;
    height: 95%;

    .top {
      margin-bottom: 20px;
      .add-series {
        cursor: pointer;
        display: inline-block;
        min-height: 1em;
        outline: none;
        border: none;
        vertical-align: baseline;
        background: #e0e1e2 none;
        // color: rgba(0, 0, 0, 0.6);
        font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
        margin: 0 0.25em 0 0;
        padding: 0.78571429em 1.5em;
        text-transform: none;
        text-shadow: none;
        font-weight: 700;
        line-height: 1em;
        font-style: normal;
        text-align: center;
        text-decoration: none;
        background: #00b5ad;
        border-color: #00b5ad;
        margin-right: 20px;
      }
    }
    .pagination {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>>
