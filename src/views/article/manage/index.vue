<template>
  <div>

    <div
      v-if="!isEditShow"
      class="article-manage"
    >
      <el-card class="box-card container">
        <div class="search">
          <el-input
            v-model="search"
            style="width:20%;"
            placeholder="文章搜索"
            @change="searchHandle"
          />
        </div>
        <el-table
          border
          fit
          stripe
          :data="articleList"
          style="width: 100%"
        >
          <el-table-column
            prop="title"
            label="文章标题"
          />
          <el-table-column
            prop="viewCount"
            label="点击数"
            width="80"
          />
          <el-table-column
            prop="category"
            label="目录"
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.category.name }}
            </template>
          </el-table-column>

          <el-table-column
            prop="tags"
            label="标签"
          >
            <template slot-scope="scope">
              <div style="display:flex;">
                <div
                  v-for="(item,index) in scope.row.tags"
                  :key="index"
                >{{ item.name }}<span v-show="scope.row.tags.length-index!=1">,</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="series"
            label="系列"
            width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.seriesId!==0?scope.row.series.name:"" }}
            </template>
          </el-table-column>
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
                @click="handleEdit(scope.row)"
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
    <edit
      v-if="isEditShow"
      type="edit"
      :article-info="editingArticleInfo"
    />
    <div
      v-if="isEditShow"
      class="back"
      @click="backToListPage"
    >
      back
    </div>
    <!-- <el-backtop
      target=".page-component__scroll .el-scrollbar__wrap"
      :bottom="0"
      :right="0"
    >
      <div
        class="up"
        style="
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
      >
        UP
      </div>
    </el-backtop> -->
  </div>
</template>

<script>
import Api from '@/api/index.js'
import edit from '../component/edit.vue'
export default {
  components: { edit },

  data() {
    return {
      search: '',
      isEditShow: false,
      articleList: [],
      page: 1,
      limit: 8,
      total: 0,
      editingArticleInfo: { }
    }
  },
  created() {
    this.getArticleList()
  },
  mounted() {

  },
  methods: {
    getArticleList() {
      const params = {
        limit: this.limit,
        page: this.page,
        search: this.search
      }
      Api.getArticleList(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.articleList = res.data.list
          this.total = res.data.count
        }
      }).catch(err => {
        console.error(err)
      })
    },
    searchHandle(value) {
      // this.search = value
      this.getArticleList()
    },
    currentChangeHandle(page) {
      this.page = page
      this.getArticleList()
    },
    backToListPage() {
      this.isEditShow = false
      this.editingArticleInfo = { }
      this.getArticleList()
    },
    handleEdit(item) {
      const articleId = item.id
      console.log(articleId)
      this.isEditShow = true
      this.editingArticleInfo = item
    },
    handleDelete(item) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const articleId = item.id
        Api.deleteArticle(articleId).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.$message.success('删除成功!')
            this.getArticleList()
          } else {
            this.$message.error('删除失败!')
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
.back {
  position: fixed;
  top: 11%;
  right: 4%;
  width: 50px;
  height: 50px;
  background: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-radius: 10px;
  cursor: pointer;
}
.article-manage {
  width: 100%;
  height: calc(100vh - 50px);
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 56px;
  position: relative;

  .container {
    width: 95%;
    margin-top: 40px;
    padding: 10px;
    height: 95%;
    .search {
      margin-bottom: 20px;
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
