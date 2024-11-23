/**
 * ENUM 类型的定义
 * enums.XXX = [
 *      {
 *          value : 1,
 *          title : '中文名称',
 *          name  : '可选，常量名',
 *          items : [],  // 可选，递归的子级类型（注意多层级间的value应该是不重复的，否则getTitle不准确）
 *          data  : {}   // @todo 可选，存储的附加数据
 *      }
 * ]
 */
let enums = {}; // 原始定义

// 订单状态类型
enums.Status = [
    { title: '未', value: 0, name: 'NOT' },
];

export default enums;
