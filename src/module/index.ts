Component({
  // 组件外部可传属性
  properties: {
    items: {
      type: Array,
      value: [],
    },
    module: {
      type: null,
      value: {},
    },
    page: {
      type: null,
      value: {},
    },
    site: {
      type: null,
      value: {},
    }
  },

  // 组件内部数据
  data: {
  },

  lifetimes: {
    ready() {
      console.log(`[module][attached] ${this.data.module.title}`, this.data);
    }
  },

  methods: {
  }
});
