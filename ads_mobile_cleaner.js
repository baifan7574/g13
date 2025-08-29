(function() {
  if (window.innerWidth <= 767) {
    var isHomePage = (location.pathname === "/" || location.pathname.endsWith("index.html"));

    if (isHomePage) {
      function removeAds() {
        // 清理竖条 / 浮窗 / 弹窗
        var ads = document.querySelectorAll(
          '.nb-stick.nb-left[data-nb="left"], .nb-stick.nb-right[data-nb="right"], #nb-float, .nb-float, .nb-stick-float, .nb-modal'
        );
        ads.forEach(function(el) { el.remove(); });

        // 额外清理“覆盖型方块广告”
        var overlays = document.querySelectorAll('div[style*="position:absolute"], div[style*="position:fixed"]');
        overlays.forEach(function(el) {
          // 如果里面包含广告联盟的 iframe 或 juicy 字样，就删除
          if (el.innerHTML.includes("juicy") || el.innerHTML.includes("adsbyjuicy") || el.querySelector("iframe")) {
            el.remove();
          }
        });
      }

      document.addEventListener("DOMContentLoaded", removeAds);
      setInterval(removeAds, 1000); // 每秒检查一次
    }
  }
})();
