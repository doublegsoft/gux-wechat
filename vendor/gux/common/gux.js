/*
** ──────────────────────────────────────────────────
** ─██████████████─██████──██████─████████──████████─
** ─██░░░░░░░░░░██─██░░██──██░░██─██░░░░██──██░░░░██─
** ─██░░██████████─██░░██──██░░██─████░░██──██░░████─
** ─██░░██─────────██░░██──██░░██───██░░░░██░░░░██───
** ─██░░██─────────██░░██──██░░██───████░░░░░░████───
** ─██░░██──██████─██░░██──██░░██─────██░░░░░░██─────
** ─██░░██──██░░██─██░░██──██░░██───████░░░░░░████───
** ─██░░██──██░░██─██░░██──██░░██───██░░░░██░░░░██───
** ─██░░██████░░██─██░░██████░░██─████░░██──██░░████─
** ─██░░░░░░░░░░██─██░░░░░░░░░░██─██░░░░██──██░░░░██─
** ─██████████████─██████████████─████████──████████─
** ──────────────────────────────────────────────────
*/
const gux = {
  presentPath: null,
};

gux.navigateBack = function (opt) {
  wx.navigateBack({
    success: (res) => {
      gux.presentPath = null;
      if (opt && opt.success) {
        opt.success();
      }
    },
  });
};

gux.navigateTo = function (opt) {
  let url = opt.url;
  let path;
  let index = url.indexOf('?');
  if (index != -1) {
    path = url.substring(0, index);
  } else {
    path = url;
  }
  if (gux.presentPath === path) {
    return;
  }
  wx.navigateTo({
    url: url,
    events: opt.events || {},
    success: () => {
      gux.presentPath = path;
    },
  })
};

gux.redirectTo = function (opt) {
  wx.redirectTo({
    url: opt.url,
  })
};

module.exports = { gux };
