<template lang="pug">
.m-px
  el-button-group.flex.mb-3(v-if='editor')
    el-button.grow(
      :disabled='!editor.can().chain().focus().toggleBold().run()',
      :class='{ "is-active": editor.isActive("bold") }',
      @click='editor.chain().focus().toggleBold().run()'
    )
      strong Ж
    el-button.grow(
      :disabled='!editor.can().chain().focus().toggleItalic().run()',
      :class='{ "is-active": editor.isActive("italic") }',
      @click='editor.chain().focus().toggleItalic().run()'
    )
      em К
    el-button.grow(
      :disabled='!editor.can().chain().focus().toggleStrike().run()',
      :class='{ "is-active": editor.isActive("strike") }',
      @click='editor.chain().focus().toggleStrike().run()'
    )
      del del
    el-button.grow(
      :class='{ "is-active": editor.isActive("heading", { level: 1 }) }',
      @click='editor.chain().focus().toggleHeading({ level: 1 }).run()'
    )
      span.text-xl A
    el-button.grow(
      :class='{ "is-active": editor.isActive("heading", { level: 2 }) }',
      @click='editor.chain().focus().toggleHeading({ level: 2 }).run()'
    )
      span.text-base A
    el-button.grow(
      :class='{ "is-active": editor.isActive("heading", { level: 3 }) }',
      @click='editor.chain().focus().toggleHeading({ level: 3 }).run()'
    )
      span.text-sm A
    el-button.grow(
      :class='{ "is-active": editor.isActive("blockquote") }',
      @click='editor.chain().focus().toggleBlockquote().run()'
    )
      el-icon
        ElIconExpand
    el-button.grow(@click='editor.chain().focus().setHorizontalRule().run()')
      el-icon
        ElIconSemiSelect
  EditorContent(:editor='editor')
</template>

<script setup lang="ts">
import { EditorContent, Editor } from '@tiptap/vue-3'
import { StarterKit } from '@tiptap/starter-kit'

const props = defineProps<{ modelValue: string }>()

const emit = defineEmits(['update:modelValue'])

const editor = ref<any>(null)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue,
    extensions: [StarterKit],
    onUpdate: () => {
      emit('update:modelValue', editor.value.getHTML())
    },
  })
})
</script>

<style lang="scss">
.ProseMirror {
  padding: 5px 10px;
  outline: 1px solid #dcdfe6;
  border-radius: 3px;
  border: 0;
  transition: outline-color 0.2s ease-in-out;
}

.ProseMirror:hover {
  outline-color: darkgrey;
}

.ProseMirror-focused,
.ProseMirror:hover.ProseMirror-focused {
  outline-color: #409eff;
}

.ProseMirror p {
  margin: 5px 0;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  line-height: 1;
  margin: 16px 0;
  font-weight: bold;
}

.ProseMirror h1 {
  font-size: 30px;
}

.ProseMirror h2 {
  font-size: 24px;
}

.ProseMirror h3 {
  font-size: 18px;
}

.ProseMirror blockquote {
  margin-left: 20px;
  padding-left: 10px;
  border-left: 3px solid darkgrey;
}

.ProseMirror hr {
  border: 0;
  border-top: 1px solid gray;
  margin: 10px 15px;
}
</style>
