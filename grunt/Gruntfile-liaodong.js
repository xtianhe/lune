'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

//用于压缩前端的css js

module.exports = function (grunt) {
    
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
    
        src: {
            jsdir: 'v/static/js/src/'
        },
        dist: {
            jsdir: 'v/static/js/'
        },
        
        
        //监控文件变化, 自动压缩js到目标文件夹
        watch: {
            options:{
                livereload: true
            },

            js: {
                files: ['<%= src.jsdir %>**/*.js'],
                tasks: ['uglify']
            },

            //监控网站根目录php文件的变更, 通知浏览器刷新
            php: {
                files: ['**/*.php'],
                tasks: []
            }
        },
        
        //压缩js文件
        uglify: {
            jsmin: {
                options:{
                    mangle: false,
                    // banner: '/* <%= grunt.template.today("yyyy-mm-dd H:mm:ss") %> */'
                },
                files: [{
                    expand: true,
                    cwd: '<%= src.jsdir %>',
                    src: ['**/*.js'],
                    dest: '<%= dist.jsdir %>'
                }]
            }
        },

        

    });
    
    
    //发布代码之前执行grunt dist
    grunt.registerTask('dist', ['uglify']);
    //开发测试执行grunt test
    grunt.registerTask('default', ['uglify', 'watch']);
    
};
