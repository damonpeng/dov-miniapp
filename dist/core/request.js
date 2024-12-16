"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
/**
 * Network request.
 *
 */
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["GET"] = "GET";
    HttpMethod["POST"] = "POST";
    HttpMethod["OPTIONS"] = "OPTIONS";
    HttpMethod["HEAD"] = "HEAD";
    HttpMethod["PUT"] = "PUT";
    HttpMethod["DELETE"] = "DELETE";
    HttpMethod["TRACE"] = "TRACE";
    HttpMethod["CONNECT"] = "CONNECT";
})(HttpMethod || (HttpMethod = {}));
// Client time adjust value.
let clockAdjustValue = 0;
/**
 * Request based on wx.request.
 * @param method HTTP method
 * @param url server URL
 * @param data the data passed to server
 * @param options options
 * @returns
 */
function request(method, url, data, options = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method,
            data: data,
            header: options.header || {
                'content-type': 'application/json'
            },
            success(response) {
                resolve(response.data);
            },
            fail(response) {
                reject(response);
            },
            complete(response) {
                if (response.statusCode >= 400) {
                    console.error(`[dov]request error:${url}`);
                }
                // compare client time with HTTP Date header
                if (typeof clockAdjustValue === 'undefined' && response.headers?.date) {
                    clockAdjustValue = new Date(response.header.Date).getTime() - Date.now();
                }
            }
        });
    });
}
/**
 * RESTful request.
 */
const http = {
    /**
     * HTTP GET
     * @param url server url
     * @param data the data passed to server
     * @param options options
     * @returns promise
     */
    get(url, data, options) {
        return request(HttpMethod.GET, url, data, options);
    },
    /**
     * HTTP POST
     * @param url server url
     * @param data the data passed to server
     * @param options options
     * @returns promise
     */
    post(url, data, options) {
        return request(HttpMethod.POST, url, data, options);
    },
    /**
     * Upload files based on HTTP POST in common use.
     * @param url server url
     * @param data the data passed to server
     * @param options options
     * @returns promise
     */
    upload(url, data, options) {
        let formData;
        !options && (options = {});
        !options.header && (options.header = {});
        if (data && !(data instanceof FormData)) {
            formData = new FormData();
            Object.keys(data).forEach((k) => {
                formData.append(k, data[k]);
            });
        }
        else {
            formData = data;
        }
        Object.assign(options.header, {
            'content-type': 'multipart/form-data',
        });
        return request(HttpMethod.POST, url, formData, options);
    },
    /**
     * Correct the client time by the HTTP Date header.
     * @returns
     */
    now() {
        let result = Date.now();
        // tolerance 5s
        if (Math.abs(clockAdjustValue) > 5000) {
            result += clockAdjustValue;
        }
        return result;
    }
};
exports.default = http;