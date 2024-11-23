Component({
  // 组件外部可传属性
  properties: {
    items: {
      type: Array,
      value: [],
    },
    module: {
      type: Object,
      value: {},
    },
    page: {
      type: Object,
      value: {},
    },
    site: {
      type: Object,
      value: {},
    }
  },

  // 组件内部数据
  data: {
  },

  lifetimes: {
    ready() {
      console.log('module attached', this.data);
    }
  },

  methods: {
  }
});
