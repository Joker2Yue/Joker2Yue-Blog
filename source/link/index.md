---
title: link
date: 2023-09-28 22:19:45
type: "link"
---
# 我的友链
{% tabs flink %}

<!-- tab 🌳YML -->

```yml
- name: Joker2Yue
  link: https://blog.joker2yue.top/
  avatar: https://resource.joker2yue.top/blog/images/avatar_joker.jpg
  descr: Joker Never Plays Jokes.
  siteshot: https://resource.joker2yue.top/blog/images/link/siteshot/blog.joekr2yue.top.png
```

<!-- endtab -->

<!-- tab ☀️JSON -->

```json
{
  "title": "Joker2Yue",
  "screenshot": "https://resource.joker2yue.top/blog/images/link/siteshot/blog.joekr2yue.top.png",
  "url": "https://blog.joker2yue.top/",
  "avatar": "https://resource.joker2yue.top/blog/images/avatar_joker.jpg",
  "description": "Joker Never Plays Jokes.",
  "keywords": "Joker2Yue"
}
```

<!-- endtab -->

<!-- tab 📖TABLE -->

| 名称       | 数值                                                         |
| ---------- | ------------------------------------------------------------ |
| 站点名称   | Joker2Yue的个人博客                                          |
| 站点截图   | https://resource.joker2yue.top/blog/images/link/siteshot/blog.joekr2yue.top.png |
| 站点链接   | https://blog.joker2yue.top/                                  |
| 站长头像   | https://resource.joker2yue.top/blog/images/avatar_joker.jpg  |
| 站点描述   | Joker Never Plays Jokes.                                     |
| 站点关键词 | Joker2Yue, 个人博客， 技术，生活                             |

<!-- endtab -->

<!-- tab 🎨HTML -->

```html
<a href="https://blog.anheyu.com/" rel="external nofollow">Joker2Yue-Joker2Yue的个人博客</a>
```

<!-- endtab -->

<!-- tab 🌽Jade -->

```pug
a(href='https://blog.joker2yue.top/' rel="external nofollow") Joke2Yue-Joker2Yue的个人博客
```

<!-- endtab -->

{% endtabs %}



{% folding 友情链接页面免责声明 %}

# 免责声明
本博客遵守中华人民共和国相关法律。本页内容仅作为方便学习而产生的快速链接的链接方式，对与友情链接中存在的链接、好文推荐链接等均为其他网站。我本人能力有限无法逐个甄别每篇文章的每个字，并无法获知是否在收录后原作者是否对链接增加了违反法律甚至其他破坏用户计算机等行为。因为部分友链网站甚至没有做备案、域名并未做实名认证等，所以友链网站均可能存在风险，请你须知。

所以在我力所能及的情况下，我会包括但不限于：

1. 针对收录的博客中的绝大多数内容通过标题来鉴别是否存在有风险的内容
2. 在收录的友链好文推荐中检查是否存在风险内容

但是你在访问的时候，仍然无法避免，包括但不限于：

1. 作者更换了超链接的指向，替换成了其他内容
2. 作者的服务器被恶意攻击、劫持、被注入恶意内容
3. 作者的域名到期，被不法分子用作他用
4. 作者修改了文章内容，增加钓鱼网站、广告等无效信息
5. 不完善的隐私保护对用户的隐私造成了侵害、泄漏 

请注意，最新文章部分为机器抓取，本站作者未经过任何审核和筛选，本着友链信任原则添加的。如果你发现其中包含违反中华人民共和国法律的内容，请及时联系和举报。该友链将会被拉黑。

如果因为从本页跳转给你造成了损失，深表歉意，并且建议用户如果发现存在问题在本页面进行回复。通常会很快处理。如果长时间无法得到处理，建议联系`Joker_Yue@qq.com`。

{% endfolding %}

{% folding 申请加入本站友链 %}

# 本站添加的友链要求如下

<div id="friendlink_checkboxs" style="padding:0 0 0 1.6rem"><p><label class="checkbox"><input type="checkbox" id="checkbox1" onclick="checkForm()">我已添加 <b>Joker2Yue</b> 博客的友情链接</label></p><p><label class="checkbox"><input type="checkbox" id="checkbox2" onclick="checkForm()">我的链接主体为 <b>个人</b>，网站类型为<b>博客</b></label></p><p><label class="checkbox"><input type="checkbox" id="checkbox3" onclick="checkForm()">我的网站现在可以在中国大陆区域正常访问</label></p><p><label class="checkbox"><input type="checkbox" id="checkbox4" onclick="checkForm()">网站内容符合中国大陆法律法规</label></p><p><label class="checkbox"><input type="checkbox" id="checkbox5" onclick="checkForm()">我的网站可以在1分钟内加载完成首屏</label></p></div>

若符合申请条件，请勾选。**完成后评论区将会出现**。
发送评论申请友情链接，申请后将会在一段时间后添加至友链，既时将会以邮件的形式通知你通过与否。

<script>var twikooSubmit = document.getElementsByClassName("tk-submit")[0];
    if(twikooSubmit) {
      twikooSubmit.style.opacity = "0";
    }
    function checkForm() {
        var checkbox1 = document.getElementById("checkbox1");
        var checkbox2 = document.getElementById("checkbox2");
        var checkbox3 = document.getElementById("checkbox3");
        var checkbox4 = document.getElementById("checkbox4");
        var checkbox5 = document.getElementById("checkbox5");
        var twikooSubmit = document.getElementsByClassName("tk-submit")[0];
        if (checkbox1.checked && checkbox2.checked && checkbox3.checked && checkbox4.checked && checkbox5.checked) {
            twikooSubmit.style.opacity = "1";
            twikooSubmit.style.height = "auto";
            twikooSubmit.style.overflow = "auto";
            var input = document.getElementsByClassName('el-textarea__inner')[0];
            let evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', true, true);
            input.value = '昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，同时保证图片链接可用）：\n描述：\n';
            input.dispatchEvent(evt);
            input.focus();
            input.setSelectionRange(-1, -1);
        } else {
            twikooSubmit.style.opacity = "0";
            twikooSubmit.style.height = "0";
            twikooSubmit.style.overflow = "hidden";
        }
    }
</script>
<style>.tk-comments>.tk-submit{opacity:0;height:0;transition:opacity .5s,height .5s;overflow:hidden}</style>

{% endfolding %}
