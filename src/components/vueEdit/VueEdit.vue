<template>
  <div class="vueEdit">
    <vue-editor
      class="vec"
      :id="idVe"
      v-model="myContent"
      :useCustomImageHandler="useCustomImageHandler"
      @imageAdded="handleImageAdded"
      :placeholder="placeholder"
      :editorToolbar="editorToolbar"
      :disabled="disabled">
    </vue-editor>
  </div>
</template>
<script>
  import {setStyle}  from  '../../assets/js/dom';
  import Vue from 'vue';
  import {VueEditor} from 'vue2-editor';
  export default{
    data () {
      return {
        tag: false,
        idVe: 've' + Math.round(Math.random() * 10000).toString(),
        data: '',
        useCustomImageHandler: true,
        placeholder: '请输入信息...',
        myContent: this.content,
        myIndex: this.index
      };
    },
    props: {
      content: {
        type: String,
        require: true
      },
      disabled: {
        type: Boolean,
        require: false,
        default: false
      },
      height: {
        type: Number,
        require: false,
        default: 50
      },
      editorToolbar: {
        type: Array,
        require: false
      },
      index: {
        type: Number,
        require: false
      }
    },
    mounted () {
      Vue.nextTick(function () {
        setStyle(document.querySelector('.vec'), 'height', this.height + 'px');
      }.bind(this));
    },
    components: {
      VueEditor
    },
    methods: {
      handleImageAdded: function (file, Editor, cursorLocation) {
        var formData = new FormData();
        formData.append('image', file);
        console.log(111);
      }
    },
    watch: {
      content (val) {
        this.myContent = val;
      },
      myContent (val) {
        console.log(this.myIndex);
        if (this.myIndex >= 0) {
          console.log('1val' + val + 'index' + this.myIndex);
          this.$emit('changeText', val, this.myIndex);
        } else {
          this.$emit('changeText', val);
        }
      }
    }
  };
</script>
<style scoped lang="less" rel="stylesheet/less">
</style>
