import { Dov } from "dov-miniapp";

const dovURL = "http://127.0.0.1:17208/appservice/manifest/index-1.0.json";

// https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html
App({
  dov: new Dov(dovURL),
});
