/**
 * Manifest parser
 */
import http from './request';
import Struct from '../types/Struct';
import Components from '../types/Components';

interface ManifestNode {
  "struct": Struct,
  "component": Components,
  "title": string,
  "icon"?: string,
  "router": string,
  "script"?: string,
  "version"?: string,
  "items"?: Array<ManifestNode>,
}

enum ManifestNodeType {
  Site = 'site',
  Channel = 'channel',
  Page = 'page',
  Module = 'module',
  Component = 'component'
}

class Manifest {
  site: any = {};
  channelMap: any = {};
  pageMap: any = {};
  moduleOfPageMap: any = {};
  componentOfPageMap: any = {};

  /**
   * Parse manifest data from a URL.
   * @param manifestURL manifest URL, it should be a remote server URL.
   */
  async parseFromURL(manifestURL: string) {
    const data: ManifestNode = await http.get(manifestURL)

    this.parse(data);

    return data;
  }

  parse(manifest: ManifestNode) {
    let channelMap: any = {};
    let pageMap: any = {};
    let moduleOfPageMap: any = {};
    let componentOfPageMap: any = {};
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
            !componentOfPageMap[page][moduleRouter] && (componentOfPageMap[page][moduleRouter] = {})

            componentOfPageMap[page][moduleRouter] = node;
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
      [ManifestNodeType.Component]: this.componentOfPageMap
    })[name];
    let node = nodeMap[router];

    if (!node) {
      // matching children node
      Object.keys(nodeMap).forEach(itemRouter => {
        if (router.indexOf(itemRouter) >= 0) {
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
  getModule(router: string) {
    return this.getByRouter(ManifestNodeType.Module, router);
  }

  /**
   * Get components of a page.
   * @param componentRouter component name
   * @param pageRouter page name, default returns the first page.
   * @returns
   */
  getComponentsOfPage(pageRouter: string, moduleRouter: string) {
    return this.componentOfPageMap[pageRouter][moduleRouter];
  }

  /**
   * Get URL of the page json data file
   * @param router 
   * @returns 
   */
  getPageScriptURL(router: string) {
    const page = this.getPage(router);
    return page && page.script ? page.script.replace('${version}', page.version) : '';
  }
}

export default Manifest;
