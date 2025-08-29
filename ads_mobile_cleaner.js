(function() {
  // 只在手机端执行
  if (window.innerWidth <= 767) {
    // 判断是否是主页（常见的判断方式：路径为根目录 或 index.html）
    var isHomePage = (location.pathname === "/" || location.pathname.endsWith("index.html"));

    if (isHomePage) {
      function removeAds() {
        // 左竖条
        var leftAd = document.querySelectorAll('.nb-stick.nb-left[data-nb="left"]');
        // 右竖条
        var rightAd = document.querySelectorAll('.nb-stick.nb-right[data-nb="right"]');
        // 浮动广告
        var floatAd = document.querySelectorAll('#nb-float, .nb-float, .nb-stick-float');

        // 删除找到的广告节点
        [leftAd, rightAd, floatAd].forEach(function(list) {
          if (list && list.length) {
            list.forEach(function(el) {
              el.remove();
            });
          }
        });
      }

      // 页面加载完成后清理一次
      document.addEventListener("DOMContentLoaded", removeAds);

      // 每隔 2 秒再清理一次，防止广告脚本重新插入
      setInterval(removeAds, 2000);
    }
  }
})();
