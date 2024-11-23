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
    expandStatus: [true]  // 是否展开
  },

  lifetimes: {
    attached() {
    }
  },

  methods: {
    onToggle(event: any) {
      const key = event.target.id;

      // can not collasp when only one item.
      if (this.data.items.length <= 1) {
        return;
      }

      this.setData({
        // 折叠上一次展开的
        [`expandStatus[${this.lastExpandIndex || 0}]`]: false,

        // 展开当前操作的
        [`expandStatus[${key}]`]: !this.data.expandStatus[key]
      });

      this.lastExpandIndex = key;
    }
  }
});
