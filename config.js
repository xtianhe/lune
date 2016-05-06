{
    baseUrl: "",
    dir: "test",
    optimize: "uglify",
    optimizeCss: "none",
    removeCombined: true,
    fileExclusionRegExp: /^\./,
    modules: [
        {
            name: "toply/mobile/js/message/like"
        },
        {
            name: "toply/mobile/js/message/like2"
        }
    ],
    paths: {
        jquery: "toply/mobile/js/common/jquery.min",
        func: "topv/client/func",
        localforage: "toply/mobile/js/common/localforage.min",
        iscroll: "toply/mobile/js/common/iscroll",
        pullToRefresh: "toply/mobile/js/common/pullToRefresh",
        clamp: "toply/mobile/js/common/clamp.min"
    },
    shim: {
    }
}