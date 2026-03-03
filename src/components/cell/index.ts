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
    lastExpandIndex: 0,
    expandStatus: [true]  // 是否展开
  },

  lifetimes: {
    attached() {
    }
  },

  methods: {
    async onToggle(event: any) {
      const app = getApp() as any;
      const key = event.target.id;
      const item = this.data.items[key] as any;

      // If item has link, navigate to it
      if (item && (item.link || item.router)) {
        await app.dov.openURL(item.link || item.router, item.router);
        return;
      }

      // can not collapse when only one item.
      if (this.data.items.length <= 1) {
        return;
      }

      this.setData({
        // 折叠上一次展开的
        // [`expandStatus[${this.data.lastExpandIndex || 0}]`]: false,

        // 展开当前操作的
        [`expandStatus[${key}]`]: !this.data.expandStatus[key]
      });

      this.data.lastExpandIndex = key;
    }
  }
});
