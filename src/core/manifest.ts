/**
 * Manifest parser
 */
import http from './request';
import Struct from '../types/Struct';
import Components from '../types/Components';

export interface ManifestNode {
  "struct": Struct,
  "component": Components,
  "title": string,
  "icon"?: string,
  "router": string,
  "script"?: string,
  "version"?: string,
  "audio"?: string,
  "items"?: Array<ManifestNode>,
}

export enum ManifestNodeType {
  Site = 'site',
  Channel = 'channel',
  Page = 'page',
  Module = 'module',
  Component = 'component',
  Pagelet = 'pagelet'
}

class Manifest {
  site: any = {};
  channelMap: any = {};
  pageMap: any = {};
  moduleOfPageMap: any = {};
  componentOfPageMap: any = {};
  pageletOfPageMap: any = {};
  siteRoot: string;

  constructor(siteRoot: string) {
    this.siteRoot = siteRoot;
  }

  /**
   * Parse manifest data from a URL.
   * @param manifestURL manifest URL, it should be a remote server URL.
   */
  async parseFromURL(manifestURL: string) {
    const data: ManifestNode = await http.get(manifestURL);

    this.parse(data);

    return data;
  }

  parse(manifest: ManifestNode) {
    let channelMap: any = {};
    let pageMap: any = {};
    let moduleOfPageMap: any = {};
    let componentOfPageMap: any = {};
    let pageletOfPageMap: any = {};
    let moduleOfPageReverseMap: any = {};

    // walker the JSON tree, conver to maps
    let parseItem = (node: ManifestNode, parentNode?: ManifestNode) => {
      switch (node.struct) {
        // global unique
        case Struct.site:
          this.site = node;
          break;

        // global unique
        case Struct.channel:
          channelMap[node.router] = node;
          break;

        // global unique
        case Struct.page:
          pageMap[node.router] = node;
          break;

        // Module maybe repeated, but unique when under a page.
        case Struct.module:
          if (parentNode) {
            !moduleOfPageMap[parentNode.router] && (moduleOfPageMap[parentNode.router] = {})
            moduleOfPageMap[parentNode.router] = node;
            moduleOfPageReverseMap[node.router] = parentNode.router;
          }
          break;

        // Component maybe repeated, but unique when under a page.
        case Struct.component:
          if (parentNode) {
            const moduleRouter = parentNode.router;
            const page = moduleOfPageReverseMap[moduleRouter];
            !componentOfPageMap[page] && (componentOfPageMap[page] = {});
            componentOfPageMap[page][moduleRouter] = node;
          }
          break;

        case Struct.pagelet:
          if (parentNode) {
            const pageRouter = parentNode.router;
            !pageletOfPageMap[pageRouter] && (pageletOfPageMap[pageRouter] = {});
            pageletOfPageMap[pageRouter][node.router] = node;
          }
          break;
      }

      node?.items?.forEach((item: ManifestNode) => {
        parseItem(item, node);
      });
    };

    parseItem(manifest);

    Object.assign(this.channelMap, channelMap);
    Object.assign(this.pageMap, pageMap);
    Object.assign(this.moduleOfPageMap, moduleOfPageMap);
    Object.assign(this.componentOfPageMap, componentOfPageMap);
    Object.assign(this.pageletOfPageMap, pageletOfPageMap);

    return manifest;
  }

  /**
   * Get site
   * @returns
   */
  getSite() {
    return this.site;
  }

  getByRouter(name: string, router: string) {
    const nodeMap = ({
      [ManifestNodeType.Channel]: this.channelMap,
      [ManifestNodeType.Page]: this.pageMap,
      [ManifestNodeType.Module]: this.moduleOfPageMap,
      [ManifestNodeType.Component]: this.componentOfPageMap,
      [ManifestNodeType.Pagelet]: this.pageletOfPageMap,
    })[name];
    let node = nodeMap[router];

    if (!node) {
      // matching children node
      Object.keys(nodeMap).forEach(itemRouter => {
        if (itemRouter.indexOf(router) >= 0) {
          node = nodeMap[itemRouter];
        }
      })
    }

    return node;
  }

  /**
   * Get channel
   * @param router channel name, default returns the first one.
   * @returns
   */
  getChannel(router: string) {
    return this.getByRouter(ManifestNodeType.Channel, router);
  }

  /**
   * Get page
   * @param pageRouter page name, default returns the first one.
   * @returns
   */
  getPage(router: string) {
    return this.getByRouter(ManifestNodeType.Page, router);
  }

  /**
   * Get module
   * @param moduleRouter module name, default returns the first one.
   * @returns
   */
  // getModule(router: string) {
  //   return this.getByRouter(ManifestNodeType.Module, router);
  // }

  /**
   * Get components of a page.
   * @param componentRouter component name
   * @param pageRouter page name, default returns the first page.
   * @returns
   */
  // getComponentsOfPage(pageRouter: string, moduleRouter: string) {
  //   return this.componentOfPageMap[pageRouter][moduleRouter];
  // }

  /**
   * Get pagelets of a page.
   * @param pageRouter page name, default returns the first page.
   * @returns
   */
  // getPageletsOfPage(pageRouter: string) {
  //   return this.pageletOfPageMap[pageRouter];
  // }

  /**
   * Get URL of the page json data file
   * @param router 
   * @returns 
   */
  getPageScriptURL(router: string) {
    const page = this.getPage(router);
    let scriptURL = router;

    if (page && page.script) {
      scriptURL = page.script.replace('${version}', page.version);
    }

    if (/^http(s)?:\/\//.test(scriptURL) === false) {
      scriptURL = this.siteRoot + scriptURL;
    }

    return scriptURL;
  }
}

export default Manifest;
