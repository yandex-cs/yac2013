module.exports = function(grunt) {
    // Tasks
    grunt.initConfig({
        copy: {
            main: {
                files: [
                    {
                    expand: true,
                    cwd: 'assets/fonts/',
                    src: '**',
                    dest: 'build/fonts/'
                    }
                ]
            }
        },

        clean: {
            build: {
                src: ['build/']
            }
        },

        csso: {
          main: {
            files: {
              'build/css/all.min.css': ['assets/css/pt_sans.css','assets/css/bootstrap.css','assets/css/main.css']
            }
          }
        },

        htmlcompressor: {
            main: {
              files: {
                'index.html': 'index_src.html'
              },
              options: {
                type: 'html',
                preserveServerScript: true
              }
            }
        },

        watch: {
            main: {
                files: [
                        'assets/**/*',
                        'index_src.html'
                        ],
                tasks: ['csso:main','htmlcompressor:main'],
                options: {
                    nospawn: true
                }
            }
        },

        imgo: {
            main: {
                src: 'assets/img/*.*',
                dest: 'build/img/'
            },
            sprites: {
                src: 'assets/sprites/*.*',
                dest: 'build/sprites/'
            }
        },

        montage: {
            icons: {
                files: {
                    "assets/sprites": [
                        "assets/img/ico/*.png"
                    ]
                },
                options: {
                    prefix: "",
                    size: 20,
                    outputImage: "icons.png",
                    outputStylesheet: "icons_not-included-in-css.css",
                    magick: {
                        background: "none"
                    }
                }
            },


            icons2x: {
                files: {
                    "assets/sprites": [
                        "assets/img/ico/2x/*.png"
                    ]
                },
                options: {
                    prefix: "",
                    size: 40,
                    outputImage: "icons_2x.png",
                    outputStylesheet: "icons_2x_not-included-in-css.css",
                    magick: {
                        background: "none"
                    }
                }
            }
        }
    });

    // Load plugins installed via npm install
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-csso');
    grunt.loadNpmTasks('grunt-htmlcompressor');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-imgo');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-montage");

    grunt.registerTask('default', ['clean:build','csso:main','htmlcompressor:main','imgo:main','imgo:sprites','copy:main']);

    grunt.registerTask('runWatch', ['watch']);

    grunt.registerTask('sprites', ['montage:icons','montage:icons2x']);
};