/**
 * Base struct of manifest.
 */
export enum Struct {
  site = 'site',
  channel = 'channel',
  module = 'module',
  page = 'page',
  component = 'component',
  pagelet = 'pagelet',
};

export interface StructSite {
  struct: Struct.site;
  title: string;
  desc: string;
  router: string;
  version: string;
  items: Array<StructChannel>;
}

export interface StructChannel {
  struct: Struct.channel;
  title: string;
  desc: string;
  router: string;
  version: string;
  items: Array<StructModule>;
}

export interface StructModule {
  struct: Struct.module;
  title: string;
  desc: string;
  router: string;
  version: string;
  items: Array<StructPage>;
}

export interface StructPage {
  struct: Struct.page;
  title: string;
  desc: string;
  router: string;
  items: Array<StructComponent>;
}

export interface StructComponent {
  struct: Struct.component;
  title: string;
  desc: string;
  router: string;
  items: [];
}

export default Struct;
