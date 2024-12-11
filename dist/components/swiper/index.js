"use strict";
/**
 * https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
 */
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
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3']
    },
    methods: {
        // 这里是一个自定义方法
        customMethod: function () { }
    }
});
