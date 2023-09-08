// offline config passed to workbox-build.
module.exports = {
    // 静态文件合集，如果你的站点使用了例如 webp 格式的文件，请将文件类型添加进去。
    globPatterns: ["404.html", "css/index.css"],
    globDirectory: "public",
    swDest: "public/service-worker.js",
    maximumFileSizeToCacheInBytes: 10485760, // 缓存的最大文件大小，以字节为单位。
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
        // 如果你需要加载 CDN 资源，请配置该选项，如果没有，可以不配置。
        // CDNs - should be CacheFirst, since they should be used specific versions so should not change
        /*{
            urlPattern: /^https:\/\/joker2Yue\.github\.io\/.*!/, // 缓存elmentcdn
            handler: "CacheFirst",
        },*/
    ],
    manifestTransforms: [
        async (manifestEntries, compilation) => {
            const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, ""); // 获取当前时间戳
            manifestEntries.push(
                {
                    url: "/",
                    revision: `index-${timestamp}`,
                },
                {
                    url: "music/",
                    revision: `music-${timestamp}`,
                },
                {
                    url: "about/",
                    revision: `about-${timestamp}`,
                },
                {
                    url: "website/",
                    revision: `website-${timestamp}`,
                },
                {
                    url: "comments/",
                    revision: `comments-${timestamp}`,
                },
                {
                    url: "images/",
                    revision: `images-${timestamp}`,
                }
            );
            return { manifest: manifestEntries };
        },
    ],
};