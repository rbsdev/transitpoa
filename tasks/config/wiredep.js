module.exports = function(grunt) {

  grunt.config.set('wiredep', {

    target: {

      // Point to the files that should be updated when
      // you run `grunt wiredep`
      src: [
        'views/layout.ejs'
      ],

      // Optional:
      // ---------
      options: {
        cwd: '',
        dependencies: true,
        devDependencies: false,
        exclude: [],
        fileTypes: {},
        ignorePath: 'assets/',
        overrides: {}
      }
    }
  });

  grunt.loadNpmTasks('grunt-wiredep');
}