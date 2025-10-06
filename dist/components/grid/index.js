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
            const url = event.target.dataset.link;
            if (url) {
                await app.dov.openUrl(url);
            }
        }
    }
});
