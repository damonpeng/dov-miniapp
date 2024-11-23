import FontFace from '../framework/core/fontface';

Page({
  behaviors: [require('../framework/dovBehavior.js')],
  onLoad() {
    const fontface: any = {
      family: 'MaShanZheng-Regular',
      source: 'https://s.dayanmo.com/global/font/MaShanZheng-Regular.ttf'
    };

    new FontFace(fontface);
  }
});
