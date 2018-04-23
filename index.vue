/*
 * @Author: xiongxiaojun 
 * @Date: 2018-04-12 14:37:21 
 * @Last Modified by: xiongxiaojun
 * @Last Modified time: 2018-04-19 17:32:22
 */
<template>
  <div :id="element"></div>
</template>

<script>
import "./css/summernote-lite.css";
import "./js/summernote-lite";
import "./js/lang/summernote-zh-CN";
export default {
  data() {
    return {
      element: `summernote_${new Date().getTime()}`
    };
  },
  props: {
    config: {
      type: Object
    },
    ready: {
      type: Function
    }
  },
  mounted() {
    this.$nextTick(() => {
      let defaultConfig = {
        lang: "zh-CN",
        placeholder: "写点东西吧...",
        height: 600,
        width: 810,
        focus: true,
        callbacks: {
          onInit: () => {
            this.$emit("ready", this);
          },
          onChange: contents => {
            this.$emit("change", contents);
          },
          onEnter: () => {
            this.$emit("enter");
          },
          onFocus: () => {
            this.$emit("focus");
          },
          onBlur: () => {
            this.$emit("blur");
          },
          onKeyup: e => {
            this.$emit("keyup", e);
          },
          onKeydown: e => {
            this.$emit("keydown", e);
          },
          onPaste: e => {
            this.$emit("paste", e);
          },
          onImageUpload: files => {
            let filesArr = Array.from(new Set(files));
            filesArr.map((item, index) => {
              this.uploadImage(item, index);
            });
          },
          onVideoUpload: file => {
            return new Promise((resolve, reject) => {
              this.uploadVideo(file[0]).then(url => {
                resolve(url);
              });
            });
          },
          onSubmit: () => {
            this.$emit("submit", files);
          },
          onImageUploadError: files => {
            this.$emit("imageUploadError", files);
          }
        }
      };
      let config = Object.assign({}, defaultConfig, this.config);
      $("#" + this.element).summernote(config);
    });
  },
  methods: {
    insertImage(eleId, src, file, cb) {
      // 图片上传完成且加载完成则插入编辑器内
      $(`.${eleId}`)
        .find("img")
        .attr("src", src)
        .on("load", function() {
          $(this).attr({
            "data-size": file.size,
            "data-width": this.width,
            "data-height": this.height
          });
          $(this)
            .next(".progress-bar")
            .remove();
          $(this)
            .parent(".loading")
            .removeClass("loading");
          cb(this, file);
          // resolve(this, file, index);
        });
    },
    insertBase64(element, id, file) {
      // 首先插入base64图片，等图片上传完成之后再转为http的资源
      let eleId = "loading load-ele " + id;
      let fileReader = new FileReader(); //本地预览
      fileReader.onload = function() {
        let loadNode = $(
          "<div  align='center'><div align='center' class='" +
            eleId +
            "'><img class='summernote-img' src='" +
            fileReader.result +
            "' /><div class='progress-bar'></div></div></div>"
        );
        element.summernote("insertNode", loadNode[0]);
      };
      fileReader.readAsDataURL(file); //Base64
      this.removeSurplusNode("." + id);
    },
    progress(e, eleId) {
      // 图片上传进度条
      $(`.${eleId} .progress-bar`).css({
        width: (e.loaded / e.total * 100).toFixed(2) + "%"
      });
    },
    removeSurplusNode(node) {
      //summernote编辑器会多次插入node, bug??
      setTimeout(() => {
        $(node).each(function(index, item) {
          if (index >= 1) {
            $(item).remove();
          }
        });
      }, 800);
    },
    httpRequest(url, file, eleId) {
      //网络请求
      return new Promise((resolve, reject) => {
        let self = this;
        var xhr = new XMLHttpRequest();
        if (xhr.upload && eleId) {
          xhr.upload.addEventListener(
            "progress",
            e => {
              this.progress(e, eleId);
            },
            false
          );
        }
        xhr.onreadystatechange = e => {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              let result = JSON.parse(xhr.responseText);
              resolve(result);
            } else {
              reject();
            }
          }
        };
        xhr.open("POST", url, true);
        xhr.overrideMimeType("text/plain; charset=x-user-defined-binary");
        var fd = new FormData();
        fd.append("file", file);
        xhr.send(fd);
      });
    },
    uploadVideo(file) {
      //视频上传网络请求
      let self = this;
      return new Promise((resolve, reject) => {
        this.httpRequest(self.config.videoUploadUrl, file).then(result => {
          if (typeof self.config.videoLoadUrl === "function") {
            let src = self.config.videoLoadUrl(result);
            resolve(src);
          } else {
            throw Error("videoLoadUrl must be function!");
          }
        });
      });
    },
    uploadImage(file, index) {
      //图片上传网络请求
      let self = this;
      let eleId = `load-ele-${file.size}-${index}`;
      let $editor = $(`#${this.element}`);
      return new Promise((resolve, reject) => {
        this.insertBase64($editor, eleId, file);
        this.httpRequest(self.config.imageUploadUrl, file, eleId).then(
          result => {
            if (typeof self.config.imageLoadUrl === "function") {
              let src = self.config.imageLoadUrl(result);
              self.insertImage(eleId, src, file, $image => {
                resolve($image, file, index);
              });
            } else {
              throw Error("imageLoadUrl must be function!");
            }
          }
        );
      });
    },
    summernote(...args) {
      $("#" + this.element).summernote(...args);
    },
    ui() {//Custom button
      return $.summernote.ui;
    }
  }
};
</script>
<style scoped>
.summernote-img {
  max-width: 100%;
}
</style>
