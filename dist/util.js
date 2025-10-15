"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseCurrentURL() {
    const { path, query } = wx.getLaunchOptionsSync();
    return {
        path,
        query, // 原始query
        channel: query.channel || '',
        page: query.page || '',
        pagelet: query.pagelet || ''
    };
}
exports.default = { parseCurrentURL };
