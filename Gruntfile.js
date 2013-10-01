module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'scripts.min.js': [
                        'assets/js/bootstrap.js'//,
                        //'assets/js/bootstrap-affix.js',
                        //'assets/js/bootstrap-alert.js',
                        //'assets/js/bootstrap-button.js',
                        //'assets/js/bootstrap-carousel.js',
                        //'assets/js/bootstrap-collapse.js',
                        //'assets/js/bootstrap-dropdown.js',
                        //'assets/js/bootstrap-modal.js',
                        //'assets/js/bootstrap-popover.js',
                        //'assets/js/bootstrap-scrollspy.js',
                        //'assets/js/bootstrap-tab.js',
                        //'assets/js/bootstrap-tooltip.js',
                        //'assets/js/bootstrap-transition.js'//,
                        //'assets/js/bootstrap-typehead.js'
                    ]
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};