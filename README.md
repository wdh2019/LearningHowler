# LearningHowler

https://github.com/goldfire/howler.js#documentation



## Vue引入依赖

- 安装依赖

```bash
npm install howler --save
```

- 引入

````js
import { Howl, Howler } from 'howler'
````



## 创建实例

```js
import bgm from '../path/to/bgm'

const sound = new Howl({
	src: [bgm],
	loop: true,
	volume: .4,
})
```



## load事件

```js
sound.once('load', function() {
	console.log('loaded')
})
```



## play()播放

```js
const id = sound.play()

...
sound.play(id)
```



## pause()暂停

```js
sound.pause(id)
```



## on()监听事件

```js
sound.on('end', function() {
    console.log('finished!')
})
```



## 注意

1. 在官方示例中，有如下代码：

   ```js
   sound.once('load', function(){
       sound.play();
   })
   ```

   本意为load事件触发后，播放音频。但这样会导致后续 play() 方法新创建一个音频实例(id)。原因不明。

2. chrome中不支持音频自动播放，即autoplay无效。这一点可能能解释1中的问题。



## 示例

Bgm.js

```js
import { Howl, Howler } from 'howler'

export class Bgm {
  constructor(bgm) {
    this.sound = new Howl({
      src: [bgm],
      loop: true,
      volume: .4,
      onplay: function() {
        console.log('play!!')
      }
    })
    this.initEvents()
  }
  initEvents() {
    this.sound.once('load', this.load.bind(this))
  }
  load() {
    console.log('loaded', this.sound)
  }
  play() {
    if (!this.id) {
      this.id = this.sound.play()
    } else {
      this.sound.play(this.id)
    }
    console.log(this.id)
    console.log('playing')
  }
  pause() {
    this.sound.pause(this.id)
    console.log('paused', this.sound.seek())
  }
  toggle() {
    if (this.sound.playing(this.id)) {
      this.pause()
    } else {
      this.play()
    }
  }
}
```

PlayGround.vue

```vue
<template>
  <div>
    <button id="play" @click="play">播放bgm</button>
    <button id="pause" @click="pause">暂停bgm</button>
    <button id="toggle" @click="toggle">切换bgm</button>

    <button id="play1" @click="play1">播放bgm1</button>
    <button id="pause1" @click="pause1">暂停bgm1</button>
    <button id="toggle" @click="toggle1">切换bgm1</button>
  </div>
</template>

<script>
import { Bgm } from './Bgm'
import bgmMp3 from '../assets/bgm.mp3'
import bgm1Mp3 from '../assets/bgm1.mp3'

export default {
  name: 'PlayGround',
  data() {
    return {
      bgm: new Bgm(bgmMp3),
      bgm1: new Bgm(bgm1Mp3),
    }
  },
  methods: {
    play() {
      this.bgm.play()
    },
    pause() {
      this.bgm.pause()
    },
    toggle() {
      this.bgm.toggle()
    },
    play1() {
      this.bgm1.play()
    },
    pause1() {
      this.bgm1.pause()
    },
    toggle1() {
      this.bgm1.toggle()
    }
  },
}

</script>

<style scoped>

</style>
```



## 与 audiosprite 配合

https://github.com/tonistiigi/audiosprite



可以先用audiosprite将多个音频合成一个输出音频，并会导出一个json文件，指明输出音频的组成情况。

然后，按照json文件说明的组成情况，填充howler实例的sprite参数，构造howler实例。

优点是更好地控制多个音频。



参考博客：

https://blog.csdn.net/u010427666/article/details/82018232



### 全局安装 audiosprite

```bash
npm install -g audiosprite
```



### 安装音频处理工具 ffmpeg

http://ffmpeg.org/download.html

下载电脑操作系统对应的安装包



### 为 ffmpeg 配置环境变量

(windows系统下)

然后打开命令行，用如下命令检查 ffmpeg 是否安装成功：

```bash
ffmpeg -version
```



### 整合音频

在有效目录下（最好在要整合的音频的目录）：

```bash
audiosprite ***.mp3 ***.wav
```

整合成功后，会得到一份输出音频(4种格式：.ac3/.m4a/.mp3/.ogg)和一份json文件

json文件中 spritemap 存储了源音频映射到输出音频的时间段



### 构造 howler 实例

```
const sound = new Howl({
	src: ['/path/to/your/output/audio'],
	sprite: {
		aaa: [startTime1, endTime1],
		bbb: [startTime2, endTime2],
	}
})
```



### 示例

output.json

```json
{
  "resources": [
    "output.ogg",
    "output.m4a",
    "output.mp3",
    "output.ac3"
  ],
  "spritemap": {
    "bgm": {
      "start": 0,
      "end": 327.80002267573695,
      "loop": false
    },
    "bgm1": {
      "start": 329,
      "end": 610.8604988662132,
      "loop": false
    }
  }
}
```

Bgm.js

```js
import { Howl, Howler } from 'howler'

export class BgmSprite {
  constructor(bgm) {
    this.sound = new Howl({
      src: [bgm],
      loop: true,
      volume: .4,
      sprite: {
        bgm: [0, 327.8 * 1000],
        bgm1: [329 * 1000, 610.8 * 1000],
      }
    })
    this.ids = {}
    this.initEvents()
  }
  initEvents() {
    this.sound.once('load', this.load.bind(this))
  }
  load() {
    console.log('loaded', this.sound)
  }
  play(index) {
    if (!this.ids[index]) {
      this.ids[index] = this.sound.play(index)
    } else {
      this.sound.play(this.ids[index])
    }
    console.log(this.ids)
    console.log('playing')
  }
  pause(index) {
    this.sound.pause(this.ids[index])
    console.log('paused', this.sound.seek(this.ids[index]))
  }
  toggle(index) {
    if (this.sound.playing(this.ids[index])) {
      this.pause(index)
    } else {
      this.play(index)
    }
  }
}
```

PlayGround.vue

```vue
<template>
  <div>
    <button id="play2" @click="playSprite('bgm')">播放</button>
    <button id="pause2" @click="pauseSprite('bgm')">暂停</button>
    <button id="toggle2" @click="toggleSprite('bgm')">切换</button>
    <br />
    <button id="play3" @click="playSprite('bgm1')">播放1</button>
    <button id="pause3" @click="pauseSprite('bgm1')">暂停1</button>
    <button id="toggle3" @click="toggleSprite('bgm1')">切换1</button>
  </div>
</template>

<script>
import { BgmSprite } from './Bgm'
import outputMp3 from '../assets/output.mp3'

export default {
  name: 'PlayGround',
  data() {
    return {
      bgm2: new BgmSprite(outputMp3),
    }
  },
  methods: {
    playSprite(index) {
      this.bgm2.play(index)
    },
    pauseSprite(index) {
      this.bgm2.pause(index)
    },
    toggleSprite(index) {
      this.bgm2.toggle(index)
    },
  },
}

</script>

<style scoped>

</style>

```

