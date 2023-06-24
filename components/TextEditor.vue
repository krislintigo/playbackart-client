<template lang="pug">
div(style='margin: 1px')
  el-button-group(v-if='editor', style='margin-bottom: 10px; display: flex')
    el-button(
      :disabled='!editor.can().chain().focus().toggleBold().run()',
      :class='{ "is-active": editor.isActive("bold") }',
      style='flex-grow: 1',
      @click='editor.chain().focus().toggleBold().run()'
    )
      strong Ж
    el-button(
      :disabled='!editor.can().chain().focus().toggleItalic().run()',
      :class='{ "is-active": editor.isActive("italic") }',
      style='flex-grow: 1',
      @click='editor.chain().focus().toggleItalic().run()'
    )
      em К
    el-button(
      :disabled='!editor.can().chain().focus().toggleStrike().run()',
      :class='{ "is-active": editor.isActive("strike") }',
      style='flex-grow: 1',
      @click='editor.chain().focus().toggleStrike().run()'
    )
      del del
    el-button(
      :class='{ "is-active": editor.isActive("heading", { level: 1 }) }',
      style='flex-grow: 1',
      @click='editor.chain().focus().toggleHeading({ level: 1 }).run()'
    )
      span(style='font-size: 20px') A
    el-button(
      :class='{ "is-active": editor.isActive("heading", { level: 2 }) }',
      style='flex-grow: 1',
      @click='editor.chain().focus().toggleHeading({ level: 2 }).run()'
    )
      span(style='font-size: 17px') A
    el-button(
      :class='{ "is-active": editor.isActive("heading", { level: 3 }) }',
      style='flex-grow: 1',
      @click='editor.chain().focus().toggleHeading({ level: 3 }).run()'
    )
      span(style='font-size: 14px') A
    el-button(
      :class='{ "is-active": editor.isActive("blockquote") }',
      style='flex-grow: 1',
      @click='editor.chain().focus().toggleBlockquote().run()'
    )
      el-icon
        ElIconExpand
    el-button(
      style='flex-grow: 1',
      @click='editor.chain().focus().setHorizontalRule().run()'
    )
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

<style>
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
  margin: 3px 0;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  line-height: 1;
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
