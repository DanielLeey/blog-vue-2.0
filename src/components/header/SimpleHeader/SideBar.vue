<template>
  <div class="side-bar" @touchmove.stop.prevent :class="{ open: show }">
    <div class="main-area">
      <div class="top-wrapper" @touchmove.stop>
        <div class="top-area">
           <div class="homepage-hero-module">
                <video autoplay loop muted playsinline src="../../../assets/photowall/Up.mp4" class="fillWidth"></video>
            </div>
          <div class="site-info">
            <h1 class="site-name">答案</h1>
            <h1 class="site-desc">Love yourself</h1>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <iv-icon type="map"></iv-icon>
              <router-link to="/articleList" class="nav-link"><span class="arrow"></span>
              技术交流</router-link>
            </p>
          </div>
        </div>
         <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <iv-icon type="map"></iv-icon>
              <router-link to="/codes" class="nav-link"><span class="arrow"></span>
              源码分享</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <iv-icon type="map"></iv-icon>
              <router-link to="/life" class="nav-link"><span class="arrow"></span>
              程序人生</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
             <iv-icon type="map"></iv-icon>
              <router-link to="/timeline" class="nav-link"><span class="arrow"></span>
              时间轴</router-link>
            </p>
          </div>
        </div>
        <div class="sidebar-menus" >
          <div class="site-nav">
            <p>
              <iv-icon type="map"></iv-icon>
              <router-link to="/article/1" class="nav-link"><span class="arrow"></span>
              关于菜逼博主</router-link> 
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mask" @click.prevent="toggleSideBar"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import {mixin} from '@/utils'

export default {
  name: 'side-bar',
  data () {
    return {
      show: false,
      showNav: false
    }
  },
  mixins: [mixin],
  beforeRouteUpdate (to, from, next) {
    next()
  },
  methods: {
    rootRouterLink (category) {
      let router = {}
      router.name = category.category_type
      return router
    },
    routerLink (category) {
      let router = {}
      router.name = category.category_type
      router.params = {}
      router.params['id'] = category.id
      return router
    },
    toggleSideBar () {
      this.show = !this.show
      this.showNav = !(
          this.$route.name === 'articleList' ||
          this.$route.name === 'codes' ||
          this.$route.name === 'book/note' ||
          this.$route.name === 'timeline' ||
          this.$route.name === 'album'
      )
    }
  }
}
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "./stylus/sidebar.styl";


  .homepage-hero-module
    width: 100%
    height: 250px
    overflow hidden

    .fillWidth
      width: 100%
</style>
