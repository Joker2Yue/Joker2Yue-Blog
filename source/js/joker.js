function checkForPageChange() {
    const selector = "div.fcirclePage > div > div.banner-button-group > a > span";
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = "关于本人";
    }
}

// 每隔一定时间检查页面状态
setInterval(checkForPageChange, 2000); // 1秒钟检查一次
