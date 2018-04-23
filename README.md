# vue-summernote-lite
summernote editor for vue

基于  [summernote][1] 编辑器中的 summernote-lite

依赖：jquery  (**只需要jquery**, 不需要bootstrap);

demo:  [点我][2]

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
        imageUploadUrl: "", 如果要使用图片/视频上传，请务必先配置地址
        videoUploadUrl: "",  视频地址
        placeholder: "",
        imageLoadUrl(result) {  图片的显示地址，返回一个URL
          图片上传成功之后的回调
          result是上传图片的返回值
          return "http://xx.com"
        },
        videoLoadUrl(result) {
          视频上传成功之后的回调
          result是上传视频的返回值
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
	  
	  等其他配置，事件和方法与summernote一致，参见summentnote 官网 api
    }
  }
};

> 关于其他，只做了简单包装，其他bug或者要求请各位fork代码自行按照实际需求做定制化的修改。

```

  

  `


  [1]: https://summernote.org
  [2]: http://pasbone.github.io#vue-summernote-lite
  
