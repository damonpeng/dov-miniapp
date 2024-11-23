Component({
  properties: {
    component: {
      type: Object,
      value: {},
    },
    module: {
      type: Object,
      value: {},
    },
    src: {
      type: String,
      value: '',
    }
  },
  data: {
    // 这里是一些组件内部数据
    src: ''
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { }
  }
});
