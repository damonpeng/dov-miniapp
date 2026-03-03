Component({
  properties: {
    items: {
      type: Array,
      value: []
    },
    component: {
      type: Object,
      value: {}
    },
    module: {
      type: Object,
      value: {}
    }
  },

  methods: {
    onCellTap(e: any) {
      const { row, col, cell } = e.currentTarget.dataset;
      console.log('单元格点击:', { row, col, cell });
      
      // 触发事件通知父组件
      this.triggerEvent('celltap', {
        row,
        col,
        cell
      });
    }
  }
});
