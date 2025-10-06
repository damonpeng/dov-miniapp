import { ManifestNode } from "src/core/manifest";

const StorageKey = 'dov-player';

enum PlayerStatus {
  Waiting = 'waiting',
  Playing = 'playing',
  Stopped = 'stopped',
  Paused = 'paused'
}

Component({
  properties: {
    component: {
      type: Object,
      value: {},
    },
    items: {
      type: Array,
      value: [],
    },
    module: {
      type: Object,
      value: {},
    }
  },

  data: {
    audioContext: null,
    current: {
      audio: '',
      poster: '',
      status: PlayerStatus.Waiting
    }
  },

  lifetimes: {
    attached() {
      // loaded but not play
      this.playDefault();
      this.pause();

      wx.setInnerAudioOption({
        obeyMuteSwitch: false  // 不遵循手机静音开关
      });
    },

    detached() {
      this.stop();
    }
  },

  pageLifetimes: {
    hide() {
    }
  },

  methods: {
    onClickPlayer(event: any) {
      if (this.data.current.status !== PlayerStatus.Playing) {
        this.playDefault();
      } else {
        this.pause();
      }
    },

    onClickControl(event: any) {
      const { audio, poster } = event.target.dataset;
      this.play(audio, poster);
    },

    play(audio: string, poster?: string) {
      let audioContext: any = this.data.audioContext;
      if (!audioContext) {
        audioContext = wx.createInnerAudioContext({
          // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
          useWebAudioImplement: false
        });
        this.data.audioContext = audioContext;
      }

      this.setData({
        'current.audio': audio,
        'current.poster': poster,
        'current.className': 'dov-spin',
        'current.status': PlayerStatus.Playing
      });
      audioContext.referrerPolicy = 'origin';
      audioContext.src = audio;
      audioContext.play();
      audioContext.onEnded(() => {
        this.playNext();
      });

      wx.setStorageSync(StorageKey, { audio, poster });
    },

    stop() {
      const audioContext: any = this.data.audioContext;
      if (audioContext) {
        audioContext.stop();

        this.setData({
          'current.status': PlayerStatus.Stopped,
          'current.className': '',
        });
      }
    },

    pause() {
      const audioContext: any = this.data.audioContext;
      if (audioContext) {
        audioContext.pause();

        this.setData({
          'current.status': PlayerStatus.Paused,
          'current.className': '',
        });
      }
    },

    playDefault() {
      const lastPlayData = wx.getStorageSync(StorageKey);
      const currentPlayData = lastPlayData || this.data.items[0];

      const { audio, poster } = currentPlayData;
      this.play(audio, poster);
    },

    playNext() {
      let nextItem = this.data.current;

      this.properties.items.forEach((item, index) => {
        if ((item as ManifestNode).audio === this.data.current.audio) {
          nextItem = this.properties.items[(index + 1) % this.properties.items.length]
        }
      });

      const { audio, poster } = nextItem;

      this.play(audio, poster)
    }
  },
});
