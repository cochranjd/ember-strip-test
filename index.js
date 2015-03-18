
var removeFile = require('broccoli-file-remover');

module.exports = {
  name: 'ember-build-flags',
  included: function(app) {
    this._super.included.apply(this, arguments);

    app.registry.add('js', {
      name: 'ember-build-flags',
      ext: 'js',
      toTree: function(tree) {
        if (process.env.EMBER_ENV.toUpperCase() === 'PRODUCTION') {
          return tree;
        }

        var treeA = removeFile(tree, {
          srcFile: 'client/initializers/test-server.js',
        });
        var treeB = removeFile(treeA, {
          paths: ['client/fixtures', 'client/tests']
        });

        return treeB;
      }
    });
  }
};
