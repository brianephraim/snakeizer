'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    asdf: {
      all: ['lib/*']
    },
    blog: {
      all: ['grunt-templates/*']
    },
    htmlConvert: {
      options: {
        // custom options, see below    
      },
      mytemplate: {
        src: ['src/**/*.tpl.html'],
        dest: 'tmp/templates.js'
      },
    },
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
  });

  
  grunt.registerMultiTask('blog', 'Validate files with JSHint.', function() {
    // PLACE THE YYYY-MM-DD-PROJECTNAME.md file into ../defualt.github.com/_posts/
    // If the blog post already exists, use the pre-existing name and overwrite contents
    // because there could be a case of the date changing.
    // This task also replaces strings in the markdown file to fix gh-pages breaking.
    // gh-pages build was breaking because of Ruby Liquid templating in the .md file.
    // This was conflicting with gh-pages inherent Jekyll architecture.
    // The fix consists of scramling the Liqid tages.
    // The scrambled .md file is committed in this project rep,
    // and this task writes an unscrampled version into ../defualt.github.com/_posts/

    var blogSuffix = '-'+grunt.config.data.pkg.name+'.md';
    var existingPath = grunt.file.expand('../defualt.github.com/_posts/*'+blogSuffix)[0];
    for(var i=0,l=this.filesSrc.length;i<l;i++){
      if(this.filesSrc[i].indexOf(blogSuffix) !== -1){
        var html = grunt.file.read(this.filesSrc[i]);
        html = html.replace(/{x%/g,"{%").replace(/%x}/g,"%}");
        if(typeof existingPath === 'undefined'){
          var pathToWrite = '../defualt.github.com/_posts/'+this.filesSrc[i];
        } else {
          var pathToWrite = existingPath;
        }
        console.log(pathToWrite)
        grunt.file.write(pathToWrite,html);
        //grunt.file.delete(this.filesSrc[i]);
        break;
      }
    }
  });

  grunt.registerMultiTask('asdf', 'Validate files with JSHint.', function() {
    console.log(this.filesSrc)
    var $ = require('jquery');

    
    var html = grunt.file.read("app/app.html");
    html = html.replace(/(\r\n|\n|\r)/gm,"");
    var jsTemplate = grunt.file.read("grunt-templates/appHtml-template.js");

    var obj = {
      foo: 'c',
      bar: 'b<%= foo %>d',
      appHtml: html
    };
    var jsContent = grunt.template.process(jsTemplate, {data: obj}) // 'abcde'
    grunt.file.write('app/generated/js/appHtml.js', jsContent )
    //var html = grunt.file.read(this.filesSrc[0]);
    // var $html = $(html);
    // var $div = $('<div></div>');
    // $div.append($html)
    // $html.find('.topNavAndLogoEtc').html('changeasdfasdfasdf')
    // console.log($div.html())
    // grunt.file.write(this.filesSrc[0], '<!DOCTYPE HTML>'+$div.html() )




    /*
    var done = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      force: false,
      reporterOutput: null,
    });

    // log (verbose) options before hooking in the reporter
    grunt.verbose.writeflags(options, 'JSHint options');

    // Report JSHint errors but dont fail the task
    var force = options.force;
    delete options.force;

    // Whether to output the report to a file
    var reporterOutput = options.reporterOutput;
    delete options.reporterOutput;

    // Hook into stdout to capture report
    var output = '';
    if (reporterOutput) {
      grunt.util.hooker.hook(process.stdout, 'write', {
        pre: function(out) {
          output += out;
          return grunt.util.hooker.preempt();
        }
      });
    }

    jshint.lint(this.filesSrc, options, function(results, data) {
      var failed = 0;
      if (results.length > 0) {
        // Fail task if errors were logged except if force was set.
        failed = force;
      } else {
        if (jshint.usingGruntReporter === true && data.length > 0) {
          grunt.log.ok(data.length + ' file' + (data.length === 1 ? '' : 's') + ' lint free.');
        }
      }

      // Write the output of the reporter if wanted
      if (reporterOutput) {
        grunt.util.hooker.unhook(process.stdout, 'write');
        reporterOutput = grunt.template.process(reporterOutput);
        var destDir = path.dirname(reporterOutput);
        if (!grunt.file.exists(destDir)) {
          grunt.file.mkdir(destDir);
        }
        grunt.file.write(reporterOutput, output);
        grunt.log.ok('Report "' + reporterOutput + '" created.');
      }

      done(failed);
    });
*/
  });



  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit', 'clean', 'concat', 'uglify']);

};
