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
    current: 0,
  },

  attached() {
    console.log('banner component attached', this.data);
  },

  methods: {
    onChange(event: any) {
      this.setData({
        current: event.detail.current
      });
    },

    async onClickBanner(event: any) {
      const app = getApp() as any;
      const { index } = event.currentTarget.dataset;
      const item = this.data.items[index] as any;

      if (item && (item.link || item.router)) {
        await app.dov.openURL(item.link, item.router);
      }
    }
  }
});
