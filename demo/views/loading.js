﻿define(['View', getViewTemplatePath('loading'), 'UILoading'], function (View, viewhtml, UILoading) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);

    },

    events: {
      'click .demo1': 'demo1',
      'click .demo2': 'demo2',
      'click .demo3': 'demo3',
      'click .demo4': 'demo4'
    },

    demo1: function () {
      if (!this.loading1) {
        this.loading1 = new UILoading();
      }
      this.loading1.show();
    },

    demo2: function () {
      console.log('loading:2');
      if (!this.loading2) {
        this.loading2 = new UILoading({

        });
      }
      this.loading2.show();
    },

    demo3: function () {
      if (!this.loading3) {
        this.loading3 = new UILoading({
          needMask: false
        });
      }
      this.loading3.show();
    },

    demo4: function () {
      if (!this.loading4) {
        this.loading4 = new UILoading({
          maskToHide: true
        });
      }
      this.loading4.show();
    },

    onPreShow: function () {
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
