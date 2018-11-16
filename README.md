# GameVideo_RN
这是通过对游戏视频网站斗鱼的网页交互的分析后,通过React Native是现实的一款APP,也是我写的第一个RN应用,一共花了两天时间.
  
声明：仅作为个人code training来开发的,不作为商业用途.仅供参考
  
如果是在Android平台上通过原生的接口来写界面和播放逻辑,对我个人而言并不难,思路很清晰而且需要用到的技术我的了然于心,
虽然在实际工作中我的技术主攻方向是Android framework,但我写过和公司业务相关的不少应用,也能算是个原生应用开发人员,
因此想亲自看看React Native开发和原生API开发的优势和缺点到底在哪里,网上说的和自己的实际感受是俩码事.最主要的原因是
让自己和目前Android的生态保持同步.
  
说明：
  1.首屏界面是FlatList实现的一个GridView,把斗鱼游戏的分类全部提取了出来
  2.通过分类的点击事件,获取对应游戏视频内容,采用了FlatList的上拉加载和下拉刷新
  3.通过react-native-video实现游戏视频的播放
  4.页面间的跳转使用了react-navigation
  
通过这两天的RN开发,
首先第一个体验是环境的搭建不像想象中那么顺利.
    我的开发环境是Android studio 3.2 + Node.js + Sublime Text 3
    
第二个体验就是在解决红屏和白屏的问题上,刚开始的时候不熟悉调试方式花了很长时间
    关于react-native start和react-native run-android的区别,都会启动server,但是run-android会启动应用
    
第三个体验,这个是比android原生调试方便的地方
    直接修改js脚本后,通过Reload JS就可以直接生效,也就是说如果不涉及到应用的修改,上线应用的升级完全可以通过服务器对JS的热更新就可以解决
    
第四个体验,不熟悉JSX语法
    这个在于每个人对code的熟悉程度,但并不是门槛,我也就通过两天的学习基本知道该如何像原生API的应用一样去写React Native.但我知道这只是个开始.
  
效果图：

![image](https://github.com/WoYang/GameVideo_RN/blob/master/work.gif)
