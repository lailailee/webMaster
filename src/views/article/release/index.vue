<template>
  <div class="article-release">
    <markdown-editor
      v-model="content"
      height="300px"
    />
  </div>
</template>

<script>
import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  components: { MarkdownEditor },
  data() {
    return {
      content: ''
    }
  },

  created() {

  },
  mounted() {
    // const defaultOptions = {
    //   minHeight: '200px',
    //   previewStyle: 'vertical',
    //   useCommandShortcut: true,
    //   useDefaultHTMLSanitizer: true,
    //   usageStatistics: false,
    //   hideModeSwitch: false,
    //   toolbarItems: [
    //     'heading',
    //     'bold',
    //     'italic',
    //     'strike',
    //     'divider',
    //     'hr',
    //     'quote',
    //     'divider',
    //     'ul',
    //     'ol',
    //     'task',
    //     'indent',
    //     'outdent',
    //     'divider',
    //     'table',
    //     'image',
    //     'link',
    //     'divider',
    //     'code',
    //     'codeblock'
    //   ]
    // }
    // const editor = new toastui.Editor({
    //   el: document.querySelector('#editor'),
    //   previewStyle: 'vertical',
    //   height: '500px',
    //   initialValue: content
    // })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>>
