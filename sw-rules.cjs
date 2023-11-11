module.exports.config = {
    /**
     * 与 ServiceWorker 有关的配置项
     * 若想禁止插件自动生成 sw，此项填 false 即可
     * @type {?Object|boolean}
     */
    serviceWorker: {
        /**
         * 逃生门
         * @type number
         * @see https://kmar.top/posts/73014407/#6c7c33f0
         */
        escape: 0,
        /**
         * 缓存库名称
         * 发布网站后 **切勿修改** 该配置项！
         * @type string
         */
        cacheName: 'joker2yueBlogCache',
        /**
         * 是否启用调试，启用后会在 sw 中插入一些辅助调试的代码，不建议开启
         * @type boolean
         */
        debug: false
    },
    /**
     * 与 SW 注册有关的配置项
     * 若想禁止插件向 html 中插入注册代码，此项填 false 即可
     * @type {Object|boolean}
     */
    register: {
        /**
         * sw 注册成功时的动作
         * @type ?VoidFunction
         * */
        onsuccess: undefined,
        /**
         * sw 注册失败时的动作
         * ~若没有禁用 register，则该项为必填项，该项没有缺省值~
         * @type ?VoidFunction
         */
        onerror: undefined,
        /**
         * 生成注册 SW 的 HTML 代码片段
         * @param root {string} 网页根目录的 URL
         * @param hexoConfig {Object} Hexo 配置项
         * @param pluginConfig {Object} SW 配置项
         * @return {string} 一个 HTML 标签的字符串形式
         */
        builder: (root, hexoConfig, pluginConfig) => {
            const {onerror, onsuccess} = pluginConfig.register
            return `<script>
                      (() => {
                          const sw = navigator.serviceWorker
                          const error = ${onerror.toString()}
                          if (!sw?.register('${new URL(root).pathname}sw.js')
                              ${onsuccess ? '?.then(' + onsuccess + ')' : ''}
                              ?.catch(error)
                              ) error()
                      })()
                  </script>`
        }
    },
    /**
     * 与 DOM 端有关的配置
     * 若想禁止插件自动生成 DOM 端 JS，此项填 false 即可
     * @type {Object|boolean}
     */
    dom: {
        /**
         * 缓存更新成功后触发的操作
         * @type VoidFunction
         */
        onsuccess: () => {}
    },
    /**
     * 与插件生成的版本文件相关的配置项
     * 该功能目前无法关闭
     */
    json: {
        /**
         * 更新缓存时允许更新的最大 HTML 页面数量，需要更新的 HTML 文件数量超过这个值后会清除所有 HTML 缓存
         * @type number
         */
        maxHtml: 15,
        /**
         * 版本文件（update.json）字符数量限制，插件将保证版本文件的字符数量不超过该值
         * @type number
         */
        charLimit: 1024,
        /**
         * 文件缓存匹配采取精确模式
         * 关闭时更新缓存时仅匹配文件名称，如 https://kmar.top/simple/a/index.html 仅匹配 /a/index.html
         * 开启后更新缓存时将会匹配完整名称，如 https://kmar.top/simple/a/index.html 将匹配 /simple/a/index.html
         * 两种方式各有优劣，开启后会增加 update.json 的空间占用，但会提升精确度
         * 如果网站内没有多级目录结构，就可以放心大胆的关闭了
         * key 值为文件拓展名，default 用于指代所有未列出的拓展名以及没有拓展名的文件
         */
        precisionMode: {
            default: false
        },
        /**
         * 是否合并指定项目
         * 例如当 tags 为 true 时（假设标签目录为 https://kmar.top/tags/...）
         * 如果标签页存在更新，则直接匹配 https://kmar.top/tags/ 目录下的所有文件
         * **推荐将此项开启**
         */
        merge: {
            index: true,
            tags: true,
            archives: true,
            categories: true,
            /**
             * 这里填写目录名称列表（不带两边的斜杠）
             * @type string[]
             */
            custom: []
        },
        /**
         * 生成版本文件时忽略的文件
         * 注：匹配的时候不附带域名，只有 pathname，匹配的内容一定是博客本地的文件
         * @type RegExp[]
         */
        exclude: [
            /sw\.js$/
        ]
    },
    /**
     * 外部文件更新监听
     * 该项缺省值为 false，若想允许插件监听外部文件的更新至少将值改为 `{}`
     * @type {Object|boolean}
     * @see https://kmar.top/posts/73014407/#c60b3060
     */
    external: {
        /**
         * 拉取网络文件时的超时时间
         * @type number
         */
        timeout: 1500,
        /**
         * 匹配 JS 代码中的 URL
         * 注意：字符串中的内容将被直接嵌入到正则表达式中，括号等特殊字符前需添加反斜杠，不允许使用括号
         * 该项的缺省值为 `[]`，下方的值仅用于标明填写格式
         * @see https://kmar.top/posts/73014407/#c60b3060
         */
        js: [
            {
                head: 'getScript\(',
                tail: '\)'
            }
        ],
        /**
         * 某些外链只要 URL 不变其内容就一定不会变
         * 可以通过正则表达式排除这些外链的文件内容监控，加快构建速度
         * 注意：当某一个文件被跳过拉取后，这个文件中包含的 URL 也会被跳过
         * @type RegExp[]
         */
        skip: [],
        /**
         * 在构建过程中替换部分链接，该替换结果不会影响文件内容
         * 该设置项是为了应对构建服务器在国外，但是网站内部分缓存资源无法在国外访问导致拉取时超时的问题
         * 该项的缺省值为 `[]`，下方的值仅用于标明填写格式
         * @type Object[]
         * @see https://kmar.top/posts/73014407/#4ea71e00
         */
        replace: [
            {
                source: ['source0', 'source1'],
                dist: 'dist'
            }
        ]
    },
    /**
     * 对 Hexo 中的变量进行排序
     * 默认插件对 posts、tags、pages 三个变量进行排序
     * 排序规则为优先按照字符串长度排序，若长度一致按照字典序排序
     *
     * 格式为 `name: value`
     * value 的可能值为：字符串、非负整数、false
     * 假定 Array<obj> 为要被排序的数据
     * 当 value 为字符串和非负整数时，插件会以 `obj[value]` 的格式读取关键字
     * 当 value 为 false 时，插件会直接以 `obj` 为关键字
     * 注意：关键字必须为含有 length 属性且支持 < 操作符的类型
     * 插件内置的 posts 规则如果用上面的格式写应该为：
     * posts: 'title'
     * 插件支持使用配置项覆盖插件内置规则
     *
     * 该项缺省值为 `{}`，下方的值仅用于标明填写格式
     */
    sort: {
        keywords: false
    }
}

// ——By 山岳库博（https://kmar.top/posts/73014407/）

module.exports.cacheRules = {
    /**
     * 键值是规则名称<br/>
     * 规则名只是给人看的，不影响匹配，起一个能够表明该项规则的用途的名称即可，不要太长
     */
    simple: {
        /**
         * 符合该规则的缓存在进行全局清理时是否清除
         * 如果你无法确定是否需要声明为 false 的话写 true 即可
         * @type boolean
         */
        clean: true,
        /**
         * 标记当前规则是否依据 search（URL 中问号及问号之后的部分）的不同而做出不同的响应
         * 该项可以不填，也推荐不填
         * 插件**不易监测**带参数的 URL 的更新，需要更新缓存时很可能需要手动刷新缓存，该项慎填
         * @type {boolean|undefined}
         */
        search: false,
        /**
         * 匹配缓存
         * @param url {URL} 链接的 URL 对象（对象包括 hash 和 search，但不要使用 hash，search 为 false 时不要使用 search）
         * @param $eject {Object} 用于访问通过 [ejectValues] 函数插入的变量（该参数可忽略不写）
         * @return boolean
         */
        match: (url, $eject) => url.host === 'joker2yue.cn' && url.pathname.match(/\.(woff2|woff|ttf|cur)$/)
    }
}

// ——By 山岳库博（https://kmar.top/posts/b70ec88f/）