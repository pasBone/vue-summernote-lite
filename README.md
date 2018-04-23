# vue-summernote-lite
summernote editor for vue

基于  [summernote][1] 编辑器中的 summernote-lite

依赖：jquery  (**只需要jquery**, 不需要bootstrap);

安装使用：
``` javascript
 npm install vue-summernote-lite --save
```
``` javascript
 import vueSummernoteLite from vue-summernote-lite
```
``` javascript
  <vueSummernoteLite :config="config" @ready="readyState"></vueSummernoteLite>
```
``` javascript
export default {
  components: {
    summernote
  },
  data() {
    return {
      config: {
        lang: "zh-CN",
		height: 600,
        width: 810,
        focus: true,
        imageUploadUrl: "", //图片上传地址
        videoUploadUrl: "",
        placeholder: "",
        imageLoadUrl(result) {
          //图片上传成功之后的回调
          //result是上传图片的返回值
          return "http://xx.com"
        },
        videoLoadUrl(result) {
          //视频上传成功之后的回调
          //result是上传视频的返回值
          return "http://chimee.org/vod/1.mp4";
        }
      }
    };
  },
  methods: {
    readyState(editor) {
      editor.$on("change", function(contents) {
        console.log("onChange:", contents);
      });
      editor.$on("focus", function() {
        console.log("onFocus");
      });

      editor.$on("blur", function() {
        console.log("onBlur");
      });
      editor.$on("paste", function() {
        console.log("onPast");
      });
	  
	  //等其他配置，事件和方法与summernote一致，参见summentnote 官网 api
    }
  }
};

```
 `


  [1]: https://summernote.org
