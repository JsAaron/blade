﻿define(['View', getViewTemplatePath('index'), 'UIGroupList'], function (View, viewhtml, UIGroupList) {

  return _.inherit(View, {
    onCreate: function () {
      this.$el.html(viewhtml);
      this.initElement();

      this.TXTTIMERRES = null;

    },

    initElement: function () {
      this.cancelBtn = this.$('.cui-btn-cancle');
      this.searchBox = this.$('.cui-input-box');
      this.txtWrapper = this.$('.cui-citys-hd');
      this.searchList = this.$('.seach-list');

    },

    events: {
      'focus .cui-input-box': 'seachTxtFocus',
      'click .cui-btn-cancle': function () {
        this.closeSearch();
      },
      'click .seach-list>li': function (e) {
        var gindex = $(e.currentTarget).attr('data-group');
        var index = $(e.currentTarget).attr('data-index');

        this.forward(this.uidata[gindex].data[index].uiname);
      }
    },

    seachTxtFocus: function (e) {
      this.openSeach();

    },

    closeSearch: function () {
      this.txtWrapper.removeClass('cui-input-focus');
      this.groupList.show();
      this.searchList.hide();
      this.searchBox.val('');

    },

    //开启搜索状态
    openSeach: function () {
      if (this.TXTTIMERRES) return;

      this.TXTTIMERRES = setInterval($.proxy(function () {
        //        console.log(1);
        //如果当前获取焦点的不是input元素的话便清除定时器
        if (!this.isInputFocus()) {
          if (this.TXTTIMERRES) {
            clearInterval(this.TXTTIMERRES);
            this.TXTTIMERRES = null;
          }
        }

        var txt = this.searchBox.val().toLowerCase();
        if (txt == '') {
          setTimeout($.proxy(function () {
            if (!this.isInputFocus()) {
              this.closeSearch();
            }
          }, this), 500);
          return;
        }

        this.txtWrapper.addClass('cui-input-focus');
        this.groupList.hide();
        this.searchList.show();

        var list = this.groupList.getFilterList(txt);
        this.searchList.html(list);


      }, this));


    },

    isInputFocus: function () {
      if (document.activeElement.nodeName == 'INPUT' && document.activeElement.type == 'text')
        return true;
      return false;
    },

    initGoupList: function () {
      if (this.groupList) return;
      var scope = this;

      //提示类
      var groupList1 = [
        { 'uiname': 'alert', 'name': '警告框' },
        { 'uiname': 'toast', 'name': 'toast框' },
        { 'uiname': 'loading', 'name': 'loading框' },
        { 'uiname': 'bubble.layer', 'name': '气泡框提示' }
      ];

      var groupList2 = [
        { 'uiname': 'num', 'name': '数字组件' },
        { 'uiname': 'select', 'name': 'select组件' },
        { 'uiname': 'select2', 'name': 'select应用' },
        { 'uiname': 'switch', 'name': 'switch组件' },
        { 'uiname': 'tab', 'name': 'tab组件' },
        { 'uiname': 'calendar', 'name': '日历组件' },
        { 'uiname': 'group.list', 'name': '分组列表' }
      ];

      var groupList3 = [
        { 'uiname': 'radio.list', 'name': '单列表选择组件' },
        { 'uiname': 'scroll.layer', 'name': '滚动层组件' },
        { 'uiname': 'group.select', 'name': '日期选择类组件' },
        { 'uiname': 'scroll', 'name': '滚动组件/横向滚动' },
        { 'uiname': 'scroll.across', 'name': '滚动组件/纵向滚动' },
        { 'uiname': 'slider', 'name': 'slider组件（todo...）' }
      ];

      var groupList4 = [
        { 'uiname': 'lazyload', 'name': '图片延迟加载' },
        { 'uiname': 'inputclear', 'name': '带删除按钮的文本框(todo...)' },
        { 'uiname': 'validate1', 'name': '工具类表单验证' },
        { 'uiname': 'validate2', 'name': '集成表单验证' }
      ];

      var uidata = [
        { name: '提示类组件', data: groupList1 },
        { name: '常用组件', data: groupList2 },
        { name: '滚动类组件', data: groupList3 },
        { name: '全局类', data: groupList4 }
      ];

      this.uidata = uidata;

      this.groupList = new UIGroupList({
        datamodel: {
          data: uidata,
          filter: 'uiname,name'
        },
        wrapper: this.$('.cui-citys-bd'),
        onItemClick: function (item, groupIndex, index, e) {
          scope.forward(item.uiname);
        }
      });


      this.groupList.show();

    },

    onPreShow: function () {
      this.initGoupList();
      this.turning();
    },

    onShow: function () {

    },

    onHide: function () {

    }

  });
});
