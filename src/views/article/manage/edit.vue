<template>
  <div class="article-edit">
    <el-card class="box-card container">
      <div class="header">
        <i class="el-icon-edit" />
        编辑博文
      </div>
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
      >
        <div style="margin-bottom:14px;">
          <el-row>
            <el-col :span="6">
              <el-select
                v-model="value"
                :multiple="false"
                filterable
                allow-create
                style="width:90%"
                default-first-option
                placeholder="请选择文章标签"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="input"
                placeholder="请输入内容"
              />
            </el-col>
          </el-row>
        </div>
        <div class="editor-wrapper">
          <v-md-editor
            v-model="content"
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
                    v-model="value"
                    :multiple="false"
                    filterable
                    allow-create
                    style="width:100%"
                    default-first-option
                    placeholder="请选择文章标签"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div>
                  <div class="label">系列文章</div>
                  <el-select
                    v-model="value"
                    :multiple="false"
                    filterable
                    allow-create
                    style="width:100%"
                    default-first-option
                    placeholder="请选择文章标签"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </div>
                <div>
                  <div class="label">编号（系列文章选中时才有效，选填）</div>
                  <el-input
                    v-model="input"
                    placeholder="请输入内容"
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
          >
            发布文章</el-button>
          <!-- <el-col :span="1">
              <div style="">or</div>
            </el-col> -->
          <div class="or">or</div>
          <el-button
            class="save"
            type="primary"
            icon="el-icon-folder-add"
          >
            保存草稿</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      content: '',
      input: '',
      options: [{
        value: 'HTML',
        label: 'HTML'
      }, {
        value: 'CSS',
        label: 'CSS'
      }, {
        value: 'JavaScript',
        label: 'JavaScript'
      }],
      value: []
    }
  },
  created() {
  },
  mounted() {
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
    }
  }
}
</style>>
