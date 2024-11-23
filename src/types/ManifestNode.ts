import Struct from "./Struct";
import Component from "./Components";

export default interface ManifestNode {
  "struct": Struct,
  "component": Component,
  "title": string,
  "router": string,
  "script": string,
  "version"?: string,
  "items": Array<ManifestNode>,
};
