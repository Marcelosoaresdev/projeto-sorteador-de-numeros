module.exports = function (grunt) {
    grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less: {
        development: {
            files: {
                "dev/styles/main.css" : "src/styles/main.less", // Arquivo final x Arquivo fonte
            },
        },
        production: {
            options: {
                compress: true,
            },
            files: {
                "dist/styles/main.min.css" : "src/styles/main.less",
            },
        },
    },
    watch: {
        less: {
            files: ["src/styles/**/*.less"], // ** qualquer pasta    &   * qualquer arquivo
            tasks: ["less:development"],
        },
        html: {
            files: ["src/index.html"],
            tasks: ["replace:dev"]
        }
    },
    replace: {
        dev: {
            options: {
                patterns: [
                    {
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.css'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    flatten: true,
                    src: ["src/index.html"],
                    dest: "dev/"
                }
            ]
        },
        dist: { // com o html minificado, faz o replace da string e manda para pasta dist
            options: {
                patterns: [
                    {
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.min.css'
                    }
                ]
            },
            files: [
                {
                    expand: true,
                    flatten: true,  // Sem o flatten, o arquivo seria copiado para dist/prebuild/index.html
                    src: ["prebuild/index.html"],
                    dest: "dist/"
                }
            ]
        }
    },
    htmlmin: { //minifica o html e manda para prebuild
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                'prebuild/index.html' : 'src/index.html'
            }
        }
    },
    clean: ['prebuild']
    });

//              Plugins
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-replace");
    grunt.loadNpmTasks("grunt-contrib-htmlmin");
    grunt.loadNpmTasks("grunt-contrib-clean");

//  npm run grunt(default) e npm run build
    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["less:production", "htmlmin:dist", "replace:dist", "clean"]);
};
