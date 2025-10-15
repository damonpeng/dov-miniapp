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
    attached() {
        console.log('this.data.component', this.data.component);
    },
    methods: {
        async onClickGridItem(event) {
            const { link, router } = event.target.dataset;
            if (link || router) {
                await app.dov.openURL(link, router);
            }
        }
    }
});
