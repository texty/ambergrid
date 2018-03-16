(function () {
    if(window.innerWidth <= 800) {
        // || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.__this_is_mobile__ = "mobile";
        return;
    }

    if (window.innerWidth <= 1150) {
        window.__this_is_mobile__ = "middle";
        return;
    }
})();
