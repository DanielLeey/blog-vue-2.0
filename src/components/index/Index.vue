<template>
  <div class="main-wrapper">
    <!-- <canvas id="canvas" width="1920" height='1080'>
    </canvas> -->
    <canvas id="snowbox" width="1920" height='1080'></canvas>
    <router-view name="header"></router-view>
     <router-view name="content"></router-view>
    <router-view name="footer"></router-view>
    <div class="backTop" v-show="btnFlag" @click="backTop"></div>
    <div>
      <aplayer :audio="audio" :lrcType="1" fixed  />
      <!-- <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=1383011509&auto=1&height=66"></iframe> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'

export default {
  data () {
    return {
      btnFlag: false,
      audio: [
        // {
        //   name: '听妈妈的话',
        //   artist: '周杰伦',
        //   url: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_138243&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
        //   cover: 'http://img1.kuwo.cn/star/starheads/240/42/97/3914752958.jpg', // prettier-ignore
        //   lrc: '[00:11.64]小朋友 你是否有很多问号 \n[00:14.26]为什么 别人在那看漫画 \n[00:16.89]我却在学画画 对这钢琴说话 \n[00:19.37]别人在玩游戏 我却靠在墙壁背我的ABC \n[00:22.38]我说我要一架大大的飞机 \n[00:24.91]我却得到一只旧旧螺旋机 \n[00:27.48]为什么要听妈妈的话 \n[00:29.79]长大后你就会开始懂得这段话 哼 \n[00:32.26]长大后我开始明白 \n[00:35.23]为什么我 跑得比别人快 \n[00:36.64]飞得比别人高 \n[00:37.88]将来大家看的都是我画的漫画 \n[00:40.23]大家唱的都是 我写的歌 \n[00:42.95]妈妈的辛苦 不让你看见 \n[00:45.57]温暖的事都在她心里面 \n[00:48.01]有空就得多摸摸她的手 \n[00:50.70]把手牵着一起梦游 \n[00:53.10]听妈妈的话 别让她受伤 \n[01:03.14]想快快长大 才能保护她 \n[01:12.93]美丽的白发 幸福中发芽 \n[01:23.96]天使的魔法 温暖中慈祥 \n[01:34.43]在你的未来 音乐是你的王牌 \n[01:36.21]那王牌谈的恋爱 \n[01:37.68]而我不想把你教坏 \n[01:39.21]还是听妈妈的话吧 \n[01:40.52]晚点在恋爱吧 \n[01:41.96]我知道你未来的路 \n[01:44.09]干嘛比我更清楚 \n[01:45.40]你因为太多学习的同学 \n[01:46.53]在这块写东写西 \n[01:47.50]但我建议最好听妈妈 \n[01:49.10]我会用功读书 \n[01:50.23]用功读书怎么会从我嘴巴说出 \n[01:52.34]不想你输所以要叫你用功读书 \n[01:55.47]妈妈挑给你的毛病你要好好的收着 \n[01:57.56]因为不知道是我要告诉她我还留着 \n[01:59.91]对了 我会遇到了周润发 \n[02:02.31]所以你可以跟同学炫耀 \n[02:03.38]赌神未来是你爸爸 \n[02:04.47]我找不到你写的情书 \n[02:06.94]你喜欢的要承认 \n[02:08.02]因为我会了解你会在操场上牵她 \n[02:09.40]你会开始喜欢唱流行歌 \n[02:12.81]因为张学友开始准备唱吻别 \n[02:15.43]听妈妈的话 别让她受伤 \n[02:26.22]想快快长大 才能保护她 \n[02:36.16]美丽的白发 幸福中发芽 \n[02:46.66]天使的魔法 温暖中慈祥 \n[02:56.68]听妈妈的话 别让她受伤 \n[03:07.46]想快快长大 才能保护她 \n[03:17.27]长大后我开始明白 为什么我 \n[03:20.81]跑得比别人快 飞得比别人高 \n[03:22.56]将来大家看的都是我画的漫画 \n[03:25.52]大家唱的都是我写的歌 \n[03:28.31]妈妈的辛苦她不让你看见 \n[03:30.72]温暖的事都在她心里面 \n[03:33.31]有空就得多摸摸她的手 \n[03:36.15]把手牵着一起梦游 \n[03:38.34]听妈妈的话 别让她受伤 \n[03:48.72]想快快长大 才能保护她 \n[03:59.10]美丽的白发 幸福中发芽 \n[04:09.32]天使的魔法 温暖中慈祥',
        // },
        // {
        //   name: '以父之名',
        //   artist: '周杰伦',
        //   url: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_28386348&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
        //   cover: 'http://img1.kuwo.cn/star/starheads/240/42/97/3914752958.jpg?param=300y300', // prettier-ignore
        //   lrc: '\n[00:18.80]以父之名 \n[00:35.80]周杰伦 \n[00:52.80]制作人：秋晓之 QQ：285552115 \n[01:09.80] \n[01:26.56]微凉的晨露沾湿黑礼服 \n[01:29.67]石板路有雾父在低诉 \n[01:32.52]无奈的觉悟只能更残酷 \n[01:35.33]一切都为了通往圣堂的路 \n[01:38.02]吹不散的雾隐没了意图 \n[01:40.67]谁轻柔踱步停住 \n[01:43.34]还来不及哭穿过的子弹就带走温度 \n[01:47.15] \n[01:48.69]我们每个人都有罪 \n[01:50.44]犯着不同的罪 \n[01:51.77]我能决定谁对 \n[01:53.15]谁又该要沉睡 \n[01:54.53]争论不能解决 \n[01:55.76]在永无止境的夜 \n[01:57.35]关掉你的嘴 \n[01:58.69]唯一的恩惠 \n[01:59.88]挡在前面的人都有罪 \n[02:01.18]后悔也无路可退 \n[02:02.64]以父之名判决 \n[02:03.96]那感觉没有适合词汇 \n[02:05.59]就像边笑边掉泪 \n[02:07.04]凝视着完全的黑 \n[02:08.42]阻挡悲剧蔓延的悲剧会让我沉醉 \n[02:10.72]低头亲吻我的左手 \n[02:12.17]换取被宽恕的承诺 \n[02:13.50]老旧管风琴在角落 \n[02:14.93]一直一直一直伴奏 \n[02:16.25]黑色帘幕被风吹动 \n[02:17.66]阳光无言地穿透 \n[02:19.18]洒向那群被我驯服后的 兽 \n[02:21.88]沉默地喊叫沉默地喊叫 \n[02:23.55]孤单开始发酵 \n[02:24.88]不停对着我嘲笑 \n[02:26.29]回忆逐渐燃烧 \n[02:27.66]曾经纯真的画面 \n[02:28.77]残忍地温柔出现 \n[02:30.21]脆弱时间到 \n[02:31.33]我们一起来祷告 \n[02:32.95]仁慈的父我已坠入 \n[02:35.73]看不见罪的国度 \n[02:38.77]请原谅我的自负 \n[02:41.68] \n[02:43.77]没人能说没人可说 \n[02:46.59]好难承受 \n[02:48.67]荣耀的背后刻着一道孤独 \n[02:52.52] \n[02:54.66]闭上双眼我又看见 \n[02:57.67]当年那梦的画面 \n[03:00.59]天空是蒙蒙的雾 \n[03:03.56] \n[03:05.76]父亲牵着我的双手 \n[03:08.66]轻轻走过 \n[03:10.67]清晨那安安静静的石板路 \n[03:14.58] \n[03:46.34]低头亲吻我的左手 \n[03:47.88]换取被宽恕的承诺 \n[03:49.21]老旧管风琴在角落 \n[03:50.68]一直一直一直伴奏 \n[03:52.21]黑色帘幕被风吹动 \n[03:53.55]阳光无言地穿透 \n[03:54.88]洒向那群被我驯服后的 兽 \n[03:57.56]沉默地喊叫沉默地喊叫 \n[03:59.21]孤单开始发酵 \n[04:00.68]不停对着我嘲笑 \n[04:01.77]回忆逐渐燃烧 \n[04:03.33]曾经纯真的画面 \n[04:04.54]残忍地温柔出现 \n[04:05.69]脆弱时间到 \n[04:06.88]我们一起来祷告 \n[04:08.65]仁慈的父我已坠入 \n[04:11.90]看不见罪的国度 \n[04:14.58]请原谅我的自负 \n[04:17.97] \n[04:19.88]没人能说没人可说 \n[04:22.85]好难承受 \n[04:24.66]荣耀的背后刻着一道孤独 \n[04:27.67] \n[04:30.84]仁慈的父我已坠入 \n[04:36.44]看不见罪的国度 \n[04:42.07]请原谅我 我的自负 \n[04:47.36]刻着一道孤独 \n[04:52.74]仁慈的父我已坠入 \n[04:55.56]看不见罪的国度 \n[04:58.28]请原谅我的自负 \n[05:01.75] \n[05:03.58]没人能说没人可说 \n[05:06.49]好难承受 \n[05:08.66]荣耀的背后刻着一道孤独 \n[05:12.29] \n[05:14.32]那斑驳的家徽 我擦拭了一夜(闭上双眼我又看见) \n[05:17.45]孤独的光辉 我才懂的感觉(当年那梦的画面) \n[05:20.13]烛光 不 不 停的 摇晃(天空是蒙蒙的雾) \n[05:22.41]猫头鹰在 窗棂上 对著远方眺望 \n[05:25.50]通向 大厅的长廊 (父亲牵着我的双手) \n[05:28.42]一样 说不出的沧桑(轻轻走过)',
        // },
        // {
        //   name: 'Wayward One',
        //   artist: 'Jillian Rae',
        //   url: 'http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_72217588&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3',
        //   cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
        //   lrc: '',
        // },
      ]
    }
  },
  created () {
    // vue的两个生命钩子，这里不多解释。
    // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
    window.addEventListener('scroll', this.scrollToTop)
  },

  destroyed () {
    window.removeEventListener('scroll', this.scrollToTop)
  },

  mounted () {
    this.musicList()
  },

  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop () {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 0) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },

    // 音乐列表
    musicList () {
      let params = {
        pageSize: 5,
        currentPage: 1
      }
      // params = merge(params, this.menuParams)
      this.$http({
        url: this.$http.adornUrl('/music/list'),
        method: 'get',
        params: this.$http.adornParams(params)
      }).then(({data}) => {
        if (data.result.data !== null && data.code === 0) {
          this.audio = data.result.data.list
        }
      })
    }

  }
}

</script>
<style scoped>
   #snowbox{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100VH;
    z-index: -1;
  }
  .backTop{
    position:fixed;
    bottom:10px;
    right:45px;
    width: 23px;
    height: 23px;;
    background: url('../../assets/toTop.png');
    cursor: pointer;
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  html,body{
    height: 100%;
  }
  .main-wrapper
    width 100%
    margin 0 auto
</style>
