module.exports = function (grunt) {
    grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    less: {
        development: {
            files: {
                'dev/styles/main.css': "src/styles/main.less"    // Arquivo final x Arquivo fonte
            }
        },
        production: {
            options: {
                compress: true,
            },
            files: {
                'dist/styles/main.min.css': "src/styles/main.less"    
            }
        }
    },
    watch: {
        less: {
            files: ["src/styles/**/*.less"],   // ** qualquer pasta    &   * qualquer arquivo
            tasks: ["less:development"]
        }
    }
    });
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["less:production"]);
};