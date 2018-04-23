import Vue from 'vue'
import Router from 'vue-router'

// 页面
import VueSummernoteLite from '@/pages/summernote-lite/'   //编辑器

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/vue-summernote-lite',
      name: 'VueSummernoteLite',
      component: VueSummernoteLite
    }
  ]
})
