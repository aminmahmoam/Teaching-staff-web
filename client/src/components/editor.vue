<template>
    <editor-content :editor="editor" v-bind="valueInside" />
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: 'editor',
  components: {
    EditorContent
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      valueInside: ''
    }
  },
  watch: {
    value(value) {
      const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        StarterKit
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getJSON())
      }
    })
  }
}
</script>
