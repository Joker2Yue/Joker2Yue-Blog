// 使用CSS选择器选中目标元素
const selector = "div.fcirclePage > div > div.banner-button-group > a > span";
const element = document.querySelector(selector);

// 修改元素的文本内容
if (element) {
    element.textContent = "关于本人";
}
