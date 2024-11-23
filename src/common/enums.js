/**
 * ENUM 类型的定义
 * 1. 无序枚举
 * enumsConfig.NoOrderDemo = {
 *     "1": "Apple",
 *     "2": "Banana"
 * };
 *
 * 2. 有序枚举
 * enumsConfig.XXX = [
 *      {
 *          value : 1,
 *          title : '中文名称',
 *          name  : '可选，常量名',
 *          items : [],  // 可选，递归的子级类型（注意多层级间的value应该是不重复的，否则getTitle不准确）
 *          data  : {}   // @todo 可选，存储的附加数据
 *      }
 * ]
 */
import enumsConfig from '../config/enums.config.js';

let mapping = {}; // key-value形式
let valueMapping = {}; // 获取值到中文名的翻译
let nameMapping = {}; // 常量名定义
let methods = {};

// 解析引擎
let initEnums = (
    mappingName,
    options = {
        titleField: 'title',
        valueField: 'value',
        nameField: 'name',
        itemsField: 'items'
    }
) => {
    let enumsList = mappingName ? { [mappingName]: enumsConfig[mappingName] } : enumsConfig;

    Object.keys(enumsList).forEach(key => {
        let parseMapping;

        valueMapping[key] = {};
        nameMapping[key] = {};
        mapping[key] = {};

        // 递归子类
        parseMapping = items => {
            let orderList = [];

            if (Array.isArray(items)) {
                // 有序的结构数组
                items.forEach(item => {
                    let orderItem = {};

                    valueMapping[key][item[options.valueField]] = item[options.titleField];

                    item[options.nameField] && (nameMapping[key][item[options.nameField]] = item[options.valueField]);

                    mapping[key][item[options.valueField]] = item;

                    // 统一为标准名称
                    orderItem.title = item[options.titleField];
                    orderItem.value = item[options.valueField];
                    item[options.nameField] && (orderItem.name = item[options.nameField]);

                    if (item[options.itemsField]) {
                        orderItem.items = parseMapping(item[options.itemsField]);
                    }

                    orderList.push(orderItem);
                });

                return orderList;
            } else if (typeof items === 'object') {
                // 简单key-value无序对象
                valueMapping[key] = Object.assign({}, items);
                nameMapping[key] = {};

                Object.keys(items).forEach(value => {
                    // @todo 补全为数组的完整结构
                    orderList.push({
                        title: items[value],
                        value: value
                    });
                });

                mapping[key] = items;

                return orderList;
            }
        };

        enumsConfig[key] = parseMapping(enumsConfig[key]);
    });
};
initEnums();

methods = {
    /**
     * 获取值对应的中文名，没有匹配则返回原始值
     * @param {*} mappingName
     * @param {*} value
     */
    getTitle(mappingName, value) {
        let result = '';

        if (typeof valueMapping[mappingName] !== 'undefined') {
            result = valueMapping[mappingName][value];
        }

        return result || value;
    },

    getItem(mappingName, value) {
        let result = null;

        if (typeof mapping[mappingName] !== 'undefined') {
            result = mapping[mappingName][value];
        }

        return result;
    },

    /**
     *  获取enum的完整定义，如用于select下拉框的渲染
     * @param {*} mappingName
     * @param {*} defaultItem
     */
    getItems(mappingName, defaultItem = { title: '请选择', value: '' }) {
        let result = Object.assign([], enumsConfig[mappingName]);

        defaultItem && defaultItem.value !== undefined && result.unshift(defaultItem);

        return result;
    },

    /**
     * 动态加载的枚举量，如从cgi增加
     * @param {*} mappingName
     * @param {*} items
     */
    setItems(
        mappingName,
        items,
        options = {
            titleField: 'title',
            valueField: 'value',
            nameField: 'name',
            itemsField: 'items'
        }
    ) {
        enumsConfig[mappingName] = items;
        initEnums(mappingName, options);
    }
};

/**
 * 实例方法，获取字段的翻译
 */
class Title {
    constructor(enumName) {
        return value => {
            return methods.getTitle(enumName, value);
        };
    }
}
class Data {
    constructor(enumName, fieldName = '') {
        return value => {
            let result = (methods.getItem(enumName, value) || {}).data;

            return fieldName ? (result || {})[fieldName] : result;
        };
    }
}

methods.Title = Title;
methods.Data = Data;

export default {
    ...nameMapping,
    ...methods
};
