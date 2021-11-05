<template>
<div class="container">
  <div class="section">
    <h2>Howler实例</h2>
    <h4>Bgm</h4>
    <button id="play" @click="play">播放bgm</button>
    <button id="pause" @click="pause">暂停bgm</button>
    <button id="toggle" @click="toggle">切换bgm</button>
    <h4>Bgm1</h4>
    <button id="play1" @click="play1">播放bgm1</button>
    <button id="pause1" @click="pause1">暂停bgm1</button>
    <button id="toggle1" @click="toggle1">切换bgm1</button>
  </div>
  <div class="section">
    <h2>Howler与audioSprite</h2>
    <h4>Bgm</h4>
    <button id="play2" @click="playSprite('bgm')">播放bgm</button>
    <button id="pause2" @click="pauseSprite('bgm')">暂停bgm</button>
    <button id="toggle2" @click="toggleSprite('bgm')">切换bgm</button>
    <h4>Bgm1</h4>
    <button id="play3" @click="playSprite('bgm1')">播放bgm1</button>
    <button id="pause3" @click="pauseSprite('bgm1')">暂停bgm1</button>
    <button id="toggle3" @click="toggleSprite('bgm1')">切换bgm1</button>
  </div>
</div>
</template>

<script>
import { Bgm, BgmSprite } from './Bgm'
import bgmMp3 from '../assets/bgm.mp3'
import bgm1Mp3 from '../assets/bgm1.mp3'
import outputMp3 from '../assets/output.mp3'

export default {
  name: 'PlayGround',
  data() {
    return {
      bgm: new Bgm(bgmMp3),
      bgm1: new Bgm(bgm1Mp3),
      bgm2: new BgmSprite(outputMp3),
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
    },

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
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.section {
  width: 100%;
}
.section button {
  margin: 10px;
  cursor: pointer;
}
</style>
