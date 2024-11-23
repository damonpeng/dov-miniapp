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
    }
  },

  // 组件内部数据
  data: {},

  lifetimes: {
    attached() {
      console.log('components attached', this.properties)
    }
  },

  methods: {
    shuffle(list: Array<any>) {
      let l = list.length, index, temp;

      while (l > 0) {
        index = Math.floor(Math.random() * l);
        temp = list[l - 1];
        list[l - 1] = list[index];
        list[index] = temp;
        l--;
      }

      return list;
    }
  }
});
