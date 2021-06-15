<template>
  <edit type="create" />
</template>

<script>
// import Api from '@/api/index.js'
import edit from '../component/edit.vue'
export default {
  components: {
    edit
  }
  // data() {
  //   return {
  //     categoryList: [],
  //     seriesList: [],
  //     tagList: [],
  //     value: [],
  //     form: {
  //       seriesIndex: null,
  //       categoryId: null,
  //       seriesId: null,
  //       content: '',
  //       title: '',
  //       tags: []
  //     },
  //     rules: {
  //       // name: [
  //       //   { required: true, message: '请输入活动名称', trigger: 'blur' },
  //       //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  //       // ],
  //       // region: [
  //       //   { required: true, message: '请选择活动区域', trigger: 'change' }
  //       // ],
  //       // date1: [
  //       //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  //       // ],
  //       // date2: [
  //       //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
  //       // ],
  //       // type: [
  //       //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
  //       // ],
  //       // resource: [
  //       //   { required: true, message: '请选择活动资源', trigger: 'change' }
  //       // ],
  //       // desc: [
  //       //   { required: true, message: '请填写活动形式', trigger: 'blur' }
  //       // ]
  //     }
  //   }
  // },
  // created() {
  //   this.init()
  // },
  // mounted() {
  // },
  // methods: {
  //   init() {
  //     this.getCategoryList()
  //     this.getSeriesList()
  //     this.getTagList()
  //   },
  //   onSubmit() {
  //     this.$refs['form'].validate((valid) => {
  //       if (valid) {
  //         const tf = JSON.parse(JSON.stringify(this.form))
  //         tf.tags = tf.tags.map(e => {
  //           return {
  //             id: e
  //           }
  //         })
  //         Api.addArticle(tf).then(res => {
  //           console.log(res)
  //           if (res.code === 0) {
  //             this.$message.success('文章发布完成！')
  //           } else {
  //             this.$message.warn('文章发布失败！')
  //           }
  //         }).catch(err => {
  //           console.error(err)
  //         })
  //         console.log(tf)
  //       } else {
  //         console.log('error submit!!')
  //         return false
  //       }
  //     })
  //   },
  //   getCategoryList() {
  //     const params = {}
  //     Api.getCategoryList(params).then(res => {
  //       console.log(res)
  //       if (res.code === 0) {
  //         this.categoryList = res.data.list
  //       }
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   },
  //   getSeriesList() {
  //     const params = {}
  //     Api.getSeriesList(params).then(res => {
  //       console.log(res)
  //       if (res.code === 0) {
  //         this.seriesList = res.data.list
  //       }
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   },
  //   getTagList() {
  //     const params = {}
  //     Api.getTagList(params).then(res => {
  //       console.log(res)
  //       if (res.code === 0) {
  //         this.tagList = res.data.list
  //       }
  //     }).catch(err => {
  //       console.error(err)
  //     })
  //   }

  // }
}
</script>

<style lang="scss" >
// .article-release {
//   width: 100%;
//   // height: 2000px;
//   background-color: #f0f2f5;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding-bottom: 56px;
//   .container {
//     margin-top: 56px;
//     width: 80% !important;
//     height: 100%;
//     padding: 20px;
//     .header {
//       border: none;
//       margin: 10px 0 40px;
//       padding: 0;
//       font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
//       font-weight: 700;
//       // line-height: 1.2857em;
//       font-size: 18px;
//       text-transform: none;
//       color: rgba(0, 0, 0, 0.87);
//       text-align: center;
//     }
//     .setting {
//       font-size: 14px;
//     }

//     .bottom-collapse {
//       border: 1px solid #dcdfe6;
//       border-radius: 5px;
//       padding: 0px 20px;

//       .el-collapse,
//       .el-collapse-item__header,
//       .el-collapse-item__wrap {
//         border-color: #fff;
//       }
//       .collapse-wrapper {
//         .label {
//           display: block;
//           margin: 10px 0 3px;
//           color: #969696;
//           font-size: 0.92857143em;
//           font-weight: 900;
//           text-transform: none;
//         }
//       }
//     }
//     .bottom-operation {
//       border: 1px solid #dcdfe6;
//       border-radius: 5px;
//       padding: 10px 20px;
//       margin: 14px 0;
//       background-color: #f0f2f5;
//       display: flex;
//       align-items: center;
//       // justify-content: center;
//       .publish {
//         // width: 120px;
//         // height: 36px;
//         cursor: pointer;
//         display: inline-block;
//         min-height: 1em;
//         outline: none;
//         border: none;
//         vertical-align: baseline;
//         background: #e0e1e2 none;
//         // color: rgba(0, 0, 0, 0.6);
//         font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
//         margin: 0 0.25em 0 0;
//         padding: 0.78571429em 1.5em;
//         text-transform: none;
//         text-shadow: none;
//         font-weight: 700;
//         line-height: 1em;
//         font-style: normal;
//         text-align: center;
//         text-decoration: none;
//         background: #00b5ad;
//         border-color: #00b5ad;
//       }
//       .or {
//         width: 15px;
//         margin: 0 10px;
//       }
//       .save {
//         cursor: pointer;
//         display: inline-block;
//         min-height: 1em;
//         outline: none;
//         border: none;
//         vertical-align: baseline;
//         background: #e0e1e2 none;
//         color: rgba(0, 0, 0, 0.6);
//         font-family: Lato, Helvetica Neue, Arial, Helvetica, sans-serif;
//         margin: 0 0.25em 0 0;
//         padding: 0.78571429em 1.5em;
//         text-transform: none;
//         text-shadow: none;
//         font-weight: 700;
//         line-height: 1em;
//         font-style: normal;
//         text-align: center;
//         text-decoration: none;
//         &:hover {
//           background: #d4d4d6 none;
//           color: rgba(24, 23, 23, 0.6);
//         }
//       }
//     }
//   }
// }
</style>>
