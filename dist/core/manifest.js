"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Manifest parser
 */
const request_1 = __importDefault(require("./request"));
const Struct_1 = __importDefault(require("../types/Struct"));
var ManifestNodeType;
(function (ManifestNodeType) {
    ManifestNodeType["Site"] = "site";
    ManifestNodeType["Channel"] = "channel";
    ManifestNodeType["Page"] = "page";
    ManifestNodeType["Module"] = "module";
    ManifestNodeType["Component"] = "component";
})(ManifestNodeType || (ManifestNodeType = {}));
class Manifest {
    constructor() {
        this.site = {};
        this.channelMap = {};
        this.pageMap = {};
        this.moduleOfPageMap = {};
        this.componentOfPageMap = {};
    }
    /**
     * Parse manifest data from a URL.
     * @param manifestURL manifest URL, it should be a remote server URL.
     */
    async parseFromURL(manifestURL) {
        const data = await request_1.default.get(manifestURL);
        this.parse(data);
        return data;
    }
    parse(manifest) {
        let channelMap = {};
        let pageMap = {};
        let moduleOfPageMap = {};
        let componentOfPageMap = {};
        let moduleOfPageReverseMap = {};
        // walker the JSON tree, conver to maps
        let parseItem = (node, parentNode) => {
            switch (node.struct) {
                // global unique
                case Struct_1.default.site:
                    this.site = node;
                    break;
                // global unique
                case Struct_1.default.channel:
                    channelMap[node.router] = node;
                    break;
                // global unique
                case Struct_1.default.page:
                    pageMap[node.router] = node;
                    break;
                // Module maybe repeated, but unique when under a page.
                case Struct_1.default.module:
                    if (parentNode) {
                        !moduleOfPageMap[parentNode.router] && (moduleOfPageMap[parentNode.router] = {});
                        moduleOfPageMap[parentNode.router] = node;
                        moduleOfPageReverseMap[node.router] = parentNode.router;
                    }
                    break;
                // Component maybe repeated, but unique when under a page.
                case Struct_1.default.component:
                    if (parentNode) {
                        const moduleRouter = parentNode.router;
                        const page = moduleOfPageReverseMap[moduleRouter];
                        !componentOfPageMap[page] && (componentOfPageMap[page] = {});
                        !componentOfPageMap[page][moduleRouter] && (componentOfPageMap[page][moduleRouter] = {});
                        componentOfPageMap[page][moduleRouter] = node;
                    }
                    break;
            }
            node?.items?.forEach((item) => {
                parseItem(item, node);
            });
        };
        parseItem(manifest);
        Object.assign(this.channelMap, channelMap);
        Object.assign(this.pageMap, pageMap);
        Object.assign(this.moduleOfPageMap, moduleOfPageMap);
        Object.assign(this.componentOfPageMap, componentOfPageMap);
    }
    /**
     * Get site
     * @returns
     */
    getSite() {
        return this.site;
    }
    getByRouter(name, router) {
        const nodeMap = ({
            [ManifestNodeType.Channel]: this.channelMap,
            [ManifestNodeType.Page]: this.pageMap,
            [ManifestNodeType.Module]: this.moduleOfPageMap,
            [ManifestNodeType.Component]: this.componentOfPageMap
        })[name];
        let node = nodeMap[router];
        if (!node) {
            // matching children node
            Object.keys(nodeMap).forEach(itemRouter => {
                if (router.indexOf(itemRouter) >= 0) {
                    node = nodeMap[itemRouter];
                }
            });
        }
        return node;
    }
    /**
     * Get channel
     * @param router channel name, default returns the first one.
     * @returns
     */
    getChannel(router) {
        return this.getByRouter(ManifestNodeType.Channel, router);
    }
    /**
     * Get page
     * @param pageRouter page name, default returns the first one.
     * @returns
     */
    getPage(router) {
        return this.getByRouter(ManifestNodeType.Page, router);
    }
    /**
     * Get module
     * @param moduleRouter module name, default returns the first one.
     * @returns
     */
    getModule(router) {
        return this.getByRouter(ManifestNodeType.Module, router);
    }
    /**
     * Get components of a page.
     * @param componentRouter component name
     * @param pageRouter page name, default returns the first page.
     * @returns
     */
    getComponentsOfPage(pageRouter, moduleRouter) {
        return this.componentOfPageMap[pageRouter][moduleRouter];
    }
    /**
     * Get URL of the page json data file
     * @param router
     * @returns
     */
    getPageScriptURL(router) {
        const page = this.getPage(router);
        return page && page.script ? page.script.replace('${version}', page.version) : '';
    }
}
exports.default = Manifest;
