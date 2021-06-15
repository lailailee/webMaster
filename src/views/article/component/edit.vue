<template>
  <div class="article-edit">
    <el-card class="box-card container">
      <div class="header">
        <i class="el-icon-edit" />
        {{ type==="create"?"新建":"编辑" }}博文
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
      >
        <div style="margin-bottom:14px;">
          <el-row>
            <el-col :span="6">
              <el-select
                v-model="form.categoryId"
                :multiple="false"
                filterable
                allow-create
                style="width:90%"
                default-first-option
                placeholder="请选择文章分类"
              >
                <el-option
                  v-for="item in categoryList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="form.title"
                placeholder="请输入内容"
              />
            </el-col>
          </el-row>
        </div>
        <div class="editor-wrapper">
          <v-md-editor
            v-model="form.content"
            style="box-shadow:none;border:1px solid #DCDFE6;"
            height="640px"
          />
        </div>
        <div
          class="bottom-collapse"
          style="margin-top:14px;"
        >
          <el-collapse :accordion="false">
            <el-collapse-item>
              <template slot="title">
                <div class="setting"> <i class="el-icon-lollipop" />
                  高级设置</div>
              </template>
              <div class="collapse-wrapper">
                <div>
                  <div class="label">选择标签</div>
                  <el-select
                    v-model="form.tags"
                    multiple
                    filterable
                    allow-create
                    style="width:100%"
                    default-first-option
                    placeholder="请选择文章标签"
                  >
                    <el-option
                      v-for="item in tagList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div>
                  <div class="label">系列文章</div>
                  <el-select
                    v-model="form.seriesId"
                    :multiple="false"
                    filterable
                    allow-create
                    style="width:100%"
                    default-first-option
                    placeholder="请选择文章标签"
                  >
                    <el-option
                      v-for="item in seriesList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </div>
                <div>
                  <div class="label">编号（系列文章选中时才有效，选填）</div>
                  <el-input
                    v-model="form.seriesIndex"
                    placeholder="请输入内容"
                  />
                </div>
                <div>
                  <div class="label">时间选择</div>
                  <el-date-picker
                    v-model="form.createdAt"
                    style="width:100%"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    placeholder="选择日期时间"
                    :editable="false"
                    :default-value="new Date()"
                  />
                </div>

              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="bottom-operation">
          <el-button
            class="publish"
            type="primary"
            icon="el-icon-s-promotion"
            @click="onSubmit"
          >
            {{ type==='create'?'发布':'更新' }}文章</el-button>
          <div
            v-if="type==='create'"
            class="or"
          >or</div>
          <el-button
            v-if="type==='create'"
            class="save"
            type="primary"
            icon="el-icon-folder-add"
            @click="saveDraft"
          >
            保存草稿</el-button>
          <!-- <div class="tip">发布文章会清空草稿</div> -->
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Api from '@/api/index.js'

export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => {
        return {
          seriesIndex: null,
          categoryId: null,
          seriesId: null,
          content: '',
          title: '',
          tags: []
        }
      }
    },
    type: {
      type: String,
      default: 'create'
    }
  },
  data() {
    return {
      categoryList: [],
      seriesList: [],
      tagList: [],
      value: [],
      form: {
        seriesIndex: null,
        categoryId: null,
        seriesId: null,
        content: '',
        title: '',
        tags: [],
        createdAt: ''
      },
      rules: {
        // name: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        // region: [
        //   { required: true, message: '请选择活动区域', trigger: 'change' }
        // ],
        // date1: [
        //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        // ],
        // date2: [
        //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        // ],
        // type: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // resource: [
        //   { required: true, message: '请选择活动资源', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {
      if (this.type === 'create') {
        const draft = localStorage.getItem('draft')
        if (draft !== '' && draft !== '[object Object]') {
          const tmp = JSON.parse(draft)
          if (tmp !== '{}' && tmp !== '' && tmp !== null && tmp !== undefined) {
            this.form = tmp
          }
        }
      } else {
        const tmp = JSON.parse(JSON.stringify(this.articleInfo))
        tmp.tags = tmp.tags?.map(e => e.id)
        this.form = tmp
      }

      this.getCategoryList()
      this.getSeriesList()
      this.getTagList()
    },
    saveDraft() {
      localStorage.setItem('draft', JSON.stringify(this.form))
      this.$message.success('草稿保存完成！')
    },
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const tf = JSON.parse(JSON.stringify(this.form))
          tf.tags = tf.tags.map(e => {
            return {
              id: e
            }
          })
          if (this.type === 'create') {
            Api.addArticle(tf).then(res => {
              if (res.code === 0) {
                this.$message.success('文章发布完成！')
                localStorage.setItem('draft', '{}')
              } else {
                this.$message.warn('文章发布失败！')
              }
            }).catch(err => {
              console.error(err)
            })
          } else {
            Api.editArticle(tf.id, tf).then(res => {
              if (res.code === 0) {
                this.$message.success('文章修改完成！')
              } else {
                this.$message.warn('文章修改失败！')
              }
            }).catch(err => {
              console.error(err)
            })
          }

          // console.log(tf)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getCategoryList() {
      const params = {}
      Api.getCategoryList(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.categoryList = res.data.list
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getSeriesList() {
      const params = {}
      Api.getSeriesList(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.seriesList = res.data.list
        }
      }).catch(err => {
        console.error(err)
      })
    },
    getTagList() {
      const params = {}
      Api.getTagList(params).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tagList = res.data.list
        }
      }).catch(err => {
        console.error(err)
      })
    }

  }
}
</script>

<style lang="scss" >
.article-edit {
  width: 100%;
  // height: 2000px;
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 56px;
  .container {
    margin-top: 56px;
    width: 80% !important;
    height: 100%;
    padding: 20px;
    .header {
      border: none;
      margin: 10px 0 40px;
      padding: 0;
      font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
      font-weight: 700;
      // line-height: 1.2857em;
      font-size: 18px;
      text-transform: none;
      color: rgba(0, 0, 0, 0.87);
      text-align: center;
    }
    .setting {
      font-size: 14px;
    }

    .bottom-collapse {
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      padding: 0px 20px;

      .el-collapse,
      .el-collapse-item__header,
      .el-collapse-item__wrap {
        border-color: #fff;
      }
      .collapse-wrapper {
        .label {
          display: block;
          margin: 10px 0 3px;
          color: #969696;
          font-size: 0.92857143em;
          font-weight: 900;
          text-transform: none;
        }
      }
    }
    .bottom-operation {
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      padding: 10px 20px;
      margin: 14px 0;
      background-color: #f0f2f5;
      display: flex;
      align-items: center;
      // justify-content: center;
      .publish {
        // width: 120px;
        // height: 36px;
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
      }
      .or {
        width: 15px;
        margin: 0 10px;
      }
      .save {
        cursor: pointer;
        display: inline-block;
        min-height: 1em;
        outline: none;
        border: none;
        vertical-align: baseline;
        background: #e0e1e2 none;
        color: rgba(0, 0, 0, 0.6);
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
        &:hover {
          background: #d4d4d6 none;
          color: rgba(24, 23, 23, 0.6);
        }
      }
      .tip {
        color: #605f5f;
        font-size: 12px;
      }
    }
  }
}
</style>>
