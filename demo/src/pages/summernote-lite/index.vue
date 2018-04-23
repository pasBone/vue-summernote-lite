<template>
    <div>
        <div class="flex">
            <div class="flex-1">
                <summernoteLite :config="config" @ready="readyState"> </summernoteLite>
            </div>
             <div style="padding-left: 30px;" class="flex-1" v-html="contents"></div>
        </div>

        <div class="flex">
            <div class="flex-1">
                {{contents}}
            </div>

            <div class="flex-1"></div>
        </div>

    </div>
</template>

<style scoped>
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
</style>

<script>
import summernoteLite from "vue-summernote-lite";
import img from './img/editor-img.gif'
export default {
  components: {
    summernoteLite
  },
  data() {
    return {
      contents: `<p style="text-align: center; "><b><span style="font-size: 48px; font-family: 楷体;">vue-summernote-lite</span></b><br></p><p>vue-summernote-lite 是一款基于&nbsp; summernote-lite 的富文本编辑器。</p><p>只依赖jquery,&nbsp; 不需要&nbsp;<span style="font-size: 18px; background-color: rgb(255, 255, 0);">bootstrap.</span></p><p><span style="font-size: 18px;">支持本地图片上传和在线图片</span></p><p><span style="font-size: 18px;"><br></span></p><p align="center"><img class="summernote-img" src="${img}" style="width: 600px;"></p><p align="center"><img class="summernote-img" src="http://img.sccnn.com/bimg/341/03664.jpg" style="width: 600px;"></p><p><span style="font-size: 18px;"><br></span></p><div align="center"></div><p><span style="font-size: 18px;"><br></span></p><p><span style="font-size: 18px;">支持视频上传和在线视频，可以直接复制优酷的地址</span></p><p><span style="font-size: 18px;">http://v.youku.com/v_show/id_XMzM2NTc1MjAwOA==.html?spm=a2hww.20027244.m_250036.5~5!2~5~5~5~5~A</span><br></p><p style="text-align: center; "><iframe webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" frameborder="0" height="498" width="510" src="//player.youku.com/embed/XMzM2NTc1MjAwOA" class="note-video-clip"></iframe></p>`,
      config: {
        lang: "zh-CN",
        imageUploadUrl: "", //图片上传地址
        videoUploadUrl: "",
        placeholder: "",
        imageLoadUrl(result) {
          //图片上传成功之后的回调
          //result是上传图片的返回值
          return `http://xx`;
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

      editor.summernote('code', this.contents);
      editor.$on("change", contents => {
        console.log("onChange:", contents);
        this.contents = contents;
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
    }
  }
};
</script>

