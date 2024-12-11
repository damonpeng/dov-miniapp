// @ts-nocheck

const amapFile = require('./amap-wx.130.js');
let markersData = [];

Component({
  properties: {
    component: {
      type: Object,
      value: {},
    },
    module: {
      type: Object,
      value: {},
    },
    src: {
      type: String,
      value: '',
    }
  },
  data: {
    markers: [],
    latitude: '23.397449',
    longitude: '110.058656',
    textData: {}
  },

  lifetimes: {
    attached() {
      const { windowWidth, windowHeight } = wx.getWindowInfo();

      this.setData({
        windowWidth,
        windowHeight
      });
      var that = this;
      var myAmapFun = new amapFile.AMapWX({ key: 'cfdbdc43c67bc081332323265f28049a' });

      myAmapFun.getRegeo({
        location: '110.058656,23.397449',
        success(data) {
          console.log(data);
          markersData = data;
          that.setData({
            markers: markersData
          });
          // that.setData({
          //   latitude: markersData[0].latitude
          // });
          // that.setData({
          //   longitude: markersData[0].longitude
          // });
          that.showMarkerInfo(markersData, 0);
        },
        fail: function (info) {
          wx.showModal({ title: info.errMsg })
        }
      })

      // myAmapFun.getPoiAround({
      //   // iconPathSelected: '选中 marker 图标的相对路径', //如：..­/..­/img/marker_checked.png
      //   // iconPath: '未选中 marker 图标的相对路径', //如：..­/..­/img/marker.png
      //   success: function (data) {
      //     markersData = data.markers;
      //     that.setData({
      //       markers: markersData
      //     });
      //     that.setData({
      //       latitude: markersData[0].latitude
      //     });
      //     that.setData({
      //       longitude: markersData[0].longitude
      //     });
      //     that.showMarkerInfo(markersData, 0);
      //   },
      //   fail: function (info) {
      //     wx.showModal({ title: info.errMsg })
      //   }
      // })
    },

    detached() {

    }
  },
  methods: {
    makertap: function (e) {
      var id = e.markerId;
      var that = this;
      that.showMarkerInfo(markersData, id);
      that.changeMarkerColor(markersData, id);
    },
    showMarkerInfo: function (data, i) {
      var that = this;
      that.setData({
        textData: {
          name: data[i].name,
          desc: data[i].address
        }
      });
    },
    changeMarkerColor: function (data, i) {
      var that = this;
      var markers = [];
      for (var j = 0; j < data.length; j++) {
        if (j == i) {
          data[j].iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
        } else {
          data[j].iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
        }
        markers.push(data[j]);
      }
      that.setData({
        markers: markers
      });
    }
  }
});
