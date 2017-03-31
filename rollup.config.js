// import rollupAsync from 'rollup-plugin-async';
import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-js';
import replace from 'rollup-plugin-re';

const plugins = [
  nodeResolve({
    // use "jsnext:main" if possible
    // – see https://github.com/rollup/rollup/wiki/jsnext:main
    jsnext: true,  // Default: false

    // if there's something your bundle requires that you DON'T
    // want to include, add it to 'skip'. Local and relative imports
    // can be skipped by giving the full filepath. E.g., 
    // `path.resolve('src/relative-dependency.js')`
    skip: [],  // Default: []

    // some package.json files have a `browser` field which
    // specifies alternative files to load for people bundling
    // for the browser. If that's you, use this option, otherwise
    // pkg.browser will be ignored
    browser: true,  // Default: false

    // not all files you want to resolve are .js files
    extensions: [ '.js', '.json' ],  // Default: ['.js']

    // whether to prefer built-in modules (e.g. `fs`, `path`) or
    // local ones with the same names
    preferBuiltins: false  // Default: true

  }),

  commonjs({
    // non-CommonJS modules will be ignored, but you can also
    // specifically include/exclude files
    include: 'node_modules/**',  // Default: undefined
    // exclude: [ 'node_modules/foo/**', 'node_modules/bar/**' ],  // Default: undefined

    // search for files other than .js files (must already
    // be transpiled by a previous plugin!)
    // extensions: [ '.js', '.coffee' ],  // Default: [ '.js' ]

    // if true then uses of `global` won't be dealt with by this plugin
    ignoreGlobal: false,  // Default: false

    // if false then skip sourceMap generation for CommonJS modules
    sourceMap: false,  // Default: true

    // explicitly specify unresolvable named exports
    // (see below for more details)
    // namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined
  }),

  babel({
    exclude: 'node_modules/**',
    plugins: [
      ['babel-plugin-transform-exponentiation-operator'],
      ['fast-async', {
        spec: true
      }]
    ]
  // externalHelpers:  true,
  /* presets: [
      ['env', {
        targets: {
          browsers: ["last 2 versions", "safari >= 7", "ie >= 8"]
        },
        useBuiltIns: true  // insert import statements for core-js/babel-polyfill
      }]
    ] */
  }),

  // rollupAsync(),

  // Tell UglifyJS not to "screw IE8" to make it quote reserved words
  // as property names (break, class, catch, etc)
  // https://www.bugmuncher.com/blog/ember-js-in-ie8/
  /* uglify({
    compress: {
      dead_code: true,
      screw_ie8: false
    },
    mangle:   { screw_ie8: false },
    output:   {
      screw_ie8: false,
      beautify: true
    },
    beautify : {
      beautify: true,
      quote_keys: true
    },
    output: {
      comments: (node, comment) =>
        comment.type === 'comment2'   // Multiline comment
          ? /@preserve|@license|@cc_on/i.test(comment.value)
          : false
    },
  }, minify), */

  // work around an apparent bug in UglifyJS affecting fast-async in which it fails
  // to rename the error caught by a catch(e){} clause. This is apparent in code using
  // async..await in which fast-async uses try..catch to catch errors and pass them to
  // the Promise's `reject` callback.
  replace({
    exclude: 'node_modules/**',
    patterns: [{
      match: /catch\((.)\){return (.)\(\$boundEx\)}/,
      replace: 'catch($1){return $2($1)}'
    }]
  })
];

const config = {
  entry: 'welcome.js',
  format: 'cjs',
  plugins: plugins,
  dest: 'bundle.js'
};

export default config;
