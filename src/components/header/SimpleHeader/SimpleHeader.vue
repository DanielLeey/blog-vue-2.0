<template>
  <div class="simple-header">
    <transition name="slide-fade">
      <div id="mobile-bar" v-show="show" >
        <a class="menu-button" ref="menubutton"></a>
        <router-link class="logo" to="/"></router-link>
      </div>
    </transition>
    <transition name="slide-fade">
      <div id="header"  v-show="show">
    <router-link id="logo" to="/">
      <img src="../../../assets/logo.png">
      <span class="title">答案</span>
      <span class="motto">go！go！go！</span>
    </router-link>
    <ul id="nav" >
      <li><router-link to="/articleList" class="nav-link contribute" ><span class="iconfont icon-icon-test">技术交流</span></router-link></li>
      <li><router-link to="/codes" class="nav-link contribute" ><span class="iconfont icon-fenxiang">源码分享</span></router-link></li>
      <li><router-link to="/life" class="nav-link contribute" ><span class="iconfont icon-erjiji">程序人生</span></router-link></li>
      <li><router-link to="/timeline" class="nav-link contribute" ><span class="iconfont icon-shijian">时间轴</span></router-link></li>
      <li><router-link to="/article/1" class="nav-link contribute" ><span class="iconfont icon-xiaobaicai">关于菜逼博主</span></router-link></li>

      <li >
        <!-- <form id="search-form" action="/articles/search"> -->
      <span class="algolia-autocomplete" style="position: relative; display: inline-block; direction: ltr;">
        <input
          type="text" id="search-query-nav" class="search-query st-default-search-input aa-input" name="keywords" v-model="keywords" @keyup.enter="submit(keywords)"
          autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false"
          aria-owns="algolia-autocomplete-listbox-0" dir="auto" style="position: relative; vertical-align: top;" placeholder="在这里可劲搜吧....">
        <pre
          aria-hidden="true"
          style="position: absolute; visibility: hidden; white-space: pre; font-family: system-ui; font-size: 12px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; word-spacing: 0px; letter-spacing: normal; text-indent: 0px; text-rendering: auto; text-transform: none;"></pre>
        <span
          class="aa-dropdown-menu" role="listbox" id="algolia-autocomplete-listbox-0"
          style="position: absolute; top: 100%; z-index: 100; display: none; left: 0px; right: auto;"><div
          class="aa-dataset-1"></div></span></span>
        <!-- </form> -->
      </li>
     <li  v-show="this.manager.id == null"><router-link to="/login"  class="nav-link contribute" style="margin-right: 0px;color: #E6E61A">登录</router-link></li>
      <li v-show="this.manager.id != null"><router-link :to="{name:'publish',params:{managerId:manager.id}}"  class="nav-link contribute" style="margin-right: 0px;color: dodgerblue"><span class="iconfont icon-wen">发表文章</span></router-link></li>
   <li v-show="this.manager.id != null"><a class="nav-link contribute iconfont" style="margin-right: 0px;color: dodgerblue" @click="noLogin">注销</a></li>
    </ul>
    </div>
    </transition>
    <sidebar ref="sidebar"></sidebar>
  </div>

</template>

<script type="text/ecmascript-6">
import SideBar from '@/components/header/SimpleHeader/SideBar'
import {treeDataTranslate} from '@/utils'
import {removeToken} from '@/utils/auth'

export default {
  components: {
    'sidebar': SideBar
  },
  data () {
    return {
      show: true,
      keywords: '',
      manager: {}
    }
  },
  created () {
    this.keywords = this.$route.query.keywords
  },
  mounted: function () {
    let manager = JSON.parse(localStorage.getItem('currentManager'))
    if (manager !== null) {
      this.manager = manager
    } else {
      this.manager = this.manager
    }
    this.$nextTick(function () {
      this.initMobileMenu()
    })
    // 给页面绑定滑轮滚动事件
    if (document.addEventListener) { // firefox
      document.addEventListener('DOMMouseScroll', this.watchScroll, false)
    }
    // 滚动滑轮触发scrollFunc方法  //ie 谷歌
    window.onmousewheel = document.onmousewheel = this.watchScroll
  },
  methods: {
    noLogin () {
      this.$http({
        url: this.$http.adornUrl('/logout'),
        method: 'post',
        data: this.$https.adornDatas()
      }).then(({data}) => {
        if (data.code !== 200) {
          this.$Message.error(data.msg)
        } else {
          removeToken()
          localStorage.removeItem('currentManager')
          this.$Message.success('已退出登录')
          // 跳到首页
          window.location.reload()
          this.$router.push({ path: '/' })
          // this.$router.go(-1)
        }
      })
    },
    submit (keywords) {
      this.$router.push({path: '/articles/search', query: {keywords}})
    },
    initMobileMenu () {
      // 显示手机端的菜单
      var sidebar = this.$refs.sidebar
      this.$refs.menubutton.addEventListener('click', function () {
        sidebar.toggleSideBar()
      })
    },
    watchScroll (e) {
      e = e || window.event
      if (e.wheelDelta) {
        if (e.wheelDelta > 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.wheelDelta < 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      } else if (e.detail) {
        if (e.detail < 0 && this.show === false) { // 当滑轮向上滚动
          this.show = true
        }
        if (e.detail > 0 && this.show === true) { // 当滑轮向下滚动
          this.show = false
        }
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "stylus/header.styl";
   // 添加导航栏显示动画
  .slide-fade-enter-active ,.slide-fade-leave-active {
    transition: all .8s ease;
  }
  .slide-fade-leave-to ,.slide-fade-enter {
    /* .slide-fade-leave-active for below version 2.1.8 */
    transform: translateY(-70px);
    opacity: 0;
  }
</style>
