"use strict";
const app = getApp();
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
        instance: null
    },
    methods: {
        onClickItem(event) {
            const url = event.target.dataset.link;
            if (url) {
                app.dov.openUrl(url);
            }
        }
    }
});
