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
    console.log('paused', this.sound.seek(this.id))
  }
  toggle() {
    if (this.sound.playing(this.id)) {
      this.pause()
    } else {
      this.play()
    }
  }
}

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